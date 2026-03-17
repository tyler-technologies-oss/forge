import { defineCustomElement } from '@tylertech/forge-core';
import { DeprecatedIconButtonComponent } from './deprecated-icon-button.js';

export * from './deprecated-icon-button.js';
export * from './deprecated-icon-button-component-delegate.js';
export * from './deprecated-icon-button-constants.js';

/**
 * @deprecated Use `defineIconButtonComponent()` instead for the `<forge-icon-button>` element.
 */
export function defineDeprecatedIconButtonComponent(): void {
  defineCustomElement(DeprecatedIconButtonComponent);
}
