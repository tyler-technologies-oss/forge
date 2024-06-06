import { defineCustomElement } from '@tylertech/forge-core';
import { DatePickerComponent } from './date-picker';

export * from './date-picker';
export * from './date-picker-adapter';
export * from './date-picker-component-delegate';
export * from './date-picker-constants';
export * from './date-picker-core';

export function defineDatePickerComponent(): void {
  defineCustomElement(DatePickerComponent);
}
