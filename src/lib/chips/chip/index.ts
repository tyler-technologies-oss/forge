import { defineCustomElement } from '@tylertech/forge-core';

import { ChipComponent } from './chip';

export * from './chip-adapter';
export * from './chip-constants';
export * from './chip-foundation';
export * from './chip';

export function defineChipComponent(): void {
  defineCustomElement(ChipComponent);
}
