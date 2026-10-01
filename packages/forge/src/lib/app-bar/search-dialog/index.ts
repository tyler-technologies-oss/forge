import { defineCustomElement } from '@tylertech/forge-core';
import { AppBarSearchDialogComponent } from './app-bar-search-dialog.js';

export * from './app-bar-search-dialog-constants.js';
export * from './app-bar-search-dialog.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/app-bar'`). */
export function defineAppBarSearchDialogComponent(): void {
  defineCustomElement(AppBarSearchDialogComponent);
}
