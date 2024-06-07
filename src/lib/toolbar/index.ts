import { defineCustomElement } from '@tylertech/forge-core';

import { ToolbarComponent } from './toolbar';

export * from './toolbar-constants';
export * from './toolbar';

export function defineToolbarComponent(): void {
  defineCustomElement(ToolbarComponent);
}
