import { CustomElement, attachShadowTemplate, coerceBoolean } from '@tylertech/forge-core';
import { LABEL_VALUE_CONSTANTS, LabelValueAlignment, LabelValueDensityType } from './label-value-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { FieldComponent } from '../field-next/field';

import template from './label-value.html';
import styles from './label-value.scss';

export interface ILabelValueComponent extends IBaseComponent {
  empty: boolean;
  ellipsis: boolean;
  density: LabelValueDensityType;
  align: LabelValueAlignment;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-label-value': ILabelValueComponent;
  }
}

/**
 * @tag forge-label-value
 */
@CustomElement({
  name: LABEL_VALUE_CONSTANTS.elementName,
  dependencies: [
    FieldComponent
  ]
})
export class LabelValueComponent extends BaseComponent implements ILabelValueComponent {
  public static get observedAttributes(): string[] {
    return Object.values(LABEL_VALUE_CONSTANTS.observedAttributes);
  }

  private _empty = false;
  private _ellipsis = false;
  private _density: LabelValueDensityType = 'medium';
  private _align: LabelValueAlignment = 'start';

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case LABEL_VALUE_CONSTANTS.observedAttributes.EMPTY:
        this.empty = coerceBoolean(newValue);
        break;
      case LABEL_VALUE_CONSTANTS.observedAttributes.ELLIPSIS:
        this.ellipsis = coerceBoolean(newValue);
        break;
      case LABEL_VALUE_CONSTANTS.observedAttributes.DENSITY:
        this.density = newValue as LabelValueDensityType;
        break;
      case LABEL_VALUE_CONSTANTS.observedAttributes.ALIGN:
        this.align = newValue as LabelValueAlignment;
        break;
    }
  }
  
  public get empty(): boolean {
    return this._empty;
  }
  public set empty(value: boolean) {
    value = Boolean(value);
    if (this._empty !== value) {
      this._empty = value;
      this.toggleAttribute(LABEL_VALUE_CONSTANTS.attributes.EMPTY, this._empty);
    }
  }

  public get ellipsis(): boolean {
    return this._ellipsis;
  }
  public set ellipsis(value: boolean) {
    value = Boolean(value);
    if (this._ellipsis !== value) {
      this._ellipsis = value;
      this.toggleAttribute(LABEL_VALUE_CONSTANTS.attributes.ELLIPSIS, this._ellipsis);
    }
  }

  public get density(): LabelValueDensityType {
    return this._density;
  }
  public set density(value: LabelValueDensityType) {
    if (this._density !== value) {
      this._density = value;
      this.setAttribute(LABEL_VALUE_CONSTANTS.attributes.DENSITY, String(this._density));
    }
  }

  public get align(): LabelValueAlignment {
    return this._align;
  }
  public set align(value: LabelValueAlignment) {
    if (this._align !== value) {
      this._align = value;
      this.setAttribute(LABEL_VALUE_CONSTANTS.attributes.ALIGN, this._align);
    }
  }
}
