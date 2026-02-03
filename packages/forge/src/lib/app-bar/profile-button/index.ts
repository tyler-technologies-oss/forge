import { defineCustomElement } from '@tylertech/forge-core';

import { AppBarProfileButtonComponent } from './app-bar-profile-button';

export * from './app-bar-profile-button-adapter';
export * from './app-bar-profile-button-constants';
export * from './app-bar-profile-button-core';
export * from './app-bar-profile-button';

export function defineAppBarProfileButtonComponent(): void {
  defineCustomElement(AppBarProfileButtonComponent);
}
