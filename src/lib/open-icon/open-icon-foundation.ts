import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IOpenIconAdapter } from './open-icon-adapter';
import { OPEN_ICON_CONSTANTS } from './open-icon-constants';

export interface IOpenIconFoundation extends ICustomElementFoundation {
  open: boolean;
}

export class OpenIconFoundation implements IOpenIconFoundation {
  private _open = false;
  private _orientation = OPEN_ICON_CONSTANTS.strings.ORIENTATION_VERTICAL;

  constructor(private _adapter: IOpenIconAdapter) {}

  public initialize(): void {
    this._adapter.setOrientation(this._orientation);
  }

  /** Controls the open state of the icon. */
  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    value = Boolean(value);
    if (this._open !== value) {
      this._open = value;
      this._adapter.toggleHostAttribute(OPEN_ICON_CONSTANTS.attributes.OPEN, this._open);
    }
  }

  public get orientation(): string {
    return this._orientation;
  }
  public set orientation(value: string) {
    this._orientation = value;
    this._adapter.setOrientation(this._orientation);
  }
}
