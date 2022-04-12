import { defineCustomElement } from '@tylertech/forge-core';
import { ButtonComponent } from './button';

export * from './button';
export * from './button-constants';

export function defineButtonComponent(): void {
  defineCustomElement(ButtonComponent);
}
