import { defineCustomElement } from '@tylertech/forge-core';

import { ButtonToggleGroupComponent } from './button-toggle-group.js';

export * from './button-toggle-group-adapter.js';
export * from './button-toggle-group-constants.js';
export * from './button-toggle-group-core.js';
export * from './button-toggle-group.js';

export function defineButtonToggleGroupComponent(): void {
  defineCustomElement(ButtonToggleGroupComponent);
}
