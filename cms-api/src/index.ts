import type { Core } from '@strapi/strapi';

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const pluginStore = strapi.store({
      type: 'plugin',
      name: 'users-permissions',
    });

    const grantConfig = ((await pluginStore.get({ key: 'grant' })) as Record<string, unknown>) ?? {};
    const tenantId = process.env.MICROSOFT_TENANT_ID;

    grantConfig.microsoft = {
      enabled: true,
      icon: 'windows',
      key: process.env.MICROSOFT_CLIENT_ID,
      secret: process.env.MICROSOFT_CLIENT_SECRET,
      tenantId: tenantId,
      callback: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
      authorize_url: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`,
      access_url: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      scope: ['user.read'],
    };

    await pluginStore.set({ key: 'grant', value: grantConfig });

    strapi.log.info('[SSO] Microsoft provider configured');
  },
};
