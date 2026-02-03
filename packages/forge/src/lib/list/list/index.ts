import { defineCustomElement } from '@tylertech/forge-core';
import { ListComponent } from './list';

export * from './list-adapter';
export * from './list-constants';
export * from './list-core';
export * from './list';

export function defineListComponent(): void {
  defineCustomElement(ListComponent);
}
