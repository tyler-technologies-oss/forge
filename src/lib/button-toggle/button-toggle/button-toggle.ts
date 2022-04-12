import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty, getShadowElement } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { ButtonToggleAdapter } from './button-toggle-adapter';
import { BUTTON_TOGGLE_CONSTANTS, IButtonToggleSelectEventData } from './button-toggle-constants';
import { ButtonToggleFoundation } from './button-toggle-foundation';

import template from './button-toggle.html';
import styles from './button-toggle.scss';

export interface IButtonToggleComponent extends IBaseComponent {
  value: any;
  selected: boolean;
  disabled: boolean;
  dense: boolean;
}

export interface IButtonToggleComponentEventMap extends HTMLElementEventMap {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-button-toggle': IButtonToggleComponent;
  }

  interface HTMLElementEventMap {
    'forge-button-toggle-select': CustomEvent<IButtonToggleSelectEventData>;
  }
}

@CustomElement({
  name: BUTTON_TOGGLE_CONSTANTS.elementName
})
export class ButtonToggleComponent extends BaseComponent implements IButtonToggleComponent {
  public static get observedAttributes(): string[] {
    return [
      BUTTON_TOGGLE_CONSTANTS.attributes.VALUE,
      BUTTON_TOGGLE_CONSTANTS.attributes.SELECTED,
      BUTTON_TOGGLE_CONSTANTS.attributes.DISABLED,
      BUTTON_TOGGLE_CONSTANTS.attributes.DENSE,
      BUTTON_TOGGLE_CONSTANTS.attributes.BUTTON_ARIA_LABEL
    ];
  }

  private _foundation: ButtonToggleFoundation;
  private _buttonElement: HTMLButtonElement;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ButtonToggleFoundation(new ButtonToggleAdapter(this));
    this._buttonElement = getShadowElement(this, BUTTON_TOGGLE_CONSTANTS.selectors.BUTTON) as HTMLButtonElement;
  }

  public initializedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BUTTON_TOGGLE_CONSTANTS.attributes.VALUE:
        this.value = newValue;
        break;
      case BUTTON_TOGGLE_CONSTANTS.attributes.SELECTED:
        this.selected = coerceBoolean(newValue);
        break;
      case BUTTON_TOGGLE_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case BUTTON_TOGGLE_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case BUTTON_TOGGLE_CONSTANTS.attributes.BUTTON_ARIA_LABEL:
        this._buttonElement.setAttribute('aria-label', newValue);
        break;
    }
  }

  @FoundationProperty()
  public value: any;

  @FoundationProperty()
  public selected: boolean;

  @FoundationProperty()
  public disabled: boolean;

  @FoundationProperty()
  public dense: boolean;

  public override focus(): void {
    this._foundation.setFocus();
  }
}
