import { getShadowElement, isString, removeAllChildren, removeClass, removeElement, toggleElementPlaceholder } from '@tylertech/forge-core';
import { IButtonComponent } from '../button';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { PopupPlacement } from '../popup';
import { IToastComponent } from './toast';
import { TOAST_CONSTANTS } from './toast-constants';

export interface IToastAdapter extends IBaseAdapter {
  setHostAttribute: (name: string, value: string) => void;
  setMessage: (value: string) => void;
  setMessageTemplate: (tpl: HTMLElement | string) => void;
  setActionVisibility: (isVisible: boolean) => void;
  setActionText: (message: string) => void;
  registerActionListener: (type: string, listener: (evt: MouseEvent) => void) => void;
  deregisterActionListener: (type: string, listener: (evt: MouseEvent) => void) => void;
  setPlacement: (placement: PopupPlacement) => void;
  setActive: (isActive: boolean) => void;
  setCloseButtonVisibility(visible: boolean): void;
  registerCloseListener(listener: (evt: Event) => void): void;
}

/**
 * The DOM adapter for the `ToastComponent` web component.
 */
export class ToastAdapter extends BaseAdapter<IToastComponent> implements IToastAdapter {
  private _containerElement: HTMLElement;
  private _messageElement: HTMLElement;
  private _actionButtonElement: IButtonComponent;
  private _actionButtonPlaceholder: Comment;
  private _closeButtonElement: HTMLButtonElement;

  constructor(component: IToastComponent) {
    super(component);
    this._containerElement = getShadowElement(component, TOAST_CONSTANTS.selectors.CONTAINER);
    this._messageElement = getShadowElement(component, TOAST_CONSTANTS.selectors.MESSAGE);
    this._actionButtonElement = getShadowElement(component, TOAST_CONSTANTS.selectors.ACTION_BUTTON) as IButtonComponent;
    this._closeButtonElement = getShadowElement(component, TOAST_CONSTANTS.selectors.CLOSE_BUTTON) as HTMLButtonElement;
  }

  /**
   * Sets an attribute on the host element.
   * @param name The attribute name.
   * @param value The attribute value.
   */
  public setHostAttribute(name: string, value: string): void {
    if (this._component.getAttribute(name) !== value) {
      this._component.setAttribute(name, value);
    }
  }

  /**
   * Sets the message text on the toast element.
   * @param value The message text.
   */
  public setMessage(value: string): void {
    this._messageElement.innerText = value;
  }

  /**
   * Sets a custom template on the message element.
   * @param tpl The message template.
   */
  public setMessageTemplate(tpl: HTMLElement | string): void {
    this._containerElement.classList.add(TOAST_CONSTANTS.classes.CUSTOM);
    if (isString(tpl)) {
      this._component.innerHTML = tpl;
    } else {
      removeAllChildren(this._messageElement);
      this._component.appendChild(tpl);
    }
  }

  /**
   * Toggles the visibility of the action button element.
   * @param isVisible The visibility.
   */
  public setActionVisibility(isVisible: boolean): void {
    this._actionButtonPlaceholder = toggleElementPlaceholder(
      this._component,
      isVisible,
      TOAST_CONSTANTS.elementName,
      TOAST_CONSTANTS.selectors.ACTION_BUTTON,
      this._actionButtonElement,
      this._actionButtonPlaceholder
    );
  }

  /**
   * Sets the action button text.
   * @param message The message text.
   */
  public setActionText(message: string): void {
    this._actionButtonElement.innerText = message;
  }

  /**
   * Adds an event listener to the action button element.
   * @param type The event type.
   * @param listener The event listener.
   */
  public registerActionListener(type: string, listener: (evt: MouseEvent) => void): void {
    this._actionButtonElement.addEventListener(type, listener);
  }

  /**
   * Removes an event listener from the action button.
   * @param type The event type.
   * @param listener The event listener.
   */
  public deregisterActionListener(type: string, listener: (evt: MouseEvent) => void): void {
    this._actionButtonElement.removeEventListener(type, listener);
  }

  /**
   * Adjusts the class applied to the toast container to position it properly.
   * @param placement The screen placement position.
   */
  public setPlacement(placement: PopupPlacement): void {
    removeClass(
      [
        TOAST_CONSTANTS.classes.TOP,
        TOAST_CONSTANTS.classes.TOP_LEFT,
        TOAST_CONSTANTS.classes.TOP_RIGHT,
        TOAST_CONSTANTS.classes.BOTTOM,
        TOAST_CONSTANTS.classes.BOTTOM_LEFT,
        TOAST_CONSTANTS.classes.BOTTOM_RIGHT
      ],
      this._containerElement
    );

    const placementClass = this._getPlacementClass(placement);
    if (placementClass) {
      this._containerElement.classList.add(placementClass);
    }
  }

  /**
   * Triggers the addition of classes to the container element to hide or show the toast using CSS transitions.
   * @param isActive Active or not.
   */
  public setActive(isActive: boolean): void {
    if (isActive) {
      // We need to force a reflow here to make sure that our new transform gets applied by the active class
      window.getComputedStyle(this._containerElement).getPropertyValue('bottom');
      this._containerElement.classList.add(TOAST_CONSTANTS.classes.ACTIVE);
    } else {
      this._containerElement.classList.remove(TOAST_CONSTANTS.classes.ACTIVE);
      const animationCompletedListener = (): void => {
        this._containerElement.removeEventListener('transitionend', animationCompletedListener);
        removeElement(this._component);
      };
      this._containerElement.addEventListener('transitionend', animationCompletedListener);
    }
  }

  public setCloseButtonVisibility(visible: boolean): void {
    if (visible) {
      this._closeButtonElement.style.removeProperty('display');
    } else {
      this._closeButtonElement.style.display = 'none';
    }
  }

  public registerCloseListener(listener: (evt: Event) => void): void {
    this._closeButtonElement.addEventListener('click', listener);
  }

  private _getPlacementClass(placement: PopupPlacement): string | null {
    switch (placement) {
      case 'top':
        return TOAST_CONSTANTS.classes.TOP;
      case 'top-start':
        return TOAST_CONSTANTS.classes.TOP_LEFT;
      case 'top-end':
        return TOAST_CONSTANTS.classes.TOP_RIGHT;
      case 'bottom':
        return TOAST_CONSTANTS.classes.BOTTOM;
      case 'bottom-start':
        return TOAST_CONSTANTS.classes.BOTTOM_LEFT;
      case 'bottom-end':
        return TOAST_CONSTANTS.classes.BOTTOM_RIGHT;
    }

    return null;
  }
}
