import { defineCustomElement } from '@tylertech/forge-core';

import { ButtonToggleComponent } from './button-toggle';

export * from './button-toggle-adapter';
export * from './button-toggle-constants';
export * from './button-toggle-foundation';
export * from './button-toggle';

export function defineButtonToggleComponent(): void {
  defineCustomElement(ButtonToggleComponent);
}
