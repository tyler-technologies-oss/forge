import { defineCustomElement } from '@tylertech/forge-core';
import { AppBarComponent } from './app-bar';

export * from './app-bar-adapter';
export * from './app-bar-constants';
export * from './app-bar-foundation';
export * from './app-bar';
export * from './search';
export * from './menu-button';
export * from './notification-button';
export * from './help-button';
export * from '../profile-card';
export * from './profile-button';

export function defineAppBarComponent(): void {
  defineCustomElement(AppBarComponent);
}
