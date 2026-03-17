import { setDefaultAria } from '../../constants.js';
import { BaseAdapter, IBaseAdapter } from '../../core/base/index.js';
import { LabelComponent } from '../../label/index.js';
import { RADIO_CONSTANTS } from '../radio/radio-constants.js';
import { IRadioGroupComponent } from './radio-group.js';

export interface IRadioGroupAdapter extends IBaseAdapter {
  attachLabel(label: LabelComponent): void;
  setDisabled(value: boolean): void;
  trySetRequired(): void;
}

export class RadioGroupAdapter extends BaseAdapter<IRadioGroupComponent> implements IRadioGroupAdapter {
  constructor(component: IRadioGroupComponent) {
    super(component);
  }

  public attachLabel(label: LabelComponent): void {
    label.nonInteractive = true;
    label.forElement = this._component;
  }

  public setDisabled(value: boolean): void {
    this._component[setDefaultAria]({ ariaDisabled: value ? 'true' : null });
    this._disableRadios(value);
  }

  public trySetRequired(): void {
    const required = Array.from(this._component.querySelectorAll(RADIO_CONSTANTS.elementName)).some(radio => radio.required);
    this._component[setDefaultAria]({ ariaRequired: required ? 'true' : null });
  }

  private _disableRadios(value: boolean): void {
    this._component.querySelectorAll(RADIO_CONSTANTS.elementName).forEach(radio => {
      radio.disabled = value;
    });
  }
}
