import { strapiGet } from '../client';
import { CACHE_TAGS } from '../cache';
import { DYNAMIC_PAGE_POPULATE } from '../query-builder';
import type { DYNAMIC_PAGE_ENTRY, STRAPI_RESPONSE } from '@/lib/types';

export async function getDynamicPageBySlug(
  slug: string,
  locale?: string
): Promise<DYNAMIC_PAGE_ENTRY | null> {
  try {
    const { data } = await strapiGet<DYNAMIC_PAGE_ENTRY[]>('/dynamic-pages', {
      params: {
        ...DYNAMIC_PAGE_POPULATE,
        filters: { slug: { $eq: slug } },
        status: 'published',
        ...(locale && { locale }),
      },
      cache: {
        type: 'revalidate',
        seconds: 60,
        tags: [CACHE_TAGS.dynamicPage, CACHE_TAGS.dynamicPageBySlug(slug)],
      },
    });

    return data[0] ?? null;
  } catch (err) {
    console.error('[getDynamicPageBySlug]', err);
    return null;
  }
}

export async function getDynamicPageSlugs(locale?: string): Promise<string[]> {
  try {
    const { data } = await strapiGet<DYNAMIC_PAGE_ENTRY[]>('/dynamic-pages', {
      params: {
        fields: ['slug'],
        pagination: { pageSize: 200 },
        status: 'published',
        ...(locale && { locale }),
      },
      cache: {
        type: 'revalidate',
        seconds: 3600,
        tags: [CACHE_TAGS.dynamicPage],
      },
    });
    return data.map(e => e.slug);
  } catch (err) {
    console.error('[getDynamicPageSlugs]', err);
    return [];
  }
}

export async function getDynamicPageList(
  page = 1,
  pageSize = 10,
  locale?: string
): Promise<STRAPI_RESPONSE<DYNAMIC_PAGE_ENTRY[]>> {
  return strapiGet<DYNAMIC_PAGE_ENTRY[]>('/dynamic-pages', {
    params: {
      fields: ['title', 'slug', 'createdAt'],
      pagination: { page, pageSize, withCount: true },
      sort: 'createdAt:desc',
      status: 'published',
      ...(locale && { locale }),
    },
    cache: {
      type: 'revalidate',
      seconds: 60,
      tags: [CACHE_TAGS.dynamicPage],
    },
  });
}
