// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import { defineConfig } from 'eslint/config';
import tylerPlugin from '@tylertech-eslint/eslint-plugin';
import pluginChaiFriendly from 'eslint-plugin-chai-friendly';

export default defineConfig([
  {
    name: 'Forge TypeScript files',
    files: ['**/*.ts'],
    extends: [tylerPlugin.configs.tsRecommended, tylerPlugin.configs.tsStylistic],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    name: 'Forge JavaScript files',
    files: ['**/*.js', '**/*.mjs'],
    extends: [tylerPlugin.configs.recommended]
  },
  {
    name: 'Modern tests (Web Test Runner + Mocha + Chai)',
    files: ['src/**/*.test.ts', 'src/**/*.vitest.ts'],
    extends: [pluginChaiFriendly.configs.recommendedFlat],
    rules: {
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off'
    }
  },
  ...storybook.configs['flat/recommended'],
  { ignores: ['dist/**/*', 'esm/**/*', 'cdn/**/*', 'src/dev/**/*', '.storybook/**/*', 'storybook-static/**/*'] }
]);
