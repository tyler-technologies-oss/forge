import { attachShadowTemplate, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { tylIconDateRange } from '@tylertech/tyler-icons/standard';
import { CalendarComponent } from '../calendar';
import { BaseDatePickerComponent, IBaseDatePickerComponent } from '../date-picker/base/base-date-picker';
import { BASE_DATE_PICKER_CONSTANTS } from '../date-picker/base/base-date-picker-constants';
import { IconComponent, IconRegistry } from '../icon';
import { IconButtonComponent } from '../icon-button';
import { PopupComponent } from '../popup';
import { DateRangePickerAdapter } from './date-range-picker-adapter';
import { DATE_RANGE_PICKER_CONSTANTS, IDatePickerRange, IDateRangePickerChangeEventData } from './date-range-picker-constants';
import { DateRangePickerFoundation } from './date-range-picker-foundation';

import template from './date-range-picker.html';
import styles from './date-range-picker.scss?inline';

export interface IDateRangePickerComponent extends IBaseDatePickerComponent<IDatePickerRange> {
  from: Date | string | null | undefined;
  to: Date | string | null | undefined;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-date-range-picker': IDateRangePickerComponent;
  }

  interface HTMLElementEventMap {
    'forge-date-range-picker-change': CustomEvent<IDateRangePickerChangeEventData>;
    'forge-date-range-picker-open': CustomEvent<void>;
    'forge-date-range-picker-close': CustomEvent<void>;
    'forge-date-range-picker-input': CustomEvent<string>;
  }
}

/**
 * The custom element class behind the `<forge-date-range-picker>` element.
 * 
 * @tag forge-date-range-picker
 */
@CustomElement({
  name: DATE_RANGE_PICKER_CONSTANTS.elementName,
  dependencies: [
    PopupComponent,
    CalendarComponent,
    IconButtonComponent,
    IconComponent
  ]
})
export class DateRangePickerComponent extends BaseDatePickerComponent<IDatePickerRange, IDatePickerRange, DateRangePickerFoundation> implements IDateRangePickerComponent {
  public static get observedAttributes(): string[] {
    return [
      ...Object.values(BASE_DATE_PICKER_CONSTANTS.observedAttributes),
      DATE_RANGE_PICKER_CONSTANTS.observedAttributes.FROM,
      DATE_RANGE_PICKER_CONSTANTS.observedAttributes.TO
    ];
  }

  constructor() {
    super();
    IconRegistry.define(tylIconDateRange);
    attachShadowTemplate(this, template, styles);
    this._foundation = new DateRangePickerFoundation(new DateRangePickerAdapter(this));
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case DATE_RANGE_PICKER_CONSTANTS.observedAttributes.FROM:
        this.from = newValue;
        return;
      case DATE_RANGE_PICKER_CONSTANTS.observedAttributes.TO:
        this.to = newValue;
        return;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  /** Gets/sets the "from" date range value. */
  @FoundationProperty()
  public declare from: Date | string | null | undefined;

  /** Gets/sets the "to" date range value. */
  @FoundationProperty()
  public declare to: Date | string | null | undefined;
}
