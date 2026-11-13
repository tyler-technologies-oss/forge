import { resolve } from 'path';
import { readFileSync } from 'fs';
import { defineConfig } from 'vite';
import { globSync } from 'glob';
import dts from 'vite-plugin-dts';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const dependencies = Object.keys(pkg.dependencies ?? {});

export default defineConfig({
  build: {
    lib: {
      entry: globSync(resolve('src/lib/**/index.ts')),
      formats: ['es']
    },
    outDir: 'dist',
    minify: false,
    rollupOptions: {
      external: id => dependencies.some(dep => id === dep || id.startsWith(`${dep}/`)),
      output: {
        dir: 'dist',
        entryFileNames: '[name].mjs',
        preserveModules: true,
        preserveModulesRoot: 'src/lib'
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['node_modules']
      }
    }
  },
  plugins: [
    dts({
      outDirs: 'dist',
      include: ['src/lib'],
      exclude: ['node_modules/**', '**/*.test.ts'],
      compilerOptions: {
        rootDir: './src/lib'
      },
      staticImport: true
    })
  ]
});
