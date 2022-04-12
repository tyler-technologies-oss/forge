import { defineCustomElement } from '@tylertech/forge-core';

import { TooltipComponent } from './tooltip';

export * from './tooltip-adapter';
export * from './tooltip-constants';
export * from './tooltip-foundation';
export * from './tooltip-utils';
export * from './tooltip';

export function defineTooltipComponent(): void {
  defineCustomElement(TooltipComponent);
}
