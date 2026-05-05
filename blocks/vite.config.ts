import { defineConfig, type Plugin, type ViteDevServer } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';
import type { IncomingMessage, ServerResponse } from 'http';

import { compileBlock } from './src/scripts/block-compiler.js';
import { createPartialRegistry } from './src/scripts/partial-registry.js';
import { discoverCategories, formatCategoryName } from './src/scripts/category-discovery.js';
import { discoverBlocks, generateManifest } from './src/scripts/generate-manifest.js';
import type { Block } from './src/scripts/block-metadata.js';

const BLOCKS_PATH = path.resolve(process.cwd(), 'src/blocks');
const LAYOUT_PATH = path.resolve(process.cwd(), 'src/includes/base.html');
const PARTIALS_PATH = path.resolve(process.cwd(), 'src/partials');

const partialRegistry = createPartialRegistry({ partialsPath: PARTIALS_PATH });
partialRegistry.load();

function generateIndexHtml(blocks: Block[]): string {
  const categories = discoverCategories(BLOCKS_PATH);

  const blocksByCategory: Record<string, Block[]> = {};
  for (const category of categories) {
    blocksByCategory[category.name] = blocks.filter(b =>
      b.file.startsWith(`src/blocks/${category.name}/`)
    );
  }

  const categoryHtml = categories
    .filter(category => blocksByCategory[category.name]?.length > 0)
    .map(category => {
      const categoryBlocks = blocksByCategory[category.name];
      const blockListHtml = categoryBlocks
        .map(block => `
        <li>
          <a href="/${block.file}">${block.name}</a>
          ${block.description ? `<p>${block.description}</p>` : ''}
        </li>
      `)
        .join('\n');

      return `
      <section>
        <h2>${formatCategoryName(category.name)}</h2>
        <ul>${blockListHtml}</ul>
      </section>
    `;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Forge Blocks</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    h1 { margin-bottom: 2rem; }
    h2 {
      border-bottom: 1px solid #ddd;
      padding-bottom: 0.5rem;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      margin-bottom: 1rem;
    }
    a {
      color: #0066cc;
      text-decoration: none;
      font-weight: 500;
    }
    a:hover {
      text-decoration: underline;
    }
    p {
      margin: 0.25rem 0 0 0;
      color: #666;
      font-size: 0.9rem;
    }
    section {
      margin-bottom: 2rem;
    }
  </style>
</head>
<body>
  <h1>Forge Blocks</h1>
  ${categoryHtml}
</body>
</html>`;
}

function blocksPlugin(): Plugin {
  return {
    name: 'forge-blocks',
    configureServer(server: ViteDevServer) {
      server.watcher.add(PARTIALS_PATH);
      server.watcher.on('change', filePath => {
        if (filePath.includes('partials') && filePath.endsWith('.hbs')) {
          partialRegistry.load();
          server.ws.send({ type: 'full-reload' });
        }
      });

      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (req.url === '/' || req.url === '/index.html') {
          const blocks = await discoverBlocks(BLOCKS_PATH);
          const html = generateIndexHtml(blocks);
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
          layoutPath: LAYOUT_PATH,
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
        blocksPath: BLOCKS_PATH,
        outputPath: 'dist/manifest.json',
        silent: true
      });

      const indexHtml = generateIndexHtml(manifest.blocks);
      fs.writeFileSync('dist/index.html', indexHtml);
    }
  };
}

export default defineConfig({
  plugins: [tailwindcss(), blocksPlugin()],
  resolve: {
    conditions: ['import', 'module', 'browser', 'default']
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: Object.fromEntries(
        glob.sync('src/blocks/**/*.html').map(file => [
          file.replace('.html', ''),
          path.resolve(process.cwd(), file)
        ])
      )
    }
  }
});
