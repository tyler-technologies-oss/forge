import { getEventPath, appendToAttribute, toggleOnAttribute } from '@tylertech/forge-core';

import { IIconComponent } from '../icon';
import { CALENDAR_CONSTANTS, DayOfWeek, ICalendarDateConfig, ICalendarDateOptions, ICalendarEvent } from './calendar-constants';
import { getLocalizedDayOfMonth, getLocalizedDayOfWeek, getLocalizedMonth, getLocalizedYear } from './calendar-locale-utils';

/** Converts a day into an id string prefixed with "d". */
export function getDayId(day: DayOfWeek): string {
  return `d${day}`;
}

/** Converts a date object into a "yyyymmdd" id string prefixed with "d". */
export function getDateId(date: Date): string {
  const month = String(date.getMonth()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return ['d', year, month, day].join('');
}

/** Converts a date object into a "yyyymmdd" if string prefixed with "e". */
export function getEventWrapperId(date: Date): string {
  const month = String(date.getMonth()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return ['e', year, month, day].join('');
}

/** Returns a day element. */
export function getDayElement(day: DayOfWeek, locale?: string): HTMLElement {
  const element = document.createElement('div');
  element.classList.add(CALENDAR_CONSTANTS.classes.DAY);
  element.id = getDayId(day);
  element.setAttribute('role', 'columnheader');
  element.setAttribute('aria-label', getLocalizedDayOfWeek(day, 'long', locale));
  element.setAttribute('part', CALENDAR_CONSTANTS.parts.DAY);
  element.textContent = getLocalizedDayOfWeek(day, 'short', locale);
  return element;
}

/** Returns a date row element. */
export function getDateRow(dates: ICalendarDateConfig[], index: number, options?: ICalendarDateOptions): HTMLElement {
  const element = document.createElement('div');
  element.classList.add(CALENDAR_CONSTANTS.classes.DATE_VIEW_ROW);
  element.setAttribute('role', 'row');

  // Populate the row
  if (index > 0 && !dates[0]?.thisMonth) {
    // A row after the first that begins on another month is all spacers and should be hidden from the accessibility tree
    dates.forEach(d => element.appendChild(getDateSpacerElement(d.date)));
    element.setAttribute('aria-hidden', 'true');
  } else {
    dates.forEach(d => {
      let dateElement = d.thisMonth || options?.showOtherMonths ? getDateElement(d, options?.locale) : getDateSpacerElement(d.date);
      if ((d.thisMonth || options?.showOtherMonths) && options?.builder) {
        dateElement = options.builder(d, dateElement);
      }
      element.appendChild(dateElement);
    });
  }

  return element;
}

/** Returns a date element. */
export function getDateElement(date: ICalendarDateConfig, locale?: string): HTMLElement {
  const element = document.createElement('div');
  const rangeElement = document.createElement('div');
  const innerElement = document.createElement('div');

  const stateLayerElement = document.createElement('forge-state-layer');
  stateLayerElement.disabled = date.disabled;

  const focusIndicatorElement = document.createElement('forge-focus-indicator');
  focusIndicatorElement.inward = true;

  const day = date.date.getDay();
  element.id = getDateId(date.date);
  element.tabIndex = -1;
  element.classList.add(CALENDAR_CONSTANTS.classes.DATE);
  element.classList.toggle(CALENDAR_CONSTANTS.classes.DATE_TODAY, date.today);
  element.classList.toggle(CALENDAR_CONSTANTS.classes.DATE_SELECTED, date.selected);
  element.classList.toggle(CALENDAR_CONSTANTS.classes.DATE_OTHER_MONTH, !date.thisMonth);
  element.setAttribute('role', 'gridcell');
  element.setAttribute('aria-disabled', date.disabled.toString());
  element.setAttribute(
    'aria-label',
    `${date.today ? 'Today, ' : ''}${date.date.toLocaleDateString(locale ?? navigator.language, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`
  );
  element.setAttribute('aria-selected', date.selected.toString());
  element.setAttribute(CALENDAR_CONSTANTS.attributes.DATA_DATE, date.date.toDateString());
  element.toggleAttribute('disabled', date.disabled);
  element.setAttribute('part', CALENDAR_CONSTANTS.parts.DATE_WRAPPER);

  // Add day of week part
  let dayOfWeekPart = '';
  switch (day) {
    case DayOfWeek.Sunday:
      dayOfWeekPart = CALENDAR_CONSTANTS.parts.SUNDAY;
      break;
    case DayOfWeek.Monday:
      dayOfWeekPart = CALENDAR_CONSTANTS.parts.MONDAY;
      break;
    case DayOfWeek.Tuesday:
      dayOfWeekPart = CALENDAR_CONSTANTS.parts.TUESDAY;
      break;
    case DayOfWeek.Wednesday:
      dayOfWeekPart = CALENDAR_CONSTANTS.parts.WEDNESDAY;
      break;
    case DayOfWeek.Thursday:
      dayOfWeekPart = CALENDAR_CONSTANTS.parts.THURSDAY;
      break;
    case DayOfWeek.Friday:
      dayOfWeekPart = CALENDAR_CONSTANTS.parts.FRIDAY;
      break;
    case DayOfWeek.Saturday:
      dayOfWeekPart = CALENDAR_CONSTANTS.parts.SATURDAY;
      break;
  }
  appendToAttribute(innerElement, 'part', dayOfWeekPart);
  appendToAttribute(innerElement, 'part', CALENDAR_CONSTANTS.parts.DATE);
  toggleOnAttribute(innerElement, 'part', CALENDAR_CONSTANTS.parts.TODAY, date.today);
  toggleOnAttribute(innerElement, 'part', CALENDAR_CONSTANTS.parts.DATE_OTHER_MONTH, !date.thisMonth);

  rangeElement.classList.add(CALENDAR_CONSTANTS.classes.RANGE_TARGET);
  element.appendChild(rangeElement);
  innerElement.textContent = getLocalizedDayOfMonth(date.date.getDate(), 'numeric', locale);
  innerElement.classList.add(CALENDAR_CONSTANTS.classes.DATE_INNER);
  element.appendChild(innerElement);
  element.appendChild(stateLayerElement);
  element.appendChild(focusIndicatorElement);
  return element;
}

/** Returns a date spacer element. */
export function getDateSpacerElement(date: Date): HTMLElement {
  // This is a span to easiliy differentiate it from a date in CSS
  const element = document.createElement('span');
  element.classList.add(CALENDAR_CONSTANTS.classes.DATE_SPACER);
  element.id = getDateId(date);
  return element;
}

/** Returns an event wrapper element. */
export function getEventWrapperElement(date: Date): HTMLElement {
  const element = document.createElement('div');
  element.classList.add(CALENDAR_CONSTANTS.classes.EVENT_WRAPPER);
  element.id = getEventWrapperId(date);
  element.setAttribute('part', CALENDAR_CONSTANTS.parts.EVENT_WRAPPER);
  return element;
}

/** Returns an event element. */
export function getEventElement(event: ICalendarEvent, overflow?: boolean): HTMLElement {
  const element: IIconComponent = document.createElement('forge-icon');
  element.classList.add(CALENDAR_CONSTANTS.classes.EVENT);
  element.setAttribute('part', CALENDAR_CONSTANTS.parts.EVENT);
  if (overflow) {
    element.classList.add(CALENDAR_CONSTANTS.classes.EVENT_OVERFLOW);
    element.name = 'add';
  } else {
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="var(--forge-calendar-event-stroke-color)" stroke-width="4px" paint-order="stroke"></path></svg>';
    element.src = svg;
    element.setAttribute(CALENDAR_CONSTANTS.attributes.DATA_EVENT_THEME, event.color);
  }
  return element;
}

/** Returns a tooltip element. */
export function getTooltip(content: string): HTMLElement {
  const tooltip = document.createElement('forge-tooltip');
  tooltip.textContent = content;
  return tooltip;
}

/** Returns a calendar header. */
export function getHeader(): HTMLElement {
  const element = document.createElement('div');
  element.classList.add(CALENDAR_CONSTANTS.classes.HEADER);
  element.id = CALENDAR_CONSTANTS.ids.HEADER;
  element.setAttribute('part', CALENDAR_CONSTANTS.parts.HEADER);

  const previousButton = document.createElement('forge-icon-button');
  const previousIcon = document.createElement('forge-icon');
  const previousTooltip = document.createElement('forge-tooltip');
  previousButton.setAttribute('part', CALENDAR_CONSTANTS.parts.PREVIOUS_BUTTON);
  previousButton.id = CALENDAR_CONSTANTS.ids.PREVIOUS_BUTTON;
  previousButton.type = 'button';
  previousButton.setAttribute('aria-label', 'Previous');
  previousIcon.setAttribute('name', 'keyboard_arrow_left');
  previousTooltip.id = CALENDAR_CONSTANTS.ids.PREVIOUS_BUTTON_TOOLTIP;
  previousTooltip.setAttribute('aria-hidden', 'true');
  previousTooltip.innerText = 'Previous';
  previousButton.appendChild(previousTooltip);
  previousButton.appendChild(previousIcon);

  const nextButton = document.createElement('forge-icon-button');
  const nextIcon = document.createElement('forge-icon');
  const nextTooltip = document.createElement('forge-tooltip');
  nextButton.setAttribute('part', CALENDAR_CONSTANTS.parts.NEXT_BUTTON);
  nextButton.id = CALENDAR_CONSTANTS.ids.NEXT_BUTTON;
  nextButton.type = 'button';
  nextButton.setAttribute('aria-label', 'Next');
  nextIcon.setAttribute('name', 'keyboard_arrow_right');
  nextTooltip.id = CALENDAR_CONSTANTS.ids.NEXT_BUTTON_TOOLTIP;
  nextTooltip.setAttribute('aria-hidden', 'true');
  nextTooltip.innerText = 'Next';
  nextButton.appendChild(nextTooltip);
  nextButton.appendChild(nextIcon);

  const monthButton = document.createElement('forge-button');
  monthButton.setAttribute('part', CALENDAR_CONSTANTS.parts.MONTH_BUTTON);
  monthButton.id = CALENDAR_CONSTANTS.ids.MONTH_BUTTON;
  monthButton.type = 'button';
  monthButton.setAttribute('aria-pressed', 'false');

  const yearButton = document.createElement('forge-button');
  yearButton.setAttribute('part', CALENDAR_CONSTANTS.parts.YEAR_BUTTON);
  yearButton.id = CALENDAR_CONSTANTS.ids.YEAR_BUTTON;
  yearButton.type = 'button';
  yearButton.setAttribute('aria-pressed', 'false');

  // TODO: change order of month and year based on locale
  const centerContainer = document.createElement('div');
  centerContainer.setAttribute('aria-live', 'polite');
  centerContainer.appendChild(monthButton);
  centerContainer.appendChild(yearButton);

  element.appendChild(previousButton);
  element.appendChild(centerContainer);
  element.appendChild(nextButton);
  return element;
}

/** Returns content for the month button. */
export function getMonthButtonContent(month: number, locale?: string): HTMLElement[] {
  const span = document.createElement('span');
  const icon = document.createElement('forge-icon');
  span.innerHTML = getLocalizedMonth(month, 'long', locale);
  icon.setAttribute('name', 'arrow_drop_down');
  return [span, icon];
}

/** Returns content for the year button. */
export function getYearButtonContent(year: number, locale?: string): HTMLElement[] {
  const span = document.createElement('span');
  const icon = document.createElement('forge-icon');
  span.innerHTML = getLocalizedYear(year, 'numeric', locale);
  icon.setAttribute('name', 'arrow_drop_down');
  return [span, icon];
}

/** Returns a hidden, accessible header. */
export function getAccessibleHeader(): HTMLElement {
  const element = document.createElement('div');
  element.id = CALENDAR_CONSTANTS.ids.ACCESSIBLE_HEADER;
  element.setAttribute('aria-live', 'polite');

  const month = document.createElement('span');
  month.id = CALENDAR_CONSTANTS.ids.ACCESSIBLE_MONTH;

  const year = document.createElement('span');
  year.id = CALENDAR_CONSTANTS.ids.ACCESSIBLE_YEAR;

  // TODO: change order of month and year based on locale
  element.appendChild(month);
  element.appendChild(year);
  return element;
}

/** Returns a calendar footer. */
export function getFooter(): HTMLElement {
  const element = document.createElement('div');
  element.id = CALENDAR_CONSTANTS.ids.FOOTER;
  element.classList.add(CALENDAR_CONSTANTS.classes.FOOTER);
  element.setAttribute('part', CALENDAR_CONSTANTS.parts.FOOTER);
  return element;
}

/** Returns a clear button. */
export function getClearButton(): HTMLElement {
  const clearButton = document.createElement('forge-button');
  clearButton.id = CALENDAR_CONSTANTS.ids.CLEAR_BUTTON;
  clearButton.setAttribute('part', CALENDAR_CONSTANTS.parts.CLEAR_BUTTON);
  clearButton.type = 'button';
  clearButton.innerText = 'Clear';
  return clearButton;
}

/** Returns a today button. */
export function getTodayButton(): HTMLElement {
  const todayButton = document.createElement('forge-button');
  todayButton.id = CALENDAR_CONSTANTS.ids.TODAY_BUTTON;
  todayButton.setAttribute('part', CALENDAR_CONSTANTS.parts.TODAY_BUTTON);
  todayButton.type = 'button';
  todayButton.innerText = 'Today';
  return todayButton;
}

/** Checks whether an event originated from a date element, returning the element if it did. */
export function eventIncludesDate(evt: Event, includeDisabled?: boolean): HTMLElement | null {
  const element = getEventPath(evt).find(p => p.classList && p.classList.contains(CALENDAR_CONSTANTS.classes.DATE));
  if (!element || (!includeDisabled && element.hasAttribute('disabled'))) {
    return null;
  }
  return element;
}

/** Checks whether an event originated from an element with the given id, returning the element if it did. */
export function eventIncludesElement(evt: Event, id: string): HTMLElement | null {
  const element = getEventPath(evt).find(p => p.id === id);
  return element ?? null;
}

/** Sets the tabindex on a date element. */
export function setTabindexOnElement(element: HTMLElement, value: number, setFocus: boolean, preventFocus?: boolean): void {
  element.tabIndex = preventFocus ? -1 : value;

  const focusIndicatorElement = element.querySelector('forge-focus-indicator');
  if (focusIndicatorElement) {
    focusIndicatorElement.active = !!preventFocus && value > -1;
  }

  if (value > -1 && setFocus && !preventFocus) {
    element.focus();
  } else {
    element.blur();
  }
}
