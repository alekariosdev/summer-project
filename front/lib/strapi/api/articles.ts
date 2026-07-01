import type { ARTICLE_DATA, STRAPI_META, STRAPI_RESPONSE } from '@/lib/types';
import { strapiGet } from '../client';
import { CACHE_TAGS } from '../cache';

export const DEFAULT_ARTICLE_PAGE_SIZE = 10;

const EMPTY_ARTICLES_RESPONSE: STRAPI_RESPONSE<ARTICLE_DATA[]> = {
  data: [],
  meta: {},
};

function dedupeDocIds(docIds: string[]): string[] {
  const seen = new Set<string>();

  return docIds.filter(id => {
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

function buildPaginationMeta(
  total: number,
  page: number,
  pageSize: number
): STRAPI_META {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), pageCount);

  return {
    pagination: {
      page: safePage,
      pageSize,
      pageCount,
      total,
    },
  };
}

export async function getArticlesByDocIds(
  docIds: string[],
  options?: { page?: number; pageSize?: number }
): Promise<STRAPI_RESPONSE<ARTICLE_DATA[]>> {
  if (docIds.length === 0) return EMPTY_ARTICLES_RESPONSE;

  const orderedIds = dedupeDocIds(docIds);
  const total = orderedIds.length;
  const pageSize = options?.pageSize ?? total;
  const meta = buildPaginationMeta(total, options?.page ?? 1, pageSize);
  const { page } = meta.pagination!;
  const start = (page - 1) * pageSize;
  const pageDocIds = orderedIds.slice(start, start + pageSize);

  if (pageDocIds.length === 0) {
    return { data: [], meta };
  }

  try {
    const { data } = await strapiGet<ARTICLE_DATA[]>('/articles', {
      params: {
        fields: ['documentId', 'title', 'slug', 'subtitle', 'featured', 'original_published_at'],
        populate: {
          image: {
            fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
          },
          categories: {
            fields: ['name'],
          },
          companies: {
            fields: ['name'],
          },
          tags: {
            fields: ['name'],
          },
        },
        filters: { documentId: { $in: pageDocIds } },
        status: 'published',
        pagination: { pageSize: pageDocIds.length, withCount: true },
      },
      cache: {
        type: 'revalidate',
        seconds: 60,
        tags: [CACHE_TAGS.article, ...pageDocIds.map(id => CACHE_TAGS.articleByDocId(id))],
      },
    });

    const byDocId = new Map(data.map(article => [article.documentId, article]));

    const filteredArticles = pageDocIds
      .map(id => byDocId.get(id))
      .filter((article): article is ARTICLE_DATA => article != null);

    return {
      data: filteredArticles,
      meta,
    };
  } catch (err) {
    console.error('[getArticlesByDocIds]', err);
    return EMPTY_ARTICLES_RESPONSE;
  }
}
