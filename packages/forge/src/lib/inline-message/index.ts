import { defineCustomElement } from '@tylertech/forge-core';

import { InlineMessageComponent } from './inline-message.js';

export * from './inline-message-constants.js';
export * from './inline-message.js';

export function defineInlineMessageComponent(): void {
  defineCustomElement(InlineMessageComponent);
}
