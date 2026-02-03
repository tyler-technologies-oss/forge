import { defineCustomElement } from '@tylertech/forge-core';

import { PageStateComponent } from './page-state';

export * from './page-state-constants';
export * from './page-state';

export function definePageStateComponent(): void {
  defineCustomElement(PageStateComponent);
}
