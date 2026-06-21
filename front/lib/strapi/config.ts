const publicUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

export const STRAPI_CONFIG = {
  url: process.env.STRAPI_URL ?? process.env.STRAPI_INTERNAL_URL ?? publicUrl,
  publicUrl,
  apiPrefix: '/api',
} as const;

export const REVALIDATION_SECRET = process.env.STRAPI_REVALIDATION_SECRET ?? '';
