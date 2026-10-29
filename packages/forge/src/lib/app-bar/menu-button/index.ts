import { defineCustomElement } from '@tylertech/forge-core';
import { AppBarMenuButtonComponent } from './app-bar-menu-button.js';

export * from './app-bar-menu-button-constants.js';
export * from './app-bar-menu-button.js';

/** @deprecated Use a `forge-icon-button` instead. */
export function defineAppBarMenuButtonComponent(): void {
  defineCustomElement(AppBarMenuButtonComponent);
}
