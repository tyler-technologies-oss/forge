import { execSync } from 'child_process';

/**
 * Builds the TypeScript declaration files for the library.
 */
export async function buildTypes({ project = 'src/lib/tsconfig-build.json', outdir = 'esm' } = {}) {
  execSync(`pnpm exec tsc -p ${project} --declaration --emitDeclarationOnly --outDir ${outdir}`, {
    stdio: 'inherit'
  });
}
