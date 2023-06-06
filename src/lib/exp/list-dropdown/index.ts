import { defineCustomElement } from '@tylertech/forge-core';

import { ListDropdownComponent } from './list-dropdown';

export * from './list-dropdown-adapter';
export * from './list-dropdown-constants';
export * from './list-dropdown-foundation';
export * from './list-dropdown';

export function defineListDropdownComponent(): void {
  defineCustomElement(ListDropdownComponent);
}
