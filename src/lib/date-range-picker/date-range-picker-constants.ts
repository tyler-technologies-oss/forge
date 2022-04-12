import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}date-range-picker`;

export class DatePickerRange implements IDatePickerRange {
  public from?: Date | string | null;
  public to?: Date | string | null;
  constructor(range?: IDatePickerRange) {
    if (range) {
      this.from = range.from;
      this.to = range.to;
    }
  }

  public copy(): DatePickerRange {
    return new DatePickerRange(this);
  }
}

export interface IDatePickerRange {
  from?: Date | string | null;
  to?: Date | string | null;
}

const observedAttributes = {
  FROM: 'from',
  TO: 'to',
  END_VALUE: 'end-value'
};

const selectors = {
  INPUT: 'input'
};

const events = {
  CHANGE: `${elementName}-change`,
  OPEN: `${elementName}-open`,
  CLOSE: `${elementName}-close`,
  INPUT: `${elementName}-input`
};

export const DATE_RANGE_PICKER_CONSTANTS = {
  elementName,
  selectors,
  events,
  observedAttributes
};


export interface IDateRangePickerChangeEventData extends DatePickerRange {}
