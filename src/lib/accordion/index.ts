import { defineCustomElement } from '@tylertech/forge-core';

import { AccordionComponent } from './accordion';

export * from './accordion-adapter';
export * from './accordion-constants';
export * from './accordion-core';
export * from './accordion';

export function defineAccordionComponent(): void {
  defineCustomElement(AccordionComponent);
}
