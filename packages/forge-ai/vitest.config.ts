import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { forgeSassImporter } from './config/forge-sass-importer.js';

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
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      screenshotFailures: false
    },
    include: ['src/lib/**/*.test.ts'],
    setupFiles: ['vitest.setup.ts'],
    onConsoleLog(log) {
      return log.includes('Lit is in dev mode') ? false : undefined;
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: '.vitest-coverage',
      include: ['src/lib/**/*.ts'],
      exclude: ['**/*.test.ts', '**/index.ts', '**/*.scss'],
      thresholds: {
        statements: 97,
        branches: 91,
        functions: 98,
        lines: 97
      }
    }
  }
});
