/**
 * Block manifest generator.
 * Discovers all block HTML files and generates a JSON manifest with metadata.
 * Run via: pnpm generate-manifest
 */

import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';
import { parseBlockMetadata } from './block-metadata.js';
import { validateBlockContent, formatValidationIssues } from './block-validator.js';
import type { Block, Manifest } from './types.js';

export type { Block, Manifest } from './types.js';

export interface GenerateManifestOptions {
  blocksPath: string;
  outputPath?: string;
  validate?: boolean;
  silent?: boolean;
}

/**
 * Discovers all block HTML files and extracts their metadata.
 */
export async function discoverBlocks(blocksPath: string): Promise<Block[]> {
  const blocks: Block[] = [];
  const htmlFiles = await glob('**/*.html', {
    cwd: blocksPath
  });

  for (const file of htmlFiles) {
    const fullPath = path.join(blocksPath, file);
    const content = fs.readFileSync(fullPath, 'utf-8');
    const relativePath = path.join('blocks', file);
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

/**
 * Generates the blocks manifest JSON file.
 */
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
    return parts.length > 1 ? parts[1] : '';
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
  }).catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
}
