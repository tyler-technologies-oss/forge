import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IToastAdapter } from './toast-adapter';
import { TOAST_CONSTANTS, ToastPlacement } from './toast-constants';

export interface IToastFoundation extends ICustomElementFoundation {
  message: string;
  actionText: string;
  duration: number;
  placement: ToastPlacement;
  dismissible: boolean;
  show(): void;
  hide(): void;
}

export class ToastFoundation implements IToastFoundation {
  private _message: string;
  private _actionText: string;
  private _duration: number = TOAST_CONSTANTS.defaults.DURATION;
  private _placement: ToastPlacement = TOAST_CONSTANTS.defaults.PLACEMENT as ToastPlacement;
  private _dismissible = false;
  private _hasAction = false;
  private _isActive = false;
  private _hideTimeout: number | NodeJS.Timer | undefined;
  private _actionListener: EventListener = this._onAction.bind(this);
  private _closeListener: EventListener = this._onClose.bind(this);

  constructor(private _adapter: IToastAdapter) {}

  public initialize(): void {
    // this._adapter.registerCloseListener(this._closeListener);
    // this._adapter.setCloseButtonVisibility(this._dismissible);
    // this._adapter.setActionVisibility(!!this._actionText);
    this.show();
  }

  public show(): void {
    this._adapter.show();

    if (isFinite(this._duration) && this._duration > 0) {
      this._hideTimeout = window.setTimeout(() => this.hide(), this._duration);
    }
  }

  public hide({ dispatchEvent = true } = {}): void {
    if (!this._isActive) {
      return;
    }

    this._adapter.hide();

    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout as number);
      this._hideTimeout = undefined;
    }

    if (dispatchEvent) {
      this._adapter.emitHostEvent(TOAST_CONSTANTS.events.CLOSE);
    }
  }

  private _onAction(evt: MouseEvent): void {
    evt.stopPropagation();
    this._adapter.emitHostEvent(TOAST_CONSTANTS.events.ACTION);
  }

  private _onClose(_evt: MouseEvent): void {
    this.hide();
  }

  public get message(): string {
    return this._message;
  }
  public set message(value: string) {
    if (this._message !== value) {
      this._message = value;
      // this._adapter.setMessage(this._message);
      this._adapter.setHostAttribute(TOAST_CONSTANTS.attributes.MESSAGE, this._message);
    }
  }

  public get actionText(): string {
    return this._actionText;
  }
  public set actionText(value: string) {
    if (this._actionText !== value) {
      this._actionText = value;

      // if (this._actionText) {
      //   if (this._hasAction) {
      //     this._adapter.setActionText(this._actionText);
      //   } else {
      //     this._adapter.setActionText(this._actionText);
      //     this._adapter.setActionVisibility(true);
      //     this._adapter.registerActionListener('click', this._actionListener);
      //     this._hasAction = true;
      //   }
      // } else if (this._hasAction) {
      //   this._adapter.setActionText('');
      //   this._adapter.setActionVisibility(false);
      //   this._adapter.deregisterActionListener('click', this._actionListener);
      //   this._hasAction = false;
      // }

      this._adapter.setHostAttribute(TOAST_CONSTANTS.attributes.ACTION_TEXT, this._actionText);
    }
  }

  public get duration(): number {
    return this._duration;
  }
  public set duration(value: number) {
    if (this._duration !== value) {
      this._duration = value;
      if (this._hideTimeout) {
        clearTimeout(this._hideTimeout as number);
        this._hideTimeout = window.setTimeout(() => this.hide(), this._duration);
      }
    }
  }

  public get placement(): ToastPlacement {
    return this._placement;
  }
  public set placement(value: ToastPlacement) {
    if (this._placement !== value) {
      this._placement = value;
      this._adapter.setHostAttribute(TOAST_CONSTANTS.attributes.PLACEMENT, this._placement);
    }
  }

  public get dismissible(): boolean {
    return this._dismissible;
  }
  public set showClose(value: boolean) {
    value = Boolean(value);
    if (this._dismissible !== value) {
      this._dismissible = value;
      // this._adapter.setCloseButtonVisibility(this._dismissible);
      this._adapter.toggleHostAttribute(TOAST_CONSTANTS.attributes.DISMISSIBLE, this._dismissible);
    }
  }
}
