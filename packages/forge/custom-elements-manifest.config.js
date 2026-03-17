import * as path from 'path';
import { customElementVsCodePlugin } from 'custom-element-vs-code-integration';
import { jsDocTagsPlugin } from '@wc-toolkit/jsdoc-tags';

import forgeMemberDenyListPlugin from './plugins/cem/member-deny-list.mjs';
import forgePublicMemberPrivacyPlugin from './plugins/cem/public-member-privacy.mjs';
import forgeTypePathsPlugin from './plugins/cem/type-paths.mjs';
import forgeBranchNamePlugin from './plugins/cem/branch-name.mjs';
import forgeFilterIgnored from './plugins/cem/filter-ignored.mjs';

export default {
  globs: ['src/lib/**/*.ts'],
  exclude: ['**/*.test.ts'],
  packagejson: false,
  plugins: [
    forgeBranchNamePlugin(),
    forgeFilterIgnored(),
    forgeMemberDenyListPlugin(),
    forgePublicMemberPrivacyPlugin(),
    forgeTypePathsPlugin(),
    customElementVsCodePlugin({
      hideLogs: true,
      outdir: path.resolve('.')
    }),
    jsDocTagsPlugin({
      tags: {
        dependency: {
          mappedName: 'dependencies',
          isArray: true
        },
        globalconfig: {
          mappedName: 'globalConfigProperties',
          isArray: true
        },
        cssfilepath: {
          mappedName: 'cssFilePath'
        },
        cssclass: {
          mappedName: 'cssClasses',
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
