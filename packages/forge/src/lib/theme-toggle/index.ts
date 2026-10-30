import { defineCustomElement } from '@tylertech/forge-core';
import { ThemeToggleComponent } from './theme-toggle.js';

export * from './theme-toggle.js';
export * from './theme-toggle-constants.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/theme-toggle'`). */
export function defineThemeToggleComponent(): void {
  defineCustomElement(ThemeToggleComponent);
}
