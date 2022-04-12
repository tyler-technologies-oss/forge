import { defineCustomElement } from '@tylertech/forge-core';

import { ProductIconComponent } from './product-icon';

export * from './product-icon-adapter';
export * from './product-icon-constants';
export * from './product-icon-foundation';
export * from './product-icon';

export function defineProductIconComponent(): void {
  defineCustomElement(ProductIconComponent);
}
