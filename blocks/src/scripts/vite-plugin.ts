/**
 * Vite plugin for the Forge Blocks development server.
 * Handles block compilation, partial injection, and manifest generation during builds.
 */

import fs from 'node:fs';
import { compileBlock } from './block-compiler.js';
import { createPartialRegistry } from './partial-registry.js';
import { discoverCategories } from './utils.js';
import { discoverBlocks, generateManifest } from './generate-manifest.js';
import type { Plugin, ViteDevServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { PartialRegistry } from './partial-registry.js';

export interface BlocksPluginOptions {
  blocksPath: string;
  layoutPath: string;
  partialsPath: string;
  indexPath: string;
}

function injectBlocksData(html: string, blocksData: object): string {
  const script = `<script>window.__FORGE_BLOCKS_DATA__ = ${JSON.stringify(blocksData)};</script>`;
  return html.replace('</head>', `${script}\n  </head>`);
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
        if (req.url === '/' || req.url === '/index.html') {
          const blocks = await discoverBlocks(blocksPath);
          const categories = discoverCategories(blocksPath);
          let html = fs.readFileSync(indexPath, 'utf-8');
          html = injectBlocksData(html, { blocks, categories });
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
      const manifest = await generateManifest({
        blocksPath,
        outputPath: 'dist/manifest.json',
        silent: true
      });

      const categories = discoverCategories(blocksPath);
      const distIndexPath = 'dist/index.html';
      if (fs.existsSync(distIndexPath)) {
        let indexHtml = fs.readFileSync(distIndexPath, 'utf-8');
        indexHtml = injectBlocksData(indexHtml, { blocks: manifest.blocks, categories });
        fs.writeFileSync(distIndexPath, indexHtml);
      }
    }
  };
}
