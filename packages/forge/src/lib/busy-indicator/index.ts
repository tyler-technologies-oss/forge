import { defineCustomElement } from '@tylertech/forge-core';
import { BusyIndicatorComponent } from './busy-indicator.js';

export * from './busy-indicator.js';
export * from './busy-indicator-constants.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/busy-indicator'`). */
export function defineBusyIndicatorComponent(): void {
  defineCustomElement(BusyIndicatorComponent);
}
