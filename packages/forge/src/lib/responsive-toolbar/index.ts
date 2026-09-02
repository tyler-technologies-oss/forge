import { defineCustomElement } from '@tylertech/forge-core';
import { ResponsiveToolbarComponent } from './responsive-toolbar.js';

export * from './responsive-toolbar.js';
export * from './responsive-toolbar-constants.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/responsive-toolbar'`). */
export function defineResponsiveToolbarComponent(): void {
  defineCustomElement(ResponsiveToolbarComponent);
}
