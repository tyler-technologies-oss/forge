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
    name: 'Component HTML templates',
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility]
  },
  {
    name: 'Library components/directives (NgModule-based by design)',
    files: ['src/lib/**/*.component.ts', 'src/lib/**/*.directive.ts'],
    rules: {
      '@angular-eslint/prefer-standalone': 'off'
    }
  },
  {
    name: 'Generated proxy files',
    files: ['src/lib/**/*.component.ts', 'src/lib/**/*.module.ts', 'src/lib/**/*-value-accessor.directive.ts'],
    rules: {
      // The schematic emits `protected elementRef`/`protected zone` without a leading underscore.
      '@tylertech-eslint/require-private-modifier': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },
  {
    name: 'Test files',
    files: ['src/**/*.spec.ts'],
    rules: {
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off'
    }
  },
  {
    name: 'Dev app files',
    files: ['src/dev/**/*.ts', 'src/dev/**/*.html'],
    rules: { 'no-console': 'off' }
  },
  {
    name: 'Dev app demo of the NgModule-based overlay content pattern',
    files: ['src/dev/app/views/components/toast/custom-toast/custom-toast.component.ts'],
    rules: { '@angular-eslint/prefer-standalone': 'off' }
  },
  {
    name: 'Table example data model (mirrors the journals.json fixture field names)',
    files: ['src/dev/app/views/examples/table-example/types.ts'],
    rules: { 'id-denylist': 'off' }
  },
  {
    name: 'Accordion/expansion-panel header buttons labeled via aria-labelledby',
    files: ['src/dev/app/views/components/accordion/accordion.component.html', 'src/dev/app/views/components/expansion-panel/expansion-panel.component.html'],
    rules: { '@angular-eslint/template/elements-content': 'off' }
  },
  { ignores: ['dist/**/*', 'out-tsc/**/*'] }
]);
