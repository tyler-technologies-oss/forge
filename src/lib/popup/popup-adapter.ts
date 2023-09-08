import { addClass, closestElement, emitEvent, getShadowElement, IPositionElementConfig, notChildEventListener, positionElementAsync, removeClass, removeElement, deepQuerySelectorAll, getActiveElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IPopupComponent } from './popup';
import { IPopupPositionEventData, POPUP_CONSTANTS, PopupPlacement } from './popup-constants';

export interface IPopupAdapter extends IBaseAdapter {
  setAttribute(attribute: string, value: string, element?: HTMLElement): void;
  removeAttribute(attribute: string, element?: HTMLElement): void;
  positionPopup(): void;
  addPopup(targetElement: HTMLElement, manageFocus: boolean): void;
  removePopup(manageFocus: boolean): void;
  manageWindowEvents(add: boolean): void;
  dispatchEvent(type: string, data?: any, bubbles?: boolean, cancellable?: boolean): boolean;
  addClass(classes: string | string[]): void;
  removeClass(classes: string | string[]): void;
  setAnimationEndListener(listener: (evt: TransitionEvent) => void, classes?: string | string[]): void;
  removeEventListener(type: string, listener: (evt: Event) => void): void;
  setBlurListener(listener: () => void): () => void;
  trySetInitialFocus(): void;
}

export class PopupAdapter extends BaseAdapter<IPopupComponent> implements IPopupAdapter {
  private _windowEventCallback?: (evt: Event) => void;
  private _previouslyFocusedElement?: HTMLElement;
  private _hostElement?: HTMLElement;
  private _rootElement: HTMLElement;

  constructor(component: IPopupComponent) {
    super(component);
    this._rootElement = getShadowElement(component, POPUP_CONSTANTS.selectors.CONTAINER);
  }

  public setAttribute(attribute: string, value: string, element?: HTMLElement): void {
    if (element) {
      element.setAttribute(attribute, value);
    } else {
      this._component.setAttribute(attribute, value);
    }
  }

  public removeAttribute(attribute: string, element?: HTMLElement): void {
    if (element) {
      element.removeAttribute(attribute);
    } else {
      this._component.removeAttribute(attribute);
    }
  }

  public async positionPopup(): Promise<void> {
    const config: IPositionElementConfig = {
      element: this._component,
      targetElement: this._component.targetElement,
      placement: this._component.placement,
      hide: this._component.hideWhenClipped,
      flipOptions: {
        fallbackPlacements: ['top-start', 'top', 'top-end', 'left-start', 'left', 'left-end', 'right-start', 'right', 'right-end'],
        fallbackStrategy: 'initialPlacement'
      }
    };

    const fallbackPlacements: PopupPlacement[] = this._component.fallbackPlacements;
    if (fallbackPlacements?.length) {
      config.flipOptions = { ...config.flipOptions, fallbackPlacements };
    }

    if (this._component.offset) {
      config.offset = this._component.offset;
    }
    const data: IPopupPositionEventData = await positionElementAsync(config);
    emitEvent(this._component, POPUP_CONSTANTS.events.POSITION, data);
  }

  public addPopup(targetElement: HTMLElement, manageFocus: boolean): void {
    this._component.setAttribute('tabindex', '-1');
    this._component.setAttribute(POPUP_CONSTANTS.attributes.HOST, '');

    // Set initial position to top-left of the host element while we wait for positioning.
    // This ensures that the element is not visible, nor does it affect layouts before it
    // is properly moved into its expected location.
    this._component.style.top = '0';
    this._component.style.left = '0';

    const hostDocument = targetElement.ownerDocument || document;
    this._hostElement = (closestElement(POPUP_CONSTANTS.selectors.HOST, targetElement) as HTMLElement) || hostDocument.body;
    this._hostElement.appendChild(this._component);
    this.positionPopup();

    if (manageFocus) {
      this._previouslyFocusedElement = getActiveElement(this._component.ownerDocument) as HTMLElement;
      this._component.focus();
    }
  }

  public removePopup(manageFocus: boolean): void {
    removeElement(this._component);

    if (manageFocus) {
      window.requestAnimationFrame(() => {
        if (this._previouslyFocusedElement) {
          const activeElement = getActiveElement(this._component.ownerDocument);
          if (!activeElement || activeElement === document.body) {
            this._previouslyFocusedElement.focus();
          }
          this._previouslyFocusedElement = undefined;
        }
      });
    }

    this._hostElement = undefined;
  }

  public manageWindowEvents(add = false): void {
    if (add) {
      this._windowEventCallback = evt => this._windowInteraction(evt);
      window.addEventListener('scroll', this._windowEventCallback, true);
      window.addEventListener('resize', this._windowEventCallback, true);
    } else {
      if (this._windowEventCallback) {
        window.removeEventListener('scroll', this._windowEventCallback, true);
        window.removeEventListener('resize', this._windowEventCallback, true);
        this._windowEventCallback = undefined;
      }
    }
  }

  public dispatchEvent(type: string, data?: any, bubbles?: boolean, cancelable?: boolean): boolean {
    if (this._component.targetElement) {
      return !emitEvent(this._component.targetElement, type, data, bubbles, cancelable);
    }
    return false;
  }

  public addClass(classes: string | string[]): void {
    addClass(classes, this._rootElement);
  }

  public removeClass(classes: string | string[]): void {
    removeClass(classes, this._rootElement);
  }

  public setAnimationEndListener(listener: (evt: TransitionEvent) => void, classes?: string | string[]): void {
    window.requestAnimationFrame(() => {
      if (classes && classes.length) {
        addClass(classes, this._rootElement);
      }
      this._rootElement.addEventListener('transitionend', listener);
    });
  }

  public removeEventListener(type: string, listener: (evt: Event) => void): void {
    this._rootElement.removeEventListener(type, listener);
  }

  public setBlurListener(listener: () => void): () => void {
    return notChildEventListener(this._component, activeElement => {
      if (!this._component.contains(activeElement)) {
        listener();
      }
      }, true );
  }

  public trySetInitialFocus(): void {
    window.requestAnimationFrame(() => {
      const elements = deepQuerySelectorAll(this._component, POPUP_CONSTANTS.selectors.INITIAL_FOCUS);
      if (elements && elements.length) {
        const initialElement = elements[elements.length - 1] as HTMLElement;
        initialElement.focus();
      }
    });
  }

  private _windowInteraction(evt: Event): void {
    if (!this._component.open) {
      return;
    }

    switch (evt.type) {
      case 'scroll':
      case 'resize':
        this.positionPopup();
        break;
      default:
        break;
    }
  }
}
