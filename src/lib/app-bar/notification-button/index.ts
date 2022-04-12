import { defineCustomElement } from '@tylertech/forge-core';

import { AppBarNotificationButtonComponent } from './app-bar-notification-button';

export * from './app-bar-notification-button-adapter';
export * from './app-bar-notification-button-constants';
export * from './app-bar-notification-button-foundation';
export * from './app-bar-notification-button';

export function defineAppBarNotificationButtonComponent(): void {
  defineCustomElement(AppBarNotificationButtonComponent);
}
