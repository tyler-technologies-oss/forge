import { attachShadowTemplate, coerceBoolean, CustomElement } from '@tylertech/forge-core';
import { RippleComponent } from '@tylertech/forge/ripple';
import { NEXT_BASE_BUTTON_CONSTANTS } from '../core/button/base-button-constants';
import { NextButtonAdapter } from './next-button-adapter';
import { NextButtonComponent } from './next-button-component';
import { NextButtonVariant, NEXT_BUTTON_CONSTANTS } from './next-button-constants';
import { INextButtonFoundation, NextButtonFoundation } from './next-button-foundation';

import template from './next-button.html';
import styles from './next-button.scss';

declare global {
  interface HTMLElementTagNameMap {
    'forge-next-button': NextButtonElement;
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
export class NextButtonElement extends NextButtonComponent {
  public static get observedAttributes(): string[] {
    return [
      ...Object.values(NEXT_BASE_BUTTON_CONSTANTS.observedAttributes),
      ...Object.values(NEXT_BUTTON_CONSTANTS.observedAttributes)
    ];
  }

  protected _foundation: INextButtonFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new NextButtonFoundation(new NextButtonAdapter(this));
  }

  public override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    super.attributeChangedCallback(name, oldValue, newValue);

    switch (name) {
      case NEXT_BUTTON_CONSTANTS.attributes.VARIANT:
        this.variant = newValue as NextButtonVariant;
        break;
      case NEXT_BUTTON_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
    }
  }
}

