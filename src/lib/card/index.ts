import { defineCustomElement } from '@tylertech/forge-core';
import { CardComponent } from './card';

export * from './card';
export * from './card-constants';

export function defineCardComponent(): void {
  defineCustomElement(CardComponent);
}
