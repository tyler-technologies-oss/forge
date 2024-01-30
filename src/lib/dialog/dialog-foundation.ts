import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IDialogAdapter } from './dialog-adapter';
import { DIALOG_CONSTANTS } from './dialog-constants';

export interface IDialogFoundation extends ICustomElementFoundation {
  open: boolean;
  persistent: boolean;
  backdropClose: boolean;
  escapeClose: boolean;
}

export class DialogFoundation implements IDialogFoundation {
  private _open = false;
  private _persistent = false;
  private _backdropClose = true;
  private _escapeClose = true;

  private _escapeDismissListener: EventListener = this._onEscapeDismiss.bind(this);
  private _backdropDismissListener: EventListener = this._onBackdropDismiss.bind(this);
  private _dialogFormSubmitListener: EventListener = this._onDialogFormSubmit.bind(this);

  constructor(public _adapter: IDialogAdapter) {}

  public initialize(): void {
    this._adapter.initialize();

    if (this._open) {
      this._show();
    }
  }

  public destroy(): void {
    if (this._open) {
      this._hide();
    }
  }

  private _show(): void {
    this._adapter.show();
    this._adapter.addDialogFormSubmitListener(this._dialogFormSubmitListener);

    if (this._escapeClose) {
      this._adapter.addEscapeDismissListener(this._escapeDismissListener);
    }
    if (this._backdropClose) {
      this._adapter.addBackdropDismissListener(this._backdropDismissListener);
    }

    this._adapter.dispatchHostEvent(new CustomEvent(DIALOG_CONSTANTS.events.OPEN, { bubbles: true, composed: true }));
  }

  private _hide(): void {
    this._adapter.hide();
    this._adapter.removeDialogFormSubmitListener(this._dialogFormSubmitListener);
    this._adapter.removeEscapeDismissListener(this._escapeDismissListener);
    this._adapter.removeBackdropDismissListener(this._backdropDismissListener);
    this._adapter.dispatchHostEvent(new CustomEvent(DIALOG_CONSTANTS.events.CLOSE, { bubbles: true, composed: true }));
  }

  private _applyOpen(value: boolean): void {
    this._open = value;
    
    if (value) {
      this._show();
    } else {
      this._hide();
    }

    this._adapter.toggleHostAttribute(DIALOG_CONSTANTS.attributes.OPEN, this._open);
  }

  private _onEscapeDismiss(evt: Event): void {
    evt.preventDefault();
    if (this._escapeClose) {
      this._tryClose();
    }
  }

  private _onBackdropDismiss(): void {
    this._tryClose();
  }

  private _onDialogFormSubmit(evt: SubmitEvent): void {
    const isDialogSubmitter = evt.submitter?.getAttribute('formmethod') === 'dialog' ||
                              (evt.target as HTMLFormElement)?.getAttribute('method') === 'dialog';
    if (isDialogSubmitter) {
      this._tryClose();
    }
  }

  private _tryClose(): void {
    const evt = new CustomEvent(DIALOG_CONSTANTS.events.BEFORE_CLOSE, { cancelable: true, bubbles: true, composed: true });
    const canClose = !this._adapter.dispatchHostEvent(evt);
    if (canClose) {
      this._applyOpen(false);
    }
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    value = Boolean(value);
    if (this._open !== value) {
      this._applyOpen(value);
    }
  }

  public get persistent(): boolean {
    return this._persistent;
  }
  public set persistent(value: boolean) {
    value = Boolean(value);
    if (this._persistent !== value) {
      this._persistent = value;
      this.backdropClose = value;
      this.escapeClose = value;
      this._adapter.toggleHostAttribute(DIALOG_CONSTANTS.attributes.PERSISTENT, this._persistent);
    }
  }

  public get backdropClose(): boolean {
    return this._backdropClose;
  }
  public set backdropClose(value: boolean) {
    value = Boolean(value);
    if (this._backdropClose !== value) {
      this._backdropClose = value;
      // this._setBackdropClickListener(this._backdropClose);
      this._adapter.toggleHostAttribute(DIALOG_CONSTANTS.attributes.BACKDROP_CLOSE, this._backdropClose);
    }
  }

  public get escapeClose(): boolean {
    return this._escapeClose;
  }
  public set escapeClose(value: boolean) {
    value = Boolean(value);
    if (this._escapeClose !== value) {
      this._escapeClose = !!value;
      // this._setDocumentKeydownListener(this._escapeClose);
      this._adapter.toggleHostAttribute(DIALOG_CONSTANTS.attributes.ESCAPE_CLOSE, this._escapeClose);
    }
  }
}
