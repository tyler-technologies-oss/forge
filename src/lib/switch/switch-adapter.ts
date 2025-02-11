import { getShadowElement, toggleClass } from '@tylertech/forge-core';
import { isFocusable, setDefaultAria, setValidity } from '../constants';
import { BaseAdapter, IBaseAdapter } from '../core';
import { StateLayerComponent } from '../state-layer';
import { ISwitchComponent } from './switch';
import { SwitchIconVisibility, SwitchLabelPosition, SWITCH_CONSTANTS } from './switch-constants';

export interface ISwitchAdapter extends IBaseAdapter {
  setChecked(value: boolean): void;
  setDisabled(value: boolean): void;
  setRequired(value: boolean): void;
  setReadonly(value: boolean): void;
  setIconVisibility(value: SwitchIconVisibility): void;
  setLabelPosition(value: SwitchLabelPosition): void;
  syncValue(value: string | null): void;
}

export class SwitchAdapter extends BaseAdapter<ISwitchComponent> implements ISwitchAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _labelElement: HTMLElement;
  private readonly _iconCheckedElement: HTMLElement;
  private readonly _iconUncheckedElement: HTMLElement;
  private readonly _stateLayerElement: StateLayerComponent;

  constructor(component: ISwitchComponent) {
    super(component);

    this._rootElement = getShadowElement(component, SWITCH_CONSTANTS.selectors.ROOT);
    this._labelElement = getShadowElement(component, SWITCH_CONSTANTS.selectors.LABEL);
    this._iconCheckedElement = getShadowElement(component, SWITCH_CONSTANTS.selectors.ICON_ON);
    this._iconUncheckedElement = getShadowElement(component, SWITCH_CONSTANTS.selectors.ICON_OFF);
    this._stateLayerElement = getShadowElement(component, SWITCH_CONSTANTS.selectors.STATE_LAYER) as StateLayerComponent;
  }

  public setChecked(value: boolean): void {
    this._component[setValidity]();
    this._component[setDefaultAria]({ ariaChecked: value ? 'true' : 'false' });
  }

  public setDisabled(value: boolean): void {
    this._component[isFocusable] = !value;
    this._component[setDefaultAria]({ ariaDisabled: value ? 'true' : 'false' });
    this._stateLayerElement.disabled = value;
  }

  public setRequired(value: boolean): void {
    this._component[setValidity]();
    this._component[setDefaultAria]({ ariaRequired: value ? 'true' : 'false' });
  }

  public setReadonly(value: boolean): void {
    this._component[setDefaultAria]({ ariaReadOnly: value ? 'true' : 'false' });
    this._stateLayerElement.disabled = value;
  }

  public setIconVisibility(value: SwitchIconVisibility): void {
    const hideOn = value === 'none' || value === 'off';
    const hideOff = value === 'none' || value === 'on';
    toggleClass(this._iconCheckedElement, hideOn, SWITCH_CONSTANTS.classes.HIDDEN);
    toggleClass(this._iconUncheckedElement, hideOff, SWITCH_CONSTANTS.classes.HIDDEN);
  }

  public setLabelPosition(value: SwitchLabelPosition): void {
    this._labelElement.remove();

    if (value === 'start') {
      this._rootElement.prepend(this._labelElement);
    } else {
      this._rootElement.append(this._labelElement);
    }
  }

  public syncValue(value: string | null): void {
    const data = value ? new FormData() : null;
    const state = value ? SWITCH_CONSTANTS.state.ON : SWITCH_CONSTANTS.state.OFF;
    if (data && value) {
      data.append(this._component.name, value);
    }
    this._component.setFormValue(data, state);
  }
}
