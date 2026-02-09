import { defineCustomElement } from '@tylertech/forge-core';

import { IconButtonComponent } from './icon-button.js';

export * from './icon-button.js';
export * from './icon-button-adapter.js';
export * from './icon-button-component-delegate.js';
export * from './icon-button-constants.js';
export * from './icon-button-core.js';

export function defineIconButtonComponent(): void {
  defineCustomElement(IconButtonComponent);
}
