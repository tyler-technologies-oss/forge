import { defineCustomElement } from '@tylertech/forge-core';

import { PopoverComponent } from './popover.js';

export * from './popover-adapter.js';
export * from './popover-constants.js';
export * from './popover-core.js';
export * from './popover.js';

export function definePopoverComponent(): void {
  defineCustomElement(PopoverComponent);
}
