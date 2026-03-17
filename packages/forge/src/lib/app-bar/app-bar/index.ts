import { defineCustomElement } from '@tylertech/forge-core';
import { AppBarComponent } from './app-bar.js';

export * from './app-bar-constants.js';
export * from './app-bar.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/app-bar'`). */
export function defineAppBarComponent(): void {
  defineCustomElement(AppBarComponent);
}
