import { defineCustomElement } from '@tylertech/forge-core';
import { KbdComponent } from './kbd.js';

export * from './kbd.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/kbd'`). */
export function defineKbdComponent(): void {
  defineCustomElement(KbdComponent);
}
