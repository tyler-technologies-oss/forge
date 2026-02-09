import { defineCustomElement } from '@tylertech/forge-core';
import { DatePickerComponent } from './date-picker.js';

export * from './date-picker.js';
export * from './date-picker-adapter.js';
export * from './date-picker-component-delegate.js';
export * from './date-picker-constants.js';
export * from './date-picker-core.js';

export function defineDatePickerComponent(): void {
  defineCustomElement(DatePickerComponent);
}
