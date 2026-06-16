import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'session_token';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const STRAPI_URL =
  process.env.STRAPI_URL ?? process.env.STRAPI_INTERNAL_URL ?? 'http://localhost:1337';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const accessToken = request.nextUrl.searchParams.get('access_token');

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login?error=Authentication+failed', request.url));
  }

  const strapiRes = await fetch(
    `${STRAPI_URL}/api/auth/microsoft/callback${request.nextUrl.search}`,
    { cache: 'no-store' }
  );

  if (!strapiRes.ok) {
    return NextResponse.redirect(new URL('/login?error=Authentication+failed', request.url));
  }

  const data = (await strapiRes.json()) as { jwt?: string };
  const jwt = data.jwt;

  if (!jwt) {
    return NextResponse.redirect(new URL('/login?error=Authentication+failed', request.url));
  }

  const response = NextResponse.redirect(new URL('/', request.url));
  response.cookies.set(COOKIE_NAME, jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  });
  return response;
}
