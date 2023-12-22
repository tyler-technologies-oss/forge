import { getShadowElement } from '@tylertech/forge-core';
import { IOverlayComponent, OVERLAY_CONSTANTS } from '../overlay';
import { IOverlayAwareAdapter, OverlayAwareAdapter } from '../overlay/base/overlay-aware-adapter';
import { IPopoverComponent } from './popover';
import { POPOVER_CONSTANTS } from './popover-constants';

export interface IPopoverAdapter extends IOverlayAwareAdapter {
  initializeTargetElement(): void;
  addTargetListener(type: string, listener: EventListener): void;
  removeTargetListener(type: string, listener: EventListener): void;
  addSurfaceListener(type: string, listener: EventListener): void;
  removeSurfaceListener(type: string, listener: EventListener): void;
  setOverlayOpen(newState: boolean): void;
  toggleArrow(value: boolean): void;
  position(): void;
  isChildElement(element: HTMLElement): boolean;
  tryAutofocus(): void;
  hasFocus(): boolean;
  captureFocusedElement(): HTMLElement | null;
}

export class PopoverAdapter extends OverlayAwareAdapter<IPopoverComponent> implements IPopoverAdapter {
  private _surfaceElement: HTMLElement;
  private _arrowElement: HTMLElement | undefined;

  constructor(component: IPopoverComponent) {
    super(component);
    this._surfaceElement = getShadowElement(this._component, POPOVER_CONSTANTS.selectors.SURFACE);
  }
  
  protected _initializeOverlayElement(): void {
    this._overlayElement = getShadowElement(this._component, OVERLAY_CONSTANTS.elementName) as IOverlayComponent;
  }

  public initializeTargetElement(): void {
    if (this._component.anchorElement) {
      this._overlayElement.anchorElement = this._component.anchorElement;
    } else {
      const targetEl = this._getTargetElement(this._component.anchor);
      if (targetEl) {
        this._overlayElement.anchorElement = targetEl;
      }
    }
  }

  public addTargetListener(type: string, listener: EventListener): void {
    this._overlayElement.anchorElement?.addEventListener(type, listener);
  }

  public removeTargetListener(type: string, listener: EventListener): void {
    this._overlayElement.anchorElement?.removeEventListener(type, listener);
  }

  public addSurfaceListener(type: string, listener: EventListener): void {
    this._surfaceElement.addEventListener(type, listener);
  }

  public removeSurfaceListener(type: string, listener: EventListener): void {
    this._surfaceElement.removeEventListener(type, listener);
  }

  public setOverlayOpen(newState: boolean): void {
    this._overlayElement.arrowElement = this._arrowElement;
    this._overlayElement.open = newState;
    if (this._arrowElement) {
      this._overlayElement.arrowElementOffset = Math.sqrt(2 * this._arrowElement.offsetWidth ** 2) / 2;
    }
  }

  public toggleArrow(value: boolean): void {
    if (value) {
      if (!this._arrowElement) {
        this._arrowElement = document.createElement('div');
        this._arrowElement.classList.add(POPOVER_CONSTANTS.classes.ARROW);
        this._arrowElement.setAttribute('part', POPOVER_CONSTANTS.parts.ARROW);
      }
      this._surfaceElement.appendChild(this._arrowElement);
    } else {
      this._arrowElement?.remove();
      this._arrowElement = undefined;
    }
  }

  public position(): void {
    this._overlayElement.position();
  }

  public isChildElement(element: HTMLElement): boolean {
    return this._component.contains(element);
  }

  public tryAutofocus(): void {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (this._component.open && this._overlayElement.isConnected && !this._component.matches(':focus-within')) {
          const autofocusElement = this._component.querySelector<HTMLElement>('[autofocus]');
          if (autofocusElement) {
            autofocusElement.focus();
          }
        }
      });
    });
  }

  public hasFocus(): boolean {
    return this._component.matches(':focus-within');
  }

  public captureFocusedElement(): HTMLElement | null {
    return this._component.ownerDocument.activeElement as HTMLElement | null;
  }

  private _getTargetElement(id?: string | null): HTMLElement {
    if (id) {
      // First we attempt to locate the target element based on the id reference provided
      const rootNode = this._component.getRootNode() as Document | ShadowRoot;
      const targetEl = rootNode.querySelector<HTMLElement>(`#${id}`);
      if (targetEl) {
        return targetEl;
      }
    }

    // If still not found, try to use the previous element sibling first
    if (this._component.previousElementSibling) {
      return this._component.previousElementSibling as HTMLElement;
    }
    
    // Finally, if nothing else, we default to the parent element
    return this._component.parentElement as HTMLElement;
  }
}
