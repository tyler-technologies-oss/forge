import * as path from 'path';
import { customElementVsCodePlugin } from 'custom-element-vs-code-integration';
import forgeMemberDenyListPlugin from './plugins/cem/member-deny-list.mjs';
import forgePublicMemberPrivacyPlugin from './plugins/cem/public-member-privacy.mjs';
import forgeCustomTagsPlugin from './plugins/cem/custom-tags.mjs';

export default {
  globs: ['**/*.ts'], // Relative to src/lib directory
  exclude: [
    '**/plugins/**/*',
    '**/stories/**/*',
    '**/dev/**/*',
    '**/dist/**/*',
    '**/test/**/*',
    '**/index.ts',
    '**/*.test.ts',
    '**/*.spec.ts',
    '**/*-foundation.ts',
    '**/*-adapter.ts',
    '**/*-constants.ts',
    '**/*-component-delegate.ts',
    '**/core/**/*.ts',
    '**/*-utils.ts',
    'src/lib/constants.ts'
  ],
  plugins: [
    forgeMemberDenyListPlugin(),
    forgePublicMemberPrivacyPlugin(),
    forgeCustomTagsPlugin(),
    customElementVsCodePlugin({ outdir: path.resolve('dist/cem') }),
  ]
};
