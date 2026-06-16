import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { AUTH_USER } from '@/lib/types';

const STRAPI_URL = process.env.STRAPI_URL as string;
const COOKIE_NAME = 'session_token';

export const getSessionToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
};

export const getCurrentUser = async (): Promise<AUTH_USER> => {
  const token = await getSessionToken();
  if (!token) redirect('/login');

  const res = await fetch(`${STRAPI_URL}/api/users/me?populate=role`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!res.ok) redirect('/login');
  return res.json() as Promise<AUTH_USER>;
};

export const strapiServer = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = await getSessionToken();
  const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as {
      error?: { message?: string };
    };
    throw new Error(err.error?.message ?? `Strapi error ${res.status}`);
  }
  return res.json() as Promise<T>;
};
