import qs from 'qs';
import { STRAPI_CONFIG } from './config';
import type { STRAPI_RESPONSE } from '@/lib/types';
import { getSessionToken } from '@/lib/auth';

// ─── Error ──────────────────────────────────────────────────────────────────

export class StrapiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'StrapiError';
  }
}

// ─── Cache strategy ─────────────────────────────────────────────────────────

export type CacheStrategy =
  | { type: 'revalidate'; seconds: number; tags?: string[] }
  | { type: 'no-store' }
  | { type: 'force-cache' };

// ─── Options ────────────────────────────────────────────────────────────────

export interface StrapiGetOptions {
  params?: Record<string, unknown>;
  cache?: CacheStrategy;
  headers?: Record<string, string>;
}

// ─── Build Next.js fetch init from cache strategy ───────────────────────────

function buildCacheInit(strategy?: CacheStrategy): RequestInit {
  if (!strategy) {
    return { next: { revalidate: 60 } };
  }
  switch (strategy.type) {
    case 'no-store':
      return { cache: 'no-store' };
    case 'force-cache':
      return { cache: 'force-cache' };
    case 'revalidate':
      return {
        next: {
          revalidate: strategy.seconds,
          ...(strategy.tags?.length && { tags: strategy.tags }),
        },
      };
  }
}

// ─── Core GET ───────────────────────────────────────────────────────────────

export async function strapiGet<T>(
  path: string,
  { params, cache, headers = {} }: StrapiGetOptions = {}
): Promise<STRAPI_RESPONSE<T>> {
  const query = params ? `?${qs.stringify(params, { encodeValuesOnly: true })}` : '';
  const token = await getSessionToken();
  const url = `${STRAPI_CONFIG.url}${STRAPI_CONFIG.apiPrefix}${path}${query}`;

  const res = await fetch(url, {
    ...buildCacheInit(cache),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token ?? ''}`,
      ...headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new StrapiError(res.status, `[Strapi] ${res.status} ${res.statusText}`, body);
  }

  return res.json() as Promise<STRAPI_RESPONSE<T>>;
}

// ─── POST/PUT/DELETE (mutations — always no-store) ──────────────────────────

export async function strapiMutate<T>(
  path: string,
  method: 'POST' | 'PUT' | 'DELETE',
  body?: unknown
): Promise<STRAPI_RESPONSE<T>> {
  const url = `${STRAPI_CONFIG.url}${STRAPI_CONFIG.apiPrefix}${path}`;
  const token = await getSessionToken();
  const res = await fetch(url, {
    method,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token ?? ''}`,
    },
    ...(body !== undefined ? { body: JSON.stringify({ data: body }) } : {}),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new StrapiError(res.status, `[Strapi] ${res.status} ${res.statusText}`, err);
  }

  return res.json() as Promise<STRAPI_RESPONSE<T>>;
}
