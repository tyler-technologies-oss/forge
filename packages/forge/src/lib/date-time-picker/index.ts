import { defineCustomElement } from '@tylertech/forge-core';
import { defineBottomSheetComponent } from '../bottom-sheet/index.js';
import { defineButtonComponent } from '../button/index.js';
import { defineCalendarComponent } from '../calendar/index.js';
import { definePopoverComponent } from '../popover/index.js';
import { defineTextFieldComponent } from '../text-field/index.js';
import { defineTimePickerComponent } from '../time-picker/index.js';
import { DateTimePickerComponent } from './date-time-picker.js';

export * from './date-time-picker.js';
export * from './date-time-picker-constants.js';
export * from './date-time-picker-utils.js';
export * from './temporal-loader.js';

export function defineDateTimePickerComponent(): void {
  defineBottomSheetComponent();
  defineButtonComponent();
  defineCalendarComponent();
  definePopoverComponent();
  defineTimePickerComponent();
  defineTextFieldComponent();
  defineCustomElement(DateTimePickerComponent);
}
