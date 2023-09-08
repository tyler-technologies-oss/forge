import { emitEvent, listenOwnProperty, getActiveElement } from '@tylertech/forge-core';
import { ICalendarDropdownPopupConfig } from '../calendar/calendar-dropdown';
import { CalendarDropdown } from '../calendar/calendar-dropdown/calendar-dropdown';
import { DateInputMask, IDateInputMaskOptions } from '../core/mask/date-input-mask';
import { BaseDatePickerAdapter, IBaseDatePickerAdapter } from './base/base-date-picker-adapter';
import { IDatePickerCalendarDropdownConfig } from './base/base-date-picker-constants';
import { IDatePickerComponent } from './date-picker';
import { DATE_PICKER_CONSTANTS } from './date-picker-constants';

export interface IDatePickerAdapter extends IBaseDatePickerAdapter {}

export class DatePickerAdapter extends BaseDatePickerAdapter<IDatePickerComponent> implements IDatePickerAdapter {
  private _inputElement: HTMLInputElement;
  private _inputMask: DateInputMask | undefined;
  private _dropdownIdentifier: string;

  constructor(component: IDatePickerComponent) {
    super(component);
    this._dropdownIdentifier = `forge-date-picker-${this._identifier}`;
  }

  protected _initializeInput(): void {
    this._inputElement = this._component.querySelector(DATE_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement;
  }

  protected _initializeCalendarDropdown(): void {
    const targetElement = this._getDefaultTargetElement();
    this._calendarDropdown = new CalendarDropdown(targetElement, this._dropdownIdentifier);
  }

  public initializeMask(options: IDateInputMaskOptions): void {
    this._inputMask?.destroy();
    this._inputMask = new DateInputMask(this._inputElement, options);
  }

  public destroyMask(): void {
    this._inputMask?.destroy();
    this._inputMask = undefined;
  }

  public initializeAccessibility(): void {
    this._inputElement.setAttribute('autocomplete', 'off');
    this._inputElement.setAttribute('autocorrect', 'off');
    this._inputElement.setAttribute('autocapitalize', 'off');
    this._inputElement.setAttribute('spellcheck', 'false');
    this._inputElement.setAttribute('role', 'combobox');
    this._inputElement.setAttribute('aria-live', 'assertive');
    this._inputElement.setAttribute('aria-atomic', 'true');
    this._inputElement.setAttribute('aria-haspopup', 'true');
    this._inputElement.setAttribute('aria-expanded', 'false');
    this._inputElement.setAttribute('aria-owns', this._dropdownIdentifier);
  }

  public addInputListener(type: string, listener: (event: Event) => void, capture?: boolean): void {
    this._inputElement?.addEventListener(type, listener, { capture });
  }

  public removeInputListener(type: string, listener: (event: Event) => void, capture?: boolean): void {
    this._inputElement?.removeEventListener(type, listener, { capture });
  }

  public setInputValueChangedListener(context: any, listener: (value: any) => void): void {
    this.destroyValueChangeListener();
    const destroyListenerCb = listenOwnProperty(context, this._inputElement, 'value', listener);
    this._valueChangeListeners.push(destroyListenerCb);
  }

  public hasInputElement(): boolean {
    return !!this._inputElement;
  }

  public override attachCalendar(calendarConfig: IDatePickerCalendarDropdownConfig<Date | null>, dropdownConfig?: ICalendarDropdownPopupConfig): void {
    super.attachCalendar(calendarConfig, dropdownConfig);
    this._inputElement.setAttribute('aria-expanded', 'true');
  }

  public override detachCalendar(): void {
    super.detachCalendar();
    if (this._inputElement) {
      this._inputElement.setAttribute('aria-expanded', 'false');
      this._inputElement.removeAttribute('aria-activedescendant');
    }
  }

  public setActiveDescendant(id: string): void {
    this._inputElement.setAttribute('aria-activedescendant', id);
  }

  public setInputValue(value: string, emitEvents: boolean): void {
    if (this._inputElement.value === value) {
      return;
    }

    this._inputElement.value = value;
    
    if (this._inputMask) {
      this._inputMask.updateMask();
    }

    if (emitEvents) {
      this._inputElement.dispatchEvent(new Event('change'));
      this._inputElement.dispatchEvent(new Event('input'));
    }
  }

  public isInputDisabled(): boolean {
    return this._inputElement.disabled;
  }

  public isInputFocused(): boolean {
    return getActiveElement(this._component.ownerDocument) === this._inputElement;
  }

  public getInputValue(): string {
    return this._inputMask ? this._inputMask.maskedValue : this._inputElement.value;
  }

  public setDisabled(value: boolean): void {
    this._inputElement.disabled = value;
    this._inputElement.setAttribute('aria-disabled', value.toString());
    if (this._toggleElement) {
      this._toggleElement.setAttribute('aria-disabled', value.toString());
      if (this._toggleElement.hasOwnProperty('disabled')) {
        (this._toggleElement as HTMLButtonElement).disabled = value;
      }
    }
  }

  public tryFocusInput(): void {
    this._inputElement.focus();
  }

  public tryBlurInput(): void {
    this._inputElement.blur();
  }

  public selectInputText(): void {
    this._inputElement.select();
  }

  public emitInputEvent(type: string, data?: any): void {
    emitEvent(this._inputElement, type, data);
  }
}
