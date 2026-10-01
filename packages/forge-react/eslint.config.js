import { defineConfig } from 'eslint/config';
import tylerPlugin from '@tylertech-eslint/eslint-plugin';

export default defineConfig([
  {
    name: 'TypeScript files',
    files: ['**/*.ts', '**/*.tsx'],
    extends: [tylerPlugin.configs.tsRecommended, tylerPlugin.configs.tsStylistic],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    name: 'Test files',
    files: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    rules: {
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off'
    }
  },
  {
    name: 'Dev app files',
    files: ['src/dev/**/*.ts', 'src/dev/**/*.tsx'],
    rules: {
      'no-console': 'off'
    }
  },
  { ignores: ['dist/**/*'] }
]);
