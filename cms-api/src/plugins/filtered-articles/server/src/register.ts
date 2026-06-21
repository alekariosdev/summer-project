import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase
  strapi.customFields.register({
    name: 'filtered-articles',
    plugin: 'filtered-articles',
    type: 'json',
  });
};

export default register;
