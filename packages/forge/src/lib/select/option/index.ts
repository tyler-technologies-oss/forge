import { defineCustomElement } from '@tylertech/forge-core';

import { OptionComponent } from './option';

export * from './option-adapter';
export * from './option-constants';
export * from './option-core';
export * from './option';

export function defineOptionComponent(): void {
  defineCustomElement(OptionComponent);
}
