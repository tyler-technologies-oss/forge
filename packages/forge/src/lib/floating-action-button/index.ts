import { defineCustomElement } from '@tylertech/forge-core';

import { FloatingActionButtonComponent } from './floating-action-button.js';

export * from './floating-action-button.js';
export * from './floating-action-button-adapter.js';
export * from './floating-action-button-component-delegate.js';
export * from './floating-action-button-constants.js';
export * from './floating-action-button-core.js';

export function defineFloatingActionButtonComponent(): void {
  defineCustomElement(FloatingActionButtonComponent);
}
