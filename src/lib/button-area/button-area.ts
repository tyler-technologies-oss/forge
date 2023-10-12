import { CustomElement, attachShadowTemplate, ICustomElement, FoundationProperty, coerceBoolean } from '@tylertech/forge-core';
import { ButtonAreaAdapter } from './button-area-adapter';
import { ButtonAreaFoundation } from './button-area-foundation';
import { BUTTON_AREA_CONSTANTS } from './button-area-constants';
import { RippleComponent } from '../ripple';

import template from './button-area.html';
import styles from './button-area.scss';

export interface IButtonAreaComponent extends ICustomElement {
  disabled: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-button-area': IButtonAreaComponent;
  }
}

@CustomElement({
  name: BUTTON_AREA_CONSTANTS.elementName,
  dependencies: [
    RippleComponent
  ]
})
export class ButtonAreaComponent extends HTMLElement implements IButtonAreaComponent {
  public static get observedAttributes(): string[] {
    return [
      BUTTON_AREA_CONSTANTS.attributes.DISABLED
    ];
  }

  private _foundation: ButtonAreaFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ButtonAreaFoundation(new ButtonAreaAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BUTTON_AREA_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
    }
  }

  /** Controls whether the component and associated button element are disabled. */
  @FoundationProperty()
  public declare disabled: boolean;
}
