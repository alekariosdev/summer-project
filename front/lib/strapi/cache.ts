import { revalidateTag, revalidatePath } from 'next/cache';
import { unstable_cache } from 'next/cache';

// ─── Tag registry — single source of truth ──────────────────────────────────

export const CACHE_TAGS = {
  // Collection-level
  article: 'article',
  dynamicPage: 'dynamic-page',
  global: 'global',

  // Entry-level
  dynamicPageBySlug: (slug: string) => `dynamic-page-slug-${slug}`,
  dynamicPageById: (id: string) => `dynamic-page-id-${id}`,
  articleByDocId: (docId: string) => `article-doc-id-${docId}`,

  // Component-level
  carousel: 'carousel',
  heroSlider: 'hero-slider',
  masonryList: 'masonry-list',
  seo: 'seo',
} as const;

// ─── Revalidation helpers ────────────────────────────────────────────────────

export function revalidateCollection(tag: string) {
  revalidateTag(tag, 'max');
}

export function revalidateEntry(tag: string) {
  revalidateTag(tag, 'max');
}

export function revalidatePagePath(path: string) {
  revalidatePath(path);
}

// ─── unstable_cache wrapper ──────────────────────────────────────────────────
// Use for non-fetch data sources or when you need granular control

export function withCache<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  keyParts: string[],
  options: { tags?: string[]; revalidate?: number } = {}
) {
  return unstable_cache(fn, keyParts, {
    tags: options.tags ?? [],
    revalidate: options.revalidate ?? 60,
  });
}
