import type { Block } from './block-metadata.js';
import type { Category } from './category-discovery.js';

export interface IndexGeneratorOptions {
  title?: string;
}

export function formatCategoryName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function generateIndexHtml(
  blocks: Block[],
  categories: Category[],
  options: IndexGeneratorOptions = {}
): string {
  const { title = 'Forge Blocks' } = options;

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
  <title>${title}</title>
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
  <h1>${title}</h1>
  ${categoryHtml}
</body>
</html>`;
}
