import { defineCustomElement } from '@tylertech/forge-core';

import { ChipSetComponent } from './chip-set';

export * from './chip-set-constants';
export * from './chip-set';

export function defineChipSetComponent(): void {
  defineCustomElement(ChipSetComponent);
}
