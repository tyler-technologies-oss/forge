import { defineCustomElement } from '@tylertech/forge-core';
import { TextFieldComponent } from './text-field.js';

export * from './text-field.js';
export * from './text-field-adapter.js';
export * from './text-field-constants.js';
export * from './text-field-core.js';
export * from './text-field-component-delegate.js';

export function defineTextFieldComponent(): void {
  defineCustomElement(TextFieldComponent);
}
