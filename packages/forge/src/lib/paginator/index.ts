import { defineCustomElement } from '@tylertech/forge-core';

import { PaginatorComponent } from './paginator.js';

export * from './paginator-constants.js';
export * from './paginator.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/paginator'`). */
export function definePaginatorComponent(): void {
  defineCustomElement(PaginatorComponent);
}
