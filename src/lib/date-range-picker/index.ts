import { defineCustomElement } from '@tylertech/forge-core';
import { DateRangePickerComponent } from './date-range-picker';

export * from './date-range-picker';
export * from './date-range-picker-adapter';
export * from './date-range-picker-constants';
export * from './date-range-picker-foundation';
export * from './date-range-picker-component-delegate';

export function defineDateRangePickerComponent(): void {
  defineCustomElement(DateRangePickerComponent);
}
