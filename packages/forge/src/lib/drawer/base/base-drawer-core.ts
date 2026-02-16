import { isDefined } from '@tylertech/forge-core';
import { IBaseDrawerAdapter } from './base-drawer-adapter.js';
import { DrawerDirection, BASE_DRAWER_CONSTANTS } from './base-drawer-constants.js';
import { frame } from '../../core/utils/utils.js';

export interface IBaseDrawerCore {
  direction: DrawerDirection;
}

export class BaseDrawerCore implements IBaseDrawerCore {
  protected _open = true;
  protected _direction: DrawerDirection = 'left';
  private _openAnimationListener: () => void;
  private _closeAnimationListener: () => void;

  constructor(protected _adapter: IBaseDrawerAdapter) {
    this._openAnimationListener = () => this._onOpenComplete();
    this._closeAnimationListener = () => this._onCloseComplete();
  }

  public initialize(): void {
    if (this._open) {
      this._setOpened();
    } else {
      this._setClosed();
    }

    this._applyDirection();
    this._adapter.setInert(!this._open);
    this._adapter.proxyScrollEvent();
  }

  public destroy(): void {
    this._adapter.tryUnproxyScrollEvent();
  }

  private _applyDirection(): void {
    this._adapter.setDirection(this._direction);
    this._adapter.setHostAttribute(BASE_DRAWER_CONSTANTS.attributes.DIRECTION, isDefined(this._direction) ? this._direction.toString() : '');
  }

  private _onOpenComplete(): void {
    if (!this._open) {
      return;
    }
    this._setOpened();
    const event = new CustomEvent(BASE_DRAWER_CONSTANTS.events.AFTER_OPEN, { bubbles: true, composed: true });
    this._adapter.dispatchHostEvent(event);
  }

  private _onCloseComplete(): void {
    if (this._open) {
      return;
    }
    this._setClosed();
    const event = new CustomEvent(BASE_DRAWER_CONSTANTS.events.AFTER_CLOSE, { bubbles: true, composed: true });
    this._adapter.dispatchHostEvent(event);
  }

  private _setOpened(): void {
    this._adapter.removeDrawerClass([BASE_DRAWER_CONSTANTS.classes.CLOSED, BASE_DRAWER_CONSTANTS.classes.CLOSING]);
    this._adapter.setHostAttribute(BASE_DRAWER_CONSTANTS.attributes.OPEN);
  }

  private _setClosed(): void {
    this._adapter.removeDrawerClass([BASE_DRAWER_CONSTANTS.classes.CLOSING, BASE_DRAWER_CONSTANTS.classes.NO_TRANSITION]);
    this._adapter.setDrawerClass(BASE_DRAWER_CONSTANTS.classes.CLOSED);
    this._adapter.removeHostAttribute(BASE_DRAWER_CONSTANTS.attributes.OPEN);
  }

  protected _applyOpen(): void {
    if (this._open) {
      this._adapter.setInert(false);
      this._triggerDrawerOpen();
      this._adapter.setHostAttribute(BASE_DRAWER_CONSTANTS.attributes.OPEN);
    } else {
      this._adapter.setInert(true);
      this._triggerDrawerClose();
      this._adapter.removeHostAttribute(BASE_DRAWER_CONSTANTS.attributes.OPEN);
    }
  }

  protected async _triggerDrawerOpen(): Promise<void> {
    this._adapter.listenTransitionComplete(this._openAnimationListener);
    await frame();
    this._adapter.removeDrawerClass([BASE_DRAWER_CONSTANTS.classes.CLOSED, BASE_DRAWER_CONSTANTS.classes.CLOSING]);
  }

  protected async _triggerDrawerClose(): Promise<void> {
    this._adapter.listenTransitionComplete(this._closeAnimationListener);
    await frame();
    this._adapter.setDrawerClass(BASE_DRAWER_CONSTANTS.classes.CLOSING);
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    value = Boolean(value);
    if (this._open !== value) {
      this._open = value;
      if (this._adapter.isConnected) {
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
      if (this._adapter.isConnected) {
        this._applyDirection();
      }
    }
  }
}
