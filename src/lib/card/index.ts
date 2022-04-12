import { defineCustomElement } from '@tylertech/forge-core';

import { CardComponent } from './card';

export * from './card-constants';
export * from './card';

export function defineCardComponent(): void {
  defineCustomElement(CardComponent);
}
