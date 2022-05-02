import { getShadowElement, removeAllChildren, appendToAttribute, toggleAttribute, toggleOnAttribute } from '@tylertech/forge-core';

import { BaseAdapter, IBaseAdapter } from '../core/base';
import { CALENDAR_CONSTANTS, DayOfWeek, ICalendarDateOptions, ICalendarDayOptions, ICalendarEvent, ICalendarDateConfig } from './calendar-constants';
import { ICalendarComponent } from './calendar';
import { splitIntoWeeks } from './calendar-utils';
import { getAccessibleHeader, getClearButton, getDateElement, getDateId, getDateRow, getDateSpacerElement, getDayElement, getEventElement, getEventWrapperElement, getEventWrapperId, getFooter, getHeader, getMonthButtonContent, getTodayButton, getTooltip, getYearButtonContent, setTabindexOnElement } from './calendar-dom-utils';
import { getLocalizedMonth, getLocalizedYear } from './calendar-locale-utils';
import { CalendarDirection, CALENDAR_MENU_CONSTANTS, ICalendarMenuOption, ICalendarMenuComponent, CalendarMenuAnimationType } from './calendar-menu';

export interface ICalendarAdapter extends IBaseAdapter {
  animateIntoSelectionMenu(options: ICalendarMenuOption[], direction: CalendarDirection, setFocus: boolean): void;
  closeMenu(): void;
  moveMenuFocusDown(): void;
  moveMenuFocusBackward(): boolean;
  moveMenuFocusForward(): boolean;
  moveMenuFocusUp(): void;
  openMenuAsGrid(options: ICalendarMenuOption[], setFocus: boolean): void;
  openMenuAsList(options: ICalendarMenuOption[], setFocus: boolean): void;
  registerClearButtonListener(listener: (evt: Event) => void): void;
  registerDateClickListener(listener: (evt: Event) => void): void;
  registerHoverListener(listener: (evt: Event) => void): void;
  registerKeydownListener(listener: (evt: KeyboardEvent) => void): void;
  registerMenuFocusChangeEventListener(listener: (evt: CustomEvent<number>) => void): void;
  registerMenuListener(listener: (evt: CustomEvent<number>) => void): void;
  registerMonthButtonListener(listener: (evt: Event) => void): void;
  registerNextButtonListener(listener: (evt: Event) => void): void;
  registerPreventFocusListener(listener: (evt: Event) => void): void;
  registerPreviousButtonListener(listener: (evt: Event) => void): void;
  registerTodayButtonListener(listener: (evt: Event) => void): void;
  registerYearButtonListener(listener: (evt: Event) => void): void;
  removeClearButton(): void;
  removeFooter(): void;
  removeHeader(): void;
  removeTodayButton(): void;
  replaceDate(date: ICalendarDateConfig, options?: ICalendarDateOptions): void;
  replaceDateWithSpacer(date: Date): void;
  selectFocusedMenuItem(): void;
  setAllDatesUnfocusable(): void;
  setClearButton(): void;
  setContainerClass(name: string, value: boolean): void;
  setDateDisabled(date: Date, value: boolean): void;
  setDateDescription(date: Date, value?: string): void;
  setDates(dates: ICalendarDateConfig[], options?: ICalendarDateOptions): void;
  setDateSelected(date: Date, value: boolean): void;
  setDateTooltip(date: Date, value?: string): void;
  setDateViewHidden(value: boolean): void;
  setDays(days: DayOfWeek[], options?: ICalendarDayOptions): void;
  setEvent(event: ICalendarEvent, overflow?: boolean): void;
  setEventWrapperOnDate(date: Date, value: boolean): void;
  setFooter(): void;
  setHeader(): void;
  setMenuAnimation(value: CalendarMenuAnimationType): void;
  setMonth(month: number, locale?: string): void;
  setMonthButtonPressed(value: boolean): void;
  setMultiple(value: boolean): void;
  setNextButtonDisabled(value: boolean): void;
  setNextButtonLabel(label: string): void;
  setPreventFocusOnMenu(value: boolean): void;
  setPreviousButtonDisabled(value: boolean): void;
  setPreviousButtonLabel(label: string): void;
  setRange(dates: Date[] | null): void;
  setRangeEnd(date: Date | null): void;
  setRangeStart(date: Date | null): void;
  setActiveDate(date: Date, setFocus: boolean, preventFocus?: boolean): void;
  setTodayButton(): void;
  setWeekend(date: Date, value: boolean): void;
  setYear(year: number, locale?: string): void;
  setYearButtonPressed(value: boolean): void;
  toggleContainerAttribute(hasAttribute: boolean, name: string, value?: string): void;
  unregisterClearButtonListener(listener: (evt: Event) => void): void;
  unregisterDateClickListener(listener: (evt: Event) => void): void;
  unregisterHoverListener(listener: (evt: Event) => void): void;
  unregisterMenuFocusChangeEventListener(listener: (evt: CustomEvent<number>) => void): void;
  unregisterMenuListener(listener: (evt: CustomEvent) => void): void;
  unregisterMonthButtonListener(listener: (evt: Event) => void): void;
  unregisterNextButtonListener(listener: (evt: Event) => void): void;
  unregisterPreventFocusListener(listener: (evt: Event) => void): void;
  unregisterPreviousButtonListener(listener: (evt: Event) => void): void;
  unregisterTodayButtonListener(listener: (evt: Event) => void): void;
  unregisterYearButtonListener(listener: (evt: Event) => void): void;
}

