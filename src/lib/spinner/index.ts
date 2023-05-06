import { defineCustomElement } from '@tylertech/forge-core';

import { SpinnerComponent } from './spinner';

export * from './spinner-adapter';
export * from './spinner-constants';
export * from './spinner-foundation';
export * from './spinner';

export function defineSpinnerComponent(): void {
  defineCustomElement(SpinnerComponent);
}
