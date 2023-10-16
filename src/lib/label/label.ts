import { CustomElement, FoundationProperty, attachShadowTemplate } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core';
import { LabelAdapter } from './label-adapter';
import { LABEL_CONSTANTS } from './label-constants';
import { LabelFoundation } from './label-foundation';

import template from './label.html';
import style from './label.scss';

export interface ILabelComponent extends IBaseComponent {
  for: string | null | undefined;
  forElement: HTMLElement | null | undefined;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-label': ILabelComponent;
  }
}

/**
 * @tag forge-label
 * 
 * @summary The Forge Label component is used to associate a text label with a Forge form
 * component.
 * 
 * @property {string | null | undefined} for - The id of the associated form component.
 * @property {HTMLElement | null | undefined} forElement - The associated form component.
 * 
 * @attribute {string} for - The id of the associated form component.
 * 
 * @csspart label - Styles the label's root element.
 */
@CustomElement({
  name: LABEL_CONSTANTS.elementName
})
export class LabelComponent extends BaseComponent implements ILabelComponent {
  public static get observedAttributes(): string[] {
    return [
      LABEL_CONSTANTS.attributes.FOR
    ];
  }

  private _foundation: LabelFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, style);
    this._foundation = new LabelFoundation(new LabelAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case LABEL_CONSTANTS.attributes.FOR:
        this.for = newValue;
        break;
    }
  }

  @FoundationProperty()
  public for: string | null | undefined;

  @FoundationProperty()
  public forElement: HTMLElement | null | undefined;
}
