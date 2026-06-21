import type { StrapiMedia } from '@/lib/types';

const STRAPI_MEDIA_PREFIX = '/strapi-media';

// ─── Resolve media URL via Next.js proxy (avoids localhost/private-IP issues in Docker) ─

function toProxiedMediaPath(url: string): string {
  if (url.startsWith(STRAPI_MEDIA_PREFIX)) return url;

  const uploadsIndex = url.indexOf('/uploads/');
  const path =
    uploadsIndex !== -1
      ? url.slice(uploadsIndex + '/uploads/'.length)
      : url.replace(/^\//, '');

  return `${STRAPI_MEDIA_PREFIX}/${path}`;
}

export function getStrapiMediaUrl(media?: StrapiMedia | null): string {
  if (!media?.url) return '';
  return toProxiedMediaPath(media.url);
}

// ─── Get best format URL ─────────────────────────────────────────────────────

type FormatKey = 'thumbnail' | 'small' | 'medium' | 'large';

export function getStrapiMediaFormat(
  media?: StrapiMedia | null,
  preferred: FormatKey = 'medium'
): string {
  if (!media) return '';
  const fmt = media.formats?.[preferred] ?? media.formats?.small;
  return fmt ? getStrapiMediaUrl({ ...media, url: fmt.url }) : getStrapiMediaUrl(media);
}

// ─── Ready-to-use next/image props ──────────────────────────────────────────

export function getStrapiImageProps(media?: StrapiMedia | null) {
  if (!media) return null;
  return {
    src: getStrapiMediaUrl(media),
    alt: media.alternativeText ?? '',
    width: media.width ?? 800,
    height: media.height ?? 600,
  };
}
