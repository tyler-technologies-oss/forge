import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IStackAdapter } from './stack-adapter';

export interface IStackFoundation extends ICustomElementFoundation {

}

export class StackFoundation implements IStackFoundation {
  private _inline = false;
  private _wrap = false;
  constructor(private _adapter: IStackAdapter) {}

  public initialize(): void {
    this._adapter.setStackDirection(this._inline);
    this._adapter.setWrap(this._wrap);
  }

  /** Controls the direction of the stack. */
  public get inline(): boolean {
    return this._inline;
  }
  public set inline(value: boolean) {
    value = Boolean(value);
    if (this._inline !== value) {
      this._inline = value;
      this._adapter.setStackDirection(this._inline);
    }
  }

  /** Controls the direction of the stack. */
  public get wrap(): boolean {
    return this._wrap;
  }
  public set wrap(value: boolean) {
    value = Boolean(value);
    if (this._wrap !== value) {
      this._wrap = value;
      this._adapter.setWrap(this._wrap);
    }
  }

  public disconnect(): void {

  }
}
