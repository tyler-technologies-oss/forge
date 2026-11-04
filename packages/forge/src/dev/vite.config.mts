import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import ViteFullReload from 'vite-plugin-full-reload';
import ViteForgeBlocks from '../../plugins/vite/vite-forge-blocks.ts';
import ViteInlineForgeHtml from '../../plugins/vite/vite-inline-forge-html.ts';
import ViteTransformForgeInlineStyleImports from '../../plugins/vite/vite-inline-forge-style-import.ts';

const repoPath = (path: string): string => fileURLToPath(new URL(`../../../../${path}`, import.meta.url));

export default defineConfig({
  server: {
    open: true,
    strictPort: false,
    port: 3450
  },
  resolve: {
    tsconfigPaths: true
  },
  plugins: [
    tailwindcss(),
    ViteForgeBlocks({
      componentsPath: repoPath('blocks/src/blocks/components'),
      docsComponentsPath: repoPath('docs/src/content/components'),
      frameEntry: '/src/block-frame.ts'
    }),
    ViteInlineForgeHtml,
    ViteTransformForgeInlineStyleImports,
    ViteEjsPlugin({
      site: {
        title: 'Tyler Forge™ Dev'
      }
    }),
    ViteFullReload(['./**/*.ejs'])
  ]
});
