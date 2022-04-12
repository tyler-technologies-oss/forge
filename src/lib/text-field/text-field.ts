import { CustomElement, attachShadowTemplate } from '@tylertech/forge-core';
import { TextFieldAdapter } from './text-field-adapter';
import { TextFieldFoundation } from './text-field-foundation';
import { TEXT_FIELD_CONSTANTS } from './text-field-constants';
import { FieldComponent, IFieldComponent } from '../field/field';

import template from './text-field.html';
import styles from './text-field.scss';

export interface ITextFieldComponent extends IFieldComponent {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-text-field': ITextFieldComponent;
  }
}

@CustomElement({
  name: TEXT_FIELD_CONSTANTS.elementName
})
export class TextFieldComponent extends FieldComponent<TextFieldFoundation> implements ITextFieldComponent {
  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new TextFieldFoundation(new TextFieldAdapter(this));
  }
}
