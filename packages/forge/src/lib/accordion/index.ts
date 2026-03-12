import { defineCustomElement } from '@tylertech/forge-core';

import { AccordionComponent } from './accordion.js';

export * from './accordion-constants.js';
export * from './accordion.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/accordion'`). */
export function defineAccordionComponent(): void {
  defineCustomElement(AccordionComponent);
}
