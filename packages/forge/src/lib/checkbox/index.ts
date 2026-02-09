import { defineCustomElement } from '@tylertech/forge-core';

import { CheckboxComponent } from './checkbox.js';

export * from './checkbox-adapter.js';
export * from './checkbox-constants.js';
export * from './checkbox-core.js';
export * from './checkbox.js';
export * from './checkbox-component-delegate.js';

export function defineCheckboxComponent(): void {
  defineCustomElement(CheckboxComponent);
}
