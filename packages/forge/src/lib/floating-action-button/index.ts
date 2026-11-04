import { defineCustomElement } from '@tylertech/forge-core';

import { FloatingActionButtonComponent } from './floating-action-button.js';

export * from './floating-action-button.js';
export * from './floating-action-button-component-delegate.js';
export * from './floating-action-button-constants.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/floating-action-button'`). */
export function defineFloatingActionButtonComponent(): void {
  defineCustomElement(FloatingActionButtonComponent);
}
