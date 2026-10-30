import { defineCustomElement } from '@tylertech/forge-core';
import { FooterComponent } from './footer.js';

export * from './footer-constants.js';
export * from './footer.js';
export * from './footer-item/index.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/footer'`). */
export function defineFooterComponent(): void {
  defineCustomElement(FooterComponent);
}
