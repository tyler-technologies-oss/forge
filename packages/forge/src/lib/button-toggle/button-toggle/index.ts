import { defineCustomElement } from '@tylertech/forge-core';

import { ButtonToggleComponent } from './button-toggle.js';

export * from './button-toggle-adapter.js';
export * from './button-toggle-constants.js';
export * from './button-toggle-core.js';
export * from './button-toggle.js';

export function defineButtonToggleComponent(): void {
  defineCustomElement(ButtonToggleComponent);
}
