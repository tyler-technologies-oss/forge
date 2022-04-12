import { defineCustomElement } from '@tylertech/forge-core';

import { ChipFieldComponent } from './chip-field';

export * from './chip-field-adapter';
export * from './chip-field-component-delegate';
export * from './chip-field-constants';
export * from './chip-field-foundation';
export * from './chip-field';

export function defineChipFieldComponent(): void {
  defineCustomElement(ChipFieldComponent);
}
