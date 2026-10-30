import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  // The tests exercise the generated wrappers in `dist`, which consume the published entry points
  // of their dependencies. Dropping the `development` condition keeps vite from resolving
  // `@tylertech/forge` to its TypeScript sources, which import `.html` templates vite cannot parse.
  resolve: {
    conditions: ['module', 'browser', 'default']
  },
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      screenshotFailures: false
    },
    include: ['test/**/*.test.tsx']
  }
});
