import { ISwitchAdapter } from './switch-adapter';
import { SWITCH_CONSTANTS, SwitchIconVisibility, SwitchLabelPosition } from './switch-constants';

export interface ISwitchCore {
  on: boolean;
  defaultOn: boolean;
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
  private _on = false;
  private _defaultOn = false;
  private _value = 'on';
  private _dense = false;
  private _disabled = false;
  private _required = false;
  private _readonly = false;
  private _icon: SwitchIconVisibility = 'on';
  private _labelPosition: SwitchLabelPosition = 'end';

  private get _submittedValue(): string | null {
    return this._on ? this._value : null;
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

    const oldValue = this._on;
    const newValue = !this._on;

    this._on = newValue;

    const event = new Event('change', { cancelable: true, bubbles: true });
    const forgeEvent = new CustomEvent(SWITCH_CONSTANTS.events.CHANGE, {
      detail: newValue,
      bubbles: true,
      cancelable: true
    });
    this._adapter.dispatchHostEvent(event);
    this._adapter.dispatchHostEvent(forgeEvent);
    this._on = oldValue;
    if (event.defaultPrevented || forgeEvent.defaultPrevented) {
      return;
    }

    this.on = newValue;
  }

  private _setOnAttribute(): void {
    this._adapter.toggleHostAttribute(SWITCH_CONSTANTS.attributes.ON, this._on);
    // Also set selected for backwards compatibility
    this._adapter.toggleHostAttribute(SWITCH_CONSTANTS.attributes.SELECTED, this._on);
  }

  public get on(): boolean {
    return this._on;
  }
  public set on(value: boolean) {
    if (this._on !== value) {
      this._on = value;
      this._adapter.setOn(this._on);
      this._adapter.syncValue(this._submittedValue);
      this._setOnAttribute();
    }
  }

  public get defaultOn(): boolean {
    return this._defaultOn;
  }
  public set defaultOn(value: boolean) {
    if (this._defaultOn !== value) {
      this._defaultOn = value;
      this._adapter.toggleHostAttribute(SWITCH_CONSTANTS.attributes.DEFAULT_ON, this._defaultOn);
    }
  }

  public get value(): string {
    return this._value;
  }
  public set value(value: string) {
    if (this._value !== value) {
      this._value = value;
      this._adapter.syncValue(this._submittedValue);
      this._adapter.toggleHostAttribute(SWITCH_CONSTANTS.attributes.VALUE, true, this._value);
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
