import { randomChars } from '@tylertech/forge-core';
import { DateRange, DayOfWeek, ICalendarComponent } from '../../calendar';
import { ICalendarDropdown, ICalendarDropdownPopupConfig } from '../../calendar/calendar-dropdown';
import { BaseAdapter, IBaseAdapter, IDateInputMaskOptions } from '../../core';
import { BaseComponent } from '../../core/base/base-component';
import { ICON_BUTTON_CONSTANTS, IIconButtonComponent } from '../../icon-button';
import { TEXT_FIELD_CONSTANTS } from '../../text-field';
import { BASE_DATE_PICKER_CONSTANTS } from './base-date-picker-constants';
import { createToggleElement } from './base-date-picker-utils';

export interface IBaseDatePickerAdapter extends IBaseAdapter {
  initialize(): void;
  initializeAccessibility(): void;
  destroy(): void;
  setActiveDescendant(id: string): void;

  // Mask
  initializeMask(options: IDateInputMaskOptions): void;
  destroyMask(): void;

  // Toggle
  tryCreateToggle(): void;
  addToggleListener(type: string, listener: (event: Event) => void): void;
  removeToggleListener(type: string, listener: (event: Event) => void): void;
  
  // Input
  addInputListener(type: string, listener: (event: Event) => void, capture?: boolean): void;
  removeInputListener(type: string, listener: (event: Event) => void, capture?: boolean): void;
  setInputValueChangedListener(context: any, listener: (value: any) => void): void;
  hasInputElement(): boolean;
  tryFocusInput(): void;
  tryBlurInput(): void;
  isInputDisabled(): boolean;
  isInputFocused(target?: EventTarget | null): boolean;
  setDisabled(value: boolean): void;
  getInputValue(): string;
  setInputValue(value: string, emitEvents: boolean): void;
  selectInputText(): void;
  emitInputEvent(type: string, data?: any): void;
  
  // Calendar
  attachCalendar(calendarConfig: Partial<ICalendarComponent>, dropdownConfig?: ICalendarDropdownPopupConfig): void;
  detachCalendar(): void;
  goToCalendarDate(date: Date): void;
  addCalendarListener(type: keyof HTMLElementEventMap, listener: EventListener): void;
  removeCalendarListener(type: keyof HTMLElementEventMap, listener: EventListener): void;
  setCalendarValue(value: Date | DateRange | null | undefined): void;
  setCalendarMinDate(value: Date | null | undefined): void;
  setCalendarMaxDate(value: Date | null | undefined): void;
  setCalendarDisabledDates(value: Date | Date[] | null | undefined): void;
  setCalendarDisabledDaysOfWeek(value: DayOfWeek[]): void;
  setCalendarDisableDayCallback(disableDayCallback: (date: Date) => boolean): void;
  setCalendarActiveDate(date: Date): void;
  getCalendarActiveDate(): Date | undefined;
  setCalendarYearRange(value: string): void;
  setCalendarLocale(locale: string | undefined): void;
  propagateCalendarKey(evt: KeyboardEvent): void;
}
export abstract class BaseDatePickerAdapter<T extends BaseComponent> extends BaseAdapter<T> implements IBaseDatePickerAdapter {
  protected _identifier: string;
  protected _calendarDropdown?: ICalendarDropdown;
  protected _toggleElement?: HTMLElement;
  protected _valueChangeListeners: Array<() => void> = [];

  constructor(component: T) {
    super(component);
    this._identifier = randomChars();
  }

  // Initialization
  public abstract initializeAccessibility(): void;
  protected abstract _initializeInput(): void;
  protected abstract _initializeCalendarDropdown(): void;
  
  // Mask
  public abstract initializeMask(options: IDateInputMaskOptions): void;
  public abstract destroyMask(): void;

  // Calendar
  public abstract setActiveDescendant(id: string): void;
  
  // Input
  public abstract hasInputElement(): boolean;
  public abstract hasInputElement(): boolean;
  public abstract tryFocusInput(): void;
  public abstract tryBlurInput(): void;
  public abstract isInputDisabled(): boolean;
  public abstract isInputFocused(target?: EventTarget | null): boolean;
  public abstract setDisabled(value: boolean): void;
  public abstract addInputListener(type: string, listener: (event: Event) => void, capture?: boolean): void;
  public abstract removeInputListener(type: string, listener: (event: Event) => void, capture?: boolean): void;
  public abstract setInputValueChangedListener(context: any, listener: (value: any) => void): void;
  public abstract getInputValue(): string;
  public abstract setInputValue(value: string, emitEvents: boolean): void;
  public abstract selectInputText(): void;
  public abstract emitInputEvent(type: string, data?: any): void;

  public initialize(): void {
    this._initializeInput();
  }

  public destroy(): void {
    this._calendarDropdown?.destroy();
    this.destroyValueChangeListener();
  }

