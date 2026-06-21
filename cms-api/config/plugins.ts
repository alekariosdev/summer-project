import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'users-permissions': { config: { jwt: { expiresIn: '7d' } } },
  'filtered-articles': {
    enabled: true,
    resolve: 'src/plugins/filtered-articles',
  },
});

export default config;
