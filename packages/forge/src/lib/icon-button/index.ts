import { defineCustomElement } from '@tylertech/forge-core';

import { IconButtonComponent } from './icon-button.js';

export * from './icon-button.js';
export * from './icon-button-component-delegate.js';
export * from './icon-button-constants.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/icon-button'`). */
export function defineIconButtonComponent(): void {
  defineCustomElement(IconButtonComponent);
}
