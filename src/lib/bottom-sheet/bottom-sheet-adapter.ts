import { getShadowElement, removeElement, deepQuerySelectorAll, toggleClass } from '@tylertech/forge-core';
import { setDefaultAria } from '../constants';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import type { IDialogComponent } from '../dialog/dialog';
import { IBottomSheetComponent } from './bottom-sheet';
import { BOTTOM_SHEET_CONSTANTS } from './bottom-sheet-constants';

export interface IBottomSheetAdapter extends IBaseAdapter {
  initialize(): void;
  setDialogProperty<K extends keyof IDialogComponent>(property: K, value: IDialogComponent[K]): void;
  addDialogListener(type: string, listener: EventListener): void;
  removeDialogListener(type: string, listener: EventListener): void;
  open(): void;
  close(): void;
  trySetInitialFocus: () => void;
  isScrollable(): boolean;
  isContentChild(el: HTMLElement): boolean;
  setDragging(isDragging: boolean): void;
  setFullscreen(value: boolean): void;
  isFullscreen(): boolean;
  setContainerHeight(height: number | null): void;
  getContainerBounds(): DOMRect;
  setDragTargetHandler(type: string, listener: EventListener): void;
  removeDragTargetHandler(type: string, listener: EventListener): void;
  setBodyScrollHandler(listener: (evt: Event) => void): void;
  setBodyListener(type: string, listener: EventListener, options?: AddEventListenerOptions): void;
  removeBodyListener(type: string, listener: EventListener): void;
}

export class BottomSheetAdapter extends BaseAdapter<IBottomSheetComponent> implements IBottomSheetAdapter {
  private _dialogElement: IDialogComponent;
  private _surfaceElement: HTMLElement;

  constructor(component: IBottomSheetComponent) {
    super(component);
    this._dialogElement = getShadowElement(component, BOTTOM_SHEET_CONSTANTS.selectors.DIALOG) as IDialogComponent;
    this._surfaceElement = getShadowElement(component, BOTTOM_SHEET_CONSTANTS.selectors.SURFACE);
  }

  public setDialogProperty<K extends keyof IDialogComponent>(property: K, value: IDialogComponent[K]): void {
    this._dialogElement[property] = value;
  }

  public addDialogListener(type: string, listener: EventListener): void {
    this._dialogElement.addEventListener(type, listener);
  }

  public removeDialogListener(type: string, listener: EventListener): void {
    this._dialogElement.removeEventListener(type, listener);
  }

  public initialize(): void {
    this._component[setDefaultAria](
      {
        role: 'dialog',
        ariaModal: this._component.mode === 'modal' || this._component.mode === 'inline-modal' ? 'true' : 'false'
      },
      { setAttribute: true }
    );
  }

  public open(): void {
    this._dialogElement.mode = this._component.mode;
    this._dialogElement.open = true;
  }

  public close(): void {
    this._dialogElement.open = false;
  }

  public trySetInitialFocus(): void {
    window.requestAnimationFrame(() => {
      if (this._component.open && this._component.isConnected) {
        const element = this._component.querySelector(BOTTOM_SHEET_CONSTANTS.selectors.INITIAL_FOCUS) as HTMLElement;
        element?.focus();
      }
    });
  }

  public isScrollable(): boolean {
    const contentElement = this._getContentElement();
    return contentElement ? contentElement.scrollHeight > contentElement.offsetHeight : false;
  }

  public isContentChild(el: HTMLElement): boolean {
    const contentElement = this._getContentElement();
    return contentElement?.contains(el) ?? false;
  }

  public setDragging(isDragging: boolean): void {
    this._dialogElement.classList.toggle(BOTTOM_SHEET_CONSTANTS.classes.DRAGGING, isDragging);
  }

  public setFullscreen(value: boolean): void {
    this._dialogElement.classList.toggle(BOTTOM_SHEET_CONSTANTS.classes.FULLSCREEN, value);
  }

  public isFullscreen(): boolean {
    return this._dialogElement.classList.contains(BOTTOM_SHEET_CONSTANTS.classes.FULLSCREEN);
  }

  public setContainerHeight(height: number | null): void {
    if (height != null) {
      const percent = Math.min(100, (100 * height) / window.innerHeight);
      this._dialogElement.style.setProperty('--forge-dialog-max-height', `${percent}%`);
    } else {
      this._dialogElement.style.removeProperty('--forge-dialog-max-height');
    }
  }

  public getContainerBounds(): DOMRect {
    return this._surfaceElement.getBoundingClientRect() as DOMRect;
  }

  public setDragTargetHandler(type: string, listener: EventListener): void {
    this._surfaceElement.addEventListener(type, listener);
  }

  public removeDragTargetHandler(type: string, listener: EventListener): void {
    this._surfaceElement.removeEventListener(type, listener);
  }

  public setBodyScrollHandler(listener: EventListener): void {
    const contentElement = this._getContentElement();
    contentElement?.addEventListener('scroll', listener);
  }

  private _getContentElement(): HTMLElement | null {
    const contentElements = Array.from(deepQuerySelectorAll(this._component, BOTTOM_SHEET_CONSTANTS.selectors.CONTENT_BODY, false)) as HTMLElement[];
    return contentElements[0] ?? null;
  }

  public setBodyListener(type: string, listener: EventListener, options?: AddEventListenerOptions): void {
    document.body.addEventListener(type, listener, options);
  }

  public removeBodyListener(type: string, listener: EventListener): void {
    document.body.removeEventListener(type, listener);
  }
}
