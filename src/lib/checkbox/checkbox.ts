import { CustomElement, attachShadowTemplate, coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { CHECKBOX_CONSTANTS } from './checkbox-constants';
import { CheckboxFoundation } from './checkbox-foundation';
import { CheckboxAdapter } from './checkbox-adapter';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './checkbox.html';
import styles from './checkbox.scss';

export interface ICheckboxComponent extends IBaseComponent {
  dense: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-checkbox': ICheckboxComponent;
  }
}

/**
 * The custom element class behind the `<forge-checkbox>` element.
 * 
 * @tag forge-checkbox
 */
@CustomElement({
  name: CHECKBOX_CONSTANTS.elementName
})
export class CheckboxComponent extends BaseComponent implements ICheckboxComponent {
  public static get observedAttributes(): string[] {
    return [CHECKBOX_CONSTANTS.attributes.DENSE];
  }

  private _foundation: CheckboxFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new CheckboxFoundation(new CheckboxAdapter(this));
  }

  public async connectedCallback(): Promise<void> {
    await this._ensureInputElement();
    this._foundation.connect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case CHECKBOX_CONSTANTS.attributes.DENSE:
        this.dense = coerceBoolean(newValue);
        break;
    }
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  /** Gets or sets whether or not the checkbox is dense */
  @FoundationProperty()
  public dense: boolean;

  private async _ensureInputElement(): Promise<Element> {
    // Not using core function ensureChild because it was not selecting the input properly
    return new Promise<Element>(resolve => {
      const element = this.querySelector('input');
      if (element) {
        resolve(element);
      }

      const observer = new MutationObserver(changes => {
        const hasAddedNodes = changes.reduce((prev, curr) => prev + curr.addedNodes.length, 0) > 0;
        if (hasAddedNodes) {
          const foundElement = this.querySelector('input');
          if (foundElement) {
            observer.disconnect();
            resolve(foundElement);
          }
        }
      });
      observer.observe(this, { childList: true, subtree: true });
    });
  }
}
