import { defineCustomElement } from '@tylertech/forge-core';

import { ListComponent } from './list';

export * from './list-adapter';
export * from './list-constants';
export * from './list-foundation';
export * from './list';

export function defineListComponent(): void {
  defineCustomElement(ListComponent);
}
