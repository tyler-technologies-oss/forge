import { defineCustomElement } from '@tylertech/forge-core';

import { RadioGroupComponent } from './radio-group.js';

export * from './radio-group-adapter.js';
export * from './radio-group-constants.js';
export * from './radio-group-core.js';
export * from './radio-group.js';

export function defineRadioGroupComponent(): void {
  defineCustomElement(RadioGroupComponent);
}
