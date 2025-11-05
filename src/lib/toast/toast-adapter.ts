import { getShadowElement, playKeyframeAnimation } from '@tylertech/forge-core';
import { IButtonComponent } from '../button/button';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IIconButtonComponent } from '../icon-button/icon-button';
import { IOverlayComponent, OVERLAY_CONSTANTS } from '../overlay';
import { IToastComponent } from './toast';
import { TOAST_CONSTANTS } from './toast-constants';

export interface IToastAdapter extends IBaseAdapter<IToastComponent> {
  show(): void;
  hide(): void;
  addCloseListener(listener: EventListener): void;
  removeCloseListener(listener: EventListener): void;
  addActionListener(listener: EventListener): void;
  removeActionListener(listener: EventListener): void;
  setDismissLabel(label: string): void;
  setActionText(text: string): void;
  addMouseEnterListener(listener: EventListener): void;
  removeMouseEnterListener(listener: EventListener): void;
  addMouseLeaveListener(listener: EventListener): void;
  removeMouseLeaveListener(listener: EventListener): void;
  addFocusInListener(listener: EventListener): void;
  removeFocusInListener(listener: EventListener): void;
  addFocusOutListener(listener: EventListener): void;
  removeFocusOutListener(listener: EventListener): void;
  addKeyboardListener(listener: EventListener): void;
  removeKeyboardListener(listener: EventListener): void;
}

export class ToastAdapter extends BaseAdapter<IToastComponent> implements IToastAdapter {
  private _overlayElement: IOverlayComponent;
  private _surfaceElement: HTMLElement;
  private _actionButtonElement: IButtonComponent;
  private _closeButtonElement: IIconButtonComponent;

  constructor(component: IToastComponent) {
    super(component);
    this._overlayElement = getShadowElement(component, OVERLAY_CONSTANTS.elementName) as IOverlayComponent;
    this._surfaceElement = getShadowElement(component, TOAST_CONSTANTS.selectors.SURFACE);
    this._actionButtonElement = getShadowElement(component, TOAST_CONSTANTS.selectors.ACTION_BUTTON) as IButtonComponent;
    this._closeButtonElement = getShadowElement(component, TOAST_CONSTANTS.selectors.CLOSE_BUTTON) as IIconButtonComponent;
  }

  public show(): void {
    this._overlayElement.open = true;
  }

  public async hide(): Promise<void> {
    await playKeyframeAnimation(this._surfaceElement, TOAST_CONSTANTS.classes.EXITING);
    this._overlayElement.open = false;
  }

  public addCloseListener(listener: EventListener): void {
    this._closeButtonElement.addEventListener('click', listener);
  }

  public removeCloseListener(listener: EventListener): void {
    this._closeButtonElement.removeEventListener('click', listener);
  }

  public addActionListener(listener: EventListener): void {
    this._actionButtonElement.addEventListener('click', listener);
  }

  public removeActionListener(listener: EventListener): void {
    this._actionButtonElement.removeEventListener('click', listener);
  }

  public setDismissLabel(label: string): void {
    this._closeButtonElement.setAttribute('aria-label', label);
  }

  public setActionText(text: string): void {
    this._actionButtonElement.textContent = text;
    if (text) {
      this._actionButtonElement.removeAttribute('hidden');
    } else {
      this._actionButtonElement.setAttribute('hidden', '');
    }
  }

  public addMouseEnterListener(listener: EventListener): void {
    this._component.addEventListener('mouseenter', listener);
  }

  public removeMouseEnterListener(listener: EventListener): void {
    this._component.removeEventListener('mouseenter', listener);
  }

  public addMouseLeaveListener(listener: EventListener): void {
    this._component.addEventListener('mouseleave', listener);
  }

  public removeMouseLeaveListener(listener: EventListener): void {
    this._component.removeEventListener('mouseleave', listener);
  }

  public addFocusInListener(listener: EventListener): void {
    this._component.addEventListener('focusin', listener);
  }

  public removeFocusInListener(listener: EventListener): void {
    this._component.removeEventListener('focusin', listener);
  }

  public addFocusOutListener(listener: EventListener): void {
    this._component.addEventListener('focusout', listener);
  }

  public removeFocusOutListener(listener: EventListener): void {
    this._component.removeEventListener('focusout', listener);
  }

  public addKeyboardListener(listener: EventListener): void {
    this._component.addEventListener('keydown', listener);
  }

  public removeKeyboardListener(listener: EventListener): void {
    this._component.removeEventListener('keydown', listener);
  }
}
