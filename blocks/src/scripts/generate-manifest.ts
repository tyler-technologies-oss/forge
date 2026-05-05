import { glob } from 'glob';
import fs from 'fs';
import { parseBlockMetadata, type Block } from './block-metadata.js';

interface Manifest {
  blocks: Block[];
}

async function generateManifest(): Promise<void> {
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

  const manifest: Manifest = { blocks };
  fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2));
  console.log(`Generated manifest.json with ${blocks.length} blocks`);
}

generateManifest().catch(console.error);
