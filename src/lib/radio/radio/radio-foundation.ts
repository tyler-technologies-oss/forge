import { ICustomElementFoundation } from '@tylertech/forge-core';
import { task } from '../../core/utils/event-utils';
import { IRadioAdapter } from './radio-adapter';
import { RadioLabelPosition, RADIO_CONSTANTS } from './radio-constants';

export interface IRadioFoundation extends ICustomElementFoundation {
  checked: boolean;
  defaultChecked: boolean;
  value: string;
  disabled: boolean;
  required: boolean;
  readonly: boolean;
  dense: boolean;
  labelPosition: RadioLabelPosition;
  tryCheck(): boolean;
}

export class RadioFoundation implements IRadioFoundation {
  // State
  private _checked = false;
  private _defaultChecked = false;
  private _value = 'on';
  private _disabled = false;
  private _required = false;
  private _readonly = false;
  private _dense = false;
  private _labelPosition: RadioLabelPosition = 'end';

  // Listeners
  private readonly _focusListener: EventListener;
  private readonly _blurListener: EventListener;
  private readonly _clickListener: EventListener;
  private readonly _keydownListener: EventListener;
  private readonly _keyupListener: EventListener;

  constructor(private _adapter: IRadioAdapter) {
    this._focusListener = () => this._handleFocus();
    this._blurListener = () => this._handleBlur();
    this._clickListener = (evt: MouseEvent) => this._handleClick(evt);
    this._keydownListener = (evt: KeyboardEvent) => this._handleKeydown(evt);
    this._keyupListener = (evt: KeyboardEvent) => this._handleKeyup(evt);
  }

  public initialize(): void {
    this._adapter.addHostListener('focus', this._focusListener);
    this._adapter.addHostListener('blur', this._blurListener);
    this._adapter.addHostListener('click', this._clickListener);
    this._adapter.addHostListener('keydown', this._keydownListener);
    this._adapter.addHostListener('keyup', this._keyupListener);
    this._adapter.setChecked(this._checked, this._value);
  }

  // Public methods

  public tryCheck(): boolean {
    this._checked = true;

    if (!this._dispatchEvents()) {
      this._checked = false;
      return false;
    }
    
    this._adapter.setChecked(this._checked, this._value);
    this._adapter.toggleHostAttribute(RADIO_CONSTANTS.attributes.CHECKED, this._checked);
    return true;
  }

  // Event handlers

  private _handleFocus(): void {
    if (!this._checked) {
      this._adapter.setUncheckedRadioGroupFocus('focus');
    }
  }

  private _handleBlur(): void {
    if (!this._checked) {
      this._adapter.setUncheckedRadioGroupFocus('blur');
    }
  }

  private _handleClick(evt: MouseEvent): void {
    this._activate(evt);
  }

  private _handleKeydown(evt: KeyboardEvent): void {
    switch (evt.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        evt.preventDefault();
        this._adapter.focusNext();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        evt.preventDefault();
        this._adapter.focusPrevious();
        break;
      case ' ':
        // Prevent the spacebar from scrolling the page
        evt.preventDefault();
        break;
    }
  }

  private _handleKeyup(evt: KeyboardEvent): void {
    if (evt.key === ' ') {
      this._activate(evt);
    }
  }

  /**
   * Checks the radio button if it is not disabled or readonly. Exits early if the activating
   * event is cancelled.
   */
  private async _activate(evt: Event): Promise<void> {
    if (this._checked || this._disabled || this._readonly) {
      return;
    }

    // Wait a task to allow the event to propagate to user code.
    await task();
    if (evt.defaultPrevented) {
      return;
    }

    this._checked = true;

    if (!this._dispatchEvents()) {
      this._checked = false;
      return;
    }

    this._adapter.setChecked(this._checked, this._value);
    this._adapter.toggleHostAttribute(RADIO_CONSTANTS.attributes.CHECKED, this._checked);
  }

  /**
   * Dispatches change and input events.
   * 
   * @returns {boolean} - Returns true if neither event was cancelled.
   */
  private _dispatchEvents(): boolean {
    // Emit both change and input events per the spec.
    const changeEvent = new Event(RADIO_CONSTANTS.events.CHANGE, { bubbles: true, cancelable: true });
    const inputEvent = new Event(RADIO_CONSTANTS.events.INPUT, { bubbles: true, cancelable: true, composed: true });
    this._adapter.dispatchHostEvent(changeEvent);
    this._adapter.dispatchHostEvent(inputEvent);
    return !(changeEvent.defaultPrevented || inputEvent.defaultPrevented);
  }

  public get checked(): boolean {
    return this._checked;
  }
  public set checked(value: boolean) {
    if (this._checked !== value) {
      this._checked = value;
      this._adapter.setChecked(this._checked, this._value);
      this._adapter.toggleHostAttribute(RADIO_CONSTANTS.attributes.CHECKED, this._checked);
    }
  }

  public get defaultChecked(): boolean {
    return this._defaultChecked;
  }
  public set defaultChecked(value: boolean) {
    if (this._defaultChecked !== value) {
      this._defaultChecked = value;
      this._adapter.toggleHostAttribute(RADIO_CONSTANTS.attributes.DEFAULT_CHECKED, this._defaultChecked);
    }
  }

  public get value(): string {
    return this._value;
  }
  public set value(value: string) {
    if (this._value !== value) {
      this._value = value;
      this._adapter.setHostAttribute(RADIO_CONSTANTS.attributes.VALUE,  this._value);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      // Attempt to set disabled, restore if unsuccessful
      if (this._adapter.trySetDisabled(this._disabled)) {
        this._adapter.disableStateLayer(this._disabled || this._readonly);
        this._adapter.toggleHostAttribute(RADIO_CONSTANTS.attributes.DISABLED, this._disabled);
      } else {
        this._disabled = !this._disabled;
      }
    }
  }

  public get required(): boolean {
    return this._required;
  }
  public set required(value: boolean) {
    if (this._required !== value) {
      this._required = value;
      this._adapter.setRequired(this._required);
      this._adapter.toggleHostAttribute(RADIO_CONSTANTS.attributes.REQUIRED, this._required);
    }
  }

  public get readonly(): boolean {
    return this._readonly;
  }
  public set readonly(value: boolean) {
    if (this._readonly !== value) {
      this._readonly = value;
      this._adapter.setReadonly(this._readonly);
      this._adapter.disableStateLayer(this._disabled || this._readonly);
      this._adapter.toggleHostAttribute(RADIO_CONSTANTS.attributes.READONLY, this._readonly);
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.toggleHostAttribute(RADIO_CONSTANTS.attributes.DENSE, this._dense);
    }
  }

  public get labelPosition(): RadioLabelPosition {
    return this._labelPosition;
  }
  public set labelPosition(value: RadioLabelPosition) {
    if (this._labelPosition !== value) {
      this._labelPosition = value;
      this._adapter.setLabelPosition(this._labelPosition);
      this._adapter.setHostAttribute(RADIO_CONSTANTS.attributes.LABEL_POSITION, this._labelPosition);
    }
  }
}
