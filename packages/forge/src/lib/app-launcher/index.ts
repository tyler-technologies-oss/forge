import { defineCustomElement } from '@tylertech/forge-core';
import { AppLauncherComponent } from './app-launcher.js';

export * from './app-launcher-constants.js';
export * from './app-launcher.js';
export * from './app-launcher-link/index.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/app-launcher'`). */
export function defineAppLauncherComponent(): void {
  defineCustomElement(AppLauncherComponent);
}
