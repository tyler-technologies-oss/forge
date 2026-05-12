import { glob } from 'glob';
import fs from 'fs';
import path from 'path';
import { parseBlockMetadata, type Block } from './block-metadata.js';
import { validateBlockContent, formatValidationIssues } from './block-validator.js';

export interface Manifest {
  blocks: Block[];
  categories: string[];
  generatedAt: string;
}

export interface GenerateManifestOptions {
  blocksPath: string;
  outputPath?: string;
  validate?: boolean;
  silent?: boolean;
}

export async function discoverBlocks(blocksPath: string): Promise<Block[]> {
  const blocks: Block[] = [];
  const htmlFiles = await glob('**/*.html', {
    cwd: blocksPath
  });

  for (const file of htmlFiles) {
    const fullPath = path.join(blocksPath, file);
    const content = fs.readFileSync(fullPath, 'utf-8');
    const relativePath = path.join('src/blocks', file);
    const metadata = parseBlockMetadata(content, relativePath);

    if (metadata) {
      const id = relativePath.replace('.html', '');
      blocks.push({
        id,
        name: metadata.name,
        description: metadata.description,
        tags: metadata.tags,
        file: relativePath
      });
    }
  }

  return blocks;
}

export async function generateManifest(options: GenerateManifestOptions): Promise<Manifest> {
  const { blocksPath, outputPath, validate = true, silent = false } = options;

  const blocks = await discoverBlocks(blocksPath);

  if (validate && !silent) {
    const htmlFiles = await glob('**/*.html', { cwd: blocksPath });

    for (const file of htmlFiles) {
      const fullPath = path.join(blocksPath, file);
      const content = fs.readFileSync(fullPath, 'utf-8');
      const result = validateBlockContent(content, file);

      if (result.issues.length > 0) {
        console.warn(formatValidationIssues(result.issues));
      }
    }
  }

  const categories = [...new Set(blocks.map(b => {
    const parts = b.file.split('/');
    return parts.length > 2 ? parts[2] : '';
  }).filter(Boolean))].sort();

  const manifest: Manifest = {
    blocks,
    categories,
    generatedAt: new Date().toISOString()
  };

  if (outputPath) {
    fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
    if (!silent) {
      console.log(`Generated ${outputPath} with ${blocks.length} blocks in ${categories.length} categories`);
    }
  }

  return manifest;
}

const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  generateManifest({
    blocksPath: path.resolve(process.cwd(), 'src/blocks'),
    outputPath: 'manifest.json'
  }).catch(console.error);
}
