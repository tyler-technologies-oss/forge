import { defineCustomElement } from '@tylertech/forge-core';

import { ViewComponent } from './view';

export * from './view-constants';
export * from './view';

export function defineViewComponent(): void {
  defineCustomElement(ViewComponent);
}
