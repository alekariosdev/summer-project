import type { Core } from '@strapi/strapi';

const ensurePublicPermissions = async (
  strapi: Core.Strapi,
  uid: string,
  actions: string[],
) => {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  for (const action of actions) {
    const permissionAction = `${uid}.${action}`;
    const existing = await strapi.db.query('plugin::users-permissions.permission').findMany({
      where: {
        action: permissionAction,
        role: publicRole.id,
      },
      limit: 1,
    });

    if (!existing.length) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: {
          action: permissionAction,
          role: publicRole.id,
        },
      });
    }
  }
};

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

    await ensurePublicPermissions(strapi, 'api::external-article.external-article', [
      'find',
      'findOne',
    ]);
    strapi.log.info('[permissions] external-article public read enabled');
  },
};
