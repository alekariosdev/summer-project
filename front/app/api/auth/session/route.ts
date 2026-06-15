import { cookies }      from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { jwt } = await req.json();
  if (!jwt) return NextResponse.json({ error: 'No JWT' }, { status: 400 });

  (await cookies()).set('strapi_jwt', jwt, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path:     '/',
    maxAge:   60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  (await cookies()).delete('strapi_jwt');
  return NextResponse.json({ ok: true });
}