import { defineCustomElement } from '@tylertech/forge-core';
import { FocusIndicatorComponent } from './focus-indicator.js';

export * from './focus-indicator-constants.js';
export * from './focus-indicator.js';

export function defineFocusIndicatorComponent(): void {
  defineCustomElement(FocusIndicatorComponent);
}
