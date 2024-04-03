import { getShadowElement, removeElement, deepQuerySelectorAll, toggleClass } from '@tylertech/forge-core';
import { BACKDROP_CONSTANTS, IBackdropComponent } from '../backdrop';
import { CHECKBOX_CONSTANTS } from '../checkbox';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { ICON_BUTTON_CONSTANTS } from '../icon-button';
import { RADIO_CONSTANTS } from '../radio';
import { SWITCH_CONSTANTS } from '../switch';
import { IBottomSheetComponent } from './bottom-sheet';
import { BOTTOM_SHEET_CONSTANTS } from './bottom-sheet-constants';

export interface IBottomSheetAdapter extends IBaseAdapter {
  initializeAccessibility(): void;
  setVisibility(visible: boolean): void;
  attach(): void;
  detach(): void;
  registerTransitionEndHandler: (handler: (evt: TransitionEvent) => void) => void;
  deregisterTransitionEndHandler: (handler: (evt: TransitionEvent) => void) => void;
  setBodyListener(type: string, listener: (evt: Event) => void, options?: AddEventListenerOptions): void;
  removeBodyListener(type: string, listener: (evt: Event) => void): void;
  setDocumentListener(type: string, listener: (evt: Event) => void): void;
  removeDocumentListener(type: string, listener: (evt: Event) => void): void;
  registerBackdropClickHandler: (handler: (evt: CustomEvent) => void) => void;
  deregisterBackdropClickHandler: (handler: (evt: CustomEvent) => void) => void;
  getOpenBottomSheets: (selector: string) => NodeListOf<HTMLElement>;
  trySetInitialFocus: () => void;
  isScrollable(): boolean;
  isContentChild(el: HTMLElement): boolean;
  initScrollable(): void;
  setDragging(isDragging: boolean): void;
  setBackdropVisibility(value: boolean): void;
  setFullscreen(value: boolean): void;
  tryLayoutChildren(): void;
  setContainerHeight(height: number | null): void;
  getContainerBounds(): DOMRect;
  setDragTargetHandler(type: string, listener: (evt: MouseEvent) => void): void;
  removeDragTargetHandler(type: string, listener: (evt: MouseEvent) => void): void;
  setBodyScrollHandler(listener: (evt: Event) => void): void;
}

/**
 * Provides facilities for interacting with the internal DOM of `BottomSheetComponent`.
 */
export class BottomSheetAdapter extends BaseAdapter<IBottomSheetComponent> implements IBottomSheetAdapter {
  private _backdropElement: IBackdropComponent;
  private _containerElement: HTMLElement;

  constructor(component: IBottomSheetComponent) {
    super(component);
    this._backdropElement = getShadowElement(component, BOTTOM_SHEET_CONSTANTS.selectors.BACKDROP) as IBackdropComponent;
    this._containerElement = getShadowElement(component, BOTTOM_SHEET_CONSTANTS.selectors.CONTAINER);
  }

  public initializeAccessibility(): void {
    if (!this._component.hasAttribute('role')) {
      this._component.setAttribute('role', 'dialog');
      this._component.setAttribute('aria-modal', 'true');
    }
  }

  public setVisibility(visible: boolean): void {
    this.setBackdropVisibility(visible);
    toggleClass(this._containerElement, visible, BOTTOM_SHEET_CONSTANTS.classes.OPEN);
  }

  public attach(): void {
    const hostElement = document.querySelector(BOTTOM_SHEET_CONSTANTS.selectors.HOST) || document.body;
    hostElement.appendChild(this._component);
  }

  public detach(): void {
    removeElement(this._component);
  }

  public registerTransitionEndHandler(handler: (evt: TransitionEvent) => void): void {
    this._containerElement.addEventListener('transitionend', handler);
  }

  public deregisterTransitionEndHandler(handler: (evt: TransitionEvent) => void): void {
    this._containerElement.removeEventListener('transitionend', handler);
  }

  public setBodyListener(type: string, listener: (evt: Event) => void, options?: AddEventListenerOptions): void {
    document.body.addEventListener(type, listener, options);
  }

  public removeBodyListener(type: string, listener: (evt: Event) => void): void {
    document.body.removeEventListener(type, listener);
  }

