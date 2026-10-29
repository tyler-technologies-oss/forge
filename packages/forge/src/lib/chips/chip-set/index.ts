import { defineCustomElement } from '@tylertech/forge-core';

import { ChipSetComponent } from './chip-set.js';

export * from './chip-set-constants.js';
export * from './chip-set.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/chips'`). */
export function defineChipSetComponent(): void {
  defineCustomElement(ChipSetComponent);
}
