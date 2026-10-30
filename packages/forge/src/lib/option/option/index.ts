import { defineCustomElement } from '@tylertech/forge-core';

import { OptionComponent } from './option.js';

export * from './option-config.js';
export * from './option-constants.js';
export * from './option.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/option'`). */
export function defineOptionComponent(): void {
  defineCustomElement(OptionComponent);
}
