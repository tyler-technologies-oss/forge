import { defineCustomElement } from '@tylertech/forge-core';

import { OverlayComponent } from './overlay.js';

export * from './overlay-adapter.js';
export * from './overlay-constants.js';
export * from './overlay-core.js';
export * from './overlay.js';

export function defineOverlayComponent(): void {
  defineCustomElement(OverlayComponent);
}
