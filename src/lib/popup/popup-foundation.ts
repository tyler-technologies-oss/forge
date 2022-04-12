import { ICustomElementFoundation, isElement } from '@tylertech/forge-core';
import { IPopupAdapter } from './popup-adapter';
import { IPopupPosition, PopupAnimationType, PopupPlacement, PopupStateCallback, POPUP_CONSTANTS as constants, POPUP_CONSTANTS } from './popup-constants';

export interface IPopupFoundation extends ICustomElementFoundation {
  targetElement: HTMLElement;
  placement: PopupPlacement;
  open: boolean;
  manageFocus: boolean;
  animationType: PopupAnimationType;
  static: boolean;
  offset: IPopupPosition;
  hideWhenClipped: boolean;
  position(): void;
  openCallback: PopupStateCallback;
  closeCallback: PopupStateCallback;
}

export class PopupFoundation implements IPopupFoundation {
  private _targetElement: HTMLElement;
  private _placement: PopupPlacement = 'bottom-start';
  private _open = false;
  private _manageFocus = false;
  private _animationType = PopupAnimationType.None;
  private _static = false;
  private _offset?: IPopupPosition;
  private _hideWhenClipped = false;
  private _destroyBlurListener: (() => void) | undefined;
  private _openCallback: PopupStateCallback;
  private _closeCallback: PopupStateCallback;
  private _blurListener: () => void;

  constructor(private _adapter: IPopupAdapter) {
    this._blurListener = () => this._onBlur();
  }

  public disconnect(): void {
    if (this.open) {
      this.open = false;
    }
  }

  private _openPopup(): void {
    if (this._animationType !== PopupAnimationType.None) {
      this._applyOpenAnimation();

      if (this._animationType === PopupAnimationType.Dropdown) {
        this._adapter.addClass(POPUP_CONSTANTS.classes.SELECT);
      }
    } else {
      this._adapter.addClass(POPUP_CONSTANTS.classes.OPEN);
    }

    this._adapter.setAttribute(POPUP_CONSTANTS.attributes.OPEN, '');
    this._adapter.addPopup(this.targetElement, this._manageFocus);
    this._adapter.trySetInitialFocus();

    if (this._destroyBlurListener) {
      this._destroyBlurListener();
    }

    if (!this._static) {
      this._destroyBlurListener = this._adapter.setBlurListener(this._blurListener);
    }

    this._adapter.manageWindowEvents(true);
    this._adapter.dispatchEvent(constants.events.OPEN);
  }

  private _closePopup(): void {
    if (this._destroyBlurListener) {
      this._destroyBlurListener();
      this._destroyBlurListener = undefined;
    }

    if (this._animationType !== PopupAnimationType.None) {
      this._applyCloseAnimation();
    } else {
      this._destroyPopup();
    }
  }

  private _destroyPopup(): void {
    this._adapter.manageWindowEvents(false);
    this._adapter.removePopup(this._manageFocus);
    this._adapter.dispatchEvent(constants.events.CLOSE);
    this._adapter.removeAttribute(POPUP_CONSTANTS.attributes.OPEN);
  }

  private _applyOpenAnimation(): void {
    switch (this._animationType) {
      case PopupAnimationType.Dropdown:
      case PopupAnimationType.Menu:
        this._adapter.addClass(POPUP_CONSTANTS.classes.OPENING);
        const transitionEndListener = (evt: TransitionEvent): void => {
          if (evt.propertyName === 'transform') {
            this._adapter.removeClass(POPUP_CONSTANTS.classes.OPENING);
            this._adapter.removeEventListener('transitionend', transitionEndListener);
          }
        };
        this._adapter.setAnimationEndListener(transitionEndListener, POPUP_CONSTANTS.classes.OPEN);
        break;
    }
  }

