import { defineCustomElement } from '@tylertech/forge-core';

import { PaginatorComponent } from './paginator';

export * from './paginator-adapter';
export * from './paginator-constants';
export * from './paginator-foundation';
export * from './paginator';

export function definePaginatorComponent(): void {
  defineCustomElement(PaginatorComponent);
}
