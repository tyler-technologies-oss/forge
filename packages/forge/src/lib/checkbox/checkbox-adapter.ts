import { getShadowElement } from '@tylertech/forge-core';
import { isFocusable, setDefaultAria, setValidity } from '../constants.js';
import { BaseAdapter, IBaseAdapter } from '../core/index.js';
import { StateLayerComponent } from '../state-layer/index.js';
import { ICheckboxComponent } from './checkbox.js';
import { CheckboxLabelPosition, CheckboxState, CHECKBOX_CONSTANTS } from './checkbox-constants.js';

export interface ICheckboxAdapter extends IBaseAdapter {
  setChecked(value: boolean): void;
  setDisabled(value: boolean): void;
  setRequired(value: boolean): void;
  setReadonly(value: boolean): void;
  setLabelPosition(value: CheckboxLabelPosition): void;
  syncValue(value: string | null, state: CheckboxState): void;
}

export class CheckboxAdapter extends BaseAdapter<ICheckboxComponent> implements ICheckboxAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _labelElement: HTMLElement;
  private readonly _stateLayerElement: StateLayerComponent;

  constructor(component: ICheckboxComponent) {
    super(component);

    this._rootElement = getShadowElement(component, CHECKBOX_CONSTANTS.selectors.ROOT);
    this._labelElement = getShadowElement(component, CHECKBOX_CONSTANTS.selectors.LABEL);
    this._stateLayerElement = getShadowElement(component, CHECKBOX_CONSTANTS.selectors.STATE_LAYER) as StateLayerComponent;
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

  public setLabelPosition(value: CheckboxLabelPosition): void {
    this._labelElement.remove();

    if (value === 'start') {
      this._rootElement.prepend(this._labelElement);
    } else {
      this._rootElement.append(this._labelElement);
    }
  }

  public syncValue(value: string | null, state: CheckboxState): void {
    const data = value ? new FormData() : null;
    if (data && value) {
      data.append(this._component.name, value);
    }
    this._component.setFormValue(data, state);
  }
}
