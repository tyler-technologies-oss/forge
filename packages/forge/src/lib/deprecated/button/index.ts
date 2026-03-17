import { defineCustomElement } from '@tylertech/forge-core';
import { DeprecatedButtonComponent } from './deprecated-button.js';

export * from './deprecated-button.js';
export * from './deprecated-button-component-delegate.js';
export * from './deprecated-button-constants.js';

/**
 * @deprecated Use `defineButtonComponent()` instead for the `<forge-button>` element.
 */
export function defineDeprecatedButtonComponent(): void {
  defineCustomElement(DeprecatedButtonComponent);
}
