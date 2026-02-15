import { defineCustomElement } from '@tylertech/forge-core';

import { OptionComponent } from './option.js';

export * from './option-adapter.js';
export * from './option-constants.js';
export * from './option-core.js';
export * from './option.js';

export function defineOptionComponent(): void {
  defineCustomElement(OptionComponent);
}
