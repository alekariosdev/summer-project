import { strapiGet } from '../client';
import { CACHE_TAGS } from '../cache';
import { TEST_POPULATE } from '../query-builder';
import type { TestEntry, StrapiResponse } from '@/lib/types';

export async function getTestBySlug(slug: string): Promise<TestEntry | null> {
  try {
    const { data } = await strapiGet<TestEntry[]>('/tests', {
      params: {
        ...TEST_POPULATE,
        filters: { slug: { $eq: slug } },
        status: 'published',
      },
      cache: {
        type: 'revalidate',
        seconds: 60,
        tags: [CACHE_TAGS.test, CACHE_TAGS.testBySlug(slug)],
      },
    });

    console.log('data', data);
    return data[0] ?? null;
  } catch (err) {
    console.error('[getTestBySlug]', err);
    return null;
  }
}

export async function getTestSlugs(): Promise<string[]> {
  try {
    const { data } = await strapiGet<TestEntry[]>('/tests', {
      params: {
        fields: ['slug'],
        pagination: { pageSize: 200 },
        status: 'published',
      },
      cache: {
        type: 'revalidate',
        seconds: 3600,
        tags: [CACHE_TAGS.test],
      },
    });
    return data.map(e => e.slug);
  } catch (err) {
    console.error('[getTestSlugs]', err);
    return [];
  }
}

export async function getTestList(page = 1, pageSize = 10): Promise<StrapiResponse<TestEntry[]>> {
  return strapiGet<TestEntry[]>('/tests', {
    params: {
      fields: ['title', 'slug', 'createdAt'],
      pagination: { page, pageSize, withCount: true },
      sort: 'createdAt:desc',
      status: 'published',
    },
    cache: {
      type: 'revalidate',
      seconds: 60,
      tags: [CACHE_TAGS.test],
    },
  });
}
