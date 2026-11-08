import { jsDocTagsPlugin } from '@wc-toolkit/jsdoc-tags';
import forgeBranchNamePlugin from './plugins/cem/branch-name.mjs';
import forgeTypePathsPlugin from './plugins/cem/type-paths.mjs';
import forgeMemberDenyListPlugin from './plugins/cem/member-deny-list.mjs';
import forgeJsxTypesPlugin from './plugins/cem/jsx-types.mjs';

export default {
  globs: ['src/lib/**/*.ts'],
  exclude: ['**/index.ts', 'src/lib/utils/**', '**/*.test.ts'],
  packagejson: false,
  plugins: [
    forgeBranchNamePlugin(),
    forgeTypePathsPlugin(),
    forgeMemberDenyListPlugin(),
    forgeJsxTypesPlugin(),
    jsDocTagsPlugin({
      hideLogs: true,
      tags: {
        dependency: {
          mappedName: 'dependencies',
          isArray: true
        },
        state: {
          mappedName: 'states',
          isArray: true
        }
      }
    })
  ]
};
