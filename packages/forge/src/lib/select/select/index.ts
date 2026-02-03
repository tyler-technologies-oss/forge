import { defineCustomElement } from '@tylertech/forge-core';

import { SelectComponent } from './select';

export * from './select-adapter';
export * from './select-constants';
export * from './select-core';
export * from './select';

export function defineSelectComponent(): void {
  defineCustomElement(SelectComponent);
}
