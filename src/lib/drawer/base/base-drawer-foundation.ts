import { ICustomElementFoundation, isDefined } from '@tylertech/forge-core';
import { IBaseDrawerAdapter } from './base-drawer-adapter';
import { DrawerDirection, BASE_DRAWER_CONSTANTS } from './base-drawer-constants';

export interface IBaseDrawerFoundation extends ICustomElementFoundation {
  direction: DrawerDirection;
}

export class BaseDrawerFoundation implements IBaseDrawerFoundation {
  protected _open = true;
  protected _direction: DrawerDirection = 'left';
  private _hasInitialized = false;
  private _openAnimationListener: () => void;
  private _closeAnimationListener: () => void;

  constructor(protected _adapter: IBaseDrawerAdapter) {
    this._openAnimationListener = () => this._onOpenComplete();
    this._closeAnimationListener = () => this._onCloseComplete();
  }

  public connect(): void {
    this._applyOpen();
    this._applyDirection();
    this._adapter.proxyScrollEvent();
    this._hasInitialized = true;
  }

  public disconnect(): void {
    this._adapter.tryUnproxyScrollEvent();
    this._hasInitialized = false;
  }

  private _applyDirection(): void {
    this._adapter.setDirection(this._direction);
    this._adapter.setHostAttribute(BASE_DRAWER_CONSTANTS.attributes.DIRECTION, isDefined(this._direction) ? this._direction.toString() : '');
  }

  private _onOpenComplete(): void {
    if (!this._open) {
      return;
    }
    this._adapter.emitHostEvent(BASE_DRAWER_CONSTANTS.events.AFTER_OPEN);
  }
  
  private _onCloseComplete(): void {
    if (this._open) {
      return;
    }
    this._adapter.removeDrawerClass(BASE_DRAWER_CONSTANTS.classes.CLOSING);
    this._adapter.removeDrawerClass(BASE_DRAWER_CONSTANTS.classes.NO_TRANSITION);
    this._adapter.setDrawerClass(BASE_DRAWER_CONSTANTS.classes.CLOSED);
    this._adapter.emitHostEvent(BASE_DRAWER_CONSTANTS.events.AFTER_CLOSE);
  }

  protected _applyOpen(): void {
    if (this._open) {
      this._setDrawerOpenState();
    } else {
      this._setDrawerClosedState();
    }
    
    if (this._open) {
      this._adapter.setHostAttribute(BASE_DRAWER_CONSTANTS.attributes.OPEN);
    } else {
      this._adapter.removeHostAttribute(BASE_DRAWER_CONSTANTS.attributes.OPEN);
    }
  }

  protected _setDrawerOpenState(): void {
    this._adapter.listenTransitionComplete(this._openAnimationListener);
    this._adapter.removeDrawerClass(BASE_DRAWER_CONSTANTS.classes.CLOSED);
    this._adapter.removeDrawerClass(BASE_DRAWER_CONSTANTS.classes.CLOSING);
  }

  protected _setDrawerClosedState(): void {
    this._adapter.listenTransitionComplete(this._closeAnimationListener);
    this._adapter.setDrawerClass(BASE_DRAWER_CONSTANTS.classes.CLOSING);
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    if (this._open !== value) {
      this._open = value;
      if (this._hasInitialized) {
        this._applyOpen();
      }
    }
  }

  public get direction(): DrawerDirection {
    return this._direction;
  }
  public set direction(value: DrawerDirection) {
    if (this._direction !== value) {
      this._direction = value;
      if (this._hasInitialized) {
        this._applyDirection();
      }
    }
  }
}
