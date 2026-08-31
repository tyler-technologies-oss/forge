import { defineCustomElement } from '@tylertech/forge-core';

import { SkipLinkComponent } from './skip-link.js';

export * from './skip-link-constants.js';
export * from './skip-link.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/skip-link'`). */
export function defineSkipLinkComponent(): void {
  defineCustomElement(SkipLinkComponent);
}
