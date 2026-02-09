import { defineCustomElement } from '@tylertech/forge-core';

import { ChipFieldComponent } from './chip-field.js';

export * from './chip-field-adapter.js';
export * from './chip-field-component-delegate.js';
export * from './chip-field-constants.js';
export * from './chip-field-core.js';
export * from './chip-field.js';

export function defineChipFieldComponent(): void {
  defineCustomElement(ChipFieldComponent);
}
