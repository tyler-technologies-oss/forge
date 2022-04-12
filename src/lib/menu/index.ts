import { defineCustomElement } from '@tylertech/forge-core';

import { MenuComponent } from './menu';

export * from './menu-adapter';
export * from './menu-constants';
export * from './menu-foundation';
export * from './menu';

export function defineMenuComponent(): void {
  defineCustomElement(MenuComponent);
}
