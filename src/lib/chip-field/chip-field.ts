import { CustomElement, FoundationProperty, attachShadowTemplate, coerceBoolean } from '@tylertech/forge-core';
import { ChipFieldAdapter } from './chip-field-adapter';
import { ChipFieldFoundation } from './chip-field-foundation';
import { CHIP_FIELD_CONSTANTS } from './chip-field-constants';
import { ChipComponent } from '../chips';
import { BaseField, IBaseField } from '../field-next/base/base-field';
import { BASE_FIELD_CONSTANTS, FieldComponent } from '../field-next';

import template from './chip-field.html';
import styles from './chip-field.scss';

export interface IChipFieldComponent extends IBaseField {
  addOnBlur: boolean;
  readonly popoverTargetElement: HTMLElement;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-chip-field': IChipFieldComponent;
  }

  interface HTMLElementEventMap {
    'forge-chip-field-member-added': CustomEvent<string>;
    'forge-chip-field-member-removed': CustomEvent<HTMLElement>;
  }
}

/**
 * @tag forge-chip-field
 */
@CustomElement({
  name: CHIP_FIELD_CONSTANTS.elementName,
  dependencies: [
    FieldComponent,
    ChipComponent
  ]
})
export class ChipFieldComponent extends BaseField<ChipFieldFoundation> implements IChipFieldComponent {
  public static get observedAttributes(): string[] {
    return [
      ...Object.values(BASE_FIELD_CONSTANTS.observedAttributes),
      ...Object.values(CHIP_FIELD_CONSTANTS.observedAttributes)
    ];
  }

  protected _foundation: ChipFieldFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ChipFieldFoundation(new ChipFieldAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case CHIP_FIELD_CONSTANTS.attributes.ADD_ON_BLUR:
        this.addOnBlur = coerceBoolean(newValue);
        return;
    }
  }

  @FoundationProperty()
  public declare addOnBlur: boolean;

  public get popoverTargetElement(): HTMLElement {
    return this._foundation.popoverTargetElement;
  }

  public override click(): void {
    this._foundation.click();
  }
}
