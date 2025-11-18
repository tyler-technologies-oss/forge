import { defineCustomElement } from '@tylertech/forge-core';
import { SecretComponent } from './secret';

export * from './secret';

export function defineSecretComponent(): void {
  defineCustomElement(SecretComponent);
}
