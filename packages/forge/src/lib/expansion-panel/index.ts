import { defineCustomElement } from '@tylertech/forge-core';

import { ExpansionPanelComponent } from './expansion-panel';

export * from './expansion-panel-adapter';
export * from './expansion-panel-constants';
export * from './expansion-panel-core';
export * from './expansion-panel';

export function defineExpansionPanelComponent(): void {
  defineCustomElement(ExpansionPanelComponent);
}
