import { defineCustomElement } from '@tylertech/forge-core';
import { ButtonComponent } from './button.js';

export * from './button.js';
export * from './button-adapter.js';
export * from './button-component-delegate.js';
export * from './button-constants.js';
export * from './button-core.js';

export function defineButtonComponent(): void {
  defineCustomElement(ButtonComponent);
}
