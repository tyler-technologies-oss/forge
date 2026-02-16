import { defineCustomElement } from '@tylertech/forge-core';
import { DrawerComponent } from './drawer.js';

export * from './drawer-constants.js';
export * from './drawer.js';

export function defineDrawerComponent(): void {
  defineCustomElement(DrawerComponent);
}
