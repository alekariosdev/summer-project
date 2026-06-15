import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'users-permissions': {
    config: {
      providers: {
        microsoft: {
          enabled: true,
          clientId: env('MICROSOFT_CLIENT_ID'),
          clientSecret: env('MICROSOFT_CLIENT_SECRET'),
          callback: `${env('STRAPI_URL')}/api/auth/microsoft/callback`,
          scope: ['openid', 'profile', 'email', 'User.Read'],
          authorize_url: `https://login.microsoftonline.com/${env('MICROSOFT_TENANT_ID')}/oauth2/v2.0/authorize`,
          access_url: `https://login.microsoftonline.com/${env('MICROSOFT_TENANT_ID')}/oauth2/v2.0/token`,
        },
      },
    },
  },
});

export default config;
