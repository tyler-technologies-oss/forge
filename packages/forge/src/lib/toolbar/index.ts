import { defineCustomElement } from '@tylertech/forge-core';

import { ToolbarComponent } from './toolbar.js';

export * from './toolbar-constants.js';
export * from './toolbar.js';

export function defineToolbarComponent(): void {
  defineCustomElement(ToolbarComponent);
}
