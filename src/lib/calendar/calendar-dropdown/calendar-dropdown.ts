import { closestElement, createVisuallyHiddenElement, isArray } from '@tylertech/forge-core';
import { Nullable } from '../../core';
import { IPopoverComponent } from '../../popover/popover';
import { POPOVER_CONSTANTS } from '../../popover/popover-constants';

import { ICalendarComponent } from '../calendar';
import { CALENDAR_CONSTANTS, ICalendarFocusChangeEventData } from '../calendar-constants';
import { getDateId } from '../calendar-dom-utils';
import { CALENDAR_DROPDOWN_CONSTANTS } from './calendar-dropdown-constants';

export interface ICalendarDropdown {
  calendar: Nullable<ICalendarComponent>;
  dropdownElement: Nullable<IPopoverComponent>;
  id: string;
  targetElement: HTMLElement;
  popupClasses: string | string[] | null;
  locale: Nullable<string>;
  isOpen: boolean;
  activeChangeCallback: Nullable<(id: string) => void>;
  closeCallback: Nullable<() => void>;
  open(config: Partial<ICalendarComponent>): void;
  close(): void;
  destroy(): void;
  propagateKeyboardEvent(evt: KeyboardEvent): void;
}

export class CalendarDropdown implements ICalendarDropdown {
  public calendar: Nullable<ICalendarComponent>;
  public dropdownElement: Nullable<IPopoverComponent>;
  public id: string;
  public targetElement: HTMLElement;
  public activeChangeCallback: Nullable<(id: string) => void>;
  public closeCallback: Nullable<() => void>;

  private _announcerElement: HTMLElement | undefined;
  private _popupClasses: string[] = [];

  public get isOpen(): boolean {
    return this.dropdownElement?.open ?? false;
  }

  public get popupClasses(): string | string[] | null {
    return this._popupClasses;
  }
  public set popupClasses(value: string | string[] | null) {
    this._popupClasses = !!value ? (isArray(value) ? [...(value as string[])] : [value as string]) : [];
  }

  public get locale(): Nullable<string> {
    return this.calendar?.locale;
  }
  public set locale(value: Nullable<string>) {
    if (this.calendar) {
      this.calendar.locale = value;
    }
  }

  constructor(targetElement: HTMLElement, id: string) {
    this.targetElement = targetElement;
    this.id = id;
  }

  public async close({ force = false } = {}): Promise<void> {
    if (!this.dropdownElement) {
      return;
    }

    if (force) {
      this.dropdownElement.open = false;
    } else {
      await this.dropdownElement.hideAsync();
    }

    this.dropdownElement?.remove();
    this.dropdownElement = undefined;
    this.calendar = undefined;
  }

  public destroy(): void {
    this.close({ force: true });
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

    // Append to root node
    const hostDocument = this.targetElement.ownerDocument ?? document;
    const hostElement = (closestElement(POPOVER_CONSTANTS.selectors.HOST, this.targetElement) as HTMLElement) ?? hostDocument.body;
    hostElement.appendChild(this.dropdownElement);

    this.dropdownElement.open = true;
  }

  public propagateKeyboardEvent(evt: KeyboardEvent): void {
    this.calendar?.handleKey(evt);
  }

  private _createCalendar(config: Partial<ICalendarComponent>): ICalendarComponent {
    const calendarElement = document.createElement(CALENDAR_CONSTANTS.elementName);
    Object.assign(calendarElement, config);
    return calendarElement;
  }

  private _createDropdown(): IPopoverComponent {
    const popupElement = document.createElement('forge-popover');
    popupElement.anchorElement = this.targetElement;
    popupElement.placement = 'bottom-start';
    popupElement.persistent = true;
    popupElement.classList.add(CALENDAR_DROPDOWN_CONSTANTS.classes.POPUP);
    popupElement.id = this.id;
    popupElement.classList.add(...this._popupClasses);
    popupElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, () => this.closeCallback?.());
    return popupElement;
  }
}
