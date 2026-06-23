import type { Core } from '@strapi/strapi'

type NamedUid =
  | 'api::company.company'
  | 'api::category.category'
  | 'api::tag.tag'

type SortOption = 'newest' | 'oldest' | 'featured_first'

export interface ListArticlesParams {
  locale?: string
  featured_only?: boolean | string
  company_id?: string
  category_ids?: string | string[]
  tag_ids?: string | string[]
  search?: string
  sort_by?: SortOption
}

const SORT_MAP: Record<
  SortOption,
  Record<string, 'asc' | 'desc'> | Array<Record<string, 'asc' | 'desc'>>
> = {
  newest: { publishedAt: 'desc' },
  oldest: { publishedAt: 'asc' },
  featured_first: [{ featured: 'desc' }, { publishedAt: 'desc' }],
}

const toIdArray = (value?: string | string[]): number[] => {
  if (!value) return []
  const items = Array.isArray(value) ? value : [value]
  return items.map(Number).filter((id) => !Number.isNaN(id))
}

const service = ({ strapi }: { strapi: Core.Strapi }) => ({
  async listNames(uid: NamedUid, locale?: string) {
    return strapi.documents(uid).findMany({
      fields: ['name'],
      locale: locale || undefined,
      status: 'published',
      sort: { name: 'asc' },
      limit: 100,
    })
  },

  async listArticles(params: ListArticlesParams) {
    const filters: Record<string, unknown> = {}

    if (params.featured_only === true || params.featured_only === 'true') {
      filters.featured = { $eq: true }
    }

    if (params.company_id) {
      filters.companies = { id: { $eq: Number(params.company_id) } }
    }

    const categoryIds = toIdArray(params.category_ids)
    if (categoryIds.length > 0) {
      filters.categories = { id: { $in: categoryIds } }
    }

    const tagIds = toIdArray(params.tag_ids)
    if (tagIds.length > 0) {
      filters.tags = { id: { $in: tagIds } }
    }

    if (params.search?.trim()) {
      filters.title = { $containsi: params.search.trim() }
    }

    const sortBy = (params.sort_by ?? 'newest') as SortOption

    return strapi.documents('api::article.article').findMany({
      fields: ['title', 'featured', 'publishedAt'],
      populate: {
        companies: { fields: ['name'] },
        categories: { fields: ['name'] },
        tags: { fields: ['name'] },
      },
      filters,
      sort: SORT_MAP[sortBy] ?? SORT_MAP.newest,
      status: 'published',
      locale: params.locale || undefined,
      limit: 100,
    })
  },
})

export default service
