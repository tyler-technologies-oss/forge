import { defineCustomElement } from '@tylertech/forge-core';
import { DrawerComponent } from './drawer';

export * from './drawer-constants';
export * from './drawer';

export function defineDrawerComponent(): void {
  defineCustomElement(DrawerComponent);
}
