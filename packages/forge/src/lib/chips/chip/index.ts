import { defineCustomElement } from '@tylertech/forge-core';

import { ChipComponent } from './chip.js';

export * from './chip-adapter.js';
export * from './chip-constants.js';
export * from './chip-core.js';
export * from './chip.js';

export function defineChipComponent(): void {
  defineCustomElement(ChipComponent);
}
