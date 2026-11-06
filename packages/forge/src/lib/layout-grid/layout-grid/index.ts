import { defineCustomElement } from '@tylertech/forge-core';
import { LayoutGridComponent } from './layout-grid.js';

export * from './layout-grid.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/layout-grid'`). */
export function defineLayoutGridComponent(): void {
  defineCustomElement(LayoutGridComponent);
}
