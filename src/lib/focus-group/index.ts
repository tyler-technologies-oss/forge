import { defineCustomElement } from '@tylertech/forge-core';
import { FocusGroupComponent } from './focus-group';

export * from './focus-group';
export * from './focus-group-controller';

export function defineFocusGroupComponent(): void {
  defineCustomElement(FocusGroupComponent);
}
