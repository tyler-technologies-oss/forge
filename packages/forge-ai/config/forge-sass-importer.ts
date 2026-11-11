import { resolve } from 'path';
import { pathToFileURL } from 'url';
import type { FileImporter } from 'sass';

const FORGE_SASS_PREFIX = '@tylertech/forge/sass/';

/**
 * Resolves `@tylertech/forge/sass/*` against forge's SCSS sources rather than its build output so
 * tests and Storybook don't require `@tylertech/forge` to be built first.
 *
 * `@tylertech/forge-tokens/sass/*` is NOT mapped: its published `sass/` is generated from token JSON
 * (the sources under `src/sass` import generated files), so forge-tokens must be built before use.
 */
export const forgeSassImporter: FileImporter<'sync'> = {
  findFileUrl(url) {
    if (!url.startsWith(FORGE_SASS_PREFIX)) {
      return null;
    }
    return pathToFileURL(resolve(import.meta.dirname, '../../forge/src/lib', url.slice(FORGE_SASS_PREFIX.length)));
  }
};
