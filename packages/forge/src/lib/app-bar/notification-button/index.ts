import { defineCustomElement } from '@tylertech/forge-core';

import { AppBarNotificationButtonComponent } from './app-bar-notification-button.js';

export * from './app-bar-notification-button-adapter.js';
export * from './app-bar-notification-button-constants.js';
export * from './app-bar-notification-button-core.js';
export * from './app-bar-notification-button.js';

export function defineAppBarNotificationButtonComponent(): void {
  defineCustomElement(AppBarNotificationButtonComponent);
}
