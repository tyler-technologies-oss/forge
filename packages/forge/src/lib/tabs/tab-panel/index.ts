import { defineCustomElement } from '@tylertech/forge-core';
import { TabPanelComponent } from './tab-panel.js';

export * from './tab-panel.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/tab-panel'`). */
export function defineTabPanelComponent(): void {
  defineCustomElement(TabPanelComponent);
}
