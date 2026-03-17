import { BaseButtonAdapter, IBaseButtonAdapter } from './base/base-button-adapter.js';
import { IButtonComponent } from './button.js';

export interface IButtonAdapter extends IBaseButtonAdapter<IButtonComponent> {
  toggleStateLayer(value: boolean): void;
}

export class ButtonAdapter extends BaseButtonAdapter<IButtonComponent> implements IButtonAdapter {
  constructor(component: IButtonComponent) {
    super(component);
  }

  public toggleStateLayer(value: boolean): void {
    this._stateLayerElement.disabled = !value;
  }
}
