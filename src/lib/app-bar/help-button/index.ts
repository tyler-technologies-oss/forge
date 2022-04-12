import { defineCustomElement } from '@tylertech/forge-core';

import { AppBarHelpButtonComponent } from './app-bar-help-button';

export * from './app-bar-help-button-adapter';
export * from './app-bar-help-button-constants';
export * from './app-bar-help-button-foundation';
export * from './app-bar-help-button';

export function defineAppBarHelpButtonComponent(): void {
  defineCustomElement(AppBarHelpButtonComponent);
}
