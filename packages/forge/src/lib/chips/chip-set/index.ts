import { defineCustomElement } from '@tylertech/forge-core';

import { ChipSetComponent } from './chip-set.js';

export * from './chip-set-constants.js';
export * from './chip-set.js';

export function defineChipSetComponent(): void {
  defineCustomElement(ChipSetComponent);
}
