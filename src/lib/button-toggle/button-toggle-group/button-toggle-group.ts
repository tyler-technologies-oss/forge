import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { ButtonToggleComponent } from '../button-toggle/button-toggle';
import { ButtonToggleGroupAdapter } from './button-toggle-group-adapter';
import { BUTTON_TOGGLE_GROUP_CONSTANTS, IButtonToggleOption } from './button-toggle-group-constants';
import { ButtonToggleGroupFoundation } from './button-toggle-group-foundation';

import template from './button-toggle-group.html';
import styles from './button-toggle-group.scss';

export interface IButtonToggleGroupComponent extends IBaseComponent {
  value: any;
  multiple: boolean;
  stretch: boolean;
  mandatory: boolean;
  vertical: boolean;
  disabled: boolean;
  dense: boolean;
  options: IButtonToggleOption[];
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-button-toggle-group': IButtonToggleGroupComponent;
  }
}

@CustomElement({
  name: BUTTON_TOGGLE_GROUP_CONSTANTS.elementName,
  dependencies: [ButtonToggleComponent]
})
export class ButtonToggleGroupComponent extends BaseComponent implements IButtonToggleGroupComponent {
  public static get observedAttributes(): string[] {
    return [
      BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.VALUE,
      BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.MULTIPLE,
      BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.MANDATORY,
      BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.VERTICAL,
      BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.STRETCH,
      BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.DISABLED,
      BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.DENSE
    ];
  }

  private _foundation: ButtonToggleGroupFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ButtonToggleGroupFoundation(new ButtonToggleGroupAdapter(this));
  }

  public initializedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.VALUE:
        this.value = newValue;
        break;
      case BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.MULTIPLE:
        this.multiple = coerceBoolean(newValue);
        break;
      case BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.MANDATORY:
        this.mandatory = coerceBoolean(newValue);
        break;
      case BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.VERTICAL:
        this.vertical = coerceBoolean(newValue);
        break;
      case BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.STRETCH:
        this.stretch = coerceBoolean(newValue);
        break;
      case BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public value: any;

  @FoundationProperty()
  public multiple: boolean;

  @FoundationProperty()
  public mandatory: boolean;

  @FoundationProperty()
  public vertical: boolean;

  @FoundationProperty()
  public stretch: boolean;

  @FoundationProperty()
  public dense: boolean;

  @FoundationProperty()
  public disabled: boolean;

  @FoundationProperty()
  public options: IButtonToggleOption[];
}
