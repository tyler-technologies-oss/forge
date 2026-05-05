import fs from 'fs';
import type { Plugin, ViteDevServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';

import { compileBlock } from './block-compiler.js';
import { createPartialRegistry, type PartialRegistry } from './partial-registry.js';
import { discoverCategories } from './category-discovery.js';
import { discoverBlocks, generateManifest } from './generate-manifest.js';
import { generateIndexHtml } from './index-generator.js';

export interface BlocksPluginOptions {
  blocksPath: string;
  layoutPath: string;
  partialsPath: string;
}

export function blocksPlugin(options: BlocksPluginOptions): Plugin {
  const { blocksPath, layoutPath, partialsPath } = options;

  const partialRegistry: PartialRegistry = createPartialRegistry({ partialsPath });
  partialRegistry.load();

  return {
    name: 'forge-blocks',
    configureServer(server: ViteDevServer) {
      server.watcher.add(partialsPath);
      server.watcher.on('change', filePath => {
        if (filePath.includes('partials') && filePath.endsWith('.hbs')) {
          partialRegistry.load();
          server.ws.send({ type: 'full-reload' });
        }
      });

      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (req.url === '/' || req.url === '/index.html') {
          const blocks = await discoverBlocks(blocksPath);
          const categories = discoverCategories(blocksPath);
          const html = generateIndexHtml(blocks, categories);
          res.setHeader('Content-Type', 'text/html');
          res.end(html);
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
      const indexHtml = generateIndexHtml(manifest.blocks, categories);
      fs.writeFileSync('dist/index.html', indexHtml);
    }
  };
}
