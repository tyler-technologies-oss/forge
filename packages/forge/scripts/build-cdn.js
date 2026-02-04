import * as esbuild from 'esbuild';
import { getCdnOutdir, getComponentEntryPoints, LICENSE_HEADER, htmlLoaderPlugin, scssLoaderPlugin } from './build-utils.js';

export async function buildCdn({ outdir = getCdnOutdir(), minify = true } = {}) {
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
