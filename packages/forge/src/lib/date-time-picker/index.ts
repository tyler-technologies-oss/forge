import { defineCustomElement } from '@tylertech/forge-core';
import { tylIconInsertInvitation } from '@tylertech/tyler-icons';
import { defineCalendarComponent } from '../calendar/index.js';
import { IconRegistry, defineIconComponent } from '../icon/index.js';
import { defineIconButtonComponent } from '../icon-button/index.js';
import { definePopoverComponent } from '../popover/index.js';
import { defineTextFieldComponent } from '../text-field/index.js';
import { defineTimePickerComponent } from '../time-picker/index.js';
import { DateTimePickerComponent } from './date-time-picker.js';

export * from './date-time-picker.js';
export * from './date-time-picker-constants.js';
export * from './date-time-picker-utils.js';

export function defineDateTimePickerComponent(): void {
  defineCalendarComponent();
  defineTimePickerComponent();
  defineTextFieldComponent();
  defineIconComponent();
  defineIconButtonComponent();
  definePopoverComponent();
  IconRegistry.define(tylIconInsertInvitation);
  defineCustomElement(DateTimePickerComponent);
}
