import { defineCustomElement } from '@tylertech/forge-core';

import { InlineMessageComponent } from './inline-message';

export * from './inline-message-constants';
export * from './inline-message';

export function defineInlineMessageComponent(): void {
  defineCustomElement(InlineMessageComponent);
}
