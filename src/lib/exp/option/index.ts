import { defineCustomElement } from '@tylertech/forge-core';

import { OptionComponentExp } from './option';

export * from './option-adapter';
export * from './option-constants';
export * from './option-foundation';
export * from './option';

export function defineOptionComponentExp(): void {
  defineCustomElement(OptionComponentExp);
}
