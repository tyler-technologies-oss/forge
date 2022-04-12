import { defineCustomElement } from '@tylertech/forge-core';

import { MiniDrawerComponent } from './mini-drawer';

export * from './mini-drawer-constants';
export * from './mini-drawer';

export function defineMiniDrawerComponent(): void {
  defineCustomElement(MiniDrawerComponent);
}
