import { defineConfig } from 'eslint/config';
import tylerPlugin from '@tylertech-eslint/eslint-plugin';

export default defineConfig([
  {
    name: 'JavaScript files',
    files: ['**/*.js', '**/*.mjs'],
    extends: [tylerPlugin.configs.recommended]
  },
  { ignores: ['sass/**/*'] }
]);
