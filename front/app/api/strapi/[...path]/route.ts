import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

const STRAPI_URL = process.env.STRAPI_URL as string;
const COOKIE_NAME = 'session_token';

type RouteContext = { params: Promise<{ path: string[] }> };

async function proxy(
  request: NextRequest,
  context: RouteContext,
  method: string
): Promise<NextResponse> {
  const { path } = await context.params;
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  const target = `${STRAPI_URL}/api/${path.join('/')}${request.nextUrl.search}`;
  const body = method !== 'GET' && method !== 'HEAD' ? await request.text() : undefined;

  const strapiRes = await fetch(target, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body,
    cache: 'no-store',
  });

  const data = await strapiRes.json();
  return NextResponse.json(data, { status: strapiRes.status });
}

export const GET = (r: NextRequest, c: RouteContext) => proxy(r, c, 'GET');
export const POST = (r: NextRequest, c: RouteContext) => proxy(r, c, 'POST');
export const PUT = (r: NextRequest, c: RouteContext) => proxy(r, c, 'PUT');
export const PATCH = (r: NextRequest, c: RouteContext) => proxy(r, c, 'PATCH');
export const DELETE = (r: NextRequest, c: RouteContext) => proxy(r, c, 'DELETE');
