import { defineCustomElement } from '@tylertech/forge-core';

import { SwitchComponent } from './switch.js';

export * from './switch-adapter.js';
export * from './switch-constants.js';
export * from './switch-core.js';
export * from './switch.js';
export * from './switch-component-delegate.js';

export function defineSwitchComponent(): void {
  defineCustomElement(SwitchComponent);
}
