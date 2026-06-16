import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const COOKIE_NAME = 'session_token';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// Logical (locale-stripped) public paths
const PUBLIC_PATHS = new Set<string>(['/login']);

const intlMiddleware = createIntlMiddleware(routing);

// ── JWT verification at the edge ────────────────────────────────────────────
async function isValidToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// ── Split "/de/dashboard" → { locale: 'de', rest: '/dashboard' } ────────────
function splitLocale(pathname: string): { locale: string; rest: string } {
  const segments = pathname.split('/');
  const first = segments[1];

  if (routing.locales.includes(first as never)) {
    const rest = '/' + segments.slice(2).join('/');
    return { locale: first, rest: rest === '/' ? '/' : rest.replace(/\/$/, '') };
  }
  return { locale: routing.defaultLocale, rest: pathname };
}

// ── Rebuild a path WITH the correct locale prefix ──────────────────────────
// (default locale has no prefix because localePrefix = 'as-needed')
function withLocale(locale: string, path: string): string {
  return locale === routing.defaultLocale ? path : `/${locale}${path}`;
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  const { locale, rest } = splitLocale(pathname);

  // ── PUBLIC: /login (any locale) ──────────────────────────────────────────
  if (PUBLIC_PATHS.has(rest)) {
    // Already authenticated → bounce to dashboard (same locale)
    if (token && (await isValidToken(token))) {
      const url = request.nextUrl.clone();
      url.pathname = withLocale(locale, '/');
      return NextResponse.redirect(url);
    }

    // Let next-intl handle locale; clear stale cookie if present
    const res = intlMiddleware(request);
    if (token) res.cookies.delete(COOKIE_NAME);
    return res;
  }

  // ── PROTECTED: everything else ───────────────────────────────────────────
  if (!token || !(await isValidToken(token))) {
    const url = request.nextUrl.clone();
    url.pathname = withLocale(locale, '/login');
    const res = NextResponse.redirect(url);
    res.cookies.delete(COOKIE_NAME);
    return res;
  }

  // Authenticated → hand off to next-intl for locale finalization
  return intlMiddleware(request);
}

export const config = {
  // Run on pages only — exclude /api, Next internals, and files with extensions.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
