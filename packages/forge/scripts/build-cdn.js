import * as esbuild from 'esbuild';
import { getComponentEntryPoints, LICENSE_HEADER, htmlLoaderPlugin, scssLoaderPlugin } from './build-utils.js';

/**
 * Creates a bundled build of all Forge components for CDN distribution.
 */
export async function buildCdn({ outdir = 'dist/cdn/v1/libs/@tylertech/forge', minify = true } = {}) {
  const entryPoints = await getComponentEntryPoints();

  await esbuild.build({
    entryPoints,
    outdir,
    format: 'esm',
    target: 'es2022',
    bundle: true,
    splitting: true,
    chunkNames: 'chunks/chunk.[hash]',
    sourcemap: true,
    minify,
    banner: {
      js: LICENSE_HEADER
    },
    plugins: [htmlLoaderPlugin, scssLoaderPlugin]
  });
}
