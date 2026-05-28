/**
 * Vite plugin for the Forge Blocks development server.
 * Handles block compilation, partial injection, and manifest generation during builds.
 */

import fs from 'node:fs';
import { compileBlock } from './block-compiler.js';
import { createPartialRegistry } from './partial-registry.js';
import { discoverBlocks, generateManifest } from './generate-manifest.js';
import { discoverCategories } from './utils.js';
import type { Plugin, ViteDevServer } from 'vite';
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
      server.watcher.on('change', filePath => {
        if (filePath.includes('partials') && filePath.endsWith('.hbs')) {
          partialRegistry.load();
          server.ws.send({ type: 'full-reload' });
        }
        if (filePath === indexPath) {
          server.ws.send({ type: 'full-reload' });
        }
      });

      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
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
        next();
      });
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        if (ctx.filename.includes('/src/includes/')) {
          return html;
        }

        partialRegistry.load();

        const result = compileBlock(html, {
          layoutPath,
          partialRegistry
        });

        if (!result.success && result.error) {
          console.warn(`Block compilation warning: ${result.error}`);
        }

        return result.html;
      }
    },
    async writeBundle() {
      await generateManifest({
        blocksPath,
        outputPath: 'dist/manifest.json',
        silent: true
      });

      // Copy index.html to dist root (Vite outputs it to dist/src/index.html)
      if (fs.existsSync('dist/src/index.html')) {
        fs.copyFileSync('dist/src/index.html', 'dist/index.html');
      }
    }
  };
}
