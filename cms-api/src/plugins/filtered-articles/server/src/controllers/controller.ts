import type { Core } from '@strapi/strapi'

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  async getCompanies(ctx) {
    const { locale } = ctx.query
    const data = await strapi
      .plugin('filtered-articles')
      .service('service')
      .listNames('api::company.company', locale as string | undefined)

    ctx.body = { data }
  },

  async getCategories(ctx) {
    const { locale } = ctx.query
    const data = await strapi
      .plugin('filtered-articles')
      .service('service')
      .listNames('api::category.category', locale as string | undefined)

    ctx.body = { data }
  },

  async getTags(ctx) {
    const { locale } = ctx.query
    const data = await strapi
      .plugin('filtered-articles')
      .service('service')
      .listNames('api::tag.tag', locale as string | undefined)

    ctx.body = { data }
  },

  async getArticles(ctx) {
    const data = await strapi
      .plugin('filtered-articles')
      .service('service')
      .listArticles(ctx.query)

    ctx.body = { data }
  },
})

export default controller
