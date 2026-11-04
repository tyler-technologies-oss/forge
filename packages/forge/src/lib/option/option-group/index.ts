import { defineCustomElement } from '@tylertech/forge-core';

import { OptionGroupComponent } from './option-group.js';

export * from './option-group-config.js';
export * from './option-group-constants.js';
export * from './option-group.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/option-group'`). */
export function defineOptionGroupComponent(): void {
  defineCustomElement(OptionGroupComponent);
}
