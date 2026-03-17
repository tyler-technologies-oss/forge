import { defineCustomElement } from '@tylertech/forge-core';
import { ListComponent } from './list.js';

export * from './list-adapter.js';
export * from './list-constants.js';
export * from './list-core.js';
export * from './list.js';

export function defineListComponent(): void {
  defineCustomElement(ListComponent);
}