  public setDocumentListener(type: string, listener: (evt: Event) => void): void {
    document.addEventListener(type, listener);
  }

  public removeDocumentListener(type: string, listener: (evt: Event) => void): void {
    document.removeEventListener(type, listener);
  }

  public registerBackdropClickHandler(handler: (evt: CustomEvent) => void): void {
    this._backdropElement.addEventListener('click', handler);
  }

  public deregisterBackdropClickHandler(handler: (evt: CustomEvent) => void): void {
    this._backdropElement.removeEventListener('click', handler);
  }

  public getOpenBottomSheets(selector: string): NodeListOf<HTMLElement> {
    return document.querySelectorAll(selector);
  }

  public trySetInitialFocus(): void {
    const elements = deepQuerySelectorAll(this._component, BOTTOM_SHEET_CONSTANTS.selectors.INITIAL_FOCUS);
    if (elements && elements.length) {
      const initialElement = elements[elements.length - 1] as HTMLElement;
      initialElement.focus();
    }
  }

  public isScrollable(): boolean {
    const contentElement = this._getContentElement();
    return contentElement ? contentElement.scrollHeight > contentElement.offsetHeight : false;
  }

  public isContentChild(el: HTMLElement): boolean {
    const contentElement = this._getContentElement();
    return contentElement ? contentElement.contains(el) : false;
  }

  public initScrollable(): void {
    const isScrollable = this.isScrollable();
    toggleClass(this._component, isScrollable, BOTTOM_SHEET_CONSTANTS.classes.SCROLLABLE);
    toggleClass(this._containerElement, isScrollable, BOTTOM_SHEET_CONSTANTS.classes.SCROLLABLE);
  }

  public setDragging(isDragging: boolean): void {
    toggleClass(this._containerElement, isDragging, BOTTOM_SHEET_CONSTANTS.classes.DRAGGING);
    toggleClass(this._component, isDragging, BOTTOM_SHEET_CONSTANTS.classes.DRAGGING);
  }

  public setBackdropVisibility(value: boolean): void {
    window.requestAnimationFrame(() => {
      if (this._component.open) {
        this._backdropElement.fadeIn();
      } else {
        this._backdropElement.fadeOut();
      }
    });
  }

  public setFullscreen(value: boolean): void {
    toggleClass(this._containerElement, value, BOTTOM_SHEET_CONSTANTS.classes.FULLSCREEN);
  }

  public tryLayoutChildren(): void {
    const layoutChildren = [ICON_BUTTON_CONSTANTS.elementName, SWITCH_CONSTANTS.elementName, CHECKBOX_CONSTANTS.elementName, RADIO_CONSTANTS.elementName];
    const commonLayoutElements = Array.from(this._component.querySelectorAll(layoutChildren.join(','))) as any[];
    commonLayoutElements.filter(el => typeof el.layout === 'function').forEach(el => el.layout());
  }

  public setContainerHeight(height: number | null): void {
    if (height != null) {
      const percent = Math.min(100, 100 * height / window.innerHeight);
      this._containerElement.style.maxHeight = `${percent}%`;
    } else {
      this._containerElement.style.removeProperty('max-height');
    }
  }

  public getContainerBounds(): DOMRect {
    return this._containerElement.getBoundingClientRect() as DOMRect;
  }

  public setDragTargetHandler(type: string, listener: (evt: MouseEvent) => void): void {
    this._containerElement.addEventListener(type, listener);
  }

  public removeDragTargetHandler(type: string, listener: (evt: MouseEvent) => void): void {
    this._containerElement.removeEventListener(type, listener);
  }

  public setBodyScrollHandler(listener: (evt: MouseEvent) => void): void {
    const contentElement = this._getContentElement();
    if (contentElement) {
      contentElement.addEventListener('scroll', listener);
    }
  }

  private _getContentElement(): HTMLElement | null {
    const contentElements = Array.from(deepQuerySelectorAll(this._component, BOTTOM_SHEET_CONSTANTS.selectors.CONTENT_BODY, false)) as HTMLElement[];
    return contentElements.length ? contentElements[0] : null;
  }
}
