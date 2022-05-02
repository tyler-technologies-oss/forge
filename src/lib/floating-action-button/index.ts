import { defineCustomElement } from '@tylertech/forge-core';

import { FloatingActionButton } from './floating-action-button';

export * from './floating-action-button-constants';
export * from './floating-action-button';
export * from './floating-action-button-component-delegate';

export function defineFloatingActionButtonComponent(): void {
  defineCustomElement(FloatingActionButton);
}
