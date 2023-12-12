import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IButtonToggleComponent } from './button-toggle';
import { isFocusable, setDefaultAria } from '../../constants';
import { IStateLayerComponent } from '../../state-layer/state-layer';
import { STATE_LAYER_CONSTANTS } from '../../state-layer/state-layer-constants';
import { IFocusIndicatorComponent } from '../../focus-indicator/focus-indicator';
import { FOCUS_INDICATOR_CONSTANTS } from '../../focus-indicator/focus-indicator-constants';

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
    this._focusIndicatorElement = getShadowElement(component, FOCUS_INDICATOR_CONSTANTS.elementName) as IFocusIndicatorComponent;
    this._stateLayerElement = getShadowElement(component, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
  }

  public initialize(): void {
    this._component[setDefaultAria]({
      role: 'button',
      ariaPressed: `${!!this._component.selected}`,
      ariaDisabled: `${!!this._component.disabled}`
    });
    this._component[isFocusable] = !this._component.disabled;
  }

  public setSelected(value: boolean): void {
    this._component[setDefaultAria]({ ariaPressed: `${!!value}` }, { overwrite: true });
  }

  public setDisabled(value: boolean): void {
    this._component[setDefaultAria]({ ariaDisabled: `${!!value}` }, { overwrite: true });
    this._component[isFocusable] = !value;
    this._stateLayerElement.disabled = value;
  }

  public forceFocusVisible(): void {
    this._focusIndicatorElement.active = true;
  }
}
