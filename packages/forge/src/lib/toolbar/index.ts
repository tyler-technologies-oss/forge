import { defineCustomElement } from '@tylertech/forge-core';

import { ToolbarComponent } from './toolbar.js';

export * from './toolbar-constants.js';
export * from './toolbar.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/toolbar'`). */
export function defineToolbarComponent(): void {
  defineCustomElement(ToolbarComponent);
}
