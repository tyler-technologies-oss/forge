import { rollup } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import * as sass from 'sass';
import { getEntryPoints, getExternalDeps, LICENSE_HEADER } from './build-utils.js';

const scssPlugin = () => ({
  name: 'scss',
  transform(_code, id) {
    if (!id.endsWith('.scss')) {
      return null;
    }
    const result = sass.compile(id, { style: 'compressed', loadPaths: ['node_modules'] });
    return {
      code: `export default ${JSON.stringify(result.css)};`,
      map: null
    };
  }
});

/**
 * Builds the ESM distribution of the Forge rich text editor library.
 */
export async function buildEsm({ outdir = 'esm' } = {}) {
  const external = getExternalDeps();

  const bundle = await rollup({
    input: await getEntryPoints(),
    external: id => external.some(dep => id === dep || id.startsWith(dep + '/')),
    treeshake: false,
    onwarn(warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY') {
        return; // Ignore circular dependency warnings
      }
      warn(warning);
    },
    plugins: [
      scssPlugin(),
      typescript({
        tsconfig: 'src/lib/tsconfig-build.json',
        declaration: false,
        sourceMap: false,
        // Rollup emits a single ESM graph, and `bundler` resolution is required so the
        // `exports` maps of the TipTap packages are honoured when resolving their types.
        module: 'esnext',
        moduleResolution: 'bundler'
      })
    ]
  });

  await bundle.write({
    dir: outdir,
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src/lib',
    banner: LICENSE_HEADER
  });

  await bundle.close();
}
