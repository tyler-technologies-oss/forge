import { defineCustomElement } from '@tylertech/forge-core';
import { DateRangePickerComponent } from './date-range-picker.js';

export * from './date-range-picker.js';
export * from './date-range-picker-adapter.js';
export * from './date-range-picker-constants.js';
export * from './date-range-picker-core.js';
export * from './date-range-picker-component-delegate.js';

export function defineDateRangePickerComponent(): void {
  defineCustomElement(DateRangePickerComponent);
}
