import { CustomElement, attachShadowTemplate } from '@tylertech/forge-core';
import { ChipFieldAdapter } from './chip-field-adapter';
import { ChipFieldFoundation } from './chip-field-foundation';
import { CHIP_FIELD_CONSTANTS } from './chip-field-constants';
import { ChipComponent } from '../chips';
import { FieldComponent, IFieldComponent } from '../field/field';

import template from './chip-field.html';
import styles from './chip-field.scss';

export interface IChipFieldComponent extends IFieldComponent { }

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
  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ChipFieldFoundation(new ChipFieldAdapter(this));
  }
}
