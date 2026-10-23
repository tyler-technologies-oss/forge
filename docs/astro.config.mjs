// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';
import { CODE_THEMES } from './src/config/code-themes.ts';

// https://astro.build/config
export default defineConfig({
  integrations: [
    // Astro 6 leaves the deprecated `markdown.gfm` undefined, which @astrojs/mdx treats as disabled.
    // Register remark-gfm explicitly so MDX pipe tables (rendered via Table.astro) are parsed.
    mdx({ remarkPlugins: [remarkGfm] }),
    svelte()
  ],
  site: 'https://tylerforge.design',
  base: '/',
  trailingSlash: 'always',

  // Match the theme used by the <Code> component (see Example.astro) so
  // fenced code blocks and component-rendered snippets look consistent.
  markdown: {
    shikiConfig: {
      themes: CODE_THEMES
    }
  },

  // Build configuration
  build: {
    // Inline stylesheets for performance
    inlineStylesheets: 'auto'
  },

  // Vite configuration for Forge web components
  vite: {
    resolve: {
      // Forge's "development" export condition points at TypeScript sources that import .html templates,
      // which Vite's esbuild dependency scan can't load. Resolve the built output instead.
      conditions: ['module', 'browser']
    },

    ssr: {
      // Externalize Forge packages during SSR since they're client-side only
      noExternal: [],
      resolve: {
        conditions: ['module', 'node']
      }
    },

    optimizeDeps: {
      // Pages import Forge via subpaths (e.g. `@tylertech/forge/button`). Pre-bundling the package root would create
      // a second copy of every component and re-register custom elements, so serve Forge as plain ESM instead.
      exclude: ['@tylertech/forge']
    },

    css: {
      preprocessorOptions: {
        scss: {
          // Forge's package.json "exports" doesn't expose "./sass/*", so bare
          // `@use "@tylertech/forge/sass/..."` specifiers fail Node-style
          // package resolution. Load paths bypass that — Sass just searches
          // these directories on disk instead of resolving through "exports".
          loadPaths: ['node_modules']
        }
      }
    },

    plugins: [tailwindcss()]
  }
});
