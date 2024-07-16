import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import { sendKeysPlugin, sendMousePlugin, setViewportPlugin } from '@web/test-runner-commands/plugins';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';
import { compileString } from 'sass';
import { dirname } from 'path';

/** Custom plugin to inline imports against .scss files as compiled CSS strings. */
const inlineScss = fromRollup(() => {
  return {
    name: 'inline-scss',
    transform(code, id) {
      if (id.endsWith('.scss')) {
        const loadPaths = [dirname(id), 'node_modules/'];
        const result = compileString(code, { loadPaths });
        return result.css;
      }
    }
  };
});

/** Gets all directory names within a given source directory.  */
export const directoryGroup = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

/**
 * @type {import('@web/test-runner').TestRunnerConfig}
 */
export default {
  concurrentBrowsers: 3,
  nodeResolve: true,
  testsFinishTimeout: 60000,
  testFramework: {
    config: {
      timeout: 5000,
      retries: 1
    }
  },
  coverageConfig: {
    report: true,
    reportDir: '.coverage',
    exclude: ['src/lib/*', 'src/lib/core/**', 'src/lib/**/index.ts', 'src/lib/**/*.{html,scss,json}', '**/node_modules/**'],
    threshold: {
      statements: 98.5,
      branches: 95.5,
      functions: 96.5,
      lines: 98.5
    }
  },
  groups: [
    { name: 'lib', files: 'src/lib/**/*.test.ts' },
    ...directoryGroup('src/lib').reduce((paths, dirName) => {
      paths.push({
        name: dirName,
        files: `src/lib/${dirName}/**/*.test.ts`
      });
      return paths;
    }, [])
  ],
  group: 'lib',
  plugins: [
    sendKeysPlugin(),
    sendMousePlugin(),
    setViewportPlugin(),
    inlineScss(),
    esbuildPlugin({
      ts: true,
      tsconfig: fileURLToPath(new URL('./src/tsconfig-test.json', import.meta.url)),
      loaders: {
        '.html': 'text',
        '.scss': 'text'
      }
    })
  ]
};
