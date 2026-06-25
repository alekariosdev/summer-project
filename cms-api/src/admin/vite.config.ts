import path from 'node:path';

import { mergeConfig, type UserConfig } from 'vite';

const SINGLETON_PACKAGES = [
  'react',
  'react-dom',
  'react-router-dom',
  'styled-components',
] as const;

const cmsRoot = path.resolve(__dirname, '../..');

export default (config: UserConfig) => {
  const esbuildOptions = {
    supported: {
      destructuring: true,
    },
  };

  const singletonAliases = Object.fromEntries(
    SINGLETON_PACKAGES.map((pkg) => [pkg, path.join(cmsRoot, 'node_modules', pkg)])
  );

  return mergeConfig(config, {
    resolve: {
      alias: singletonAliases,
      dedupe: [...SINGLETON_PACKAGES],
    },
    server: {
      allowedHosts: true,
    },
    esbuild: esbuildOptions,
    optimizeDeps: {
      esbuildOptions,
      include: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-router-dom',
        'styled-components',
        '@strapi/design-system',
        '@strapi/icons',
        '@strapi/strapi/admin',
        '@strapi/plugin-cloud/strapi-admin',
        '@strapi/plugin-users-permissions/strapi-admin',
      ],
    },
  });
};
