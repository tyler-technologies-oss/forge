import { defineCustomElement } from '@tylertech/forge-core';
import { tylIconInsertInvitation } from '@tylertech/tyler-icons';
import { defineDateTimePickerComponent } from '../date-time-picker/index.js';
import { IconRegistry, defineIconComponent } from '../icon/index.js';
import { defineIconButtonComponent } from '../icon-button/index.js';
import { defineTextFieldComponent } from '../text-field/index.js';
import { DateTimeFieldComponent } from './date-time-field.js';

export * from './date-time-field.js';
export * from './date-time-field-constants.js';
export * from './date-time-field-component-delegate.js';

export function defineDateTimeFieldComponent(): void {
  defineTextFieldComponent();
  defineIconComponent();
  defineIconButtonComponent();
  defineDateTimePickerComponent();
  IconRegistry.define(tylIconInsertInvitation);
  defineCustomElement(DateTimeFieldComponent);
}
