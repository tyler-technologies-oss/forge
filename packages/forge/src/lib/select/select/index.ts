import { defineCustomElement } from '@tylertech/forge-core';

import { SelectComponent } from './select.js';

export * from './select-adapter.js';
export * from './select-constants.js';
export * from './select-core.js';
export * from './select.js';

export function defineSelectComponent(): void {
  defineCustomElement(SelectComponent);
}
