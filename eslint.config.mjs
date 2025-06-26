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
    files: ['src/**/*.test.ts'],
    extends: [pluginChaiFriendly.configs.recommendedFlat],
    rules: {
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off'
    }
  },
  {
    name: 'Legacy tests (Karma + Jasmine)',
    files: ['src/test/**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/dot-notation': 'off'
    }
  },
  { ignores: ['dist/**/*', 'src/dev/**/*', 'src/stories/**/*', '.storybook/**/*'] }
]);
