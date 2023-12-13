import { CustomElement, FoundationProperty, attachShadowTemplate } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core';
import { ListDropdownAdapter } from './list-dropdown-adapter';
import { LIST_DROPDOWN_CONSTANTS } from './list-dropdown-constants';
import { ListDropdownFoundation } from './list-dropdown-foundation';
import { PopoverComponent } from '../../popover/popover';
import { OptionComponentExp } from '../option';

import template from './list-dropdown.html';
import styles from './list-dropdown.scss';

export interface IListDropdownComponent extends IBaseComponent {
  open: boolean;
  targetElement: HTMLElement;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-list-dropdown': IListDropdownComponent;
  }
}

@CustomElement({
  name: LIST_DROPDOWN_CONSTANTS.elementName,
  dependencies: [
    PopoverComponent,
    OptionComponentExp
  ]
})
export class ListDropdownComponent extends BaseComponent implements IListDropdownComponent {
  public static get observedAttributes(): string[] {
    return [];
  }

  private _foundation: ListDropdownFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ListDropdownFoundation(new ListDropdownAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {

  }

  @FoundationProperty()
  public open: boolean;

  @FoundationProperty()
  public targetElement: HTMLElement;
}
