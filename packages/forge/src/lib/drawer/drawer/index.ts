import { defineCustomElement } from '@tylertech/forge-core';
import { DrawerComponent } from './drawer.js';

export * from './drawer-constants.js';
export * from './drawer.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/drawer'`). */
export function defineDrawerComponent(): void {
  defineCustomElement(DrawerComponent);
}
