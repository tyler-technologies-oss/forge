import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IBannerAdapter } from './banner-adapter';
import { BANNER_CONSTANTS } from './banner-constants';

export interface IBannerFoundation extends ICustomElementFoundation {
  dismissed: boolean;
  canDismiss: boolean;
}

export class BannerFoundation implements IBannerFoundation {
  private _dismissed = false;
  private _canDismiss = true;
  private _dismissBanner: () => void;

  constructor(private _adapter: IBannerAdapter) {
    this._dismissBanner = () => this._dismiss();
  }

  public connect(): void {
    this._addDismissEventListener();
  }

  public disconnect(): void {
    this._removeDismissEventListener();
  }

  private _dismiss(): void {
    this.dismissed = true;
  }

  private _syncDismissedState(): void {
    if (this.dismissed) {
      this._setDismissedClass();
      this._adapter.emitHostEvent(BANNER_CONSTANTS.events.DISMISSED);
    } else {
      this._setUndissmissedClass();
      this._adapter.emitHostEvent(BANNER_CONSTANTS.events.UNDISMISSED);
    }
  }

  private _setUndissmissedClass(): void {
    this._adapter.removeRootClass(BANNER_CONSTANTS.classes.DISMISSED);
  }

  private _setDismissedClass(): void {
    this._adapter.addRootClass(BANNER_CONSTANTS.classes.DISMISSED);
  }

  private _syncCanDismissState(): void {
    if (this.canDismiss) {
      this._adapter.removeDismissButtonAttribute(BANNER_CONSTANTS.attributes.HIDDEN);
    } else {
      this._adapter.addDismissButtonAttribute(BANNER_CONSTANTS.attributes.HIDDEN);
    }
  }

  private _addDismissEventListener(): void {
    this._adapter.addDismissEventListener('click', this._dismissBanner);
  }

  private _removeDismissEventListener(): void {
    this._adapter.removeDismissEventListener('click', this._dismissBanner);
  }

  public get dismissed(): boolean {
    return !!this._dismissed;
  }
  public set dismissed(val: boolean) {
    if (this.dismissed === !!val) {
      return;
    }

    this._dismissed = !!val;
    this._syncDismissedState();
  }

  public get canDismiss(): boolean {
    return !!this._canDismiss;
  }
  public set canDismiss(val: boolean) {
    if (this._canDismiss === !!val) {
      return;
    }

    this._canDismiss = !!val;
    this._syncCanDismissState();
  }
}
