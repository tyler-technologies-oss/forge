import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IRadioAdapter } from './radio-adapter';
import { RADIO_CONSTANTS } from './radio-constants';

export interface IRadioFoundation extends ICustomElementFoundation {
  dense: boolean;
}

export class RadioFoundation implements IRadioFoundation {
  private _dense = false;
  private _focusListenerCallback: () => void;
  private _disabledListenerCallback: () => void;
  private _syncRadiogroupCheckStyles: () => void;

  constructor(private _adapter: IRadioAdapter) {}

  public connect(): void {
    this._adapter.connect();
    this._adapter.deferRippleInitialization();
    this._focusListenerCallback = () => this._adapter.syncFocusedStateWithInput();
    this._disabledListenerCallback = () => this._adapter.syncDisabledStateWithInput();
    this._syncRadiogroupCheckStyles = () => this._adapter.syncRadiogroupCheckStyles();
    this._addFocusEventListeners();
    this._addInputDisabledListener();
    this._extendNativeInputSetter();
    this._addRadioChangeListener();
    this._adapter.syncCheckedStateWithInput();
    this._adapter.syncDisabledStateWithInput();
    this._adapter.syncFocusedStateWithInput();
    this._applyDense();
    this.syncCheckedState();
  }

  public disconnect(): void {
    this._removeFocusEventListeners();
    this._removeInputDisabledListener();
    this._adapter.revertNativeInputSetter();
    this._removeRadioChangeListener();
    this._adapter.destroyRipple();
  }

  public syncCheckedState(): void {
    this._adapter.syncCheckedStateWithInput();
  }

  private _applyDense(): void {
    if (this._dense) {
      this._adapter.addRootClass(RADIO_CONSTANTS.classes.RADIO_DENSE);
      this._adapter.setHostAttribute(RADIO_CONSTANTS.attributes.DENSE);
    } else {
      this._adapter.removeRootClass(RADIO_CONSTANTS.classes.RADIO_DENSE);
      this._adapter.removeHostAttribute(RADIO_CONSTANTS.attributes.DENSE);
    }
  }

  private _extendNativeInputSetter(): void {
    this._adapter.extendNativeInputSetter(this._syncRadiogroupCheckStyles);
  }

  private _addRadioChangeListener(): void {
    this._adapter.addInputEventListener('change', this._syncRadiogroupCheckStyles);
  }

  private _removeRadioChangeListener(): void {
    this._adapter.removeInputEventListener('change', this._syncRadiogroupCheckStyles);
  }

  private _addFocusEventListeners(): void {
    this._adapter.addInputEventListener('focus', this._focusListenerCallback);
    this._adapter.addInputEventListener('blur', this._focusListenerCallback);
  }

  private _removeFocusEventListeners(): void {
    this._adapter.removeInputEventListener('focus', this._focusListenerCallback);
    this._adapter.removeInputEventListener('blur', this._focusListenerCallback);
  }

  private _addInputDisabledListener(): void {
    this._adapter.addInputDisabledAttributeChangeListener(this._disabledListenerCallback);
  }

  private _removeInputDisabledListener(): void {
    this._adapter.removeInputDisabledAttributeChangeListener();
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._applyDense();
    }
  }
}
