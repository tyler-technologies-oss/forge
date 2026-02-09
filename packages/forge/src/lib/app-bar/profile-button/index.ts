import { defineCustomElement } from '@tylertech/forge-core';

import { AppBarProfileButtonComponent } from './app-bar-profile-button.js';

export * from './app-bar-profile-button-adapter.js';
export * from './app-bar-profile-button-constants.js';
export * from './app-bar-profile-button-core.js';
export * from './app-bar-profile-button.js';

export function defineAppBarProfileButtonComponent(): void {
  defineCustomElement(AppBarProfileButtonComponent);
}
