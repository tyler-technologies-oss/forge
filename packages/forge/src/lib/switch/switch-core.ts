import { ISwitchAdapter } from './switch-adapter';
import { SWITCH_CONSTANTS, SwitchIconVisibility, SwitchLabelPosition } from './switch-constants';

export interface ISwitchCore {
  checked: boolean;
  defaultChecked: boolean;
  value: string;
  dense: boolean;
  disabled: boolean;
  required: boolean;
  readonly: boolean;
  icon: SwitchIconVisibility;
  labelPosition: SwitchLabelPosition;
}

export class SwitchCore implements ISwitchCore {
  // State
  private _checked = false;
  private _defaultChecked = false;
  private _value = 'on';
  private _dense = false;
  private _disabled = false;
  private _required = false;
  private _readonly = false;
  private _icon: SwitchIconVisibility = 'both';
  private _labelPosition: SwitchLabelPosition = 'end';

  private get _submittedValue(): string | null {
    return this._checked ? this._value : null;
  }

  // Listeners
  private readonly _clickListener: EventListener = () => this._handleChange();
  private readonly _keydownListener: EventListener = (evt: KeyboardEvent) => this._handleKeydown(evt);
  private readonly _keyupListener: EventListener = (evt: KeyboardEvent) => this._handleKeyup(evt);

  constructor(private readonly _adapter: ISwitchAdapter) {}

  public initialize(): void {
    this._adapter.addHostListener('click', this._clickListener, { capture: true });
    this._adapter.addHostListener('keydown', this._keydownListener);
    this._adapter.addHostListener('keyup', this._keyupListener, { capture: true });
    this._adapter.setIconVisibility(this._icon);
    this._adapter.syncValue(this._submittedValue);
  }

  private _handleKeydown(evt: KeyboardEvent): void {
    if (evt.key === ' ') {
      evt.preventDefault();
    }
  }

  private _handleKeyup(evt: KeyboardEvent): void {
    if (evt.key === ' ') {
      this._handleChange();
    }
  }

  private _handleChange(): void {
    if (this._readonly) {
      return;
    }

    const oldValue = this._checked;
    const newValue = !this._checked;

    this._checked = newValue;

    const event = new Event('change', { cancelable: true, bubbles: true });
    const forgeEvent = new CustomEvent(SWITCH_CONSTANTS.events.CHANGE, {
      detail: newValue,
      bubbles: true,
      cancelable: true
    });
    this._adapter.dispatchHostEvent(event);
    this._adapter.dispatchHostEvent(forgeEvent);
    this._checked = oldValue;
    if (event.defaultPrevented || forgeEvent.defaultPrevented) {
      return;
    }

    this.checked = newValue;
  }

  private _setCheckedAttribute(): void {
    this._adapter.toggleHostAttribute(SWITCH_CONSTANTS.attributes.CHECKED, this._checked);
    // Also set the following for backwards compatibility
    this._adapter.toggleHostAttribute(SWITCH_CONSTANTS.attributes.ON, this._checked);
    this._adapter.toggleHostAttribute(SWITCH_CONSTANTS.attributes.SELECTED, this._checked);
  }

  public get checked(): boolean {
    return this._checked;
  }
  public set checked(value: boolean) {
    if (this._checked !== value) {
      this._checked = value;
      this._adapter.setChecked(this._checked);
      this._adapter.syncValue(this._submittedValue);
      this._setCheckedAttribute();
    }
  }

  public get defaultChecked(): boolean {
    return this._defaultChecked;
  }
  public set defaultChecked(value: boolean) {
    if (this._defaultChecked !== value) {
      this._defaultChecked = value;
      this._adapter.toggleHostAttribute(SWITCH_CONSTANTS.attributes.DEFAULT_CHECKED, this._defaultChecked);
    }
  }

  public get value(): string {
    return this._value;
  }
  public set value(value: string) {
    if (this._value !== value) {
      this._value = value;
      this._adapter.syncValue(this._submittedValue);

      if (typeof this._value === 'string' || this._value == null) {
        this._adapter.toggleHostAttribute(SWITCH_CONSTANTS.attributes.VALUE, true, this._value);
      }
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.toggleHostAttribute(SWITCH_CONSTANTS.attributes.DENSE, this._dense);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setDisabled(this._disabled);
      this._adapter.toggleHostAttribute(SWITCH_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get required(): boolean {
    return this._required;
  }
  public set required(value: boolean) {
    if (this._required !== value) {
      this._required = value;
      this._adapter.setRequired(this._required);
      this._adapter.toggleHostAttribute(SWITCH_CONSTANTS.attributes.REQUIRED, this._required);
    }
  }

  public get readonly(): boolean {
    return this._readonly;
  }
  public set readonly(value: boolean) {
    if (this._readonly !== value) {
      this._readonly = value;
      this._adapter.setReadonly(this._readonly);
      this._adapter.toggleHostAttribute(SWITCH_CONSTANTS.attributes.READONLY, this._readonly);
    }
  }

  public get icon(): SwitchIconVisibility {
    return this._icon;
  }
  public set icon(value: SwitchIconVisibility) {
    if (this._icon !== value) {
      this._icon = value;
      this._adapter.setIconVisibility(this._icon);
      this._adapter.setHostAttribute(SWITCH_CONSTANTS.attributes.ICON, this._icon);
    }
  }

  public get labelPosition(): SwitchLabelPosition {
    return this._labelPosition;
  }
  public set labelPosition(value: SwitchLabelPosition) {
    if (this._labelPosition !== value) {
      this._labelPosition = value;
      this._adapter.setLabelPosition(this._labelPosition);
      this._adapter.setHostAttribute(SWITCH_CONSTANTS.attributes.LABEL_POSITION, this._labelPosition);
    }
  }
}
