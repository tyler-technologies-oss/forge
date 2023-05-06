import { CustomElement, attachShadowTemplate, ICustomElement, FoundationProperty, coerceBoolean } from '@tylertech/forge-core';
import { tylIconKeyboardArrowUp } from '@tylertech/tyler-icons/standard';
import { IconComponent, IconRegistry } from '../icon';
import { SpinnerAdapter } from './spinner-adapter';
import { SpinnerFoundation } from './spinner-foundation';
import { SPINNER_CONSTANTS } from './spinner-constants';

import template from './spinner.html';
import styles from './spinner.scss';

export interface ISpinnerComponent extends ICustomElement {
  disabled: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-spinner': ISpinnerComponent;
  }

  interface HTMLElementEventMap {
    'forge-spinner-increment': CustomEvent<void>;
    'forge-spinner-decrement': CustomEvent<void>;
  }
}

@CustomElement({
  name: SPINNER_CONSTANTS.elementName,
  dependencies: [
    IconComponent
  ]
})
export class SpinnerComponent extends HTMLElement implements ISpinnerComponent {
  public static get observedAttributes(): string[] {
    return [
      SPINNER_CONSTANTS.attributes.DISABLED
    ];
  }

  private _foundation: SpinnerFoundation;

  constructor() {
    super();
    IconRegistry.define(tylIconKeyboardArrowUp);
    attachShadowTemplate(this, template, styles);
    this._foundation = new SpinnerFoundation(new SpinnerAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case SPINNER_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
    }
  }

  /** Gets/sets the disabled state. */
  @FoundationProperty()
  public declare disabled: boolean;
}
