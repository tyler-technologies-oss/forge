import { emitEvent, listenOwnProperty, getActiveElement } from '@tylertech/forge-core';
import { CalendarDropdown, ICalendarDropdownPopupConfig } from '../calendar/calendar-dropdown';
import { DateInputMask, IDateInputMaskOptions } from '../core';
import { BaseDatePickerAdapter, IBaseDatePickerAdapter } from '../date-picker/base/base-date-picker-adapter';
import { IDatePickerCalendarDropdownConfig } from '../date-picker/base/base-date-picker-constants';
import { createToggleElement } from '../date-picker/base/base-date-picker-utils';
import { DateRangePickerComponent, IDateRangePickerComponent } from './date-range-picker';
import { DATE_RANGE_PICKER_CONSTANTS } from './date-range-picker-constants';

export interface IDateRangePickerAdapter extends IBaseDatePickerAdapter {
  initializeToMask(toOptions: IDateInputMaskOptions): void;
  addToInputListener(type: string, listener: (event: Event) => void): void;
  removeToInputListener(type: string, listener: (event: Event) => void): void;
  setToInputValueChangedListener(context: any, listener: (value: any) => void): void;
  getToInputValue(): string;
  setToInputValue(value: string, emitEvents: boolean): void;
  emitInputEvent(type: string, data?: any): void;
  emitToInputEvent(type: string, data?: any): void;
  tryFocusInput(): void;
  tryBlurInput(): void;
  selectToInputText(): void;
  destroyToMask(): void;
}

export class DateRangePickerAdapter extends BaseDatePickerAdapter<IDateRangePickerComponent> implements IDateRangePickerAdapter {
  private _fromInputElement: HTMLInputElement;
  private _toInputElement: HTMLInputElement;
  private _toInputMask: DateInputMask | undefined;
  private _fromInputMask: DateInputMask | undefined;
  private _dropdownIdentifier: string;
  private _toValueChangeListener: (() => void) | undefined;

  constructor(component: DateRangePickerComponent) {
    super(component);
    this._dropdownIdentifier = `forge-date-range-picker-${this._identifier}`;
  }

  protected _initializeInput(): void {
    this._fromInputElement = this._component.querySelectorAll(DATE_RANGE_PICKER_CONSTANTS.selectors.INPUT)[0] as HTMLInputElement;
    this._toInputElement = this._component.querySelectorAll(DATE_RANGE_PICKER_CONSTANTS.selectors.INPUT)[1] as HTMLInputElement;

    if (!this._fromInputElement || !this._fromInputElement) {
      throw new Error(`The ${DATE_RANGE_PICKER_CONSTANTS.elementName} requires two inputs`);
    }
  }

  protected _initializeCalendarDropdown(): void {
    const targetElement = this._getDefaultTargetElement();
    this._calendarDropdown = new CalendarDropdown(targetElement, this._dropdownIdentifier);
  }

  public override initializeMask(fromOptions: IDateInputMaskOptions): void {
    this._fromInputMask?.destroy();
    this._fromInputMask = new DateInputMask(this._fromInputElement, fromOptions);
  }

  public override destroyMask(): void {
    this._fromInputMask?.destroy();
    this._fromInputMask = undefined;
  }

  public initializeToMask(toOptions: IDateInputMaskOptions): void {
    this._toInputMask?.destroy();
    this._toInputMask = new DateInputMask(this._toInputElement, toOptions);
  }

  public destroyToMask(): void {
    this._toInputMask?.destroy();
    this._toInputMask = undefined;
  }

  public override destroy(): void {
    super.destroy();
    this._destroyToValueChangeListener();
  }

  private _destroyToValueChangeListener(): void {
    if (typeof this._toValueChangeListener === 'function') {
      this._toValueChangeListener();
    }
  }

  public initializeAccessibility(): void {
    this._applyToInputs(input => input.setAttribute('autocomplete', 'off'));
    this._applyToInputs(input => input.setAttribute('autocorrect', 'off'));
    this._applyToInputs(input => input.setAttribute('autocapitalize', 'off'));
    this._applyToInputs(input => input.setAttribute('spellcheck', 'false'));
    this._applyToInputs(input => input.setAttribute('role', 'combobox'));
    this._applyToInputs(input => input.setAttribute('aria-live', 'assertive'));
    this._applyToInputs(input => input.setAttribute('aria-atomic', 'true'));
    this._applyToInputs(input => input.setAttribute('aria-haspopup', 'true'));
    this._applyToInputs(input => input.setAttribute('aria-expanded', 'false'));
    this._applyToInputs(input => input.setAttribute('aria-owns', this._dropdownIdentifier));
  }

