import { defineCustomElement } from '@tylertech/forge-core';
import { OpenIconComponent } from './open-icon.js';

export * from './open-icon-constants.js';
export * from './open-icon.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/open-icon'`). */
export function defineOpenIconComponent(): void {
  defineCustomElement(OpenIconComponent);
}
