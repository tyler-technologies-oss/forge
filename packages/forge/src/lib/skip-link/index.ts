import { defineCustomElement } from '@tylertech/forge-core';

import { SkipLinkComponent } from './skip-link.js';

export * from './skip-link-constants.js';
export * from './skip-link.js';

export function defineSkipLinkComponent(): void {
  defineCustomElement(SkipLinkComponent);
}
