import { ICustomElementFoundation } from '@tylertech/forge-core';
import { task } from '../../core/utils/event-utils';
import { ExperimentalFocusOptions } from '../../constants';
import { IButtonToggleAdapter } from './button-toggle-adapter';
import { BUTTON_TOGGLE_CONSTANTS, IButtonToggleSelectEventData } from './button-toggle-constants';

export interface IButtonToggleFoundation extends ICustomElementFoundation {
  value: unknown;
  selected: boolean;
  disabled: boolean;
  readonly: boolean;
  destroy(): void;
  focus(options?: ExperimentalFocusOptions): void;
  click(): void;
}

export class ButtonToggleFoundation implements IButtonToggleFoundation {
  private _value: unknown;
  private _selected = false;
  private _disabled = false;
  private _readonly = false;

  private _clickListener: EventListener = (evt: MouseEvent) => this._onClick(evt);
  private _keydownListener: EventListener = (evt: KeyboardEvent) => this._onKeyDown(evt);

  constructor(private _adapter: IButtonToggleAdapter) {}

  public initialize(): void {
    this._adapter.initialize();

    if (!this._disabled && !this._readonly) {
      this._applyListeners();
    }
  }

  public destroy(): void {
    this._removeListeners();
  }

  public focus(options: ExperimentalFocusOptions = { focusVisible: true }): void {
    this._adapter.focusHost(options);

    if (options.focusVisible) {
      this._adapter.forceFocusVisible();
    }
  }

  public click(): void {
    this._adapter.clickHost();
  }

  private _applyListeners(): void {
    this._adapter.addHostListener('click', this._clickListener);
    this._adapter.addHostListener('keydown', this._keydownListener);
  }

  private _removeListeners(): void {
    this._adapter.removeHostListener('click', this._clickListener);
    this._adapter.removeHostListener('keydown', this._keydownListener);
  }

  private async _onClick(_evt: MouseEvent | KeyboardEvent): Promise<void> {
    const originalSelected = this._selected;
    this._selected = !this._selected;

    const detail: IButtonToggleSelectEventData = {
      value: this._value,
      selected: this._selected
    };
    const evt = new CustomEvent(BUTTON_TOGGLE_CONSTANTS.events.SELECT, { detail, bubbles: true, cancelable: true });
    this._adapter.dispatchHostEvent(evt);

    await task();

    this._selected = originalSelected;

    if (evt.defaultPrevented) {
      return;
    }

    this.selected = !originalSelected;
  }

  private _onKeyDown(evt: KeyboardEvent): void {
    if (evt.key === ' ') {
      evt.preventDefault();
      this.click();
    }
  }

  public get value(): unknown {
    return this._value;
  }
  public set value(value: unknown) {
    if (this._value !== value) {
      this._value = value;
      this._adapter.setHostAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.VALUE, `${this._value}`);
    }
  }
  
  public get selected(): boolean {
    return this._selected;
  }
  public set selected(value: boolean) {
    value = !!value;
    if (this._selected !== value) {
      this._selected = value;
      this._adapter.setSelected(this._selected);
      this._adapter.toggleHostAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.SELECTED, this._selected);
    }
  }
  
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    value = !!value;
    if (this._disabled !== value) {
      this._disabled = value;
      if (this._disabled) {
        this._removeListeners();
      } else {
        this._applyListeners();
      }
      this._adapter.setDisabled(this._disabled);
      this._adapter.toggleHostAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get readonly(): boolean {
    return this._readonly;
  }
  public set readonly(value: boolean) {
    value = !!value;
    if (this._readonly !== value) {
      this._readonly = value;
      
      if (this._readonly) {
        this._removeListeners();
      } else {
        this._applyListeners();
      }

      this._adapter.toggleHostAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.READONLY, this._readonly);
    }
  }
}
