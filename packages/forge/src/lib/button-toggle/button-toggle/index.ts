import { defineCustomElement } from '@tylertech/forge-core';

import { ButtonToggleComponent } from './button-toggle.js';

export * from './button-toggle-constants.js';
export * from './button-toggle.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/button-toggle'`). */
export function defineButtonToggleComponent(): void {
  defineCustomElement(ButtonToggleComponent);
}
