// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CODE_THEMES } from './src/config/code-themes.ts';
import { LEGACY_REDIRECTS } from './src/config/redirects.ts';

const PAGEFIND_DIR = fileURLToPath(new URL('./dist/pagefind/', import.meta.url));
const PAGEFIND_ROUTE = '/pagefind/';
/** @type {Record<string, string>} */
const PAGEFIND_CONTENT_TYPES = { '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css' };

/**
 * @typedef {(req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse, next: () => void) => Promise<void>} PagefindMiddleware
 */

/**
 * Serves the last build's Pagefind index under `astro dev`, so site search
 * works locally once `pnpm --filter forge-docs build` has run.
 * @returns {NonNullable<import('astro').ViteUserConfig['plugins']>[number]}
 */
function pagefindDevIndex() {
  return {
    name: 'forge-docs:pagefind-dev-index',
    apply: 'serve',
    /** @param {{ middlewares: { use: (handler: PagefindMiddleware) => void } }} server */
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const { pathname } = new URL(req.url ?? '/', 'http://localhost');
        if (!pathname.startsWith(PAGEFIND_ROUTE)) {
          return next();
        }

        const filePath = path.join(PAGEFIND_DIR, decodeURIComponent(pathname.slice(PAGEFIND_ROUTE.length)));
        if (!filePath.startsWith(PAGEFIND_DIR)) {
          return next();
        }

        try {
          const body = await readFile(filePath);
          res.setHeader('Content-Type', PAGEFIND_CONTENT_TYPES[path.extname(filePath)] ?? 'application/octet-stream');
          res.setHeader('Cache-Control', 'no-store');
          res.end(body);
        } catch {
          next();
        }
      });
    }
  };
}

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), svelte()],
  site: 'https://tylerforge.design',
  base: '/',
  trailingSlash: 'always',
  redirects: LEGACY_REDIRECTS,

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

    plugins: [tailwindcss(), pagefindDevIndex()]
  }
});
