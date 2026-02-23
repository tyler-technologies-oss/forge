import { defineCustomElement } from '@tylertech/forge-core';

import { AccordionComponent } from './accordion.js';

export * from './accordion-constants.js';
export * from './accordion.js';

export function defineAccordionComponent(): void {
  defineCustomElement(AccordionComponent);
}
