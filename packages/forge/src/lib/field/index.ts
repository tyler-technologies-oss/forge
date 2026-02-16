import { defineCustomElement } from '@tylertech/forge-core';
import { FieldComponent } from './field.js';

export * from './field.js';
export * from './field-adapter.js';
export * from './field-constants.js';
export * from './field-core.js';
export * from './base/index.js';

export function defineFieldComponent(): void {
  defineCustomElement(FieldComponent);
}
