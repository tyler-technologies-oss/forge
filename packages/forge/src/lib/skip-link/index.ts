import { defineCustomElement } from '@tylertech/forge-core';

import { SkipLinkComponent } from './skip-link';

export * from './skip-link-constants';
export * from './skip-link';

export function defineSkipLinkComponent(): void {
  defineCustomElement(SkipLinkComponent);
}
