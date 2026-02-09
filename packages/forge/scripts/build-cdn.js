import * as esbuild from 'esbuild';
import { getCdnOutdir, getComponentEntryPoints, LICENSE_HEADER, htmlLoaderPlugin, scssLoaderPlugin } from './build-utils.js';

export async function buildCdn({ outdir = getCdnOutdir(), minify = true } = {}) {
  const entryPoints = await getComponentEntryPoints();
  const shared = {
    format: 'esm',
    target: 'es2022',
    bundle: true,
    sourcemap: true,
    minify,
    banner: { js: LICENSE_HEADER },
    plugins: [htmlLoaderPlugin, scssLoaderPlugin]
  };

  await Promise.all([
    // Generate code-split modules for each component and shared chunks for common dependencies
    esbuild.build({
      ...shared,
      entryPoints,
      outdir,
      splitting: true,
      chunkNames: 'chunks/chunk.[hash]'
    }),

    // Generate a single bundled file for users who want to include the entire library as a single script
    esbuild.build({
      ...shared,
      entryPoints: ['src/lib/index.ts'],
      outfile: `${outdir}/lib.js`
    })
  ]);
}
