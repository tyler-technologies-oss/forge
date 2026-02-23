import { defineCustomElement } from '@tylertech/forge-core';

import { ExpansionPanelComponent } from './expansion-panel.js';

export * from './expansion-panel-constants.js';
export * from './expansion-panel.js';

export function defineExpansionPanelComponent(): void {
  defineCustomElement(ExpansionPanelComponent);
}
