import { defineCustomElement } from '@tylertech/forge-core';

import { AppBarHelpButtonComponent } from './app-bar-help-button.js';

export * from './app-bar-help-button-adapter.js';
export * from './app-bar-help-button-constants.js';
export * from './app-bar-help-button-core.js';
export * from './app-bar-help-button.js';

export function defineAppBarHelpButtonComponent(): void {
  defineCustomElement(AppBarHelpButtonComponent);
}
