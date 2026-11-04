import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const root = import.meta.dirname;
const packageRoot = resolve(root, '..');

export default defineConfig({
  root,
  base: './',
  server: {
    fs: { allow: [packageRoot] }
  },
  css: {
    preprocessorOptions: {
      scss: { loadPaths: [resolve(packageRoot, 'sass')] }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
