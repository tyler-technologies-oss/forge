import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import { sendKeysPlugin } from '@web/test-runner-commands/plugins';
import rollupScss from 'rollup-plugin-scss';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';

const scss = fromRollup(rollupScss);

export const directoryGroup = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

export default {
  concurrency: 10,
  concurrentBrowsers: 3,
  nodeResolve: true,
  coverageConfig: {
    report: true,
    reportDir: '.coverage',
    exclude: [
      'src/lib/core/base/**',
      '**/node_modules/**',
    ],
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
    scss({ output: false }),
    esbuildPlugin({
      ts: true,
      tsconfig: fileURLToPath(new URL('./src/tsconfig-test.json', import.meta.url)),
      loaders: {
        '.html': 'text',
        '.scss': 'js'
      }
    }),
    {
      name: 'plugin-js-buffer-to-string',
      transform(context) {
          if (
              context.response.is('js') &&
              Buffer.isBuffer(context.body)
          ) {
              context.body = context.body.toString();
          }
      },
  },
  ]
};
