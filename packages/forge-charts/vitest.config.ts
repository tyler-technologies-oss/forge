import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  optimizeDeps: {
    include: ['@tanstack/charts/group', '@tanstack/charts/polar', '@tanstack/charts/scales/point', '@tanstack/charts/scales/time', '@tanstack/charts/tooltip']
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
    }
  }
});
