/**
 * dynamic-page service
 */

import type { Core } from '@strapi/strapi';
import { factories } from '@strapi/strapi';

const EXTERNAL_LINKS_SLIDER_UID = 'article.external-links-slider';
const MASONRY_LIST_UID = 'article.masonry-list';
const VERTICAL_LIST_UID = 'article.vertical-list';
const SLIDESET_LIST_UID = 'article.slideset-list';
const EXTERNAL_ARTICLE_UID = 'api::external-article.external-article';
const ARTICLE_UID = 'api::article.article';
const ARTICLES_CONFIG_UID = 'article.articles-config';
const EXTERNAL_ARTICLES_CONFIG_UID = 'article.external-articles-config';

const EXTERNAL_ARTICLE_FIELDS = ['title', 'source', 'url', 'publishedAt'] as const;

const ARTICLE_FIELDS = [
  'documentId',
  'title',
  'slug',
  'subtitle',
  'featured',
  'original_published_at',
] as const;

const ARTICLE_POPULATE = {
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
};

export type ExternalArticleRecord = {
  id: number;
  documentId: string;
  title: string;
  source?: string | null;
  url?: string | null;
  publishedAt?: string | null;
};

export type ArticleRecord = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  featured?: boolean;
  original_published_at?: string | null;
  image?: unknown;
  categories?: unknown[];
  companies?: unknown[];
  tags?: unknown[];
};

export type ArticlesConfig = {
  id: number;
  limit?: number | null;
  articleScope?: 'featured' | 'all';
  sortBy?: 'createdAt' | 'original_published_at';
  sortDirection?: 'asc' | 'desc';
  companies?: Array<{ id: number; documentId?: string }>;
  categories?: Array<{ id: number; documentId?: string }>;
  excludedArticles?: Array<{ id: number; documentId?: string }>;
  articles?: ArticleRecord[];
};

export type ResolvedArticlesConfig = Omit<
  ArticlesConfig,
  'companies' | 'categories' | 'excludedArticles'
> & {
  articles: ArticleRecord[];
};

export type ExternalArticlesConfig = {
  id: number;
  limit?: number | null;
  articleScope?: 'featured' | 'all';
  sortBy?: 'createdAt' | 'publishedAt';
  sortDirection?: 'asc' | 'desc';
  excludedArticles?: Array<{ id: number; documentId?: string }>;
  articles?: ExternalArticleRecord[];
};

export type ResolvedExternalArticlesConfig = Omit<ExternalArticlesConfig, 'excludedArticles'> & {
  articles: ExternalArticleRecord[];
};

export type ExternalLinksSliderBlock = {
  id: number;
  __component: typeof EXTERNAL_LINKS_SLIDER_UID;
  articles?: ExternalArticlesConfig | null;
  [key: string]: unknown;
};

export type MasonryListBlock = {
  id: number;
  __component: typeof MASONRY_LIST_UID;
  articles?: ArticlesConfig | null;
  [key: string]: unknown;
};

export type VerticalListBlock = {
  id: number;
  __component: typeof VERTICAL_LIST_UID;
  articles?: ArticlesConfig | null;
  [key: string]: unknown;
};

export type SlidesetListBlock = {
  id: number;
  __component: typeof SLIDESET_LIST_UID;
  slides?: ArticlesConfig | null;
  cards?: ArticlesConfig | null;
  [key: string]: unknown;
};

type EnrichableBlock =
  | ExternalLinksSliderBlock
  | MasonryListBlock
  | VerticalListBlock
  | SlidesetListBlock
  | { __component: string; [key: string]: unknown };

type DynamicPageEntry = {
  blocks?: EnrichableBlock[];
  [key: string]: unknown;
};

const clampExternalLimit = (limit?: number | null) =>
  Math.min(Math.max(limit ?? 10, 1), 50);

const clampArticlesLimit = (limit?: number | null) => {
  if (limit == null) return null;
  return Math.min(Math.max(limit, 1), 100);
};

