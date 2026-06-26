import { ARTICLE_DATA } from '@/lib/types';
import { strapiGet } from '../client';
import { CACHE_TAGS } from '../cache';

export async function getArticlesByDocIds(docIds: string[]): Promise<ARTICLE_DATA[]> {
  if (docIds.length === 0) return [];

  const uniqueDocIds = [...new Set(docIds)];

  try {
    const { data } = await strapiGet<ARTICLE_DATA[]>('/articles', {
      params: {
        fields: ['documentId', 'title', 'slug', 'subtitle', 'featured'],
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
        filters: { documentId: { $in: uniqueDocIds } },
        status: 'published',
        pagination: { pageSize: uniqueDocIds.length },
      },
      cache: {
        type: 'revalidate',
        seconds: 60,
        tags: [CACHE_TAGS.article, ...uniqueDocIds.map(id => CACHE_TAGS.articleByDocId(id))],
      },
    });

    const byDocId = new Map(data.map(article => [article.documentId, article]));
    const seen = new Set<string>();

    return docIds
      .filter(id => {
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      })
      .map(id => byDocId.get(id))
      .filter((article): article is ARTICLE_DATA => article != null);
  } catch (err) {
    console.error('[getArticlesByDocIds]', err);
    return [];
  }
}
