import { defineCustomElement } from '@tylertech/forge-core';

import { ColorPickerComponent } from './color-picker.js';

export * from './color-picker-adapter.js';
export * from './color-picker-constants.js';
export * from './color-picker-core.js';
export * from './color-picker.js';

export function defineColorPickerComponent(): void {
  defineCustomElement(ColorPickerComponent);
}
