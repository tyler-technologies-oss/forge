import { defineCustomElement } from '@tylertech/forge-core';
import { AppBarMenuButtonComponent } from './app-bar-menu-button';

export * from './app-bar-menu-button-constants';
export * from './app-bar-menu-button';

export function defineAppBarMenuButtonComponent(): void {
  defineCustomElement(AppBarMenuButtonComponent);
}
