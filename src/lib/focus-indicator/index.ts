import { defineCustomElement } from '@tylertech/forge-core';
import { FocusIndicatorComponent } from './focus-indicator';

export * from './focus-indicator-adapter';
export * from './focus-indicator-constants';
export * from './focus-indicator-foundation';
export * from './focus-indicator';

export function defineFocusIndicatorComponent(): void {
  defineCustomElement(FocusIndicatorComponent);
}
