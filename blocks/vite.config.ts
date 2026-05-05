import { defineConfig, type Plugin, type ViteDevServer } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';
import type { IncomingMessage, ServerResponse } from 'http';

const CATEGORIES = ['layouts', 'forms', 'tables', 'pages', 'patterns', 'full-app-layouts'] as const;

const METADATA_REGEX = /<!--\s*(@block\s+.+?)\s*(@description\s+.+?)?\s*(@tags\s+.+?)?\s*-->/s;

interface BlockMetadata {
  name: string;
  description: string;
  tags: string[];
}

interface Block extends BlockMetadata {
  id: string;
  file: string;
}

function parseBlockMetadata(content: string, filePath: string): BlockMetadata | null {
  const match = content.match(METADATA_REGEX);
  if (!match) {
    return null;
  }

  const blockMatch = match[1]?.match(/@block\s+(.+)/);
  const descMatch = match[2]?.match(/@description\s+(.+)/);
  const tagsMatch = match[3]?.match(/@tags\s+(.+)/);

  const name = blockMatch?.[1]?.trim() || path.basename(filePath, '.html');
  const description = descMatch?.[1]?.trim() || '';
  const tags = tagsMatch?.[1]?.split(',').map(t => t.trim()).filter(Boolean) || [];

  return { name, description, tags };
}

async function getBlocks(): Promise<Block[]> {
  const blocks: Block[] = [];
  const htmlFiles = await glob('**/*.html', {
    cwd: process.cwd(),
    ignore: ['node_modules/**', 'dist/**', 'index.html']
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

function generateIndexHtml(blocks: Block[]): string {
  const blocksByCategory: Record<string, Block[]> = {};
  for (const category of CATEGORIES) {
    blocksByCategory[category] = blocks.filter(b => b.file.startsWith(category + '/'));
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
        glob.sync('**/*.html', {
          ignore: ['node_modules/**', 'dist/**', 'index.html']
        }).map(file => [file.replace('.html', ''), path.resolve(process.cwd(), file)])
      )
    }
  }
});
