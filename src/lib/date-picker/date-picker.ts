import { attachShadowTemplate, customElement } from '@tylertech/forge-core';
import { tylIconInsertInvitation } from '@tylertech/tyler-icons';
import { CalendarComponent } from '../calendar';
import { IconComponent, IconRegistry } from '../icon';
import { IconButtonComponent } from '../icon-button';
import { PopoverComponent } from '../popover';
import { BaseDatePickerComponent, IBaseDatePickerComponent } from './base/base-date-picker';
import { BASE_DATE_PICKER_CONSTANTS } from './base/base-date-picker-constants';
import { DatePickerAdapter } from './date-picker-adapter';
import { DATE_PICKER_CONSTANTS } from './date-picker-constants';
import { DatePickerCore } from './date-picker-core';

import template from './date-picker.html';
import styles from './date-picker.scss';

export interface IDatePickerComponent extends IBaseDatePickerComponent<Date | string | null> {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-date-picker': IDatePickerComponent;
  }

  interface HTMLElementEventMap {
    'forge-date-picker-change': CustomEvent<Date | string | null>;
    'forge-date-picker-open': CustomEvent<void>;
    'forge-date-picker-close': CustomEvent<void>;
    'forge-date-picker-input': CustomEvent<string>;
  }
}

/**
 * @tag forge-date-picker
 *
 * @attribute {string} [value] - The value of the date picker.
 *
 * @event {CustomEvent<Date | string | null>} forge-date-picker-change - Emits when the value of the date picker changes.
 * @event {CustomEvent<void>} forge-date-picker-open - Emits when the date picker opens.
 * @event {CustomEvent<void>} forge-date-picker-close - Emits when the date picker closes.
 * @event {CustomEvent<string>} forge-date-picker-input - Emits when the user inputs a value into the date picker.
 */
@customElement({
  name: DATE_PICKER_CONSTANTS.elementName,
  dependencies: [PopoverComponent, CalendarComponent, IconButtonComponent, IconComponent]
})
export class DatePickerComponent extends BaseDatePickerComponent<Date | string | undefined, Date, DatePickerCore> implements IDatePickerComponent {
  public static get observedAttributes(): string[] {
    return [...Object.values(BASE_DATE_PICKER_CONSTANTS.observedAttributes), DATE_PICKER_CONSTANTS.observedAttributes.VALUE];
  }

  constructor() {
    super();
    IconRegistry.define(tylIconInsertInvitation);
    attachShadowTemplate(this, template, styles);
    this._core = new DatePickerCore(new DatePickerAdapter(this));
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case DATE_PICKER_CONSTANTS.observedAttributes.VALUE:
        this.value = newValue;
        return;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }
}
