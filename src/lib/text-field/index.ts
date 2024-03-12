import { defineCustomElement } from '@tylertech/forge-core';
import { TextFieldComponent } from './text-field';

export * from './text-field';
export * from './text-field-adapter';
export * from './text-field-constants';
export * from './text-field-foundation';
export * from './text-field-component-delegate';

export function defineTextFieldComponent(): void {
  defineCustomElement(TextFieldComponent);
}
