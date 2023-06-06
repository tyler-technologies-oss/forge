import { CustomElement, attachShadowTemplate, ICustomElement } from '@tylertech/forge-core';
import { FormFieldAdapter } from './form-field-adapter';
import { FormFieldFoundation } from './form-field-foundation';
import { FORM_FIELD_CONSTANTS } from './form-field-constants';

import template from './form-field.html';
import styles from './form-field.scss';

export interface IFormFieldComponent extends ICustomElement {

}

declare global {
  interface HTMLElementTagNameMap {
    'forge-form-field-exp': IFormFieldComponent;
  }
}

@CustomElement({
  name: FORM_FIELD_CONSTANTS.elementName
})
export class FormFieldComponent extends HTMLElement implements IFormFieldComponent {
  public static get observedAttributes(): string[] {
    return [];
  }

  private _foundation: FormFieldFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new FormFieldFoundation(new FormFieldAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {

  }
}
