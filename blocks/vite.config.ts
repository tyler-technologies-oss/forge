import { defineConfig, type Plugin, type ViteDevServer } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';
import type { IncomingMessage, ServerResponse } from 'http';
import Handlebars from 'handlebars';
import { parseBlockMetadata, type Block } from './src/scripts/block-metadata.js';

const CATEGORIES = ['forms', 'tables', 'pages', 'patterns', 'full-app-layouts'] as const;
const LAYOUT_PATH = path.resolve(process.cwd(), 'src/includes/base.html');

async function getBlocks(): Promise<Block[]> {
  const blocks: Block[] = [];
  const htmlFiles = await glob('src/blocks/**/*.html', {
    cwd: process.cwd()
  });

  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const metadata = parseBlockMetadata(content, file);
    if (metadata) {
      const id = file.replace('.html', '');
      blocks.push({
        id,
        name: metadata.name,
        description: metadata.description,
        tags: metadata.tags,
        file
      });
    }
  }

  return blocks;
}

interface BlockTemplate {
  title: string;
  bodyClass: string;
  body: string;
}

const BLOCK_TITLE_REGEX = /@block\s+(.+?)(?=\s*@|\s*-->)/;
const BODY_REGEX = /<body([^>]*)>([\s\S]*)<\/body>/;
const CLASS_REGEX = /class="([^"]*)"/;

function parseBlockTemplate(content: string, filePath: string): BlockTemplate | null {
  const titleMatch = content.match(BLOCK_TITLE_REGEX);
  const bodyMatch = content.match(BODY_REGEX);

  if (!titleMatch || !bodyMatch) {
    return null;
  }

  const bodyAttrs = bodyMatch[1] || '';
  const classMatch = bodyAttrs.match(CLASS_REGEX);

  return {
    title: titleMatch[1].trim(),
    bodyClass: classMatch ? classMatch[1] : '',
    body: bodyMatch[2].trim()
  };
}

function compileBlockWithLayout(content: string, filePath: string): string {
  const blockTemplate = parseBlockTemplate(content, filePath);
  if (!blockTemplate) {
    return content;
  }

  const layoutContent = fs.readFileSync(LAYOUT_PATH, 'utf-8');
  const template = Handlebars.compile(layoutContent);

  const metadataMatch = content.match(/<!--[\s\S]*?-->/);
  const metadata = metadataMatch ? metadataMatch[0] + '\n' : '';

  return metadata + template(blockTemplate);
}

function generateIndexHtml(blocks: Block[]): string {
  const blocksByCategory: Record<string, Block[]> = {};
  for (const category of CATEGORIES) {
    blocksByCategory[category] = blocks.filter(b => b.file.startsWith(`src/blocks/${category}/`));
  }

  const categoryHtml = CATEGORIES.map(category => {
    const categoryBlocks = blocksByCategory[category];
    if (categoryBlocks.length === 0) {
      return '';
    }

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
        <h2>${category}</h2>
        <ul>${blockListHtml}</ul>
      </section>
    `;
  }).join('\n');

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
      text-transform: capitalize;
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
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (req.url === '/' || req.url === '/index.html') {
          const blocks = await getBlocks();
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
        return compileBlockWithLayout(html, ctx.filename);
      }
    },
    async writeBundle() {
      const blocks = await getBlocks();

      // Write manifest.json
      const manifest = { blocks };
      fs.writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, 2));

      // Write index.html
      const indexHtml = generateIndexHtml(blocks);
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
