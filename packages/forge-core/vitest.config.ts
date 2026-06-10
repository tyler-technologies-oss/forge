import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright({
        launchOptions: {
          executablePath: process.env.CI ? '/ms-playwright/chromium-1217/chrome-linux64/chrome' : undefined
        }
      }),
      instances: [{ browser: 'chromium' }],
      screenshotFailures: false
    },
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: '.vitest-coverage',
      include: ['src/**/*.ts'],
      exclude: ['**/*.test.ts', '**/index.ts']
    }
  }
});
