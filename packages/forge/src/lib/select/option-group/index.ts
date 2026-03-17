import { defineCustomElement } from '@tylertech/forge-core';

import { OptionGroupComponent } from './option-group.js';

export * from './option-group-constants.js';
export * from './option-group.js';

export function defineOptionGroupComponent(): void {
  defineCustomElement(OptionGroupComponent);
}
