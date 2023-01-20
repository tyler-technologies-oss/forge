import { CustomElement, attachShadowTemplate, coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { LabelValueAdapter } from './label-value-adapter';
import { LabelValueFoundation } from './label-value-foundation';
import { LABEL_VALUE_CONSTANTS, LabelValueAlignment } from './label-value-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { FieldDensityType } from '../field/field-constants';

import template from './label-value.html';
import styles from './label-value.scss?inline';

export interface ILabelValueComponent extends IBaseComponent {
  empty: boolean;
  ellipsis: boolean;
  density: FieldDensityType;
  align: LabelValueAlignment;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-label-value': ILabelValueComponent;
  }
}

/**
 * The web component class behind the `<forge-label-value>` custom element.
 * 
 * @tag forge-label-value
 */
@CustomElement({
  name: LABEL_VALUE_CONSTANTS.elementName
})
export class LabelValueComponent extends BaseComponent implements ILabelValueComponent {
  public static get observedAttributes(): string[] {
    return [
      LABEL_VALUE_CONSTANTS.attributes.EMPTY,
      LABEL_VALUE_CONSTANTS.attributes.ELLIPSIS,
      LABEL_VALUE_CONSTANTS.attributes.DENSITY,
      LABEL_VALUE_CONSTANTS.attributes.ALIGN
    ];
  }

  private _foundation: LabelValueFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new LabelValueFoundation(new LabelValueAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case LABEL_VALUE_CONSTANTS.attributes.EMPTY:
        this.empty = coerceBoolean(newValue);
        break;
      case LABEL_VALUE_CONSTANTS.attributes.ELLIPSIS:
        this.ellipsis = coerceBoolean(newValue);
        break;
      case LABEL_VALUE_CONSTANTS.attributes.DENSITY:
        this.density = newValue as FieldDensityType;
        break;
      case LABEL_VALUE_CONSTANTS.attributes.ALIGN:
        this.align = newValue as LabelValueAlignment;
        break;
    }
  }

  /** Gets/sets the empty state. */
  @FoundationProperty()
  public declare empty: boolean;

  /** Gets/sets the wrap-content attribute. */
  @FoundationProperty()
  public declare ellipsis: boolean;

  /** Controls the density type. */
  @FoundationProperty()
  public declare density: FieldDensityType;

  /** Gets/sets the alignment. */
  @FoundationProperty()
  public declare align: LabelValueAlignment;
}
