import { defineCustomElement } from '@tylertech/forge-core';
import { QuantityFieldComponent } from './quantity-field.js';

export * from './quantity-field.js';
export * from './quantity-field-constants.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/quantity-field'`). */
export function defineQuantityFieldComponent(): void {
  defineCustomElement(QuantityFieldComponent);
}
