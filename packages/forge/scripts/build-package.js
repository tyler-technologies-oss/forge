import { cp, mkdir } from 'fs/promises';
import { dirname, join, relative } from 'path';
import { glob } from 'glob';

const SASS_SOURCE_DIR = 'src/lib';

export async function buildPackage({ sassDir = 'sass' } = {}) {
  const sassFiles = await glob(`${SASS_SOURCE_DIR}/**/*.scss`);

  for (const file of sassFiles) {
    const destPath = join(sassDir, relative(SASS_SOURCE_DIR, file));
    await mkdir(dirname(destPath), { recursive: true });
    await cp(file, destPath);
  }
}
