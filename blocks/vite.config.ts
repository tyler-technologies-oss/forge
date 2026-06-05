import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'node:fs';

import { blocksPlugin } from './src/scripts/vite-plugin.js';

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    blocksPlugin({
      blocksPath: path.resolve(process.cwd(), 'src/blocks'),
      layoutPath: path.resolve(process.cwd(), 'src/includes/base.html'),
      partialsPath: path.resolve(process.cwd(), 'src/partials'),
      indexPath: path.resolve(process.cwd(), 'src/index.html')
    }),
    {
      name: 'move-index',
      closeBundle() {
        const srcIndex = 'dist/src/index.html';
        const destIndex = 'dist/index.html';
        if (fs.existsSync(srcIndex)) {
          fs.renameSync(srcIndex, destIndex);
          fs.rmSync('dist/src', { recursive: true, force: true });
        }
      }
    }
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
    emptyOutDir: false,
    rollupOptions: {
      input: path.resolve(process.cwd(), 'src/index.html')
    }
  }
});
