import { cookies } from 'next/headers';

export async function getJwt() {
  return (await cookies()).get('strapi_jwt')?.value ?? null;
}

export async function getCurrentUser() {
  try {
  const jwt = await getJwt();
  if (!jwt) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate=role`,
    {
      headers: { Authorization: `Bearer ${jwt}` },
      cache:   'no-store',
    }
  );

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function strapiFetch(path: string, init: RequestInit = {}) {
  try {
  const jwt = await getJwt();
  return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}${path}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
      },
      cache: 'no-store',
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}