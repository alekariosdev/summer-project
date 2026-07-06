/**
 * dynamic-page controller
 */

import { factories } from '@strapi/strapi';

type DynamicPageEntry = {
  blocks?: unknown[];
  [key: string]: unknown;
};

export default factories.createCoreController(
  'api::dynamic-page.dynamic-page',
  ({ strapi }) => ({
    async find(ctx) {
      const response = await super.find(ctx);
      const service = strapi.service('api::dynamic-page.dynamic-page');

      if (Array.isArray(response.data)) {
        response.data = await Promise.all(
          response.data.map((entry: DynamicPageEntry) => service.enrichPage(entry)),
        );
      } else if (response.data) {
        response.data = await service.enrichPage(response.data as DynamicPageEntry);
      }

      return response;
    },

    async findOne(ctx) {
      const response = await super.findOne(ctx);
      const service = strapi.service('api::dynamic-page.dynamic-page');

      if (response.data) {
        response.data = await service.enrichPage(response.data as DynamicPageEntry);
      }

      return response;
    },
  }),
);
