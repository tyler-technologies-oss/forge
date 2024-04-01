import { Platform } from '@tylertech/forge-core';
import { BaseDrawerFoundation, IBaseDrawerFoundation } from '../base';

import { IModalDrawerAdapter } from './modal-drawer-adapter';
import { MODAL_DRAWER_CONSTANTS } from './modal-drawer-constants';

export interface IModalDrawerFoundation extends IBaseDrawerFoundation {}

export class ModalDrawerFoundation extends BaseDrawerFoundation implements IModalDrawerFoundation {
  protected _open = false;
  private _backdropClickListener: (evt: Event) => void;
  private _isInitialized = false;

  constructor(protected _adapter: IModalDrawerAdapter) {
    super(_adapter);
    this._backdropClickListener = evt => this._onBackdropClick(evt);
  }

  public connect(): void {
    super.connect();
    this._adapter.setBackdropCloseListener(this._backdropClickListener);
    this._setBackdrop(this._open);
    this._isInitialized = true;
  }

  public disconnect(): void {
    this._isInitialized = false;
  }

  protected _triggerDrawerOpen(): void {
    super._triggerDrawerOpen();
    this._setBackdrop(true);
  }

  protected _triggerDrawerClose(): void {
    super._triggerDrawerClose();
    this._setBackdrop(false);
  }

  private _onBackdropClick(evt: Event): void {
    const canClose = this._adapter.emitHostEvent(MODAL_DRAWER_CONSTANTS.events.CLOSE, undefined, true, true);
    if (canClose) {
      this.open = false;
    }
  }

  private async _setBackdrop(open: boolean): Promise<void> {
    if (open) {
      this._adapter.toggleBackdropClass(false, MODAL_DRAWER_CONSTANTS.classes.SCRIM_CLOSED);
      this._adapter.setBackdropVisibility(true);
    } else if (this._isInitialized) {
      await this._adapter.setBackdropVisibility(false);
      if (!this._open) {
        this._adapter.toggleBackdropClass(true, MODAL_DRAWER_CONSTANTS.classes.SCRIM_CLOSED);
      }
    }
  }
}
