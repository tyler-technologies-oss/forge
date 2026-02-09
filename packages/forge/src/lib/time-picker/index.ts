import { defineCustomElement } from '@tylertech/forge-core';

import { TimePickerComponent } from './time-picker.js';

export * from './time-picker-adapter.js';
export * from './time-picker-component-delegate.js';
export * from './time-picker-constants.js';
export * from './time-picker-core.js';
export * from './time-picker-utils.js';
export * from './time-picker.js';

export function defineTimePickerComponent(): void {
  defineCustomElement(TimePickerComponent);
}
