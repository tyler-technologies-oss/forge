import { BaseButtonAdapter, IBaseButtonAdapter } from './base/base-button-adapter';
import { IButtonComponent } from './button';

export interface IButtonAdapter extends IBaseButtonAdapter {
  toggleStateLayer(value: boolean): void;
}

export class ButtonAdapter extends BaseButtonAdapter implements IButtonAdapter {
  constructor(component: IButtonComponent) {
    super(component);
  }

  public toggleStateLayer(value: boolean): void {
    this._stateLayerElement.disabled = !value;
  }
}
