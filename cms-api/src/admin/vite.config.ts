import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  const esbuildOptions = {
    supported: {
      destructuring: true,
    },
  };

  return mergeConfig(config, {
    esbuild: esbuildOptions,
    optimizeDeps: {
      esbuildOptions,
    },
  });
};
