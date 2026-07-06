/**
 * dynamic-page service
 */

import type { Core } from '@strapi/strapi';
import { factories } from '@strapi/strapi';

const EXTERNAL_LINKS_SLIDER_UID = 'article.external-links-slider';
const EXTERNAL_ARTICLE_UID = 'api::external-article.external-article';
const COMPONENT_UID = 'article.external-links-slider';

const EXTERNAL_ARTICLE_FIELDS = ['title', 'source', 'url', 'publishedAt'] as const;

export type ExternalArticleRecord = {
  id: number;
  documentId: string;
  title: string;
  source?: string | null;
  url?: string | null;
  publishedAt?: string | null;
};

export type ExternalLinksSliderBlock = {
  id: number;
  __component: typeof EXTERNAL_LINKS_SLIDER_UID;
  limit?: number | null;
  pinnedArticles?: ExternalArticleRecord[];
  excludedArticles?: Array<{ id: number; documentId?: string }>;
  articles?: ExternalArticleRecord[];
  [key: string]: unknown;
};

type DynamicPageEntry = {
  blocks?: ExternalLinksSliderBlock[];
  [key: string]: unknown;
};

const clampLimit = (limit?: number | null) =>
  Math.min(Math.max(limit ?? 10, 1), 50);

const resolveExternalLinksSlider = async (
  strapi: Core.Strapi,
  block: ExternalLinksSliderBlock,
): Promise<ExternalLinksSliderBlock> => {
  const limit = clampLimit(block.limit);

  const componentRow = await strapi.db.query(COMPONENT_UID).findOne({
    where: { id: block.id },
    populate: ['pinnedArticles', 'excludedArticles'],
  });

  const pinned = ((componentRow?.pinnedArticles ?? []) as ExternalArticleRecord[]).slice(
    0,
    limit,
  );

  const excludedIds = new Set<number>([
    ...pinned.map((article) => article.id),
    ...((componentRow?.excludedArticles ?? []) as Array<{ id: number }>).map(
      (article) => article.id,
    ),
  ]);

  const remaining = limit - pinned.length;
  let autoArticles: ExternalArticleRecord[] = [];

  if (remaining > 0) {
    const filters: Record<string, unknown> = {};

    if (excludedIds.size > 0) {
      filters.id = { $notIn: [...excludedIds] };
    }

    autoArticles = (await strapi.documents(EXTERNAL_ARTICLE_UID).findMany({
      fields: [...EXTERNAL_ARTICLE_FIELDS],
      filters,
      sort: { publishedAt: 'desc' },
      status: 'published',
      limit: remaining,
    })) as ExternalArticleRecord[];
  }

  const { pinnedArticles: _pinned, excludedArticles: _excluded, ...rest } = block;

  return {
    ...rest,
    articles: [...pinned, ...autoArticles],
  };
};

const enrichBlocks = async (
  strapi: Core.Strapi,
  blocks?: ExternalLinksSliderBlock[],
) => {
  if (!blocks?.length) return blocks;

  return Promise.all(
    blocks.map(async (block) => {
      if (block.__component !== EXTERNAL_LINKS_SLIDER_UID) return block;
      return resolveExternalLinksSlider(strapi, block);
    }),
  );
};

const enrichPage = async (strapi: Core.Strapi, entry: DynamicPageEntry | null) => {
  if (!entry?.blocks) return entry;

  return {
    ...entry,
    blocks: await enrichBlocks(strapi, entry.blocks),
  };
};

export default factories.createCoreService('api::dynamic-page.dynamic-page', ({ strapi }) => ({
  enrichBlocks: (blocks?: ExternalLinksSliderBlock[]) => enrichBlocks(strapi, blocks),
  enrichPage: (entry: DynamicPageEntry | null) => enrichPage(strapi, entry),
}));
