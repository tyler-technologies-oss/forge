import { attachShadowTemplate, customElement, coreProperty } from '@tylertech/forge-core';
import { tylIconDateRange } from '@tylertech/tyler-icons';
import { CalendarComponent } from '../calendar';
import { BaseDatePickerComponent, IBaseDatePickerComponent } from '../date-picker/base/base-date-picker';
import { BASE_DATE_PICKER_CONSTANTS } from '../date-picker/base/base-date-picker-constants';
import { IconComponent, IconRegistry } from '../icon';
import { IconButtonComponent } from '../icon-button';
import { PopoverComponent } from '../popover';
import { DateRangePickerAdapter } from './date-range-picker-adapter';
import { DATE_RANGE_PICKER_CONSTANTS, IDatePickerRange, IDateRangePickerChangeEventData } from './date-range-picker-constants';
import { DateRangePickerCore } from './date-range-picker-core';

import template from './date-range-picker.html';
import styles from './date-range-picker.scss';

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
 * @tag forge-date-range-picker
 *
 * @property {Date | string | null | undefined} [from=null] - Gets/sets the "from" date range value.
 * @property {Date | string | null | undefined} [to=null] - Gets/sets the "to" date range value.
 * @property {string | null | undefined} [value=null] - Gets/sets the date range value.
 * @property {Date | string | null | undefined} [min=null] - Gets/sets the minimum date range value.
 * @property {Date | string | null | undefined} [max=null] - Gets/sets the maximum date range value.
 * @property {Date | Date[] | null | undefined} [disabledDates=null] - Gets/sets the disabled date range values.
 * @property {boolean} [open=false] - Gets/sets the open state of the date range picker.
 * @property {DatePickerParseCallback} [parseCallback=parseDate] - Gets/sets the callback used to parse date strings.
 * @property {DatePickerFormatCallback} [formatCallback=formatDate] - Gets/sets the callback used to format date strings.
 * @property {DatePickerPrepareMaskCallback} [prepareMaskCallback=prepareDateMask] - Gets/sets the callback used to prepare the mask for the date input.
 * @property {(date: Date) => boolean} [disableDayCallback=undefined] - Gets/sets the callback used to disable days in the calendar.
 * @property {string | string[]} [popupClasses=''] - Gets/sets the classes to apply to the date range picker popup.
 * @property {boolean} [disabled=false] - Gets/sets the disabled state of the date range picker.
 * @property {boolean} [masked=false] - Gets/sets the masked state of the date range picker.
 * @property {string} [maskFormat='MM/DD/YYYY'] - Gets/sets the mask format for the date input.
 * @property {boolean} [showMaskFormat=false] - Gets/sets the state of whether to show the mask format in the date input.
 * @property {DatePickerValueMode} [valueMode='range'] - Gets/sets the value mode of the date range picker.
 * @property {boolean} [notifyInputValueChanges=false] - Gets/sets the state of whether to notify input value changes.
 * @property {boolean} [allowInvalidDate=false] - Gets/sets the state of whether to allow invalid dates.
 * @property {boolean} [showToday=true] - Gets/sets the state of whether to show the "Today" button.
 * @property {boolean} [showClear=true] - Gets/sets the state of whether to show the "Clear" button.
 * @property {DayOfWeek[]} [disabledDaysOfWeek=[]] - Gets/sets the disabled days of the week.
 * @property {string} [yearRange=''] - Gets/sets the year range for the date range picker.
 * @property {string | undefined} [locale=undefined] - Gets/sets the locale for the date range picker.
 *
 * @event {CustomEvent<IDateRangePickerChangeEventData>} forge-date-range-picker-change - Emits when the value of the date range picker changes.
 * @event {CustomEvent<void>} forge-date-range-picker-open - Emits when the date range picker calendar opens.
 * @event {CustomEvent<void>} forge-date-range-picker-close - Emits when the date range picker calendar closes.
 * @event {CustomEvent<string>} forge-date-range-picker-input - Emits when the user inputs a value into the date range picker.
 */
@customElement({
  name: DATE_RANGE_PICKER_CONSTANTS.elementName,
  dependencies: [PopoverComponent, CalendarComponent, IconButtonComponent, IconComponent]
})
export class DateRangePickerComponent
  extends BaseDatePickerComponent<IDatePickerRange, IDatePickerRange, DateRangePickerCore>
  implements IDateRangePickerComponent
{
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
    this._core = new DateRangePickerCore(new DateRangePickerAdapter(this));
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
  @coreProperty()
  declare public from: Date | string | null | undefined;

  /** Gets/sets the "to" date range value. */
  @coreProperty()
  declare public to: Date | string | null | undefined;
}
