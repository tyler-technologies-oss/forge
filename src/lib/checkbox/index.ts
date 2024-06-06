import { defineCustomElement } from '@tylertech/forge-core';

import { CheckboxComponent } from './checkbox';

export * from './checkbox-adapter';
export * from './checkbox-constants';
export * from './checkbox-core';
export * from './checkbox';
export * from './checkbox-component-delegate';

export function defineCheckboxComponent(): void {
  defineCustomElement(CheckboxComponent);
}
