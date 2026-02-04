import * as sass from 'sass';
import { glob } from 'glob';
import { mkdir, writeFile } from 'fs/promises';
import { dirname, basename, join, relative } from 'path';
import { LICENSE_HEADER } from './build-utils.js';

/**
 * Builds and outputs the compiled CSS files for both the release and CDN distributions.
 */
export async function buildCss({ releaseOutdir = 'dist/release/@tylertech/forge/dist', cdnOutdir = 'dist/cdn/v1/libs/@tylertech/forge' } = {}) {
  const rootStylesheets = await glob('src/lib/*.scss');

  const componentStylesheets = await glob('src/lib/**/forge-*.scss', {
    ignore: rootStylesheets
  });

  await mkdir(releaseOutdir, { recursive: true });
  await mkdir(cdnOutdir, { recursive: true });

  for (const file of rootStylesheets) {
    const result = sass.compile(file, { style: 'compressed' });
    const outFileName = basename(file).replace('.scss', '.css');
    await writeFile(join(releaseOutdir, outFileName), LICENSE_HEADER + result.css);
    await writeFile(join(cdnOutdir, outFileName), LICENSE_HEADER + result.css);
  }

  for (const file of componentStylesheets) {
    const result = sass.compile(file, { style: 'compressed' });
    const componentDir = dirname(relative('src/lib', file));
    const outFileName = basename(file).replace('.scss', '.css');

    const releaseComponentDir = join(releaseOutdir, componentDir);
    await mkdir(releaseComponentDir, { recursive: true });
    await writeFile(join(releaseComponentDir, outFileName), LICENSE_HEADER + result.css);

    const cdnComponentDir = join(cdnOutdir, componentDir);
    await mkdir(cdnComponentDir, { recursive: true });
    await writeFile(join(cdnComponentDir, outFileName), LICENSE_HEADER + result.css);
  }
}
