import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import type { StorybookConfig } from '@storybook/web-components-vite';
import remarkGfm from 'remark-gfm';
import tsconfigPaths from 'vite-tsconfig-paths';
import ViteInlineForgeHtml from '../plugins/vite/vite-inline-forge-html.ts';
import ViteTransformForgeInlineStyleImports from '../plugins/vite/vite-inline-forge-style-import.ts';

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@vueless/storybook-dark-mode'),
    {
      name: getAbsolutePath('@storybook/addon-docs'),
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm]
          }
        }
      }
    },
    getAbsolutePath('storybook-addon-tag-badges'),
    getAbsolutePath('./addons/google-analytics/register.js')
  ],
  staticDirs: ['../src/stories/assets'],
  framework: {
    name: getAbsolutePath('@storybook/web-components-vite'),
    options: {}
  },
  core: {
    disableTelemetry: true
  },
  async viteFinal(configuration) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(configuration, {
      plugins: [tsconfigPaths(), ViteInlineForgeHtml, ViteTransformForgeInlineStyleImports]
    });
  }
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
