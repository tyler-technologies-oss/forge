import { defineCustomElement } from '@tylertech/forge-core';

import { RadioGroupComponent } from './radio-group';

export * from './radio-group-adapter';
export * from './radio-group-constants';
export * from './radio-group-core';
export * from './radio-group';

export function defineRadioGroupComponent(): void {
  defineCustomElement(RadioGroupComponent);
}
