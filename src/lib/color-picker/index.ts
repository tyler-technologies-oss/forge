import { defineCustomElement } from '@tylertech/forge-core';

import { ColorPickerComponent } from './color-picker';

export * from './color-picker-adapter';
export * from './color-picker-constants';
export * from './color-picker-core';
export * from './color-picker';

export function defineColorPickerComponent(): void {
  defineCustomElement(ColorPickerComponent);
}
