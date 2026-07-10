import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

import { blocksPlugin } from './src/scripts/vite-plugin.js';
import { discoverBlockScripts } from './src/scripts/utils.js';

const blocksRoot = path.resolve(process.cwd(), 'src/blocks');
const blockScriptInputs = Object.fromEntries(
  discoverBlockScripts(blocksRoot).map(({ id, scriptPath }) => [id, scriptPath])
);

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    blocksPlugin({
      blocksPath: path.resolve(process.cwd(), 'src/blocks'),
      layoutPath: path.resolve(process.cwd(), 'src/includes/base.html'),
      partialsPath: path.resolve(process.cwd(), 'src/partials'),
      indexPath: path.resolve(process.cwd(), 'src/index.html')
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
    emptyOutDir: false,
    rollupOptions: {
      input: {
        'forge-register': path.resolve(process.cwd(), 'forge-register.ts'),
        'ready-transition': path.resolve(process.cwd(), 'ready-transition.ts'),
        'theme-listener': path.resolve(process.cwd(), 'theme-listener.ts'),
        'theme': path.resolve(process.cwd(), 'theme.css'),
        'styles': path.resolve(process.cwd(), 'styles.css'),
        ...blockScriptInputs
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
});
