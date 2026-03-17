import { LABEL_CONSTANTS, LabelComponent } from '../../label/index.js';
import { IRadioGroupAdapter } from './radio-group-adapter.js';
import { RADIO_GROUP_CONSTANTS } from './radio-group-constants.js';

export interface IRadioGroupCore {
  disabled: boolean;
}

export class RadioGroupCore implements IRadioGroupCore {
  private _disabled = false;

  private readonly _labelConnectedListener: EventListener;

  constructor(private _adapter: IRadioGroupAdapter) {
    this._labelConnectedListener = (evt: Event) => this._handleLabelConnected(evt);
  }

  public initialize(): void {
    this._adapter.addHostListener(LABEL_CONSTANTS.events.CONNECTED, this._labelConnectedListener);
    this._adapter.trySetRequired();
  }

  private _handleLabelConnected(evt: Event): void {
    // Stop the label from being seen by any ancestor elements that might try to connect to it
    evt.stopPropagation();
    this._adapter.attachLabel(evt.target as LabelComponent);
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setDisabled(value);
      this._adapter.toggleHostAttribute(RADIO_GROUP_CONSTANTS.attributes.DISABLED, value);
    }
  }
}
