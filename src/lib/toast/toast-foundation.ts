import { ICustomElementFoundation, isFunction } from '@tylertech/forge-core';
import { IToastAdapter } from './toast-adapter';
import { ToastBuilder, TOAST_CONSTANTS, ToastPlacement } from './toast-constants';

export interface IToastFoundation extends ICustomElementFoundation {
  message: string;
  actionText: string;
  duration: number;
  placement: ToastPlacement;
  showClose: boolean;
  builder: ToastBuilder | string;
  show(): void;
  hide(): void;
}

/**
 * The foundation class behind the `ToastComponent` class that manages the state of a toast component instance.
 */
export class ToastFoundation implements IToastFoundation {
  private _message: string;
  private _actionText: string;
  private _duration: number = TOAST_CONSTANTS.defaults.DURATION;
  private _placement: ToastPlacement = TOAST_CONSTANTS.defaults.PLACEMENT as ToastPlacement;
  private _showClose = true;
  private _hasAction = false;
  private _isActive = false;
  private _hideTimeout: number | NodeJS.Timer | undefined;
  private _builder: ToastBuilder | string;
  private _actionListener: (evt: MouseEvent) => void;
  private _closeListener: (evt: MouseEvent) => void;

  constructor(private _adapter: IToastAdapter) {
    this._actionListener = (evt: MouseEvent) => this._onAction(evt);
    this._closeListener = (evt: MouseEvent) => this._onClose(evt);
  }

  public initialize(): void {
    this._adapter.setPlacement(this._placement);
    this._adapter.registerCloseListener(this._closeListener);
    this._adapter.setCloseButtonVisibility(this._showClose);
    this._adapter.setActionVisibility(!!this._actionText);
    this.show();
  }

  /**
   * Starts the animation of the toast and hides it after the duration.
   */
  public show(): void {
    // Check if we were provided a builder function and call it if so (this will override the message text)
    if (isFunction(this._builder)) {
      const tpl = (this._builder as ToastBuilder)();
      this._adapter.setMessageTemplate(tpl);
    }

    this._isActive = true;
    this._adapter.setActive(true);

    if (isFinite(this._duration) && this._duration > 0) {
      this._hideTimeout = setTimeout(() => this.hide(true), this._duration);
    }
  }

  /**
   * Hides the toast and removes it from the DOM.
   */
  public hide(emitEvent: boolean = false): void {
    if (!this._isActive) {
      return;
    }

    this._isActive = false;
    this._adapter.setActive(false);

    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout as number);
      this._hideTimeout = undefined;
    }

    if (emitEvent) {
      this._adapter.emitHostEvent(TOAST_CONSTANTS.events.CLOSE);
    }
  }

  /**
   * Handles click events from the optional action button.
   * @param {MouseEvent} evt The mouse event.
   */
  private _onAction(evt: MouseEvent): void {
    evt.stopPropagation();
    this._adapter.emitHostEvent(TOAST_CONSTANTS.events.ACTION);
  }

  private _onClose(evt: MouseEvent): void {
    this.hide(true);
  }

  /** The message to display in the toast. */
  public get message(): string {
    return this._message;
  }
  public set message(value: string) {
    if (this._message !== value) {
      this._message = value;
      this._adapter.setMessage(this._message);
      this._adapter.setHostAttribute(TOAST_CONSTANTS.attributes.MESSAGE, this._message);
    }
  }

  /** The text to display in the action button. */
  public get actionText(): string {
    return this._actionText;
  }
  public set actionText(value: string) {
    if (this._actionText !== value) {
      this._actionText = value;

      if (this._actionText) {
        if (this._hasAction) {
          this._adapter.setActionText(this._actionText);
        } else {
          this._adapter.setActionText(this._actionText);
          this._adapter.setActionVisibility(true);
          this._adapter.registerActionListener('click', this._actionListener);
          this._hasAction = true;
        }
      } else if (this._hasAction) {
        this._adapter.setActionText('');
        this._adapter.setActionVisibility(false);
        this._adapter.deregisterActionListener('click', this._actionListener);
        this._hasAction = false;
      }

      this._adapter.setHostAttribute(TOAST_CONSTANTS.attributes.ACTION_TEXT, this._actionText);
    }
  }

  /** The time in milliseconds to show the toast. */
  public get duration(): number {
    return this._duration;
  }
  public set duration(value: number) {
    if (this._duration !== value) {
      this._duration = value;
      if (this._hideTimeout) {
        clearTimeout(this._hideTimeout as number);
        this._hideTimeout = setTimeout(() => this.hide(true), this._duration);
      }
    }
  }

  /** The placement of the toast. */
  public get placement(): ToastPlacement {
    return this._placement;
  }
  public set placement(value: ToastPlacement) {
    if (this._placement !== value) {
      this._placement = value;
      this._adapter.setPlacement(this._placement);
    }

    this._adapter.setHostAttribute(TOAST_CONSTANTS.attributes.PLACEMENT, this._placement);
  }

  public get builder(): ToastBuilder | string {
    return this._builder;
  }
  public set builder(value: ToastBuilder | string) {
    this._builder = value;
  }

  public get showClose(): boolean {
    return this._showClose;
  }
  public set showClose(value: boolean) {
    if (this._showClose !== value) {
      this._showClose = value;
      this._adapter.setCloseButtonVisibility(this._showClose);
      this._adapter.setHostAttribute(TOAST_CONSTANTS.attributes.SHOW_CLOSE, this._showClose.toString());
    }
  }
}
