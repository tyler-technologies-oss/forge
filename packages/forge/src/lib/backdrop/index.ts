import { defineCustomElement } from '@tylertech/forge-core';
import { BackdropComponent } from './backdrop';

export * from './backdrop-constants';
export * from './backdrop';

export function defineBackdropComponent(): void {
  defineCustomElement(BackdropComponent);
}
