import { revalidateTag, revalidatePath } from 'next/cache';
import { unstable_cache } from 'next/cache';

// ─── Tag registry — single source of truth ──────────────────────────────────

export const CACHE_TAGS = {
  // Collection-level
  test: 'test',
  dynamicPage: 'dynamic-page',
  global: 'global',

  // Entry-level
  testBySlug: (slug: string) => `test-slug-${slug}`,
  testById: (id: string) => `test-id-${id}`,
  dynamicPageBySlug: (slug: string) => `dynamic-page-slug-${slug}`,
  dynamicPageById: (id: string) => `dynamic-page-id-${id}`,

  // Component-level
  carousel: 'carousel',
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
