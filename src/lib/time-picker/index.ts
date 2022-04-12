import { defineCustomElement } from '@tylertech/forge-core';

import { TimePickerComponent } from './time-picker';

export * from './time-picker-adapter';
export * from './time-picker-constants';
export * from './time-picker-foundation';
export * from './time-picker-utils';
export * from './time-picker';

export function defineTimePickerComponent(): void {
  defineCustomElement(TimePickerComponent);
}
