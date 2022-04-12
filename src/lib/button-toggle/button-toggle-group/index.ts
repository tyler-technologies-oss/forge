import { defineCustomElement } from '@tylertech/forge-core';

import { ButtonToggleGroupComponent } from './button-toggle-group';

export * from './button-toggle-group-adapter';
export * from './button-toggle-group-constants';
export * from './button-toggle-group-foundation';
export * from './button-toggle-group';

export function defineButtonToggleGroupComponent(): void {
  defineCustomElement(ButtonToggleGroupComponent);
}
