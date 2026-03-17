import { defineCustomElement } from '@tylertech/forge-core';

import { ViewComponent } from './view.js';

export * from './view-constants.js';
export * from './view.js';

export function defineViewComponent(): void {
  defineCustomElement(ViewComponent);
}
