// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), svelte()],
  site: 'https://crispy-doodle-rwrz2ny.pages.github.io',
  base: '/',
  trailingSlash: 'always',

  // Match the theme used by the <Code> component (see Example.astro) so
  // fenced code blocks and component-rendered snippets look consistent.
  markdown: {
    shikiConfig: {
      theme: 'one-light',
    },
  },

  // Build configuration
  build: {
    // Inline stylesheets for performance
    inlineStylesheets: 'auto',
  },

  // Vite configuration for Forge web components
  vite: {
    resolve: {
      // Forge's "development" export condition points at TypeScript sources that import .html templates,
      // which Vite's esbuild dependency scan can't load. Resolve the built output instead.
      conditions: ['module', 'browser'],
    },

    ssr: {
      // Externalize Forge packages during SSR since they're client-side only
      noExternal: [],
      resolve: {
        conditions: ['module', 'node'],
      },
    },

    optimizeDeps: {
      // Pages import Forge via subpaths (e.g. `@tylertech/forge/button`). Pre-bundling the package root would create
      // a second copy of every component and re-register custom elements, so serve Forge as plain ESM instead.
      exclude: ['@tylertech/forge'],
    },

    css: {
      preprocessorOptions: {
        scss: {
          // Forge's package.json "exports" doesn't expose "./sass/*", so bare
          // `@use "@tylertech/forge/sass/..."` specifiers fail Node-style
          // package resolution. Load paths bypass that — Sass just searches
          // these directories on disk instead of resolving through "exports".
          loadPaths: ['node_modules'],
        },
      },
    },

    plugins: [tailwindcss()],
  },
});