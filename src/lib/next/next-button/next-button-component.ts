import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { RippleComponent } from '@tylertech/forge/ripple';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { NextButtonAdapter } from './next-button-adapter';
import { NextButtonType, NextButtonVariant, NEXT_BUTTON_CONSTANTS } from './next-button-constants';
import { INextButtonFoundation, NextButtonFoundation } from './next-button-foundation';

import template from './next-button.html';
import styles from './next-button.scss';

export interface INextButtonComponent extends IBaseComponent {
  type: NextButtonType;
  variant: NextButtonVariant;
  dense: boolean;
  disabled: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-next-button': INextButtonComponent;
  }
}

/**
 * @summary Buttons represent actions that a user can take.
 * 
 * @tag forge-next-button
 * 
 * @slot - The button label.
 * @slot start - An element to place before the label.
 * @slot end - An element to place after the label.
 * 
 * @csspart root - The container element.
 * 
 * @cssproperty --forge-theme-primary - Controls the primary theme color of the button.
 */
@CustomElement({
  name: NEXT_BUTTON_CONSTANTS.elementName,
  dependencies: [
    RippleComponent
  ]
})
export class NextButtonComponent extends BaseComponent implements INextButtonComponent {
  public static get observedAttributes(): string[] {
    return [
      ...Object.values(NEXT_BUTTON_CONSTANTS.observedAttributes)
    ];
  }

  /** The native <button> type. */
  @FoundationProperty() public type: NextButtonType;

  /** Controls the button decoration variant. */
  @FoundationProperty() public variant: NextButtonVariant;

  /** Controls the dense state. */
  @FoundationProperty() public dense: boolean;

  /** Controls the disabled state. */
  @FoundationProperty() public disabled: boolean;

  protected _foundation: INextButtonFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new NextButtonFoundation(new NextButtonAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case NEXT_BUTTON_CONSTANTS.attributes.TYPE:
        this.type = newValue as NextButtonType;
        break;
      case NEXT_BUTTON_CONSTANTS.attributes.VARIANT:
        this.variant = newValue as NextButtonVariant;
        break;
      case NEXT_BUTTON_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
      case NEXT_BUTTON_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
    }
  }
}

