import { defineCustomElement } from '@tylertech/forge-core';
import { DeprecatedIconButtonComponent } from './deprecated-icon-button';

export * from './deprecated-icon-button';
export * from './deprecated-icon-button-component-delegate';
export * from './deprecated-icon-button-constants';

/**
 * @deprecated Use `defineIconButtonComponent()` instead for the `<forge-icon-button>` element.
 */
export function defineDeprecatedIconButtonComponent(): void {
  defineCustomElement(DeprecatedIconButtonComponent);
}
