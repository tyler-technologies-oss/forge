// For more info, see https://eslint.org/docs/latest/use/configure/configuration-files
import { defineConfig } from 'eslint/config';
import tylerPlugin from '@tylertech-eslint/eslint-plugin';

export default defineConfig([
  {
    name: 'JavaScript files',
    files: ['**/*.js', '**/*.mjs'],
    extends: [tylerPlugin.configs.recommended]
  },
  {
    name: 'Build scripts',
    files: ['scripts/**/*.mjs'],
    rules: {
      'no-console': 'off'
    }
  },
  { ignores: ['dist/**/*'] }
]);
