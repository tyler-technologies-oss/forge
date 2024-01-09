import { defineCustomElement } from '@tylertech/forge-core';

import { OverlayComponent } from './overlay';

export * from './overlay-adapter';
export * from './overlay-constants';
export * from './overlay-foundation';
export * from './overlay';

export function defineOverlayComponent(): void {
  defineCustomElement(OverlayComponent);
}
