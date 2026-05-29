/**
 * Vite plugin for the Forge Blocks development server.
 * Handles block compilation, partial injection, and manifest generation during builds.
 *
 * ## Build Output Structure
 *
 * The desired production output structure is:
 *   dist/
 *   ├── index.html          # Main gallery page
 *   ├── manifest.json       # Block metadata
 *   ├── assets/             # Bundled JS/CSS with hashed names
 *   └── blocks/             # All block HTML files and screenshots
 *       └── [category]/[name]/[name].html
 *
 * However, Vite preserves the source directory structure during builds, which means
 * files from src/ end up in dist/src/. This plugin's writeBundle hook relocates files
 * to achieve the cleaner URL structure (e.g., /blocks/forms/login instead of /src/blocks/forms/login).
 *
 * ## Asset Path Corrections
 *
 * When relocating HTML files, their relative asset paths must be adjusted:
 * - index.html moves from dist/src/ to dist/, so ../assets/ becomes ./assets/
 * - Block files move from dist/src/blocks/ to dist/blocks/, reducing depth by one level,
 *   so asset paths like ../../../../assets/ become ../../../assets/
 *
 * ## Dev Server URL Rewriting
 *
 * In development, source files remain in src/blocks/, but we want URLs to match production
 * (i.e., /blocks/... not /src/blocks/...). The configureServer middleware rewrites
 * /blocks/* requests to /src/blocks/* so the same URLs work in both environments.
 */

import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';
import { compileBlock } from './block-compiler.js';
import { createPartialRegistry } from './partial-registry.js';
import { discoverBlocks, generateManifest } from './generate-manifest.js';
import { discoverCategories } from './utils.js';
import type { Plugin, ViteDevServer, IndexHtmlTransformContext } from 'vite';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { NextFunction } from 'connect';
import type { PartialRegistry } from './partial-registry.js';

/** Output directory paths used during build */
const DIST_DIR = 'dist' as const;
const DIST_SRC_DIR = 'dist/src' as const;
const DIST_INDEX_PATH = 'dist/index.html' as const;
const DIST_SRC_INDEX_PATH = 'dist/src/index.html' as const;
const DIST_SRC_BLOCKS_GLOB = 'dist/src/blocks/**/*.html' as const;

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

      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: NextFunction): Promise<void> => {
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
        // Dev server URL rewriting: /blocks/* -> /src/blocks/*
        // In dev, source files are in src/blocks/, but we want URLs to match production
        // structure where blocks are served from /blocks/ directly. This rewrite allows
        // the same URLs to work in both dev and production environments.
        if (req.url?.startsWith('/blocks/')) {
          req.url = '/src' + req.url;
        }
        next();
      });
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html: string, ctx: IndexHtmlTransformContext): string {
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
    async writeBundle(): Promise<void> {
      await generateManifest({
        blocksPath,
        outputPath: `${DIST_DIR}/manifest.json`,
        silent: true
      });

      // ============================================================================
      // Relocate files from dist/src/ to dist/
      // ============================================================================
      // Vite preserves source directory structure during builds, outputting files to
      // dist/src/. We relocate them to dist/ for cleaner production URLs:
      //   - dist/src/index.html -> dist/index.html
      //   - dist/src/blocks/**  -> dist/blocks/**
      //
      // This allows URLs like /blocks/forms/login instead of /src/blocks/forms/login.
      // ============================================================================
      if (fs.existsSync(DIST_SRC_DIR)) {
        // Relocate index.html from dist/src/ to dist/
        // Asset paths change: ../assets/ -> ./assets/ (moving up one directory level)
        if (fs.existsSync(DIST_SRC_INDEX_PATH)) {
          const html: string = fs.readFileSync(DIST_SRC_INDEX_PATH, 'utf-8');
          const fixedHtml: string = html.replace(/\.\.\/assets\//g, './assets/');
          fs.writeFileSync(DIST_INDEX_PATH, fixedHtml);
        }

        // Relocate block HTML files from dist/src/blocks/ to dist/blocks/
        // Asset paths change: blocks move up one level, so we remove one ../
        // Example: dist/src/blocks/forms/login/login.html -> dist/blocks/forms/login/login.html
        //   Before: ../../../../assets/ (4 levels up from src/blocks/category/name/)
        //   After:  ../../../assets/    (3 levels up from blocks/category/name/)
        const blockHtmlFiles: string[] = await glob(DIST_SRC_BLOCKS_GLOB, { nodir: true });
        for (const file of blockHtmlFiles) {
          const destPath: string = file.replace('dist/src/', 'dist/');
          const destDir: string = path.dirname(destPath);
          fs.mkdirSync(destDir, { recursive: true });

          const html: string = fs.readFileSync(file, 'utf-8');
          // Handle both 5-level and 4-level deep paths (categories may vary in depth)
          const fixedHtml: string = html
            .replace(/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/assets\//g, '../../../../assets/')
            .replace(/\.\.\/\.\.\/\.\.\/\.\.\/assets\//g, '../../../assets/');
          fs.writeFileSync(destPath, fixedHtml);
        }

        // Clean up the now-empty dist/src directory
        fs.rmSync(DIST_SRC_DIR, { recursive: true, force: true });
      }

      // ============================================================================
      // Copy screenshot images to dist/blocks/
      // ============================================================================
      // Screenshots are not processed by Vite's build pipeline, so we manually copy
      // them from src/blocks/ to dist/blocks/ to sit alongside their HTML files.
      // This enables the gallery to display block previews.
      // ============================================================================
      const screenshots: string[] = await glob(`${blocksPath}/**/*.{webp,png}`, { nodir: true });
      for (const screenshot of screenshots) {
        // Convert src/blocks/category/name/name.webp -> dist/blocks/category/name/name.webp
        const relativePath: string = path.relative('.', screenshot).replace(/^src\//, '');
        const destPath: string = path.join(DIST_DIR, relativePath);
        const destDir: string = path.dirname(destPath);
        fs.mkdirSync(destDir, { recursive: true });
        fs.copyFileSync(screenshot, destPath);
      }
    }
  };
}
