import { defineCustomElement } from '@tylertech/forge-core';
import { ModalDrawerComponent } from './modal-drawer.js';

export * from './modal-drawer-adapter.js';
export * from './modal-drawer-constants.js';
export * from './modal-drawer-core.js';
export * from './modal-drawer.js';

export function defineModalDrawerComponent(): void {
  defineCustomElement(ModalDrawerComponent);
}