  public destroyValueChangeListener(): void {
    this._valueChangeListeners.forEach(cb => cb());
  }

  public addToggleListener(type: string, listener: (event: Event) => void): void {
    this._toggleElement?.addEventListener(type, listener);
  }

  public removeToggleListener(type: string, listener: (event: Event) => void): void {
    this._toggleElement?.removeEventListener(type, listener);
  }

  public attachCalendar(calendarConfig: Partial<ICalendarComponent>, dropdownConfig?: ICalendarDropdownPopupConfig): void {
    this._calendarDropdown?.destroy();
    this._initializeCalendarDropdown();

    if (!this._calendarDropdown) {
      throw new Error('CalendarDropdown was not initialized.');
    }

    if (dropdownConfig) {
      Object.assign(this._calendarDropdown, dropdownConfig);
    }

    this._calendarDropdown.open(calendarConfig);
    this._calendarDropdown.dropdownElement?.style.setProperty('--forge-calendar-width', '320px');
    this._calendarDropdown.calendar?.style.setProperty('margin', '8px');
  }

  public detachCalendar(): void {
    if (this._calendarDropdown && this._calendarDropdown.isOpen) {
      this._calendarDropdown.close();
    }
  }

  public goToCalendarDate(date: Date): void {
    this._calendarDropdown?.calendar?.goToDate(date, true);
  }

  public addCalendarListener(type: keyof HTMLElementEventMap, listener: EventListener): void {
    this._calendarDropdown?.calendar?.addEventListener(type, listener);
  }

  public removeCalendarListener(type: keyof HTMLElementEventMap, listener: EventListener): void {
    this._calendarDropdown?.calendar?.removeEventListener(type, listener);
  }

  public setCalendarValue(value: Date | DateRange | null | undefined): void {
    if (this._calendarDropdown?.calendar) {
      this._calendarDropdown.calendar.value = value;
    }
  }

  public setCalendarMinDate(value: Date | null | undefined): void {
    if (this._calendarDropdown?.calendar) {
      this._calendarDropdown.calendar.min = value;
    }
  }

  public setCalendarMaxDate(value: Date | null | undefined): void {
    if (this._calendarDropdown?.calendar) {
      this._calendarDropdown.calendar.max = value;
    }
  }

  public setCalendarDisabledDates(value: Date | Date[] | null | undefined): void {
    if (this._calendarDropdown?.calendar) {
      this._calendarDropdown.calendar.disabledDates = value;
    }
  }

  public setCalendarDisabledDaysOfWeek(value: DayOfWeek[]): void {
    if (this._calendarDropdown?.calendar) {
      this._calendarDropdown.calendar.disabledDaysOfWeek = value;
    }
  }

  public setCalendarDisableDayCallback(disableDayCallback: (date: Date) => boolean): void {
    if (this._calendarDropdown?.calendar) {
      this._calendarDropdown.calendar.disabledDateBuilder = disableDayCallback;
    }
  }

  public setCalendarActiveDate(date: Date): void {
    this._calendarDropdown?.calendar?.setActiveDate(date);
  }

  public getCalendarActiveDate(): Date | undefined {
    return this._calendarDropdown?.calendar?.activeDate;
  }

  public setCalendarYearRange(value: string): void {
    if (this._calendarDropdown?.calendar?.yearRange) {
      this._calendarDropdown.calendar.yearRange = value;
    }
  }

  public setCalendarLocale(locale: string | undefined): void {
    if (this._calendarDropdown?.calendar) {
      this._calendarDropdown.locale = locale;
    }
  }

  public propagateCalendarKey(evt: KeyboardEvent): void {
    this._calendarDropdown?.calendar?.handleKey(evt);
  }

  public tryCreateToggle(): void {
    const textField = this._component.querySelector('forge-text-field');
    const toggleElement = this._component.querySelector(BASE_DATE_PICKER_CONSTANTS.selectors.TOGGLE);
    if (textField) {
      const existingIconButton = textField.querySelector(`${ICON_BUTTON_CONSTANTS.elementName}[slot=end]`);
      if (existingIconButton || toggleElement) {
        this._toggleElement = (existingIconButton || toggleElement) as IIconButtonComponent;
        return;
      }

      const iconButtonElement = this._createToggleElement();
      textField.appendChild(iconButtonElement);
      this._toggleElement = iconButtonElement;
    } else if (toggleElement) {
      this._toggleElement = toggleElement as HTMLElement;
    }
  }

  protected _createToggleElement(): HTMLElement {
    return createToggleElement('insert_invitation');
  }

  protected _getDefaultTargetElement(): HTMLElement {
    // This component is often used with the Forge text-field, if so, let's target our popup around
    // one if its internal elements for best alignment
    const textField = this._component.querySelector(TEXT_FIELD_CONSTANTS.elementName);
    if (textField?.popoverTargetElement) {
      return textField.popoverTargetElement;
    }

    return this._component.querySelector('input') || this._component;
  }
}
