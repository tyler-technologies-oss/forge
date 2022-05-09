import { defineCustomElement } from '@tylertech/forge-core';

import { QuantityFieldComponent } from './quantity-field';

export * from './quantity-field-adapter';
export * from './quantity-field-constants';
export * from './quantity-field-foundation';
export * from './quantity-field';
export * from './quantity-field-component-delegate';

export function defineQuantityFieldComponent(): void {
  defineCustomElement(QuantityFieldComponent);
}
