import { CustomElement, attachShadowTemplate } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core';
import { SelectAdapterExp } from './select-adapter';
import { SELECT_CONSTANTS_EXP } from './select-constants';
import { SelectFoundationExp } from './select-foundation';
import { IconRegistry } from '../../icon';

import template from './select.html';
import styles from './select.scss';
import { ListDropdownComponent } from '../list-dropdown';
import { tylIconArrowDropDown } from '@tylertech/tyler-icons/standard';

export interface ISelectComponentExp extends IBaseComponent {

}

declare global {
  interface HTMLElementTagNameMap {
    'forge-select-exp': ISelectComponentExp;
  }
}

@CustomElement({
  name: SELECT_CONSTANTS_EXP.elementName,
  dependencies: [ListDropdownComponent]
})
export class SelectComponentExp extends BaseComponent implements ISelectComponentExp {
  public static get observedAttributes(): string[] {
    return [];
  }

  private _foundation: SelectFoundationExp;

  constructor() {
    super();
    IconRegistry.define(tylIconArrowDropDown);
    attachShadowTemplate(this, template, styles);
    this._foundation = new SelectFoundationExp(new SelectAdapterExp(this));
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
