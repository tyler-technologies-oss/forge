import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter.js';
import { IButtonToggleComponent } from './button-toggle.js';
import { isFocusable, setDefaultAria } from '../../constants.js';
import { IStateLayerComponent } from '../../state-layer/state-layer.js';
import { STATE_LAYER_CONSTANTS } from '../../state-layer/state-layer-constants.js';
import { FOCUS_INDICATOR_TAG_NAME, IFocusIndicatorComponent } from '../../focus-indicator/focus-indicator.js';

export interface IButtonToggleAdapter extends IBaseAdapter {
  initialize(): void;
  setSelected(value: boolean): void;
  setDisabled(value: boolean): void;
  forceFocusVisible(): void;
}

export class ButtonToggleAdapter extends BaseAdapter<IButtonToggleComponent> implements IButtonToggleAdapter {
  private _focusIndicatorElement: IFocusIndicatorComponent;
  private _stateLayerElement: IStateLayerComponent;

  constructor(component: IButtonToggleComponent) {
    super(component);
    this._focusIndicatorElement = getShadowElement(component, FOCUS_INDICATOR_TAG_NAME) as IFocusIndicatorComponent;
    this._stateLayerElement = getShadowElement(component, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
  }

  public initialize(): void {
    this._component[setDefaultAria]({ role: 'button' }, { setAttribute: !this._component.hasAttribute('role') });
    this._component[setDefaultAria]({
      ariaPressed: `${!!this._component.selected}`,
      ariaDisabled: `${!!this._component.disabled}`
    });
    this._component[isFocusable] = !this._component.disabled;
  }

  public setSelected(value: boolean): void {
    this._component[setDefaultAria]({ ariaPressed: `${!!value}` });
  }

  public setDisabled(value: boolean): void {
    this._component[setDefaultAria]({ ariaDisabled: `${!!value}` });
    this._component[isFocusable] = !value;
    this._stateLayerElement.disabled = value;
  }

  public forceFocusVisible(): void {
    this._focusIndicatorElement.active = true;
  }
}