  private _applyCloseAnimation(): void {
    switch (this._animationType) {
      case PopupAnimationType.Dropdown:
      case PopupAnimationType.Menu:
        this._adapter.removeClass(POPUP_CONSTANTS.classes.OPEN);
        this._adapter.addClass(POPUP_CONSTANTS.classes.CLOSED);
        const transitionEndListener = (evt: TransitionEvent): void => {
          if (evt.propertyName === 'opacity') {
            if (fallbackTimer) {
              clearTimeout(fallbackTimer);
            }
            this._destroyPopup();
          }
        };
        this._adapter.setAnimationEndListener(transitionEndListener);
        const fallbackTimer = setTimeout(() => this._destroyPopup(), POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
        break;
    }
  }

  private _onBlur(): void {
    const cancelled = this._adapter.dispatchEvent(POPUP_CONSTANTS.events.BLUR, undefined, true, true);
    if (!cancelled) {
      this.open = false;
    }
  }

  private _applyOpen(): void {
    if (this._open) {
      if (!this.targetElement || !isElement(this.targetElement)) {
        throw new Error('targetElement on Popup component must be an HTMLElement');
      }

      if (typeof this._openCallback === 'function') {
        this._executeOpenCallback();
      } else {
        this._openPopup();
      }
    } else {
      if (typeof this._closeCallback === 'function') {
        this._executeCloseCallback();
      } else {
        this._closePopup();
      }
    }
  }

  private async _executeOpenCallback(): Promise<void> {
    try {
      if (await Promise.resolve(this._openCallback()) !== false) {
        this._openPopup();
      } else {
        this._open = false;
      }
    } catch (e) {
      this._open = false;
    }
  }

  private async _executeCloseCallback(): Promise<void> {
    try {
      if (await Promise.resolve(this._closeCallback()) !== false) {
        this._closePopup();
      } else {
        this._open = true;
      }
    } catch (e) {
      this._open = true;
    }
  }

  public get targetElement(): HTMLElement {
    return this._targetElement;
  }
  public set targetElement(element: HTMLElement) {
    if (!element || !isElement(element)) {
      throw new Error('targetElement on Popup component must be an HTMLElement');
    }
    this._targetElement = element;
  }

  public get placement(): PopupPlacement {
    return this._placement;
  }
  public set placement(value: PopupPlacement) {
    if (this._placement !== value) {
      this._placement = value || 'bottom-start';
      this._adapter.setAttribute(POPUP_CONSTANTS.attributes.PLACEMENT, this._placement);
    }
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    value = Boolean(value);
    if (this._open !== value) {
      this._open = value;
      this._applyOpen();
    }
  }

  public get manageFocus(): boolean {
    return this._manageFocus;
  }
  public set manageFocus(value: boolean) {
    if (this._manageFocus !== value) {
      this._manageFocus = value;
    }
  }

  public get animationType(): PopupAnimationType {
    return this._animationType;
  }
  public set animationType(value: PopupAnimationType) {
    if (this._animationType !== value) {
      this._animationType = value;
    }
  }

  public get static(): boolean {
    return this._static;
  }
  public set static(value: boolean) {
    if (this._static !== value) {
      this._static = value;
      if (this._static && this._destroyBlurListener) {
        this._destroyBlurListener();
        this._destroyBlurListener = undefined;
      }
    }
  }

  public get hideWhenClipped(): boolean {
    return this._hideWhenClipped;
  }
  public set hideWhenClipped(value: boolean) {
    if (this._hideWhenClipped !== value) {
      this._hideWhenClipped = value;
    }
  }

  public get offset(): IPopupPosition {
    return this._offset ?? { x: 0, y: 0 };
  }
  public set offset(value: IPopupPosition) {
    if (!value) {
      this._offset = undefined;
    } else {
      this._offset = {
        x: value.x ?? 0,
        y: value.y ?? 0
      };
    }
    if (this._open) {
      this._adapter.positionPopup();
    }
  }

  public get openCallback(): PopupStateCallback {
    return this._openCallback;
  }
  public set openCallback(callback: PopupStateCallback) {
    this._openCallback = callback;
  }

  public get closeCallback(): PopupStateCallback {
    return this._closeCallback;
  }
  public set closeCallback(callback: PopupStateCallback) {
    this._closeCallback = callback;
  }

  public position(): void {
    this._adapter.positionPopup();
  }
}
