// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import { defineConfig } from 'eslint/config';
import tylerPlugin from '@tylertech-eslint/eslint-plugin';

export default defineConfig([
  {
    name: 'TypeScript files',
    files: ['**/*.ts'],
    extends: [tylerPlugin.configs.tsRecommended, tylerPlugin.configs.tsStylistic],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    name: 'JavaScript files',
    files: ['**/*.js', '**/*.mjs'],
    extends: [tylerPlugin.configs.recommended]
  },
  {
    name: 'Test files',
    files: ['src/lib/**/*.test.ts'],
    rules: {
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off'
    }
  },
  {
    name: 'Dev files',
    files: ['src/dev/**/*.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off'
    }
  },
  ...storybook.configs['flat/recommended'],
  { ignores: ['dist/**/*', 'esm/**/*', 'cdn/**/*', '.storybook/**/*', 'storybook-static/**/*'] }
]);
