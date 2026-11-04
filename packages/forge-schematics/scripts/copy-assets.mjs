import { cp, mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { glob } from 'glob';

async function copyAssets() {
  const assetGlobs = ['src/collection.json', 'src/custom-elements/schema.json', 'src/custom-elements/files/**/*'];
  const files = (await Promise.all(assetGlobs.map(pattern => glob(pattern, { nodir: true, dot: true })))).flat();

  for (const file of files) {
    const destPath = join('dist', file.replace(/^src\//, ''));
    await mkdir(dirname(destPath), { recursive: true });
    await cp(file, destPath);
  }
}

copyAssets();
