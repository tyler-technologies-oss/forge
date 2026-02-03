import { defineCustomElement } from '@tylertech/forge-core';

import { PopoverComponent } from './popover';

export * from './popover-adapter';
export * from './popover-constants';
export * from './popover-core';
export * from './popover';

export function definePopoverComponent(): void {
  defineCustomElement(PopoverComponent);
}
