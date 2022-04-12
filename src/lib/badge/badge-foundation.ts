import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IBadgeAdapter } from './badge-adapter';
import { BADGE_CONSTANTS } from './badge-constants';

export interface IBadgeFoundation extends ICustomElementFoundation {
  dot: boolean;
  open: boolean;
}

export class BadgeFoundation implements IBadgeFoundation {
  private _dot = false;
  private _open = true;

  constructor(private _adapter: IBadgeAdapter) {}

  public initialize(): void {
    this._applyDot();
    this._setOpen();
  }

  private _applyDot(): void {
    if (this._dot) {
      this._adapter.setRootClass(BADGE_CONSTANTS.classes.DOT);
      this._adapter.setHostAttribute(BADGE_CONSTANTS.attributes.DOT);
    } else {
      this._adapter.removeRootClass(BADGE_CONSTANTS.classes.DOT);
      this._adapter.removeHostAttribute(BADGE_CONSTANTS.attributes.DOT);
    }
  }

  private _setOpen(): void {
    if (this._open) {
      this._adapter.setRootClass(BADGE_CONSTANTS.classes.OPEN);
      this._adapter.setHostAttribute(BADGE_CONSTANTS.attributes.OPEN);
    } else {
      this._adapter.removeRootClass(BADGE_CONSTANTS.classes.OPEN);
      this._adapter.removeHostAttribute(BADGE_CONSTANTS.attributes.OPEN);
    }
  }

  public get dot(): boolean {
    return this._dot;
  }
  public set dot(value: boolean) {
    if (this._dot !== value) {
      this._dot = value;
      this._applyDot();
    }
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    if (this._open !== value) {
      this._open = value;
      this._setOpen();
    }
  }
}
