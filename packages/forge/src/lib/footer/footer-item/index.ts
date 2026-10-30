import { defineCustomElement } from '@tylertech/forge-core';
import { FooterItemComponent } from './footer-item.js';

export * from './footer-item-constants.js';
export * from './footer-item.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/footer/footer-item'`). */
export function defineFooterItemComponent(): void {
  defineCustomElement(FooterItemComponent);
}
