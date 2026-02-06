import { defineConfig, Plugin } from 'vitest/config';
import { resolve, dirname, isAbsolute } from 'path';
import { readFileSync } from 'fs';
import { playwright } from '@vitest/browser-playwright';
import { compileString } from 'sass';

const SCSS_VIRTUAL_PREFIX = '\0virtual-css-string:';
const HTML_VIRTUAL_PREFIX = '\0virtual-html-string:';

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

function inlineHtml(): Plugin {
  return {
    name: 'inline-html',
    enforce: 'pre',
    resolveId(source, importer) {
      if (source.endsWith('.html') && importer) {
        const resolved = isAbsolute(source) ? source : resolve(dirname(importer), source);
        return HTML_VIRTUAL_PREFIX + resolved.replace(/\.html$/, '.js');
      }
    },
    load(id) {
      if (id.startsWith(HTML_VIRTUAL_PREFIX)) {
        const realPath = id.slice(HTML_VIRTUAL_PREFIX.length).replace(/\.js$/, '.html');
        const code = readFileSync(realPath, 'utf-8');
        return `export default ${JSON.stringify(code)};`;
      }
    }
  };
}

export default defineConfig({
  plugins: [inlineScss(), inlineHtml()],
  resolve: {
    alias: {
      '@tylertech/forge': resolve(__dirname, 'src/lib')
    }
  },
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      screenshotFailures: false
    },
    include: ['src/lib/**/*.vitest.ts'],
    onConsoleLog(log) {
      if (log.includes('Lit is in dev mode')) {
        return false;
      }
    },
    setupFiles: ['src/lib/core/testing/vitest-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: '.vitest-coverage',
      include: ['src/lib/**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.vitest.ts', '**/index.ts', '**/*.scss']
    }
  }
});
