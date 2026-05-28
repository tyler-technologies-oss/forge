/**
 * Vite plugin for the Forge Blocks development server.
 * Handles block compilation, partial injection, and manifest generation during builds.
 */

import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';
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
        // Rewrite /blocks/ to /src/blocks/ for dev server
        if (req.url?.startsWith('/blocks/')) {
          req.url = '/src' + req.url;
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

      // Move files from dist/src/ to dist/
      // Vite preserves source directory structure, so we need to relocate
      if (fs.existsSync('dist/src')) {
        // Move index.html to dist root and fix asset paths
        if (fs.existsSync('dist/src/index.html')) {
          let html = fs.readFileSync('dist/src/index.html', 'utf-8');
          // Fix paths: ../assets/ -> ./assets/ since index.html moves up one level
          html = html.replace(/\.\.\/assets\//g, './assets/');
          fs.writeFileSync('dist/index.html', html);
        }

        // Copy all block HTML files to dist/blocks/
        const blockHtmlFiles = await glob('dist/src/blocks/**/*.html', { nodir: true });
        for (const file of blockHtmlFiles) {
          const destPath = file.replace('dist/src/', 'dist/');
          const destDir = path.dirname(destPath);
          fs.mkdirSync(destDir, { recursive: true });
          fs.copyFileSync(file, destPath);
        }

        // Remove the dist/src directory
        fs.rmSync('dist/src', { recursive: true, force: true });
      }

      // Copy screenshots to dist/blocks/ alongside their HTML files
      const screenshots = await glob(`${blocksPath}/**/*.{webp,png}`, { nodir: true });
      for (const screenshot of screenshots) {
        // Strip src/ prefix so screenshots go to dist/blocks/ not dist/src/blocks/
        const relativePath = path.relative('.', screenshot).replace(/^src\//, '');
        const destPath = path.join('dist', relativePath);
        const destDir = path.dirname(destPath);
        fs.mkdirSync(destDir, { recursive: true });
        fs.copyFileSync(screenshot, destPath);
      }
    }
  };
}
