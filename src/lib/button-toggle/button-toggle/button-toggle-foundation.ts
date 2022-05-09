import { ICustomElementFoundation } from '@tylertech/forge-core';
import { ForgeRipple } from '../../ripple';
import { IButtonToggleAdapter } from './button-toggle-adapter';
import { BUTTON_TOGGLE_CONSTANTS, IButtonToggleSelectEventData } from './button-toggle-constants';


export interface IButtonToggleFoundation extends ICustomElementFoundation {
  value: any;
  selected: boolean;
  disabled: boolean;
  dense: boolean;
  setFocus(): void;
}

export class ButtonToggleFoundation implements IButtonToggleFoundation {
  private _value: any;
  private _selected = false;
  private _disabled = false;
  private _dense = false;
  private _clickListener: (evt: MouseEvent) => void;
  private _rippleInstance: ForgeRipple;

  constructor(private _adapter: IButtonToggleAdapter) {
    this._clickListener = evt => this._onClick(evt);
  }

  public initialize(): void {
    this._rippleInstance = this._adapter.initializeRipple();
    this._adapter.addEventListener('click', this._clickListener);
    this._adapter.setSelected(this._selected);
    this._adapter.setDisabled(this._disabled);
    this._adapter.setDense(this._dense);
    this._adapter.detectStretchState();
  }

  public disconnect(): void {
    if (this._rippleInstance) {
      this._rippleInstance.destroy();
    }
    this._adapter.removeEventListener('click', this._clickListener);
  }

  private _onClick(evt: MouseEvent): void {
    this._selected = !this._selected;
    this._updateSelectedState();
    this._adapter.emitHostEvent(BUTTON_TOGGLE_CONSTANTS.events.SELECT, { value: this._value, selected: this._selected } as IButtonToggleSelectEventData);
  }

  private _updateSelectedState(): void {
    this._adapter.setSelected(this._selected);
    this._adapter.setHostAttribute(BUTTON_TOGGLE_CONSTANTS.attributes.SELECTED, this._selected.toString());
  }

  public get value(): any {
    return this._value;
  }
  public set value(value: any) {
    this._value = value;
  }

  public get selected(): boolean {
    return this._selected;
  }
  public set selected(value: boolean) {
    if (this._selected !== value) {
      this._selected = value;
      this._updateSelectedState();
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setDisabled(this._disabled);
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.setDense(this._dense);
    }
  }

  public setFocus(): void {
    this._adapter.requestFocus();
  }
}
