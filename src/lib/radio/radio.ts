import { CustomElement, attachShadowTemplate, FoundationProperty, coerceBoolean } from '@tylertech/forge-core';
import { RADIO_CONSTANTS } from './radio-constants';
import { RadioFoundation } from './radio-foundation';
import { RadioAdapter } from './radio-adapter';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './radio.html';
import styles from './radio.scss';

export interface IRadioComponent extends IBaseComponent {
  dense: boolean;
  syncCheckedState(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-radio': IRadioComponent;
  }
}

/**
 * The custom element class behind the `<forge-radio>` element.
 * 
 * @tag forge-radio
 */
@CustomElement({
  name: RADIO_CONSTANTS.elementName
})
export class RadioComponent extends BaseComponent implements IRadioComponent {
  public static get observedAttributes(): string[] {
    return [
      RADIO_CONSTANTS.attributes.DENSE
    ];
  }

  protected _foundation: RadioFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new RadioFoundation(new RadioAdapter(this));
  }

  public connectedCallback(): void {
    this._ensureRadioInputElement().then(() => this._foundation.connect());
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case RADIO_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
    }
  }

  private _ensureRadioInputElement(): Promise<void> {
    // Not using core function ensureChild because it was not selecting the input properly
    return new Promise<void>(resolve => {
      const element = this.querySelector(RADIO_CONSTANTS.selectors.RADIO_INPUT);
      if (element) {
        resolve();
        return;
      }

      const observer = new MutationObserver(changes => {
        const hasAddedNodes = changes.reduce((prev, curr) => prev + curr.addedNodes.length, 0) > 0;
        if (hasAddedNodes) {
          if (this.querySelector(RADIO_CONSTANTS.selectors.RADIO_INPUT)) {
            observer.disconnect();
            resolve();
          }
        }
      });
      observer.observe(this, { childList: true, subtree: true });
    });
  }

  public syncCheckedState(): void {
    this._foundation.syncCheckedState();
  }

  /** Gets/sets whether the radio button is dense. */
  @FoundationProperty()
  public dense: boolean;
}
