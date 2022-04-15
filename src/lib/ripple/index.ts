import { defineCustomElement } from '@tylertech/forge-core';

import { RippleComponent } from './ripple';

export * from './ripple-adapter';
export * from './ripple-constants';
export * from './ripple-foundation';
export * from './ripple';
export * from './forge-ripple';

export function defineRippleComponent(): void {
  defineCustomElement(RippleComponent);
}
