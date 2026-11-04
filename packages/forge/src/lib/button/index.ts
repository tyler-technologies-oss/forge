import { defineCustomElement } from '@tylertech/forge-core';
import { ButtonComponent } from './button.js';

export * from './button.js';
export * from './button-component-delegate.js';
export * from './button-constants.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/button'`). */
export function defineButtonComponent(): void {
  defineCustomElement(ButtonComponent);
}
