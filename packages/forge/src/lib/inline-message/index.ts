import { defineCustomElement } from '@tylertech/forge-core';

import { InlineMessageComponent } from './inline-message.js';

export * from './inline-message-constants.js';
export * from './inline-message.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/inline-message'`). */
export function defineInlineMessageComponent(): void {
  defineCustomElement(InlineMessageComponent);
}
