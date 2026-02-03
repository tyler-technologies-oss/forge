import { defineCustomElement } from '@tylertech/forge-core';

import { OptionGroupComponent } from './option-group';

export * from './option-group-constants';
export * from './option-group';

export function defineOptionGroupComponent(): void {
  defineCustomElement(OptionGroupComponent);
}
