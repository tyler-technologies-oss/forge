// For more info, see https://eslint.org/docs/latest/use/configure/configuration-files
import { defineConfig } from 'eslint/config';
import tylerPlugin from '@tylertech-eslint/eslint-plugin';
import angular from 'angular-eslint';

export default defineConfig([
  {
    name: 'TypeScript files',
    files: ['**/*.ts'],
    extends: [tylerPlugin.configs.tsRecommended, tylerPlugin.configs.tsStylistic, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    name: 'Generated proxy files',
    files: ['src/lib/**/*.component.ts', 'src/lib/**/*.module.ts'],
    rules: {
      // The schematic emits `protected elementRef`/`protected zone` without a leading underscore.
      '@tylertech-eslint/require-private-modifier': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@angular-eslint/prefer-standalone': 'off'
    }
  },
  {
    name: 'Build scripts',
    files: ['scripts/**/*.mjs'],
    extends: [tylerPlugin.configs.recommended],
    rules: {
      'no-console': 'off'
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
  { ignores: ['dist/**/*', 'dist-demo/**/*', 'out-tsc/**/*', '.generated-config/**/*'] }
]);
