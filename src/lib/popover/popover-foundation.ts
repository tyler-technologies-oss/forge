import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IPopoverAdapter } from './popover-adapter';

export interface IPopoverFoundation extends ICustomElementFoundation {

}

export class PopoverFoundation implements IPopoverFoundation {
  private _targetElement: HTMLElement;

  constructor(private _adapter: IPopoverAdapter) {}

  public initialize(): void {
    this._adapter.init(this._targetElement);
  }

  public disconnect(): void {

  }

  public get targetElement(): HTMLElement {
    return this._targetElement;
  }

  public set targetElement(value: HTMLElement) {
    this._targetElement = value;
    this._adapter.init(this._targetElement);
  }
}
