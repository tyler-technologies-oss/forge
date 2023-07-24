import { addClass, isArray, createVisuallyHiddenElement } from '@tylertech/forge-core';

import { IPopupComponent, PopupAnimationType, POPUP_CONSTANTS } from '../../popup';
import { ICalendarComponent } from '../calendar';
import { CALENDAR_CONSTANTS, ICalendarFocusChangeEventData } from '../calendar-constants';
import { getDateId } from '../calendar-dom-utils';
import { CALENDAR_DROPDOWN_CONSTANTS } from './calendar-dropdown-constants';

export interface ICalendarDropdown {
  calendar: ICalendarComponent | undefined;
  dropdownElement: IPopupComponent | undefined;
  id: string;
  targetElement: HTMLElement;
  popupClasses: string | string[] | null;
  locale: string | undefined;
  isOpen: boolean;
  activeChangeCallback: ((id: string) => void) | undefined;
  closeCallback: (() => void) | undefined;
  open(config: Partial<ICalendarComponent>): void;
  close(): void;
  destroy(): void;
  propagateKeyboardEvent(evt: KeyboardEvent): void;
}

export class CalendarDropdown implements ICalendarDropdown {
  public calendar: ICalendarComponent | undefined;
  public dropdownElement: IPopupComponent | undefined;
  public id: string;
  public targetElement: HTMLElement;
  public activeChangeCallback: ((id: string) => void) | undefined;
  public closeCallback: (() => void) | undefined;

  private _announcerElement: HTMLElement | undefined;
  private _popupClasses: string[] = [];

  public get isOpen(): boolean {
    return this.dropdownElement?.open ?? false;
  }

  public get popupClasses(): string | string[] | null {
    return this._popupClasses;
  }
  public set popupClasses(value: string | string[] | null) {
    this._popupClasses = !!value ? isArray(value) ? [...value as string[]] : [value as string] : [];
  }

  public get locale(): string | undefined {
    return this.calendar?.locale;
  }
  public set locale(value: string | undefined) {
    if (this.calendar) {
      this.calendar.locale = value;
    }
  }
  
  constructor(targetElement: HTMLElement, id: string) {
    this.targetElement = targetElement;
    this.id = id;
  }

  public close(): void {
    if (!this.dropdownElement) {
      return;
    }
    this.dropdownElement.open = false;
    this.dropdownElement = undefined;
    this.calendar = undefined;
  }

  public destroy(): void {
    this.close();
  }

  public open(config: Partial<ICalendarComponent>): void {
    // Create calendar element
    this.calendar = this._createCalendar(config);
    this._announcerElement = createVisuallyHiddenElement();
    (this._announcerElement as HTMLElement).id = `${this.id}-activedescendant`;

    // Create dropdown element
    this.dropdownElement = this._createDropdown();
    this.dropdownElement.appendChild(this.calendar);
    this.dropdownElement.appendChild(this._announcerElement as HTMLElement);
    this.dropdownElement.static = true;

    // Add a listener for when the active descendent is updated
    this.calendar.addEventListener(CALENDAR_CONSTANTS.events.FOCUS_CHANGE, (evt: CustomEvent<ICalendarFocusChangeEventData>) => {
      let id = `${this.id}-activedescendent-`;
      switch (evt.detail.type) {
        case 'date':
          id += getDateId(evt.detail.value as Date);
          break;
        case 'month':
          id += `month-${evt.detail.value.toString()}`;
          break;
        case 'year':
          id += `year-${evt.detail.value.toString()}`;
          break;
      }
      this.activeChangeCallback?.call(this, id);
      if (this._announcerElement) {
        this._announcerElement.id = id;
        this._announcerElement.setAttribute('aria-selected', evt.detail.selected.toString());
        this._announcerElement.textContent = evt.detail.text;
      }
    });

    // Open the popup
    this.dropdownElement.open = true;

    // Attempt to re-layout the calendar to account for updates in rendering during scale
    // transition within popup (fixes ripple alignment... etc.)
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        if (this.dropdownElement && this.dropdownElement.open && this.calendar && this.calendar.isConnected) {
          this.calendar.layout();
        }
      }, POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
    });
  }

  public propagateKeyboardEvent(evt: KeyboardEvent): void {
    this.calendar?.handleKey(evt);
  }

  private _createCalendar(config: Partial<ICalendarComponent>): ICalendarComponent {
    const calendarElement = document.createElement(CALENDAR_CONSTANTS.elementName);
    Object.assign(calendarElement, config);
    return calendarElement;
  }

  private _createDropdown(): IPopupComponent {
    const popupElement = document.createElement(POPUP_CONSTANTS.elementName) as IPopupComponent;
    popupElement.targetElement = this.targetElement;
    popupElement.placement = 'bottom-start';
    popupElement.animationType = PopupAnimationType.Menu;
    popupElement.classList.add(CALENDAR_DROPDOWN_CONSTANTS.classes.POPUP);
    popupElement.id = this.id;
    addClass(this._popupClasses, popupElement);

    popupElement.addEventListener(POPUP_CONSTANTS.events.CLOSE, () => {
      if (this.closeCallback) {
        this.closeCallback();
      }
    });

    return popupElement;
  }
}
