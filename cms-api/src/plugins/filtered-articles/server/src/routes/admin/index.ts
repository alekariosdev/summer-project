export default () => ({
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/companies',
      handler: 'controller.getCompanies',
      config: { policies: [] },
    },
    {
      method: 'GET',
      path: '/categories',
      handler: 'controller.getCategories',
      config: { policies: [] },
    },
    {
      method: 'GET',
      path: '/tags',
      handler: 'controller.getTags',
      config: { policies: [] },
    },
    {
      method: 'GET',
      path: '/articles',
      handler: 'controller.getArticles',
      config: { policies: [] },
    },
  ],
})
