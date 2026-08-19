import { defineCustomElement } from '@tylertech/forge-core';
import { BusyIndicatorComponent } from './busy-indicator.js';

export * from './busy-indicator.js';
export * from './busy-indicator-constants.js';

export function defineBusyIndicatorComponent(): void {
  defineCustomElement(BusyIndicatorComponent);
}
