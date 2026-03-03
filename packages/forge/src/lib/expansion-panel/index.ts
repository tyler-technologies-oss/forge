import { defineCustomElement } from '@tylertech/forge-core';

import { ExpansionPanelComponent } from './expansion-panel.js';

export * from './expansion-panel-constants.js';
export * from './expansion-panel.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/expansion-panel'`). */
export function defineExpansionPanelComponent(): void {
  defineCustomElement(ExpansionPanelComponent);
}
