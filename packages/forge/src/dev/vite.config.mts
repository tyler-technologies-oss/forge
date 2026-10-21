import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import ViteFullReload from 'vite-plugin-full-reload';
import ViteInlineForgeHtml from '../../plugins/vite/vite-inline-forge-html.ts';
import ViteTransformForgeInlineStyleImports from '../../plugins/vite/vite-inline-forge-style-import.ts';

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
