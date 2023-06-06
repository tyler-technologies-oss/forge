import { defineCustomElement } from '@tylertech/forge-core';

import { FormFieldComponent } from './form-field';

export * from './form-field-adapter';
export * from './form-field-constants';
export * from './form-field-foundation';
export * from './form-field';

export function defineFormFieldComponentExp(): void {
  defineCustomElement(FormFieldComponent);
}
