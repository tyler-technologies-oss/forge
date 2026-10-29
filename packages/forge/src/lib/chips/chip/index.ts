import { defineCustomElement } from '@tylertech/forge-core';

import { ChipComponent } from './chip.js';

export * from './chip-constants.js';
export * from './chip.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/chips'`). */
export function defineChipComponent(): void {
  defineCustomElement(ChipComponent);
}
