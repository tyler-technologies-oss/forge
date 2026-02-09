import { defineCustomElement } from '@tylertech/forge-core';

import { TooltipComponent } from './tooltip.js';

export * from './tooltip-adapter.js';
export * from './tooltip-constants.js';
export * from './tooltip-core.js';
export * from './tooltip.js';

export function defineTooltipComponent(): void {
  defineCustomElement(TooltipComponent);
}
