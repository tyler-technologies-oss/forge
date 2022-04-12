export interface ICalendarDropdownPopupConfig {
  activeChangeCallback?: (id: string) => void;
  closeCallback?: () => void;
  popupClasses?: string | string[] | null;
}

const classes = {
  POPUP: `forge-calendar-dropdown__popup`
};

export const CALENDAR_DROPDOWN_CONSTANTS = {
  classes
};
