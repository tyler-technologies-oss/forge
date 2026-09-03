import { defineCustomElement } from '@tylertech/forge-core';
import { AppLauncherLinkComponent } from './app-launcher-link.js';

export * from './app-launcher-link.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/app-launcher/app-launcher-link'`). */
export function defineAppLauncherLinkComponent(): void {
  defineCustomElement(AppLauncherLinkComponent);
}
