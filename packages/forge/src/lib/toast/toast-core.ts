import { DismissibleStack, IDismissible, IDismissibleStackState, tryDismiss } from '../core/utils/dismissible-stack.js';
import { IToastAdapter } from './toast-adapter.js';
import { TOAST_CONSTANTS, ToastPlacement, ToastTheme } from './toast-constants.js';

export interface IToastCore {
  duration: number;
  placement: ToastPlacement;
  actionText: string;
  dismissible: boolean;
  dismissLabel: string;
  show(): void;
  hide(): Promise<void>;
}

export class ToastCore implements IToastCore {
  private _open = false;
  private _actionText: string;
  private _duration: number = TOAST_CONSTANTS.defaults.DURATION;
  private _placement: ToastPlacement = TOAST_CONSTANTS.defaults.PLACEMENT as ToastPlacement;
  private _dismissible = false;
  private _dismissLabel: string;
  private _theme: ToastTheme = TOAST_CONSTANTS.defaults.THEME;
  private _hideTimeout: number | undefined;
  private _actionListener: EventListener = this._onAction.bind(this);
  private _closeListener: EventListener = this._onClose.bind(this);
  private _isHovered = false;
  private _isFocused = false;
  private _pointerEnterListener: EventListener = this._handlePointerEnter.bind(this);
  private _pointerLeaveListener: EventListener = this._handlePointerLeave.bind(this);
  private _focusInListener: EventListener = this._handleFocusIn.bind(this);
  private _focusOutListener: EventListener = this._handleFocusOut.bind(this);
  private _keyboardListener: EventListener = this._handleKeyboard.bind(this);

  constructor(private _adapter: IToastAdapter) {}

  public initialize(): void {
    this._adapter.tryApplyGlobalConfiguration(['duration', 'placement', 'dismissible']);

    this._adapter.addPointerEnterListener(this._pointerEnterListener);
    this._adapter.addPointerLeaveListener(this._pointerLeaveListener);
    this._adapter.addFocusInListener(this._focusInListener);
    this._adapter.addFocusOutListener(this._focusOutListener);
    this._adapter.addKeyboardListener(this._keyboardListener);

    if (this._open) {
      this.show();
    }
  }

  public show(): void {
    this._adapter.show();

    DismissibleStack.instance.add(this._adapter.hostElement as IDismissible);

    if (isFinite(this._duration) && this._duration > 0) {
      /* c8 ignore next 3 */
      if (this._hideTimeout) {
        window.clearTimeout(this._hideTimeout);
      }
      this._hideTimeout = window.setTimeout(() => this.hide(), this._duration);
    }

    this._open = true;
    this._adapter.toggleHostAttribute(TOAST_CONSTANTS.attributes.OPEN, this._open);
  }

  public async hide({ dispatchEvent = true } = {}): Promise<void> {
    if (this._hideTimeout) {
      window.clearTimeout(this._hideTimeout);
      this._hideTimeout = undefined;
    }

    this._isHovered = false;
    this._isFocused = false;

    DismissibleStack.instance.remove(this._adapter.hostElement as IDismissible);

    await this._adapter.hide();

    this._open = false;
    this._adapter.toggleHostAttribute(TOAST_CONSTANTS.attributes.OPEN, this._open);

    if (dispatchEvent) {
      this._adapter.dispatchHostEvent(new CustomEvent(TOAST_CONSTANTS.events.CLOSE, { bubbles: true }));
    }
  }

  private _onAction(evt: MouseEvent): void {
    evt.stopPropagation();
    this._adapter.dispatchHostEvent(new CustomEvent(TOAST_CONSTANTS.events.ACTION, { bubbles: true }));
  }

  private _onClose(_evt: MouseEvent): void {
    this.hide();
  }

  private _handlePointerEnter(): void {
    this._isHovered = true;
    this._updateTimerState();
  }

  private _handlePointerLeave(): void {
    this._isHovered = false;
    this._updateTimerState();
  }

  private _handleFocusIn(): void {
    this._isFocused = true;
    this._updateTimerState();
  }

  private _handleFocusOut(): void {
    this._isFocused = false;
    this._updateTimerState();
  }

  private _handleKeyboard(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this._open) {
      event.stopPropagation();
      DismissibleStack.instance.dismiss(this._adapter.hostElement as IDismissible, { reason: 'escape' });
    }
  }

  private _updateTimerState(): void {
    const shouldPause = this._isHovered || this._isFocused;

    if (shouldPause && this._hideTimeout) {
      this._pauseTimer();
    } else if (!shouldPause && !this._hideTimeout) {
      this._resumeTimer();
    }
  }

  private _pauseTimer(): void {
    if (this._hideTimeout) {
      window.clearTimeout(this._hideTimeout);
      this._hideTimeout = undefined;
    }
  }

  private _resumeTimer(): void {
    if (isFinite(this._duration) && this._duration > 0) {
      this._hideTimeout = window.setTimeout(() => this.hide(), this._duration);
    }
  }

  public [tryDismiss](state?: IDismissibleStackState): boolean {
    if (state?.reason === 'escape') {
      this.hide();
      return true;
    }
    return false;
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    value = Boolean(value);
    if (this._open !== value) {
      if (this._adapter.isConnected) {
        if (value) {
          this.show();
        } else {
          this.hide({ dispatchEvent: false });
        }
      } else {
        this._open = value;
      }
      this._adapter.toggleHostAttribute(TOAST_CONSTANTS.attributes.OPEN, this._open);
    }
  }

  public get duration(): number {
    return this._duration;
  }
  public set duration(value: number) {
    value ??= TOAST_CONSTANTS.defaults.DURATION;
    if (this._duration !== value) {
      this._duration = value;
      if (this._hideTimeout) {
        window.clearTimeout(this._hideTimeout);
        if (isFinite(this._duration) && this._duration > 0) {
          this._hideTimeout = window.setTimeout(() => this.hide(), this._duration);
        }
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

  public get actionText(): string {
    return this._actionText;
  }
  public set actionText(value: string) {
    value = value?.trim() ?? '';
    if (this._actionText !== value) {
      this._actionText = value;

      this._adapter.setActionText(this._actionText);

      if (this._actionText) {
        this._adapter.addActionListener(this._actionListener);
      } else {
        this._adapter.removeActionListener(this._actionListener);
      }

      this._adapter.toggleHostAttribute(TOAST_CONSTANTS.attributes.ACTION_TEXT, !!this._actionText, this._actionText);
    }
  }

  public get dismissible(): boolean {
    return this._dismissible;
  }
  public set dismissible(value: boolean) {
    value = Boolean(value);
    if (this._dismissible !== value) {
      this._dismissible = value;

      if (this._dismissible) {
        this._adapter.addCloseListener(this._closeListener);
      } else {
        this._adapter.removeCloseListener(this._closeListener);
      }

      this._adapter.toggleHostAttribute(TOAST_CONSTANTS.attributes.DISMISSIBLE, this._dismissible);
    }
  }

  public get dismissLabel(): string {
    return this._dismissLabel;
  }
  public set dismissLabel(value: string) {
    if (this._dismissLabel !== value) {
      this._dismissLabel = value;
      this._adapter.setDismissLabel(this._dismissLabel);
    }
  }

  public get theme(): ToastTheme {
    return this._theme;
  }
  public set theme(value: ToastTheme) {
    value ??= TOAST_CONSTANTS.defaults.THEME;
    if (this._theme !== value) {
      this._theme = value;
      this._adapter.setHostAttribute(TOAST_CONSTANTS.attributes.THEME, this._theme);
    }
  }
}
