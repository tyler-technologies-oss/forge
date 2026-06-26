import { defineCustomElement } from '@tylertech/forge-core';
import { defineCalendarComponent } from '../calendar/index.js';
import { defineOverlayComponent } from '../overlay/index.js';
import { defineTextFieldComponent } from '../text-field/index.js';
import { defineTimePickerComponent } from '../time-picker/index.js';
import { DateTimePickerComponent } from './date-time-picker.js';

export * from './date-time-picker.js';
export * from './date-time-picker-constants.js';
export * from './date-time-picker-utils.js';
export * from './temporal-loader.js';

export function defineDateTimePickerComponent(): void {
  defineCalendarComponent();
  defineOverlayComponent();
  defineTimePickerComponent();
  defineTextFieldComponent();
  defineCustomElement(DateTimePickerComponent);
}
