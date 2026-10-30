import { cp, rm } from 'fs/promises';
import { buildSass } from './build-sass.js';

const SASS_SOURCE_DIR = 'src/sass';
const SASS_OUTPUT_DIR = 'sass';

/**
 * Builds the `sass/` directory by copying the hand-written Sass modules and generating the token Sass from the JSON in `tokens/`.
 */
export async function build() {
  await rm(SASS_OUTPUT_DIR, { recursive: true, force: true });
  await cp(SASS_SOURCE_DIR, SASS_OUTPUT_DIR, { recursive: true });
  await buildSass();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await build();
}
