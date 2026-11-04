// For more info, see https://eslint.org/docs/latest/use/configure/configuration-files
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
    name: 'Dev harness files',
    files: ['src/dev/**/*.ts', 'src/dev/**/*.tsx'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off'
    }
  },
  { ignores: ['esm/**/*'] }
]);
