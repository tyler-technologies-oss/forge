import { defineCustomElement } from '@tylertech/forge-core';
import { FieldComponent } from './field';

export * from './field';
export * from './field-adapter';
export * from './field-constants';
export * from './field-foundation';

export function defineFieldComponent(): void {
  defineCustomElement(FieldComponent);
}
