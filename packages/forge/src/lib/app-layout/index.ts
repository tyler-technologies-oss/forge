import { defineCustomElement } from '@tylertech/forge-core';
import { AppLayoutComponent } from './app-layout.js';

export * from './app-layout-constants.js';
export * from './app-layout.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/app-layout'`). */
export function defineAppLayoutComponent(): void {
  defineCustomElement(AppLayoutComponent);
}
