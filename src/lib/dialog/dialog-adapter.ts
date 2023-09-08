import { deepQuerySelectorAll, getActiveElement, getShadowElement, removeElement, toggleClass } from '@tylertech/forge-core';
import { BACKDROP_CONSTANTS, IBackdropComponent } from '../backdrop';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IDialogComponent } from './dialog';
import { DialogPositionType, DIALOG_CONSTANTS } from './dialog-constants';

export interface IDialogAdapter extends IBaseAdapter {
  initializeAccessibility(): void;
  setAnimating(animating: boolean): void;
  setVisibility(visible: boolean): void;
  attach(parent?: HTMLElement): void;
  detach(): void;
  setDocumentListener(type: string, listener: (evt: Event) => void): void;
  removeDocumentListener(type: string, listener: (evt: Event) => void): void;
  registerTransitionEndHandler: (handler: (evt: TransitionEvent) => void) => void;
  deregisterTransitionEndHandler: (handler: (evt: TransitionEvent) => void) => void;
  registerBackdropClickHandler: (handler: (evt: CustomEvent) => void) => void;
  deregisterBackdropClickHandler: (handler: (evt: CustomEvent) => void) => void;
  getOpenDialogs: (selector: string) => NodeListOf<HTMLElement>;
  setBodyAttribute: (name: string, value: string) => void;
  removeBodyAttribute: (name: string) => void;
  trySetInitialFocus: () => void;
  isScrollable(): boolean;
  addRootClass(name: string): void;
  setFullscreen(value: boolean): void;
  setMoveable(value: boolean): void;
  setMoveTarget(selector: string): boolean;
  setMoveTargetHandler(type: string, listener: (evt: MouseEvent) => void): void;
  removeDragTargetHandler(type: string, listener: (evt: MouseEvent) => void): void;
  getSurfaceBounds(): DOMRect;
  setSurfacePosition(x: string | null, y: string | null, positionType: DialogPositionType | null): void;
  captureActiveElement(): void;
  tryRestoreActiveElement(): void;
}

/**
 * Provides facilities for interacting with the internal DOM of `DialogComponent`.
 */
export class DialogAdapter extends BaseAdapter<IDialogComponent> implements IDialogAdapter {
  private _backdropElement?: IBackdropComponent;
  private _containerElement: HTMLElement;
  private _surfaceElement: HTMLElement;
  private _moveTargetElement: HTMLElement | null;
  private _activeElement: HTMLElement | undefined;

  constructor(component: IDialogComponent) {
    super(component);
    this._containerElement = getShadowElement(component, DIALOG_CONSTANTS.selectors.CONTAINER);
    this._surfaceElement = getShadowElement(component, DIALOG_CONSTANTS.selectors.SURFACE);
  }

  public initializeAccessibility(): void {
    if (!this._component.hasAttribute('role')) {
      this._component.setAttribute('role', 'dialog');
    }
    this._component.setAttribute('aria-modal', 'true');
  }

  public setAnimating(animating: boolean): void {
    toggleClass(this._containerElement, animating, DIALOG_CONSTANTS.classes.ANIMATING);
  }

  public setVisibility(visible: boolean): void {
    toggleClass(this._containerElement, visible, DIALOG_CONSTANTS.classes.OPEN);

    if (!this._backdropElement) {
      this._backdropElement = document.createElement('forge-backdrop');
      this._backdropElement.setAttribute('part', 'scrim');
      this._containerElement.appendChild(this._backdropElement);
    }
    
    if (visible) {
      this._backdropElement.fadeIn();
    } else {
      this._backdropElement.fadeOut();
    }
  }

  public attach(parent: HTMLElement = document.body): void {
    parent.appendChild(this._component);
  }

  public detach(): void {
    if (this._activeElement) {
      this._activeElement = undefined;
    }
    removeElement(this._component);
  }

