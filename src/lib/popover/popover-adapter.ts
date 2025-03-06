import { getShadowElement } from '@tylertech/forge-core';
import { prefersReducedMotion } from '../core/utils/feature-detection';
import { VirtualElement } from '../core/utils/position-utils';
import { checkVisibility, frame } from '../core/utils/utils';
import { IOverlayComponent, OVERLAY_CONSTANTS } from '../overlay';
import { IOverlayAwareAdapter, OverlayAwareAdapter } from '../overlay/base/overlay-aware-adapter';
import { IPopoverComponent } from './popover';
import { POPOVER_CONSTANTS } from './popover-constants';

export interface IPopoverAdapter extends IOverlayAwareAdapter<IPopoverComponent> {
  readonly hostElement: IPopoverComponent;
  destroy(): void;
  initializeAnchorElement(): void;
  cleanupAnchorElement(): void;
  tryLocateAnchorElement(id: string | null): void;
  addAnchorListener(type: string, listener: EventListener): void;
  removeAnchorListener(type: string, listener: EventListener): void;
  addSurfaceListener(type: string, listener: EventListener): void;
  removeSurfaceListener(type: string, listener: EventListener): void;
  hide(): Promise<void>;
  setOverlayOpen(newState: boolean): void;
  toggleArrow(value: boolean): void;
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

  public destroy(): void {
    this._surfaceElement.classList.remove(POPOVER_CONSTANTS.classes.EXITING);
    this.cleanupAnchorElement();
  }

  protected _initializeOverlayElement(): void {
    this._overlayElement = getShadowElement(this._component, OVERLAY_CONSTANTS.elementName) as IOverlayComponent;
  }

  public tryLocateAnchorElement(id: string | null): void {
    this._overlayElement.anchorElement = this._tryFindAnchorElement(id);
    this._updateAnchorExpandedState(this._overlayElement.open);
  }

  public initializeAnchorElement(): void {
    this._updateAnchorExpandedState(this._overlayElement.open);
  }

  public cleanupAnchorElement(): void {
    this._updateAnchorExpandedState(null);
  }

  public addAnchorListener(type: string, listener: EventListener): void {
    if (this._overlayElement.anchorElement instanceof VirtualElement) {
      return;
    }
    this._overlayElement.anchorElement?.addEventListener(type, listener);
  }

  public removeAnchorListener(type: string, listener: EventListener): void {
    if (this._overlayElement.anchorElement instanceof VirtualElement) {
      return;
    }
    this._overlayElement.anchorElement?.removeEventListener(type, listener);
  }

  public addSurfaceListener(type: string, listener: EventListener): void {
    this._surfaceElement.addEventListener(type, listener);
  }

  public removeSurfaceListener(type: string, listener: EventListener): void {
    this._surfaceElement.removeEventListener(type, listener);
  }

  public setOverlayOpen(newState: boolean): void {
    this._surfaceElement.classList.remove(POPOVER_CONSTANTS.classes.EXITING);
    this._overlayElement.open = newState;
    this._updateAnchorExpandedState(newState);
  }

  public async hide(): Promise<void> {
    if (prefersReducedMotion()) {
      this._surfaceElement.classList.remove(POPOVER_CONSTANTS.classes.EXITING);
      this._overlayElement.open = false;
      this._updateAnchorExpandedState(false);
      return Promise.resolve();
    }

    await frame();

    if (!checkVisibility(this._surfaceElement)) {
      this._overlayElement.open = false;
      this._updateAnchorExpandedState(false);
      return Promise.resolve();
    }

    return new Promise(resolve => {
      this._surfaceElement.addEventListener(
        'animationend',
        () => {
          this._surfaceElement.classList.remove(POPOVER_CONSTANTS.classes.EXITING);
          this._overlayElement.open = false;
          this._updateAnchorExpandedState(false);
          resolve();
        },
        { once: true }
      );
      this._surfaceElement.classList.add(POPOVER_CONSTANTS.classes.EXITING);
    });
  }

  public toggleArrow(value: boolean): void {
    if (value) {
      if (!this._arrowElement) {
        this._arrowElement = document.createElement('div');
        this._arrowElement.classList.add(POPOVER_CONSTANTS.classes.ARROW);
        this._arrowElement.setAttribute('part', POPOVER_CONSTANTS.parts.ARROW);
      }
      this._surfaceElement.appendChild(this._arrowElement);
      this._overlayElement.arrowElement = this._arrowElement;
    } else {
      this._arrowElement?.remove();
      this._arrowElement = undefined;
      this._overlayElement.arrowElement = undefined;
    }
  }

  public isChildElement(element: HTMLElement): boolean {
    return this._component.contains(element);
  }

  public tryAutofocus(): void {
    const tryFocus = (): boolean => {
      if (this._component.open && this._overlayElement.isConnected && !this._component.matches(':focus-within')) {
        const autofocusElement = this._component.querySelector<HTMLElement>('[autofocus]');
        if (autofocusElement) {
          autofocusElement.focus();
          return true;
        }
      }
      return false;
    };

    if (tryFocus()) {
      return;
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        tryFocus();
      });
    });
  }

  public hasFocus(): boolean {
    return this._component.matches(':focus-within');
  }

  public captureFocusedElement(): HTMLElement | null {
    return this._component.ownerDocument.activeElement as HTMLElement | null;
  }

  /**
   * Attempts to find the anchor element by first checking for an element with the provided id, and if not found,
   * then implicitly assumes the previous element sibling is the anchor.
   *
   * @param [id] - The id of the anchor element to locate.
   * @returns The anchor element if found, otherwise null.
   */
  private _tryFindAnchorElement(id?: string | null): HTMLElement | null {
    if (id) {
      // First we attempt to locate the target element based on the id reference provided
      const rootNode = this._component.getRootNode() as Document | ShadowRoot;
      const targetEl = rootNode.querySelector<HTMLElement>(`#${id}`);
      if (targetEl) {
        return targetEl;
      }
    }

    // If still not found, we'll implicitly assume the previous element sibling is our anchor
    if (this._component.previousElementSibling) {
      return this._component.previousElementSibling as HTMLElement;
    }

    return null;
  }

  private _updateAnchorExpandedState(state: boolean | null): void {
    if (!this._overlayElement.anchorElement) {
      return;
    }

    if (!(this._overlayElement.anchorElement instanceof VirtualElement) && !(this.overlayElement.anchorElement as HTMLElement)?.hasAttribute('aria-hidden')) {
      this._overlayElement.anchorElement.setAttribute('aria-expanded', String(!!state));
    }
  }
}
