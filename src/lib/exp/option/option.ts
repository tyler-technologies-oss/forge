import { CustomElement, attachShadowTemplate, ICustomElement } from '@tylertech/forge-core';
import { OptionAdapterExp } from './option-adapter';
import { OptionFoundationExp } from './option-foundation';
import { OPTION_CONSTANTS_EXP } from './option-constants';
import { BaseComponent, IBaseComponent } from '../../core';

import template from './option.html';
import styles from './option.scss';

export interface IOptionComponentExp extends IBaseComponent {

}

declare global {
  interface HTMLElementTagNameMap {
    'forge-option-exp': IOptionComponentExp;
  }
}

@CustomElement({
  name: OPTION_CONSTANTS_EXP.elementName
})
export class OptionComponentExp extends BaseComponent implements IOptionComponentExp {
  public static get observedAttributes(): string[] {
    return [];
  }

  private _foundation: OptionFoundationExp;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new OptionFoundationExp(new OptionAdapterExp(this));
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