  public registerTransitionEndHandler(handler: (evt: TransitionEvent) => void): void {
    this._surfaceElement.addEventListener('transitionend', handler);
  }

  public deregisterTransitionEndHandler(handler: (evt: TransitionEvent) => void): void {
    this._surfaceElement.removeEventListener('transitionend', handler);
  }

  public setDocumentListener(type: string, listener: (evt: Event) => void): void {
    document.addEventListener(type, listener);
  }

  public removeDocumentListener(type: string, listener: (evt: Event) => void): void {
    document.removeEventListener(type, listener);
  }

  public registerBackdropClickHandler(handler: (evt: CustomEvent) => void): void {
    this._backdropElement?.addEventListener(BACKDROP_CONSTANTS.events.BACKDROP_CLICK, handler);
  }

  public deregisterBackdropClickHandler(handler: (evt: CustomEvent) => void): void {
    this._backdropElement?.removeEventListener(BACKDROP_CONSTANTS.events.BACKDROP_CLICK, handler);
  }

  public getOpenDialogs(selector: string): NodeListOf<HTMLElement> {
    return document.querySelectorAll(selector);
  }

  public setBodyAttribute(name: string, value: string): void {
    document.body.setAttribute(name, value);
  }

  public removeBodyAttribute(name: string): void {
    document.body.removeAttribute(name);
  }

  public trySetInitialFocus(): void {
    const elements = deepQuerySelectorAll(this._component, DIALOG_CONSTANTS.selectors.INITIAL_FOCUS);
    if (elements && elements.length) {
      const initialElement = elements[elements.length - 1] as HTMLElement;
      initialElement.focus();
    }
  }

  public isScrollable(): boolean {
    const contentElement = this._component.querySelector(DIALOG_CONSTANTS.selectors.CONTENT) as HTMLElement;
    if (contentElement) {
      return contentElement.scrollHeight > contentElement.offsetHeight;
    }
    return false;
  }

  public addRootClass(name: string): void {
    this._component.classList.add(name);
  }

  public setFullscreen(value: boolean): void {
    toggleClass(this._containerElement, value, DIALOG_CONSTANTS.classes.FULLSCREEN);
  }

  public setMoveable(value: boolean): void {
    toggleClass(this._containerElement, value, DIALOG_CONSTANTS.classes.MOVEABLE);
  }

  public setMoveTarget(selector: string): boolean {
    if (!selector) {
      return false;
    }
    this._moveTargetElement = this._component.querySelector(selector);
    return !!this._moveTargetElement;
  }

  public setMoveTargetHandler(type: string, listener: (evt: MouseEvent) => void): void {
    this._moveTargetElement?.addEventListener(type, listener);
  }

  public removeDragTargetHandler(type: string, listener: (evt: MouseEvent) => void): void {
    this._moveTargetElement?.removeEventListener(type, listener);
  }

  public getSurfaceBounds(): DOMRect {
    return this._surfaceElement.getBoundingClientRect() as DOMRect;
  }

  public setSurfacePosition(x: string | null, y: string | null, positionType: DialogPositionType | null): void {
    if (positionType) {
      this._surfaceElement.style.position = positionType === 'absolute' ? positionType : 'relative';
    } else {
      this._surfaceElement.style.removeProperty('position');
    }

    if (y !== null) {
      this._surfaceElement.style.top = y;
    } else {
      this._surfaceElement.style.removeProperty('top');
    }

    if (x !== null) {
      this._surfaceElement.style.left = x;
    } else {
      this._surfaceElement.style.removeProperty('left');
    }
  }

  public captureActiveElement(): void {
    this._activeElement = getActiveElement(this._component.ownerDocument) as HTMLElement;
    this._activeElement?.blur();
  }

  public tryRestoreActiveElement(): void {
    if (this._activeElement) {
      if (this._activeElement.isConnected) {
        this._activeElement.focus();
      }
      this._activeElement = undefined;
    }
  }
}
