import { defineCustomElement } from '@tylertech/forge-core';

import { ButtonAreaComponent } from './button-area.js';

export * from './button-area-adapter.js';
export * from './button-area-constants.js';
export * from './button-area-core.js';
export * from './button-area.js';

export function defineButtonAreaComponent(): void {
  defineCustomElement(ButtonAreaComponent);
}
