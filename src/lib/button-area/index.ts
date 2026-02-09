import { defineCustomElement } from '@tylertech/forge-core';

import { ButtonAreaComponent } from './button-area';

export * from './button-area-constants';
export * from './button-area';

export function defineButtonAreaComponent(): void {
  defineCustomElement(ButtonAreaComponent);
}