export class CalendarAdapter extends BaseAdapter<ICalendarComponent> implements ICalendarAdapter {
  private _container: HTMLElement;
  private _dateView: HTMLElement;
  private _dayRow: HTMLElement;
  private _dateGrid: HTMLElement;
  private _menu: ICalendarMenuComponent;

  constructor(component: ICalendarComponent) {
    super(component);
    this._container = getShadowElement(component, CALENDAR_CONSTANTS.selectors.CALENDAR);
    this._dateView = getShadowElement(component, CALENDAR_CONSTANTS.selectors.DATE_VIEW);
    this._dayRow = getShadowElement(component, CALENDAR_CONSTANTS.selectors.DAY_ROW);
    this._dateGrid = getShadowElement(component, CALENDAR_CONSTANTS.selectors.DATE_GRID);
    this._menu = getShadowElement(component, CALENDAR_CONSTANTS.selectors.MENU) as ICalendarMenuComponent;
  }

  public toggleContainerAttribute(hasAttribute: boolean, name: string, value?: string): void {
    toggleAttribute(this._container, hasAttribute, name, value);
  }

  public registerMonthButtonListener(listener: (evt: Event) => void): void {
    const monthButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.MONTH_BUTTON);
    monthButton?.addEventListener('click', listener);
  }

  public unregisterMonthButtonListener(listener: (evt: Event) => void): void {
    const monthButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.MONTH_BUTTON);
    monthButton?.removeEventListener('click', listener);
  }

  public registerYearButtonListener(listener: (evt: Event) => void): void {
    const yearButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.YEAR_BUTTON);
    yearButton?.addEventListener('click', listener);
  }

  public unregisterYearButtonListener(listener: (evt: Event) => void): void {
    const yearButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.YEAR_BUTTON);
    yearButton?.removeEventListener('click', listener);
  }

  public registerMenuListener(listener: (evt: CustomEvent<number>) => void): void {
    this._menu.addEventListener(CALENDAR_MENU_CONSTANTS.events.SELECT, listener);
  }

  public unregisterMenuListener(listener: (evt: CustomEvent<number>) => void): void {
    this._menu.removeEventListener(CALENDAR_MENU_CONSTANTS.events.SELECT, listener);
  }

  public registerMenuFocusChangeEventListener(listener: (evt: CustomEvent<number>) => void): void {
    this._menu.addEventListener(CALENDAR_MENU_CONSTANTS.events.FOCUS_CHANGE, listener);
  }

  public unregisterMenuFocusChangeEventListener(listener: (evt: CustomEvent<number>) => void): void {
    this._menu.addEventListener(CALENDAR_MENU_CONSTANTS.events.FOCUS_CHANGE, listener);
  }

  public registerNextButtonListener(listener: (evt: Event) => void): void {
    const nextButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.NEXT_BUTTON);
    nextButton?.addEventListener('click', listener);
  }

  public unregisterNextButtonListener(listener: (evt: Event) => void): void {
    const nextButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.NEXT_BUTTON);
    nextButton?.removeEventListener('click', listener);
  }

  public registerPreviousButtonListener(listener: (evt: Event) => void): void {
    const previousButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.PREVIOUS_BUTTON);
    previousButton?.addEventListener('click', listener);
  }

  public unregisterPreviousButtonListener(listener: (evt: Event) => void): void {
    const previousButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.PREVIOUS_BUTTON);
    previousButton?.removeEventListener('click', listener);
  }

  public registerClearButtonListener(listener: (evt: Event) => void): void {
    const clearButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.CLEAR_BUTTON);
    clearButton?.addEventListener('click', listener);
  }

  public unregisterClearButtonListener(listener: (evt: Event) => void): void {
    const clearButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.CLEAR_BUTTON);
    clearButton?.removeEventListener('click', listener);
  }

  public registerTodayButtonListener(listener: (evt: Event) => void): void {
    const todayButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.TODAY_BUTTON);
    todayButton?.addEventListener('click', listener);
  }

  public unregisterTodayButtonListener(listener: (evt: Event) => void): void {
    const todayButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.TODAY_BUTTON);
    todayButton?.removeEventListener('click', listener);
  }

  public registerDateClickListener(listener: (evt: Event) => void): void {
    this._dateGrid.addEventListener('click', listener);
  }

  public unregisterDateClickListener(listener: (evt: Event) => void): void {
    this._dateGrid.removeEventListener('click', listener);
  }

  public registerKeydownListener(listener: (evt: KeyboardEvent) => void): void {
    this._container.addEventListener('keydown', listener);
  }

  public registerHoverListener(listener: (evt: Event) => void): void {
    this._dateGrid.addEventListener('mouseover', listener);
  }

  public unregisterHoverListener(listener: (evt: Event) => void): void {
    this._dateGrid.removeEventListener('mouseover', listener);
  }

  public registerPreventFocusListener(listener: (evt: Event) => void): void {
    this._container.addEventListener('mousedown', listener);
  }

  public unregisterPreventFocusListener(listener: (evt: Event) => void): void {
    this._container.removeEventListener('mousedown', listener);
  }

  public setContainerClass(name: string, value: boolean): void {
    this._container.classList.toggle(name, value);
  }

  public setHeader(): void {
    const accessibleHeader = this._container.querySelector(CALENDAR_CONSTANTS.selectors.ACCESSIBLE_HEADER);
    accessibleHeader?.remove();

    const header = this._container.querySelector(CALENDAR_CONSTANTS.selectors.HEADER);
    if (header) {
      header.replaceWith(getHeader());
    } else {
      this._container.prepend(getHeader());
    }
  }

  public removeHeader(): void {
    const header = this._container.querySelector(CALENDAR_CONSTANTS.selectors.HEADER);
    header?.remove();

    const accessibleHeader = this._container.querySelector(CALENDAR_CONSTANTS.selectors.ACCESSIBLE_HEADER);
    if (accessibleHeader) {
      accessibleHeader.replaceWith(getAccessibleHeader());
    } else {
      this._container.prepend(getAccessibleHeader());
    }
  }

  public setNextButtonDisabled(value: boolean): void {
    const nextButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.NEXT_BUTTON);
    nextButton?.toggleAttribute('disabled', value);
  }

  public setPreviousButtonDisabled(value: boolean): void {
    const previousButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.PREVIOUS_BUTTON);
    previousButton?.toggleAttribute('disabled', value);
  }

  public setNextButtonLabel(label: string): void {
    const nextButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.NEXT_BUTTON);
    nextButton?.setAttribute('aria-label', label);

    const nextTooltip = this._container.querySelector(CALENDAR_CONSTANTS.selectors.NEXT_BUTTON_TOOLTIP);
    if (nextTooltip) {
      nextTooltip.innerHTML = label;
    }
  }

  public setPreviousButtonLabel(label: string): void {
    const previousButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.PREVIOUS_BUTTON);
    previousButton?.setAttribute('aria-label', label);

    const previousTooltip = this._container.querySelector(CALENDAR_CONSTANTS.selectors.PREVIOUS_BUTTON_TOOLTIP);
    if (previousTooltip) {
      previousTooltip.innerHTML = label;
    }
  }

  public setMonthButtonPressed(value: boolean): void {
    const monthButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.MONTH_BUTTON);
    if (monthButton) {
      monthButton.setAttribute('aria-pressed', value.toString());
      this._container.classList.toggle(CALENDAR_CONSTANTS.classes.MONTH_MENU_OPEN, value);
    }
  }

  public setYearButtonPressed(value: boolean): void {
    const yearButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.YEAR_BUTTON);
    if (yearButton) {
      yearButton.setAttribute('aria-pressed', value.toString());
      this._container.classList.toggle(CALENDAR_CONSTANTS.classes.YEAR_MENU_OPEN, value);
    }
  }

  public setMonth(month: number, locale?: string): void {
    const monthButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.MONTH_BUTTON);
    if (monthButton) {
      const content = getMonthButtonContent(month, locale);
      monthButton.replaceChildren(content[0], content[1]);
      return;
    }

    const accessibleMonth = this._container.querySelector(CALENDAR_CONSTANTS.selectors.ACCESSIBLE_MONTH);
    if (accessibleMonth) {
      accessibleMonth.textContent = getLocalizedMonth(month, 'long', locale);
    }
  }

  public setYear(year: number, locale?: string): void {
    const yearButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.YEAR_BUTTON);
    if (yearButton) {
      const content = getYearButtonContent(year, locale);
      yearButton.replaceChildren(content[0], content[1]);
      return;
    }

    const accessibleYear = this._container.querySelector(CALENDAR_CONSTANTS.selectors.ACCESSIBLE_YEAR);
    if (accessibleYear) {
      accessibleYear.textContent = getLocalizedYear(year, 'numeric', locale);
    }
  }

  public setFooter(): void {
    const footer = this._container.querySelector(CALENDAR_CONSTANTS.selectors.FOOTER);
    if (!footer) {
      this._container.appendChild(getFooter());
    }
  }

  public removeFooter(): void {
    const footer = this._container.querySelector(CALENDAR_CONSTANTS.selectors.FOOTER);
    footer?.parentNode?.removeChild(footer);
  }

  public setClearButton(): void {
    const footer = this._container.querySelector(CALENDAR_CONSTANTS.selectors.FOOTER);
    if (!footer) {
      return;
    }

    const clearButton = footer.querySelector(CALENDAR_CONSTANTS.selectors.CLEAR_BUTTON);
    if (!clearButton) {
      footer.prepend(getClearButton());
    }
  }

  public removeClearButton(): void {
    const clearButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.CLEAR_BUTTON);
    clearButton?.parentNode?.removeChild(clearButton);
  }

  public setTodayButton(): void {
    const footer = this._container.querySelector(CALENDAR_CONSTANTS.selectors.FOOTER);
    if (!footer) {
      return;
    }

    const todayButton = footer.querySelector(CALENDAR_CONSTANTS.selectors.TODAY_BUTTON);
    if (!todayButton) {
      footer.appendChild(getTodayButton());
    }
  }

  public removeTodayButton(): void {
    const todayButton = this._container.querySelector(CALENDAR_CONSTANTS.selectors.TODAY_BUTTON);
    todayButton?.parentNode?.removeChild(todayButton);
  }

  public setDays(days: DayOfWeek[], options?: ICalendarDayOptions): void {
    removeAllChildren(this._dayRow);
    days.forEach(d => {
      let element = getDayElement(d, options?.locale);
      if (options?.builder) {
        element = options.builder(d, element);
      }
      this._dayRow.appendChild(element);
    });
  }

  public setDates(dates: ICalendarDateConfig[], options?: ICalendarDateOptions): void {
    removeAllChildren(this._dateGrid);
    splitIntoWeeks(dates).forEach((w, i) => {
      const dateRow = getDateRow(w, i, options);
      this._dateGrid.appendChild(dateRow);
    });
  }

  public replaceDate(date: ICalendarDateConfig, options?: ICalendarDateOptions): void {
    const dateElement = this._dateGrid.querySelector(`#${getDateId(date.date)}`);
    if (dateElement) {
      const element = getDateElement(date, options?.locale);
      if (options?.builder) {
        dateElement.replaceWith(options.builder(date, element));
      } else {
        dateElement.replaceWith(element);
      }
    }
  }

  public replaceDateWithSpacer(date: Date): void {
    const dateElement = this._dateGrid.querySelector(`#${getDateId(date)}`);
    dateElement?.replaceWith(getDateSpacerElement(date));
  }

  public setDateDisabled(date: Date, value: boolean): void {
    const element = this._dateGrid.querySelector(`#${getDateId(date)}`);
    if (element) {
      element.toggleAttribute('disabled', value);
      element.setAttribute('aria-disabled', value.toString());
    }
  }

  public setDateSelected(date: Date, value: boolean): void {
    const element = this._dateGrid.querySelector(`#${getDateId(date)}`);
    if (element) {
      element.classList.toggle(CALENDAR_CONSTANTS.classes.DATE_SELECTED, value);
      element.setAttribute('aria-selected', value.toString());
    }
  }

  public setWeekend(date: Date, value: boolean): void {
    const element = this._dateGrid.querySelector(`#${getDateId(date)}`);
    const innerElement = element?.querySelector(CALENDAR_CONSTANTS.selectors.DATE_INNER);
    if (!innerElement) {
      return;
    }
    toggleOnAttribute(innerElement as HTMLElement, 'part', CALENDAR_CONSTANTS.parts.WEEKEND, value);
  }

  public appendDateAttribute(date: Date, name: string, value: string): void {
    const element = this._dateGrid.querySelector(`#${getDateId(date)}`);
    if (element) {
      appendToAttribute(element as HTMLElement, name, value);
    }
  }

  public setMultiple(value: boolean): void {
    this._dateView.setAttribute('aria-multiselectable', value.toString());
  }

  public setDateViewHidden(value: boolean): void {
    toggleAttribute(this._dateView, value, 'aria-hidden', value.toString());
    this.setAllDatesUnfocusable();
  }

  // #endregion

  // #region Range

  public setRange(dates: Date[] | null): void {
    const oldDateElements = this._dateGrid.querySelectorAll(CALENDAR_CONSTANTS.selectors.RANGE);
    oldDateElements.forEach(e => e.classList.remove(CALENDAR_CONSTANTS.classes.RANGE));

    if (!dates) {
      return;
    }

    dates.forEach(d => {
      const dateElement = this._dateGrid.querySelector(`#${getDateId(d)}`);
      dateElement?.classList.add(CALENDAR_CONSTANTS.classes.RANGE);
    });
  }

  public setRangeStart(date: Date | null): void {
    const oldDateElement = this._dateGrid.querySelector(CALENDAR_CONSTANTS.selectors.RANGE_START);
    oldDateElement?.classList.remove(CALENDAR_CONSTANTS.classes.RANGE_START);

    if (!date) {
      return;
    }

    const newDateElement = this._dateGrid.querySelector(`#${getDateId(date)}`);
    newDateElement?.classList.add(CALENDAR_CONSTANTS.classes.RANGE_START);
  }

  public setRangeEnd(date: Date | null): void {
    const oldDateElement = this._dateGrid.querySelector(CALENDAR_CONSTANTS.selectors.RANGE_END);
    oldDateElement?.classList.remove(CALENDAR_CONSTANTS.classes.RANGE_END);

    if (!date) {
      return;
    }

    const newDateElement = this._dateGrid.querySelector(`#${getDateId(date)}`);
    newDateElement?.classList.add(CALENDAR_CONSTANTS.classes.RANGE_END);
  }

  public setActiveDate(date: Date, setFocus: boolean, preventFocus?: boolean): void {
    const dateString = date.toDateString();
    const elements = this._dateGrid.querySelectorAll(CALENDAR_CONSTANTS.selectors.DATE);
    elements.forEach(e => {
      const shouldFocus = e.getAttribute(CALENDAR_CONSTANTS.attributes.DATA_DATE) === dateString;
      setTabindexOnElement(e as HTMLElement, shouldFocus ? 0 : -1, setFocus, preventFocus);
    });
  }

  public setAllDatesUnfocusable(): void {
    const elements = this._dateGrid.querySelectorAll(CALENDAR_CONSTANTS.selectors.DATE);
    elements.forEach(e => setTabindexOnElement(e as HTMLElement, -1, false, true));
  }

  public setDateDescription(date: Date, value?: string): void {
    const dateElement = this._dateGrid.querySelector(`#${getDateId(date)}`);
    if (!dateElement) {
      return;
    }
    toggleAttribute(dateElement as HTMLElement, !!value, value as string);
  }

  public setDateTooltip(date: Date, value?: string): void {
    const dateElement = this._dateGrid.querySelector(`#${getDateId(date)}`);
    if (!dateElement) {
      return;
    }
    const tooltip = dateElement.querySelector(CALENDAR_CONSTANTS.selectors.TOOLTIP);
    if (tooltip) {
      if (value?.length) {
        tooltip.textContent = value;
      } else {
        tooltip.remove();
      }
    } else if (value?.length) {
      dateElement.prepend(getTooltip(value));
    }
  }

  public setEventWrapperOnDate(date: Date, value: boolean): void {
    const dateElement = this._dateGrid.querySelector(`#${getDateId(date)}`);
    if (!dateElement) {
      return;
    }
    const eventWrapper = dateElement.querySelector(CALENDAR_CONSTANTS.selectors.EVENT_WRAPPER);
    if (eventWrapper) {
      if (value) {
        removeAllChildren(eventWrapper);
      } else {
        eventWrapper.remove();
      }
    } else if (value) {
      dateElement.appendChild(getEventWrapperElement(date));
    }
  }

  public setEvent(event: ICalendarEvent, overflow?: boolean): void {
    const eventWrapper = this._dateGrid.querySelector(`#${getEventWrapperId(event.date)}`);
    eventWrapper?.appendChild(getEventElement(event, overflow));
  }

  public openMenuAsGrid(options: ICalendarMenuOption[], setFocus: boolean): void {
    this._menu.openAsGrid(options, setFocus);
  }

  public openMenuAsList(options: ICalendarMenuOption[], setFocus: boolean): void {
    this._menu.openAsList(options, setFocus);
  }

  public closeMenu(): void {
    this._menu.close();
  }

  public setMenuAnimation(value: CalendarMenuAnimationType): void {
    this._menu.animationType = value;
  }

  public animateIntoSelectionMenu(options: ICalendarMenuOption[], direction: CalendarDirection, setFocus: boolean): void {
    this._menu.animateIn(options, direction, setFocus);
  }

  public moveMenuFocusDown(): void {
    this._menu.moveFocusDown();
  }

  public moveMenuFocusBackward(): boolean {
    return this._menu.moveFocusBackward();
  }

  public moveMenuFocusForward(): boolean {
    return this._menu.moveFocusForward();
  }

  public moveMenuFocusUp(): void {
    this._menu.moveFocusUp();
  }

  public selectFocusedMenuItem(): void {
    this._menu.selectFocusedItem();
  }

  public setPreventFocusOnMenu(value: boolean): void {
    this._menu.preventFocus = value;
  }
}
