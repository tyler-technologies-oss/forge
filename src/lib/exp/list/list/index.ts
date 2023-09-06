import { defineCustomElement } from '@tylertech/forge-core';
import { ListComponentExp } from './list';

export * from './list-adapter';
export * from './list-constants';
export * from './list-foundation';
export * from './list';

export function defineListComponentExp(): void {
  defineCustomElement(ListComponentExp);
}
