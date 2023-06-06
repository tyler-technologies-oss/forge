import { defineCustomElement } from '@tylertech/forge-core';
import { SelectComponentExp } from './select';

export * from './select-adapter';
export * from './select-constants';
export * from './select-foundation';
export * from './select';

export function defineSelectComponentExp(): void {
  defineCustomElement(SelectComponentExp);
}
