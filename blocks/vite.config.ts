import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { glob } from 'glob';
import path from 'path';

import { blocksPlugin } from './src/scripts/vite-plugin.js';

export default defineConfig({
  plugins: [
    tailwindcss(),
    blocksPlugin({
      blocksPath: path.resolve(process.cwd(), 'src/blocks'),
      layoutPath: path.resolve(process.cwd(), 'src/includes/base.html'),
      partialsPath: path.resolve(process.cwd(), 'src/partials')
    })
  ],
  resolve: {
    conditions: ['import', 'module', 'browser', 'default']
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['node_modules']
      }
    }
  },
  optimizeDeps: {
    exclude: ['@tylertech/forge-extended']
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: Object.fromEntries(
        glob.sync('src/blocks/**/*.html').map(file => [
          file.replace('.html', ''),
          path.resolve(process.cwd(), file)
        ])
      )
    }
  }
});
