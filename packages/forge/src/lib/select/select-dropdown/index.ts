import { defineCustomElement } from '@tylertech/forge-core';

import { SelectDropdownComponent } from './select-dropdown.js';

export * from './select-dropdown-adapter.js';
export * from './select-dropdown-constants.js';
export * from './select-dropdown-core.js';
export * from './select-dropdown.js';

export function defineSelectDropdownComponent(): void {
  defineCustomElement(SelectDropdownComponent);
}
