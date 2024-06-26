import { defineCustomElement } from '@tylertech/forge-core';

import { SwitchComponent } from './switch';

export * from './switch-adapter';
export * from './switch-constants';
export * from './switch-core';
export * from './switch';
export * from './switch-component-delegate';

export function defineSwitchComponent(): void {
  defineCustomElement(SwitchComponent);
}
