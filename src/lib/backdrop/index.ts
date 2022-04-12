import { defineCustomElement } from '@tylertech/forge-core';

import { BackdropComponent } from './backdrop';

export * from './backdrop-adapter';
export * from './backdrop-constants';
export * from './backdrop-foundation';
export * from './backdrop';

export function defineBackdropComponent(): void {
  defineCustomElement(BackdropComponent);
}
