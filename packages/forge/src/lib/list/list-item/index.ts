import { defineCustomElement } from '@tylertech/forge-core';
import { ListItemComponent } from './list-item.js';

export * from './list-item-adapter.js';
export * from './list-item-constants.js';
export * from './list-item-core.js';
export * from './list-item.js';

export function defineListItemComponent(): void {
  defineCustomElement(ListItemComponent);
}
