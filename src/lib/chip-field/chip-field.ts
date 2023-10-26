import { CustomElement, FoundationProperty, attachShadowTemplate, coerceBoolean } from '@tylertech/forge-core';
import { ChipFieldAdapter } from './chip-field-adapter';
import { ChipFieldFoundation } from './chip-field-foundation';
import { CHIP_FIELD_CONSTANTS } from './chip-field-constants';
import { ChipComponent } from '../chips';
import { FieldComponent, IFieldComponent } from '../field/field';

import template from './chip-field.html';
import styles from './chip-field.scss';
import { FIELD_CONSTANTS } from '../field/field-constants';

export interface IChipFieldComponent extends IFieldComponent {
  setValueOnBlur: boolean;
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
 * The web component class behind the `<forge-chip-field>` custom element.
 * 
 * @tag forge-chip-field
 */
@CustomElement({
  name: CHIP_FIELD_CONSTANTS.elementName,
  dependencies: [ChipComponent]
})
export class ChipFieldComponent extends FieldComponent<ChipFieldFoundation> implements IChipFieldComponent {
  public static get observedAttributes(): string[] {
    return [
      ...Object.values(FIELD_CONSTANTS.attributes),
      CHIP_FIELD_CONSTANTS.attributes.SET_VALUE_ON_BLUR
    ];
  }

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ChipFieldFoundation(new ChipFieldAdapter(this));
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case CHIP_FIELD_CONSTANTS.attributes.SET_VALUE_ON_BLUR:
        this.setValueOnBlur = coerceBoolean(newValue);
        return;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  /** Controls whether or not the value should be set onBlur */
  @FoundationProperty()
  public declare setValueOnBlur: boolean;
}
