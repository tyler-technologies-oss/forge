import { rollup } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';
import * as sass from 'sass';
import { getExternalDeps, LICENSE_HEADER } from './build-utils.js';

const htmlPlugin = () => ({
  name: 'html',
  transform(_code, id) {
    if (!id.endsWith('.html')) {
      return null;
    }
    const contents = readFileSync(id, 'utf-8');
    return {
      code: `export default ${JSON.stringify(contents)};`,
      map: null
    };
  }
});

const scssPlugin = () => ({
  name: 'scss',
  transform(_code, id) {
    if (!id.endsWith('.scss')) {
      return null;
    }
    const result = sass.compile(id, { style: 'compressed' });
    return {
      code: `export default ${JSON.stringify(result.css)};`,
      map: null
    };
  }
});

/**
 * Builds the ESM distribution of the Forge library.
 */
export async function buildEsm({ outdir = 'dist/release/@tylertech/forge/esm' } = {}) {
  const external = getExternalDeps();

  const bundle = await rollup({
    input: 'src/lib/index.ts',
    external: id => external.some(dep => id === dep || id.startsWith(dep + '/')),
    onwarn(warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY') {
        return; // Ignore circular dependency warnings
      }
      warn(warning);
    },
    plugins: [
      htmlPlugin(),
      scssPlugin(),
      typescript({
        tsconfig: 'src/lib/tsconfig-build.json',
        declaration: false,
        sourceMap: false
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
