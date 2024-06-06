import { defineCustomElement } from '@tylertech/forge-core';
import { ButtonComponent } from './button';

export * from './button';
export * from './button-adapter';
export * from './button-component-delegate';
export * from './button-constants';
export * from './button-core';

export function defineButtonComponent(): void {
  defineCustomElement(ButtonComponent);
}
