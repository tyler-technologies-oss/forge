import type { StorybookConfig } from '@storybook/web-components-vite';
import remarkGfm from 'remark-gfm';
import tsconfigPaths from 'vite-tsconfig-paths';
import ViteInlineForgeHtml from '../plugins/vite/vite-inline-forge-html';
import ViteTransformForgeInlineStyleImports from '../plugins/vite/vite-inline-forge-style-import';

const config: StorybookConfig = {
  stories: [
    '../src/stories/**/*.mdx',
    '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    'storybook-dark-mode',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    'storybook-addon-tag-badges',
    './addons/google-analytics/register.js',
  ],
  staticDirs: ['../src/stories/assets'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  core: {
    disableTelemetry: true
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      plugins: [
        tsconfigPaths(),
        ViteInlineForgeHtml,
        ViteTransformForgeInlineStyleImports,
      ]
    });
  },
};
export default config;
