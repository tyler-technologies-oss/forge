import { defineCustomElement } from '@tylertech/forge-core';
import { BackdropComponent } from './backdrop.js';

export * from './backdrop-constants.js';
export * from './backdrop.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/backdrop'`). */
export function defineBackdropComponent(): void {
  defineCustomElement(BackdropComponent);
}
