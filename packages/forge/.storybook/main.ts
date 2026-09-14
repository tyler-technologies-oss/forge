import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import type { StorybookConfig } from '@storybook/web-components-vite';
import remarkGfm from 'remark-gfm';
import tailwindcss from '@tailwindcss/vite';
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
      plugins: [tailwindcss(), tsconfigPaths(), ViteInlineForgeHtml, ViteTransformForgeInlineStyleImports],
      resolve: {
        alias: [
          // The rich text editor ships as its own package. forge cannot take a dependency on it -
          // that package depends on forge, and turbo rejects the resulting cycle - so its stories
          // resolve through an alias instead. They point at the built `esm/` output rather than
          // source so rollup has already inlined the component SCSS, which otherwise needs the
          // custom `@tylertech/forge/sass/*` importer that package's own vitest config provides.
          // The `storybook` turbo tasks depend on that package's build for this reason.
          {
            find: '@tylertech/forge-rich-text-editor/features',
            replacement: fileURLToPath(new URL('../../forge-rich-text-editor/esm/features/index.js', import.meta.url))
          },
          {
            find: '@tylertech/forge-rich-text-editor',
            replacement: fileURLToPath(new URL('../../forge-rich-text-editor/esm/index.js', import.meta.url))
          }
        ]
      }
    });
  }
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
