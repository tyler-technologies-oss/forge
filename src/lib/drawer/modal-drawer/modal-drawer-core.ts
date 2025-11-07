import { BaseDrawerCore, IBaseDrawerCore } from '../base';

import { IModalDrawerAdapter } from './modal-drawer-adapter';
import { MODAL_DRAWER_CONSTANTS } from './modal-drawer-constants';

export interface IModalDrawerCore extends IBaseDrawerCore {}

export class ModalDrawerCore extends BaseDrawerCore implements IModalDrawerCore {
  protected _open = false;
  private _backdropClickListener: EventListener = this._onBackdropClick.bind(this);

  constructor(protected _adapter: IModalDrawerAdapter) {
    super(_adapter);
  }

  public override initialize(): void {
    super.initialize();
    this._adapter.setBackdropCloseListener(this._backdropClickListener);
    this._setBackdrop(this._open, { immediate: true });
  }

  protected async _triggerDrawerOpen(): Promise<void> {
    super._triggerDrawerOpen();
    this._setBackdrop(true);
  }

  protected async _triggerDrawerClose(): Promise<void> {
    super._triggerDrawerClose();
    this._setBackdrop(false);
  }

  private _onBackdropClick(_evt: Event): void {
    const canClose = this._adapter.emitHostEvent(MODAL_DRAWER_CONSTANTS.events.CLOSE, undefined, true, true);
    if (canClose) {
      this.open = false;
    }
  }

  private async _setBackdrop(open: boolean, { immediate = false } = {}): Promise<void> {
    if (open) {
      this._adapter.toggleBackdropClass(false, MODAL_DRAWER_CONSTANTS.classes.SCRIM_CLOSED);
      this._adapter.setBackdropVisibility(true, { immediate });
    } else if (this._adapter.isConnected) {
      await this._adapter.setBackdropVisibility(false, { immediate });
      if (!this._open) {
        this._adapter.toggleBackdropClass(true, MODAL_DRAWER_CONSTANTS.classes.SCRIM_CLOSED);
      }
    }
  }
}
