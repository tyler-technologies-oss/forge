import { defineCustomElement } from '@tylertech/forge-core';

import { MiniDrawerComponent } from './mini-drawer.js';

export * from './mini-drawer-constants.js';
export * from './mini-drawer.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/mini-drawer'`). */
export function defineMiniDrawerComponent(): void {
  defineCustomElement(MiniDrawerComponent);
}
