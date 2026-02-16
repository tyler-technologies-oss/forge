import { defineCustomElement } from '@tylertech/forge-core';
import { CardComponent } from './card.js';

export * from './card.js';
export * from './card-constants.js';

export function defineCardComponent(): void {
  defineCustomElement(CardComponent);
}
