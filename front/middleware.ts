import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const PUBLIC_PATHS = ['/login', '/connect'];

function getPathnameWithoutLocale(pathname: string): string {
  for (const locale of routing.locales) {
    if (pathname === `/${locale}`) return '/';
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1);
    }
  }

  return pathname;
}

function getLocaleFromPathname(pathname: string): string {
  for (const locale of routing.locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }

  return routing.defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname);
  const locale = getLocaleFromPathname(pathname);

  const isPublic = PUBLIC_PATHS.some((path) =>
    pathnameWithoutLocale.startsWith(path),
  );

  if (!isPublic) {
    const jwt = req.cookies.get('strapi_jwt')?.value;

    if (!jwt) {
      const loginUrl = new URL(`/${locale}/login`, req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    '/',
    '/(el|en)/:path*',
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\..*).*)',
  ],
};
