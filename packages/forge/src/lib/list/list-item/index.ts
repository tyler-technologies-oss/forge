import { defineCustomElement } from '@tylertech/forge-core';
import { ListItemComponent } from './list-item.js';

export * from './list-item-constants.js';
export * from './list-item.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/list'`). */
export function defineListItemComponent(): void {
  defineCustomElement(ListItemComponent);
}
