import { defineCustomElement } from '@tylertech/forge-core';

import { ViewComponent } from './view.js';

export * from './view-constants.js';
export * from './view.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/view-switcher'`). */
export function defineViewComponent(): void {
  defineCustomElement(ViewComponent);
}
