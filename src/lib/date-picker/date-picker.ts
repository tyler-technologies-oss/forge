import { attachShadowTemplate, CustomElement } from '@tylertech/forge-core';
import { tylIconInsertInvitation } from '@tylertech/tyler-icons/standard';
import { CalendarComponent } from '../calendar';
import { IconComponent, IconRegistry } from '../icon';
import { IconButtonComponent } from '../icon-button';
import { PopupComponent } from '../popup';
import { BaseDatePickerComponent, IBaseDatePickerComponent } from './base/base-date-picker';
import { BASE_DATE_PICKER_CONSTANTS } from './base/base-date-picker-constants';
import { DatePickerAdapter } from './date-picker-adapter';
import { DATE_PICKER_CONSTANTS } from './date-picker-constants';
import { DatePickerFoundation } from './date-picker-foundation';

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

/** The custom element class behind the `<forge-date-picker>` element. */
@CustomElement({
  name: DATE_PICKER_CONSTANTS.elementName,
  dependencies: [
    PopupComponent,
    CalendarComponent,
    IconButtonComponent,
    IconComponent
  ]
})
export class DatePickerComponent extends BaseDatePickerComponent<Date | string, Date, DatePickerFoundation> implements IDatePickerComponent {
  public static get observedAttributes(): string[] {
    return [
      ...Object.values(BASE_DATE_PICKER_CONSTANTS.observedAttributes),
      DATE_PICKER_CONSTANTS.observedAttributes.VALUE
    ];
  }

  constructor() {
    super();
    IconRegistry.define(tylIconInsertInvitation);
    attachShadowTemplate(this, template, styles);
    this._foundation = new DatePickerFoundation(new DatePickerAdapter(this));
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
