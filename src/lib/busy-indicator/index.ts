import { defineCustomElement } from '@tylertech/forge-core';

import { BusyIndicatorComponent } from './busy-indicator';

export * from './busy-indicator-adapter';
export * from './busy-indicator-constants';
export * from './busy-indicator-foundation';
export * from './busy-indicator';

export function defineBusyIndicatorComponent(): void {
  defineCustomElement(BusyIndicatorComponent);
}
