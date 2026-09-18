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
  // TODO(rte-vitest-migration): the lifted specs still target Web Test Runner + Chai, whose
  // `expect(x).to.be.true` assertions trip no-unused-expressions. Remove this ignore once the
  // specs are migrated to Vitest browser mode.
  { ignores: ['esm/**/*', 'src/lib/**/tests/**/*.test.ts'] }
]);
