import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { pathToFileURL } from 'url';
import { playwright } from '@vitest/browser-playwright';
import type { FileImporter } from 'sass';

const FORGE_SASS_PREFIX = '@tylertech/forge/sass/';

/**
 * Resolves `@tylertech/forge/sass/*` against forge's SCSS sources rather than its build output so
 * tests don't require `@tylertech/forge` to be built first.
 *
 * `@tylertech/forge-tokens/sass/*` is NOT mapped: its published `sass/` is generated from token JSON
 * (the sources under `src/sass` import generated files), so forge-tokens must be built before tests run.
 */
const forgeSassImporter: FileImporter<'sync'> = {
  findFileUrl(url) {
    if (!url.startsWith(FORGE_SASS_PREFIX)) {
      return null;
    }
    return pathToFileURL(resolve(import.meta.dirname, '../forge/src/lib', url.slice(FORGE_SASS_PREFIX.length)));
  }
};

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['node_modules'],
        importers: [forgeSassImporter]
      }
    }
  },
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      screenshotFailures: false
    },
    include: ['src/lib/**/*.test.ts'],
    // F5: convert - existing tests are WTR/mocha/chai and do not run under Vitest yet
    exclude: [
      'src/lib/ai-steps/ai-steps.test.ts',
      'src/lib/ai-artifact-card/ai-artifact-card.test.ts',
      'src/lib/ai-artifact-card-group/ai-artifact-card-group.test.ts',
      'src/lib/tools/ai-steps/ai-steps.test.ts',
      'src/lib/ai-tool-call/tool-canvas.test.ts'
    ],
    setupFiles: ['vitest.setup.ts'],
    onConsoleLog(log) {
      return log.includes('Lit is in dev mode') ? false : undefined;
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: '.vitest-coverage',
      include: ['src/lib/**/*.ts'],
      exclude: ['**/*.test.ts', '**/index.ts', '**/*.scss']
    }
  }
});
