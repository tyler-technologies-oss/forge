import { defineCustomElement } from '@tylertech/forge-core';
import { ListComponent } from './list.js';

export * from './list-constants.js';
export * from './list.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/list'`). */
export function defineListComponent(): void {
  defineCustomElement(ListComponent);
}
