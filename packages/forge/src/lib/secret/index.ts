import { defineCustomElement } from '@tylertech/forge-core';

import { SecretComponent } from './secret.js';

export * from './secret.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/secret'`). */
export function defineSecretComponent(): void {
  defineCustomElement(SecretComponent);
}