  public addInputListener(type: string, listener: (event: Event) => void, capture?: boolean): void {
    this._fromInputElement?.addEventListener(type, listener, { capture });
  }

  public addToInputListener(type: string, listener: (event: Event) => void, capture?: boolean): void {
    this._toInputElement?.addEventListener(type, listener, { capture });
  }

  public removeInputListener(type: string, listener: (event: Event) => void): void {
    this._fromInputElement?.removeEventListener(type, listener);
  }
  
  public removeToInputListener(type: string, listener: (event: Event) => void): void {
    this._toInputElement?.removeEventListener(type, listener);
  }

  public setInputValueChangedListener(context: any, listener: (value: any) => void): void {
    if (this._valueChangeListeners.length) {
      this.destroyValueChangeListener();
    }
    const destroyListenerCb = listenOwnProperty(context, this._fromInputElement, 'value', listener);
    this._valueChangeListeners.push(destroyListenerCb);
  }

  public setToInputValueChangedListener(context: any, listener: (value: any) => void): void {
    this._destroyToValueChangeListener();
    this._toValueChangeListener = listenOwnProperty(context, this._toInputElement, 'value', listener);
  }

  public hasInputElement(): boolean {
    return !!this._fromInputElement && !!this._toInputElement;
  }

  public override attachCalendar(calendarConfig: IDatePickerCalendarDropdownConfig<Date | null>, dropdownConfig?: ICalendarDropdownPopupConfig): void {
    super.attachCalendar(calendarConfig, dropdownConfig);
    this._fromInputElement.setAttribute('aria-expanded', 'true');
  }

  public override detachCalendar(): void {
    super.detachCalendar();
    if (this._fromInputElement) {
      this._fromInputElement.setAttribute('aria-expanded', 'false');
      this._fromInputElement.removeAttribute('aria-activedescendant');
    }
  }

  public setActiveDescendant(id: string): void {
    this._fromInputElement.setAttribute('aria-activedescendant', id);
  }

  public setInputValue(value: string, emitEvents: boolean): void {
    if (this._fromInputElement.value === value) {
      return;
    }

    this._fromInputElement.value = value;
    
    if (this._fromInputMask) {
      this._fromInputMask.updateMask();
    }

    if (emitEvents) {
      this._fromInputElement.dispatchEvent(new Event('change'));
      this._fromInputElement.dispatchEvent(new Event('input'));;
    }
  }

  public setToInputValue(value: string, emitEvents: boolean): void {
    if (this._toInputElement.value === value) {
      return;
    }

    this._toInputElement.value = value;
    
    if (this._toInputMask) {
      this._toInputMask.updateMask();
    }
    
    if (emitEvents) {
      this._toInputElement.dispatchEvent(new Event('change'));
      this._toInputElement.dispatchEvent(new Event('input'));
    }
  }

  public isInputDisabled(): boolean {
    return this._fromInputElement.disabled;
  }

  public isInputFocused(target?: EventTarget | null): boolean {
    if (target && this._toInputElement === target || this._fromInputElement === target) {
      return true;
    }
    const activeEl = getActiveElement();
    return this._toInputElement === activeEl || this._fromInputElement === activeEl;
  }

  public getInputValue(): string {
    return this._fromInputElement.value;
  }

  public getToInputValue(): string {
    return this._toInputElement.value;
  }

  public setDisabled(isDisabled: boolean): void {
    this._fromInputElement.disabled = isDisabled;
    this._toInputElement.disabled = isDisabled;

    this._toInputElement.setAttribute('aria-disabled', isDisabled.toString());
    this._fromInputElement.setAttribute('aria-disabled', isDisabled.toString());

    if (this._toggleElement) {
      this._toggleElement.setAttribute('aria-disabled', isDisabled.toString());
      if (this._toggleElement.hasOwnProperty('disabled')) {
        (this._toggleElement as HTMLButtonElement).disabled = isDisabled;
      }
    }
  }

  public emitInputEvent(type: string, data?: any): void {
    emitEvent(this._fromInputElement, type, data);
  }

  public emitToInputEvent(type: string, data?: any): void {
    emitEvent(this._toInputElement, type, data);
  }

  protected override _createToggleElement(): HTMLElement {
    return createToggleElement('date_range');
  }

  public tryFocusInput(): void {
    this._fromInputElement.focus();
  }

  public tryBlurInput(): void {
    this._fromInputElement.blur();
  }

  public selectInputText(): void {
    this._fromInputElement.select();
  }

  public selectToInputText(): void {
    this._toInputElement.select();
  }

  private _applyToInputs(action: (input: HTMLInputElement) => void): void {
    [this._fromInputElement, this._toInputElement].forEach(action);
  }
}
