import { defineCustomElement } from '@tylertech/forge-core';

import { SelectDropdownComponent } from './select-dropdown';

export * from './select-dropdown-adapter';
export * from './select-dropdown-constants';
export * from './select-dropdown-foundation';
export * from './select-dropdown';

export function defineSelectDropdownComponent(): void {
  defineCustomElement(SelectDropdownComponent);
}
