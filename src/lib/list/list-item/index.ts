import { defineCustomElement } from '@tylertech/forge-core';
import { ListItemComponent } from './list-item';

export * from './list-item-adapter';
export * from './list-item-constants';
export * from './list-item-foundation';
export * from './list-item';

export function defineListItemComponent(): void {
  defineCustomElement(ListItemComponent);
}
