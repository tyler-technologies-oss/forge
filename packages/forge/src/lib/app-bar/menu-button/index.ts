import { defineCustomElement } from '@tylertech/forge-core';
import { AppBarMenuButtonComponent } from './app-bar-menu-button.js';

export * from './app-bar-menu-button-constants.js';
export * from './app-bar-menu-button.js';

export function defineAppBarMenuButtonComponent(): void {
  defineCustomElement(AppBarMenuButtonComponent);
}
