import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IListDropdownAdapter } from './list-dropdown-adapter';

export interface IListDropdownFoundation extends ICustomElementFoundation {
  open: boolean;
  targetElement: HTMLElement;
}

export class ListDropdownFoundation implements IListDropdownFoundation {
  private _open = false;
  private _targetElement: HTMLElement;

  constructor(private _adapter: IListDropdownAdapter) {}

  public initialize(): void {

  }

  public disconnect(): void {

  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    if (value !== this._open) {
      this._open = value;
    }
  }

  public get targetElement(): HTMLElement {
    return this._targetElement;
  }
  public set targetElement(value: HTMLElement) {
    this._targetElement = value;
    this._adapter.setTargetElement(this._targetElement);
  }
}
