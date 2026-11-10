import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import type { StorybookConfig } from '@storybook/web-components-vite';
import remarkGfm from 'remark-gfm';
import { forgeSassImporter } from '../config/forge-sass-importer.ts';

const LIB_DIR = fileURLToPath(new URL('../src/lib', import.meta.url));

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
    }
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
      css: {
        preprocessorOptions: {
          scss: {
            loadPaths: ['node_modules'],
            importers: [forgeSassImporter]
          }
        }
      },
      resolve: {
        alias: [
          // Load components from source so edits apply without rebuilding the package.
          { find: /^@tylertech\/forge-ai$/, replacement: `${LIB_DIR}/index.ts` },
          { find: /^@tylertech\/forge-ai\/(.+)$/, replacement: `${LIB_DIR}/$1/index.ts` }
        ]
      }
    });
  }
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
