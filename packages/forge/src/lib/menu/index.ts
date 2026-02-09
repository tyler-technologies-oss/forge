import { defineCustomElement } from '@tylertech/forge-core';

import { MenuComponent } from './menu.js';

export * from './menu-adapter.js';
export * from './menu-constants.js';
export * from './menu-core.js';
export * from './menu.js';

export function defineMenuComponent(): void {
  defineCustomElement(MenuComponent);
}
