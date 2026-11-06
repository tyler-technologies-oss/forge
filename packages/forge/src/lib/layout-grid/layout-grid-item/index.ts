import { defineCustomElement } from '@tylertech/forge-core';
import { LayoutGridItemComponent } from './layout-grid-item.js';

export * from './layout-grid-item.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/layout-grid'`). */
export function defineLayoutGridItemComponent(): void {
  defineCustomElement(LayoutGridItemComponent);
}
