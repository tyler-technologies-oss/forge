import { defineConfig, Plugin } from 'vitest/config';
import { resolve, dirname, isAbsolute } from 'path';
import { pathToFileURL } from 'url';
import { readFileSync } from 'fs';
import { playwright } from '@vitest/browser-playwright';
import { compileString, FileImporter } from 'sass';

const SCSS_VIRTUAL_PREFIX = '\0virtual-css-string:';
const HTML_VIRTUAL_PREFIX = '\0virtual-html-string:';
const FORGE_SASS_PREFIX = '@tylertech/forge/sass/';

/**
 * Resolves `@tylertech/forge/sass/*` against forge's SCSS sources rather than its build output.
 *
 * `@tylertech/forge`'s published `sass/` directory is a verbatim copy of `src/lib/**\/*.scss`, but
 * it only exists once forge has been built - and it is gitignored. Without this, running these
 * tests on a fresh clone, or after a turbo build filtered to this package, fails with a bare
 * "Can't find stylesheet to import" that says nothing about forge needing a build first.
 */
const forgeSassImporter: FileImporter = {
  findFileUrl(url) {
    if (!url.startsWith(FORGE_SASS_PREFIX)) {
      return null;
    }
    return pathToFileURL(resolve(__dirname, '../forge/src/lib', url.slice(FORGE_SASS_PREFIX.length)));
  }
};

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
        const result = compileString(code, { loadPaths, importers: [forgeSassImporter] });
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
        return `export default ${JSON.stringify(readFileSync(realPath, 'utf-8'))};`;
      }
    }
  };
}

export default defineConfig({
  plugins: [inlineScss(), inlineHtml()],
  resolve: {
    alias: {
      '@tylertech/forge-rich-text-editor': resolve(__dirname, 'src/lib'),
      '@tylertech/forge': resolve(__dirname, '../forge/src/lib')
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
    setupFiles: ['vitest.setup.ts'],
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
