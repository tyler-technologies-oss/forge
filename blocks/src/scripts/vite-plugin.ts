/**
 * Vite plugin for Forge Blocks development server.
 * Handles on-the-fly block compilation with handlebars during development.
 * Production builds use a standalone build script (build-blocks.ts).
 *
 * ## Dev Server Features
 * - Compiles blocks with handlebars + base.html layout
 * - Serves dynamic manifest.json endpoint
 * - Rewrites /blocks/* URLs to /src/blocks/*
 * - Watches partials and triggers reloads
 */

import fs from 'node:fs';
import { compileBlock } from './block-compiler.js';
import { createPartialRegistry } from './partial-registry.js';
import { discoverBlocks } from './generate-manifest.js';
import { discoverCategories } from './utils.js';
import type { Plugin, ViteDevServer, IndexHtmlTransformContext } from 'vite';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { PartialRegistry } from './partial-registry.js';

export interface BlocksPluginOptions {
  blocksPath: string;
  layoutPath: string;
  partialsPath: string;
  indexPath: string;
}

/**
 * Creates the Vite plugin for serving and building Forge blocks.
 */
export function blocksPlugin(options: BlocksPluginOptions): Plugin {
  const { blocksPath, layoutPath, partialsPath, indexPath } = options;

  const partialRegistry: PartialRegistry = createPartialRegistry({ partialsPath });
  partialRegistry.load();

  return {
    name: 'forge-blocks',
    configureServer(server: ViteDevServer) {
      server.watcher.add(partialsPath);
      server.watcher.add(indexPath);
      server.watcher.on('change', (filePath: string): void => {
        if (filePath.includes('partials') && filePath.endsWith('.hbs')) {
          partialRegistry.load();
          server.ws.send({ type: 'full-reload' });
        }
        if (filePath === indexPath) {
          server.ws.send({ type: 'full-reload' });
        }
      });

      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void): Promise<void> => {
        if (req.url === '/manifest.json') {
          const blocks = await discoverBlocks(blocksPath);
          const categories = discoverCategories(blocksPath);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ blocks, categories }));
          return;
        }
        if (req.url === '/' || req.url === '/index.html') {
          const html = fs.readFileSync(indexPath, 'utf-8');
          const transformed = await server.transformIndexHtml(req.url, html);
          res.setHeader('Content-Type', 'text/html');
          res.end(transformed);
          return;
        }
        // Dev server URL rewriting for block HTML files
        // Pattern: /<category>/<name>/<name>.html -> /src/blocks/<category>/<name>/<name>.html
        // This allows dev URLs to match production structure (no /blocks/ prefix)
        const url = req.url || '';
        const isBlockHtml = /^\/[^/@]+\/[^/]+\/[^/]+\.html$/.test(url);
        if (isBlockHtml && !url.includes('/src/blocks/')) {
          req.url = '/src/blocks' + req.url;
        }
        next();
      });
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html: string, ctx: IndexHtmlTransformContext): string {
        if (ctx.filename.includes('/src/includes/') || ctx.filename === indexPath) {
          return html;
        }

        partialRegistry.load();

        const result = compileBlock(html, {
          layoutPath,
          partialRegistry,
          baseHref: '/'
        });

        if (!result.success && result.error) {
          console.warn(`Block compilation warning: ${result.error}`);
        }

        return result.html;
      }
    }
  };
}
