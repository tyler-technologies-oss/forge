import { defineCustomElement } from '@tylertech/forge-core';
import { ModalDrawerComponent } from './modal-drawer';

export * from './modal-drawer-adapter';
export * from './modal-drawer-constants';
export * from './modal-drawer-foundation';
export * from './modal-drawer';

export function defineModalDrawerComponent(): void {
  defineCustomElement(ModalDrawerComponent);
}
