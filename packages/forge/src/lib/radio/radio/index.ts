import { defineCustomElement } from '@tylertech/forge-core';

import { RadioComponent } from './radio.js';

export * from './radio-adapter.js';
export * from './radio-constants.js';
export * from './radio-core.js';
export * from './radio.js';

export function defineRadioComponent(): void {
  defineCustomElement(RadioComponent);
}
