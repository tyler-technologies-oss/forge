import { defineCustomElement } from '@tylertech/forge-core';
import { IconComponent } from './icon.js';

export * from './icon-constants.js';
export * from './icon-registry.js';
export * from './icon-utils.js';
export * from './icon.js';
export * from './icon-component-delegate.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/icon'`). */
export function defineIconComponent(): void {
  defineCustomElement(IconComponent);
}
