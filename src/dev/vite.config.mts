import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import ViteFullReload from 'vite-plugin-full-reload';
import ViteInlineForgeHtml from '../../plugins/vite/vite-inline-forge-html';
import ViteTransformForgeInlineStyleImports from '../../plugins/vite/vite-inline-forge-style-import';

export default defineConfig({
  server: {
    open: true,
    strictPort: false,
    port: 3450
  },
  plugins: [
    tsconfigPaths(),
    ViteInlineForgeHtml,
    ViteTransformForgeInlineStyleImports,
    ViteEjsPlugin({
      site: {
        title: 'Tyler Forge™ Dev (@next)'
      }
    }),
    ViteFullReload(['./**/*.ejs'])
  ]
});
