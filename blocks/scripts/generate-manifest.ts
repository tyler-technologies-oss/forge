import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

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

interface Manifest {
  blocks: Block[];
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
