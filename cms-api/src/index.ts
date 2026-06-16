// src/index.ts
import type { Core } from '@strapi/strapi';

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    // User creation lifecycle
    strapi.db.lifecycles.subscribe({
      models: ['plugin::users-permissions.user'],

      async beforeCreate(event) {
        const { data } = event.params;
        const email = (data.email || '').toLowerCase();
        // const domain = email.split('@')[1];

        // const ALLOWED_DOMAINS = ['yourcompany.com'];

        // if (!ALLOWED_DOMAINS.includes(domain)) {
        //   throw new Error(`Domain not allowed: ${domain}`);
        // }

        data.confirmed = true;
        data.provider = data.provider || 'microsoft';
        data.username = data.username || email;
      },
    });
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Force tenant-specific Microsoft endpoints
    const tenantId = process.env.MICROSOFT_TENANT_ID;

    const pluginStore = strapi.store({
      type: 'plugin',
      name: 'users-permissions',
      key: 'grant',
    });

    const grantConfig: any = (await pluginStore.get()) || {};

    grantConfig.microsoft = {
      ...(grantConfig.microsoft || {}),
      enabled: true,
      key: process.env.MICROSOFT_CLIENT_ID,
      secret: process.env.MICROSOFT_CLIENT_SECRET,
      callback: `${process.env.STRAPI_URL}/api/auth/microsoft/callback`,
      scope: ['openid', 'profile', 'email', 'User.Read'],
      authorize_url: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`,
      access_url: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    };

    await pluginStore.set({ value: grantConfig });
    strapi.log.info(`✅ Microsoft grant config → tenant ${tenantId}`);
  },
};
