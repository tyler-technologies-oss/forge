import { defineCustomElement } from '@tylertech/forge-core';
import { AppBarComponent } from './app-bar.js';

export * from './app-bar-adapter.js';
export * from './app-bar-constants.js';
export * from './app-bar-core.js';
export * from './app-bar.js';

export function defineAppBarComponent(): void {
  defineCustomElement(AppBarComponent);
}
