import { getShadowElement } from '@tylertech/forge-core';
import { internals, setDefaultAria } from '../../constants';
import { BaseAdapter, IBaseAdapter } from '../../core/base/';
import { StateLayerComponent } from '../../state-layer';
import { RadioGroupManager } from '../core/radio-group-manager';
import { IRadioComponent } from './radio';
import { RadioLabelPosition, RadioState, RADIO_CONSTANTS } from './radio-constants';

export interface IRadioAdapter extends IBaseAdapter {
  setChecked(checked: boolean, value: string): void;
  trySetDisabled(value: boolean): boolean;
  setRequired(value: boolean): void;
  setReadonly(value: boolean): void;
  setLabelPosition(value: RadioLabelPosition): void;
  disableStateLayer(value: boolean): void;
  setUncheckedRadioGroupFocus(event: 'focus' | 'blur'): void;
  focusNext(): void;
  focusPrevious(): void;
}

export class RadioAdapter extends BaseAdapter<IRadioComponent> implements IRadioAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _labelElement: HTMLElement;
  private readonly _stateLayerElement: StateLayerComponent;

  constructor(component: IRadioComponent) {
    super(component);

    this._rootElement = getShadowElement(component, RADIO_CONSTANTS.selectors.ROOT);
    this._labelElement = getShadowElement(component, RADIO_CONSTANTS.selectors.LABEL);
    this._stateLayerElement = getShadowElement(component, RADIO_CONSTANTS.selectors.STATE_LAYER) as StateLayerComponent;
  }

  public setChecked(checked: boolean, value: string): void {
    this._component[setDefaultAria]({ ariaChecked: checked ? 'true' : 'false' });
    if (checked) {
      RadioGroupManager.setSelectedRadioInGroup(this._component);
    }

    // Update tab indices
    RadioGroupManager.syncRadioFocusableState(this._component);

    // Update the form value, state, and validity
    const formValue = checked ? value : null;
    const formState: RadioState = checked ? 'checked' : 'unchecked';
    this._component[internals].setFormValue(formValue, formState);
    RadioGroupManager.setRadioGroupValidity(this._component);
  }

  /**
   * Attempts to set the disabled state of the radio. If the radio is in a disabled radio group, it
   * can't be enabled.
   * 
   * @param value Whether the radio should be disabled.
   * @returns Whether the disabled state was set.
   */
  public trySetDisabled(value: boolean): boolean {
    const group = this._component.closest('forge-radio-group');

    if (!value && group && group.disabled) {
      return false;
    }

    this._component[setDefaultAria]({ ariaDisabled: `${!!value}` });
    RadioGroupManager.syncRadioFocusableState(this._component);
    return true;
  }

  public setRequired(value: boolean): void {
    this._component[setDefaultAria]({
      ariaRequired: value ? 'true' : 'false'
    }, { setAttribute: true });
    RadioGroupManager.setRadioGroupValidity(this._component);
  }

  public setReadonly(value: boolean): void {
    this._component[setDefaultAria]({ ariaDisabled: `${!!value}` });
  }

  public disableStateLayer(value: boolean): void {
    this._stateLayerElement.disabled = value;
  }

  public setLabelPosition(value: RadioLabelPosition): void {
    this._labelElement.remove();

    if (value === 'start') {
      this._rootElement.prepend(this._labelElement);
    } else {
      this._rootElement.append(this._labelElement);
    }
  }

  public setUncheckedRadioGroupFocus(event: 'focus' | 'blur'): void {
    RadioGroupManager.setUncheckedRadioGroupFocus(this._component, event);
  }

  public focusNext(): void {
    RadioGroupManager.focusNextRadioInGroup(this._component);
  }

  public focusPrevious(): void {
    RadioGroupManager.focusPreviousRadioInGroup(this._component);
  }
}
