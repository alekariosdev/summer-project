// admin/src/index.ts

import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

import type { StrapiApp } from '@strapi/strapi/admin';
import type { ComponentType } from 'react';

const plugin: StrapiApp['appPlugins'][string] = {
  register(app) {
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });

    app.customFields.register({
      name: 'filtered-articles',
      pluginId: PLUGIN_ID,
      type: 'json',
      intlLabel: {
        id: `${PLUGIN_ID}.filtered-articles.label`,
        defaultMessage: 'Filtered Articles',
      },
      intlDescription: {
        id: `${PLUGIN_ID}.filtered-articles.description`,
        defaultMessage: 'Filtered Articles',
      },
      icon: PluginIcon,
      components: {
        Input: async (): Promise<{ default: ComponentType }> =>
          import('./components/FilteredArticles').then((mod) => ({
            default: mod.default as ComponentType,
          })),
      },
      options: {},
    });
  },

  registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = (await import(`./translations/${locale}.json`)) as {
            default: Record<string, string>;
          };

          const newData: Record<string, string> = {};
          const keys = Object.keys(data);

          for (const key of keys) {
            newData[getTranslation(key)] = data[key];
          }

          return { data: newData, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};

export default plugin;
