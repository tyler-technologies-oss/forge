import { defineCustomElement } from '@tylertech/forge-core';

import { FloatingActionButtonComponent } from './floating-action-button';

export * from './floating-action-button';
export * from './floating-action-button-adapter';
export * from './floating-action-button-component-delegate';
export * from './floating-action-button-constants';
export * from './floating-action-button-foundation';

export function defineFloatingActionButtonComponent(): void {
  defineCustomElement(FloatingActionButtonComponent);
}
