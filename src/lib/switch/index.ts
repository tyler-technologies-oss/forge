import { defineCustomElement } from '@tylertech/forge-core';

import { SwitchComponent } from './switch';

export * from './switch-constants';
export * from './switch';

export function defineSwitchComponent(): void {
  defineCustomElement(SwitchComponent);
}
