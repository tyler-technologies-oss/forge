import { defineCustomElement } from '@tylertech/forge-core';

import { TooltipComponent } from './tooltip';

export * from './tooltip-adapter';
export * from './tooltip-constants';
export * from './tooltip-core';
export * from './tooltip';

export function defineTooltipComponent(): void {
  defineCustomElement(TooltipComponent);
}
