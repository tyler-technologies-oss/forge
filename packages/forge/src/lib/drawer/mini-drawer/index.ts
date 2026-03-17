import { defineCustomElement } from '@tylertech/forge-core';

import { MiniDrawerComponent } from './mini-drawer.js';

export * from './mini-drawer-constants.js';
export * from './mini-drawer.js';

export function defineMiniDrawerComponent(): void {
  defineCustomElement(MiniDrawerComponent);
}
