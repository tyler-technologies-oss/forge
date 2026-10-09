import { defineCustomElement } from '@tylertech/forge-core';
import { ModalDrawerComponent } from './modal-drawer.js';

export * from './modal-drawer-constants.js';
export * from './modal-drawer.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/modal-drawer'`). */
export function defineModalDrawerComponent(): void {
  defineCustomElement(ModalDrawerComponent);
}
