import { defineConfig, Plugin } from 'vitest/config';
import { resolve, dirname, isAbsolute } from 'path';
import { readFileSync } from 'fs';
import { playwright } from '@vitest/browser-playwright';
import { compileString } from 'sass';

const SCSS_VIRTUAL_PREFIX = '\0virtual-css-string:';

function inlineScss(): Plugin {
  return {
    name: 'inline-scss',
    enforce: 'pre',
    resolveId(source, importer) {
      if (source.endsWith('.scss') && importer) {
        const resolved = isAbsolute(source) ? source : resolve(dirname(importer), source);
        return SCSS_VIRTUAL_PREFIX + resolved.replace(/\.scss$/, '.js');
      }
    },
    load(id) {
      if (id.startsWith(SCSS_VIRTUAL_PREFIX)) {
        const realPath = id.slice(SCSS_VIRTUAL_PREFIX.length).replace(/\.js$/, '.scss');
        const code = readFileSync(realPath, 'utf-8');
        const loadPaths = [dirname(realPath), 'node_modules/'];
        const result = compileString(code, { loadPaths });
        return `export default ${JSON.stringify(result.css)};`;
      }
    }
  };
}

export default defineConfig({
  plugins: [inlineScss()],
  resolve: {
    alias: {
      '@tylertech/forge-rich-text-editor': resolve(__dirname, 'src/lib')
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
    onConsoleLog(log) {
      if (log.includes('Lit is in dev mode')) {
        return false;
      }
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
