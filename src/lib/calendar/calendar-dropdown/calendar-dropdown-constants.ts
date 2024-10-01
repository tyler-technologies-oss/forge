import { IDatePickerCalendarDropdownText } from '@tylertech/forge/date-picker/base/base-date-picker-constants';

export interface ICalendarDropdownPopupConfig {
  activeChangeCallback?: (id: string) => void;
  closeCallback?: () => void;
  popupClasses?: string | string[] | null;
  calendarText?: IDatePickerCalendarDropdownText;
}

const classes = {
  POPUP: `forge-calendar-dropdown__popup`
};

export const CALENDAR_DROPDOWN_CONSTANTS = {
  classes
};
