import { defineCustomElement } from '@tylertech/forge-core';

import { PaginatorComponent } from './paginator.js';

export * from './paginator-adapter.js';
export * from './paginator-constants.js';
export * from './paginator-core.js';
export * from './paginator.js';

export function definePaginatorComponent(): void {
  defineCustomElement(PaginatorComponent);
}
