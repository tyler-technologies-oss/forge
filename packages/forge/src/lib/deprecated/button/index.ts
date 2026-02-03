import { defineCustomElement } from '@tylertech/forge-core';
import { DeprecatedButtonComponent } from './deprecated-button';

export * from './deprecated-button';
export * from './deprecated-button-component-delegate';
export * from './deprecated-button-constants';

/**
 * @deprecated Use `defineButtonComponent()` instead for the `<forge-button>` element.
 */
export function defineDeprecatedButtonComponent(): void {
  defineCustomElement(DeprecatedButtonComponent);
}
