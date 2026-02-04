import { execSync } from 'child_process';

/**
 * Builds the Custom Elements Manifest (CEM) for the library.
 */
export async function buildCem({ config = 'custom-elements-manifest.config.js', outdir = 'dist/cem' } = {}) {
  execSync(`pnpm exec custom-elements-manifest analyze --config ${config} --outdir ${outdir} --quiet`, {
    stdio: 'inherit'
  });
}
