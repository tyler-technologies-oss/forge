import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { FocusIndicatorComponent } from '../focus-indicator';
import { StateLayerComponent } from '../state-layer';
import { BaseButton, IBaseButton } from './base/base-button';
import { BASE_BUTTON_CONSTANTS } from './base/base-button-constants';
import { ButtonAdapter } from './button-adapter';
import { ButtonVariant, BUTTON_CONSTANTS } from './button-constants';
import { ButtonFoundation } from './button-foundation';

import template from './button.html';
import styles from './button.scss';

export interface IButtonComponent extends IBaseButton {
  variant: ButtonVariant;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-button': IButtonComponent;
  }
}

/**
 * @tag forge-button
 * 
 * @summary Buttons represent actions that a user can take.
 */
@CustomElement({
  name: BUTTON_CONSTANTS.elementName,
  dependencies: [
    FocusIndicatorComponent,
    StateLayerComponent
  ]
})
export class ButtonComponent extends BaseButton<ButtonFoundation> implements IButtonComponent {
  public static get observedAttributes(): string[] {
    return [
      ...Object.values(BASE_BUTTON_CONSTANTS.observedAttributes),
      ...Object.values(BUTTON_CONSTANTS.observedAttributes)
    ];
  }

  protected readonly _foundation: ButtonFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ButtonFoundation(new ButtonAdapter(this));
  }

  public override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BUTTON_CONSTANTS.observedAttributes.VARIANT:
        this.variant = newValue as ButtonVariant;
        return;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  @FoundationProperty()
  public declare variant: ButtonVariant;
}
