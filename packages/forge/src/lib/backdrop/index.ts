import { defineCustomElement } from '@tylertech/forge-core';
import { BackdropComponent } from './backdrop.js';

export * from './backdrop-constants.js';
export * from './backdrop.js';

export function defineBackdropComponent(): void {
  defineCustomElement(BackdropComponent);
}