const resolveArticlesConfig = async (
  strapi: Core.Strapi,
  config: ArticlesConfig,
): Promise<ResolvedArticlesConfig> => {
  const limit = clampArticlesLimit(config.limit);
  const articleScope = config.articleScope ?? 'all';
  const sortBy = config.sortBy ?? 'original_published_at';
  const sortDirection = config.sortDirection ?? 'desc';

  const componentRow = await strapi.db.query(ARTICLES_CONFIG_UID).findOne({
    where: { id: config.id },
    populate: ['companies', 'categories', 'excludedArticles'],
  });

  const companyIds = ((componentRow?.companies ?? []) as Array<{ id: number }>).map(
    (company) => company.id,
  );
  const categoryIds = ((componentRow?.categories ?? []) as Array<{ id: number }>).map(
    (category) => category.id,
  );
  const excluded = (componentRow?.excludedArticles ?? []) as Array<{ id: number }>;
  const excludedIds = excluded.map((article) => article.id);

  const filters: Record<string, unknown> = {};

  if (articleScope === 'featured') {
    filters.featured = { $eq: true };
  }

  if (companyIds.length > 0) {
    filters.companies = { id: { $in: companyIds } };
  }

  if (categoryIds.length > 0) {
    filters.categories = { id: { $in: categoryIds } };
  }

  if (excludedIds.length > 0) {
    filters.id = { $notIn: excludedIds };
  }

  const articles = (await strapi.documents(ARTICLE_UID).findMany({
    fields: [...ARTICLE_FIELDS],
    populate: ARTICLE_POPULATE as Record<string, unknown>,
    filters,
    sort: { [sortBy]: sortDirection },
    status: 'published',
    ...(limit != null ? { limit } : {}),
  })) as ArticleRecord[];

  const {
    companies: _companies,
    categories: _categories,
    excludedArticles: _excluded,
    articles: _articles,
    ...rest
  } = config;

  return {
    ...rest,
    limit,
    articleScope,
    sortBy,
    sortDirection,
    articles,
  };
};

const resolveExternalArticlesConfig = async (
  strapi: Core.Strapi,
  config: ExternalArticlesConfig,
): Promise<ResolvedExternalArticlesConfig> => {
  const limit = clampExternalLimit(config.limit);
  const articleScope = config.articleScope ?? 'all';
  const sortBy = config.sortBy ?? 'publishedAt';
  const sortDirection = config.sortDirection ?? 'desc';

  const componentRow = await strapi.db.query(EXTERNAL_ARTICLES_CONFIG_UID).findOne({
    where: { id: config.id },
    populate: ['excludedArticles'],
  });

  const excluded = (componentRow?.excludedArticles ?? []) as Array<{ id: number }>;
  const excludedIds = excluded.map((article) => article.id);

  const filters: Record<string, unknown> = {};

  if (articleScope === 'featured') {
    filters.featured = { $eq: true };
  }

  if (excludedIds.length > 0) {
    filters.id = { $notIn: excludedIds };
  }

  const articles = (await strapi.documents(EXTERNAL_ARTICLE_UID).findMany({
    fields: [...EXTERNAL_ARTICLE_FIELDS],
    filters,
    sort: { [sortBy]: sortDirection },
    status: 'published',
    limit,
  })) as ExternalArticleRecord[];

  const { excludedArticles: _excluded, articles: _articles, ...rest } = config;

  return {
    ...rest,
    limit,
    articleScope,
    sortBy,
    sortDirection,
    articles,
  };
};

const resolveExternalLinksSlider = async (
  strapi: Core.Strapi,
  block: ExternalLinksSliderBlock,
): Promise<ExternalLinksSliderBlock> => {
  if (!block.articles?.id) {
    return { ...block, articles: null };
  }

  return {
    ...block,
    articles: await resolveExternalArticlesConfig(strapi, block.articles),
  };
};

const resolveMasonryList = async (
  strapi: Core.Strapi,
  block: MasonryListBlock,
): Promise<MasonryListBlock> => {
  if (!block.articles?.id) {
    return { ...block, articles: null };
  }

  return {
    ...block,
    articles: await resolveArticlesConfig(strapi, block.articles),
  };
};

const resolveVerticalList = async (
  strapi: Core.Strapi,
  block: VerticalListBlock,
): Promise<VerticalListBlock> => {
  if (!block.articles?.id) {
    return { ...block, articles: null };
  }

  return {
    ...block,
    articles: await resolveArticlesConfig(strapi, block.articles),
  };
};

const resolveSlidesetList = async (
  strapi: Core.Strapi,
  block: SlidesetListBlock,
): Promise<SlidesetListBlock> => {
  const [slides, cards] = await Promise.all([
    block.slides?.id ? resolveArticlesConfig(strapi, block.slides) : null,
    block.cards?.id ? resolveArticlesConfig(strapi, block.cards) : null,
  ]);

  return {
    ...block,
    slides,
    cards,
  };
};

const enrichBlocks = async (strapi: Core.Strapi, blocks?: EnrichableBlock[]) => {
  if (!blocks?.length) return blocks;

  return Promise.all(
    blocks.map(async (block) => {
      switch (block.__component) {
        case EXTERNAL_LINKS_SLIDER_UID:
          return resolveExternalLinksSlider(strapi, block as ExternalLinksSliderBlock);
        case MASONRY_LIST_UID:
          return resolveMasonryList(strapi, block as MasonryListBlock);
        case VERTICAL_LIST_UID:
          return resolveVerticalList(strapi, block as VerticalListBlock);
        case SLIDESET_LIST_UID:
          return resolveSlidesetList(strapi, block as SlidesetListBlock);
        default:
          return block;
      }
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
  enrichBlocks: (blocks?: EnrichableBlock[]) => enrichBlocks(strapi, blocks),
  enrichPage: (entry: DynamicPageEntry | null) => enrichPage(strapi, entry),
}));
