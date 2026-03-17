import { cp, mkdir } from 'fs/promises';
import { join } from 'path';
import { glob } from 'glob';

export async function buildPackage({ sassDir = 'sass' } = {}) {
  const sassFiles = await glob('src/lib/**/*.scss');

  for (const file of sassFiles) {
    const relativePath = file.replace('src/lib/', '');
    const destPath = join(sassDir, relativePath);
    await mkdir(join(destPath, '..'), { recursive: true });
    await cp(file, destPath);
  }
}
