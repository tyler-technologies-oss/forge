import { getShadowElement, randomChars } from '@tylertech/forge-core';
import { setDefaultAria } from '../constants';
import { locateElementById } from '../core/utils/utils';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IOverlayComponent, OVERLAY_CONSTANTS } from '../overlay';
import { ITooltipComponent } from './tooltip';
import { TOOLTIP_CONSTANTS } from './tooltip-constants';

export interface ITooltipAdapter extends IBaseAdapter {
  readonly anchorElement: HTMLElement | null;
  syncAria(): void;
  setAnchorElement(element: HTMLElement | null): void;
  tryLocateAnchorElement(id: string): void;
  addAnchorListener(type: string, listener: EventListener, opts?: AddEventListenerOptions): void;
  removeAnchorListener(type: string, listener: EventListener): void;
  addLightDismissListener(listener: EventListener): void;
  removeLightDismissListener(listener: EventListener): void;
  show(): void;
  hide(): void;
}

export class TooltipAdapter extends BaseAdapter<ITooltipComponent> implements ITooltipAdapter {
  private _contentElement: HTMLElement;
  private _arrowElement: HTMLElement;
  private _anchorElement: HTMLElement | null = null;
  private _overlayElement: IOverlayComponent | null = null;

  constructor(component: ITooltipComponent) {
    super(component);
    this._contentElement = getShadowElement(this._component, TOOLTIP_CONSTANTS.selectors.CONTENT);
    this._arrowElement = getShadowElement(this._component, TOOLTIP_CONSTANTS.selectors.ARROW);
  }

  public get anchorElement(): HTMLElement | null {
    return this._anchorElement;
  }

  public syncAria(): void {
    const role = this._component.type === 'description' ? 'tooltip' : null;
    this._component[setDefaultAria]({ role });
    this._component[setDefaultAria]({ ariaHidden: 'true' }, { setAttribute: !this._component.hasAttribute('aria-hidden') });

    if (this._anchorElement) {
      if (this._component.type === 'label' && this._anchorElement.hasAttribute('aria-labelledby')) {
        return;
      }
      if (this._component.type === 'description' && this._anchorElement.hasAttribute('aria-describedby')) {
        return;
      }

      if (!this._component.hasAttribute('id') && this._component.type !== 'presentation') {
        this._component.id = `forge-tooltip-${randomChars()}`;
      }

      switch (this._component.type) {
        case 'description':
          this._anchorElement.setAttribute('aria-describedby', this._component.id);
          break;
        case 'label':
          this._anchorElement.setAttribute('aria-labelledby', this._component.id);
          break;
      }
    }
  }

  public setAnchorElement(element: HTMLElement | null): void {
    this._anchorElement = element;
  }

  public tryLocateAnchorElement(id: string): void {
    this._anchorElement = this._tryFindAnchorElement(id);
  }

  public addAnchorListener(type: string, listener: EventListener, opts?: AddEventListenerOptions): void {
    this._anchorElement?.addEventListener(type, listener, opts);
  }

  public removeAnchorListener(type: string, listener: EventListener): void {
    this._anchorElement?.removeEventListener(type, listener);
  }

  public addLightDismissListener(listener: EventListener): void {
    this._overlayElement?.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, listener);
  }

  public removeLightDismissListener(listener: EventListener): void {
    this._overlayElement?.removeEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, listener);
  }

  public show(): void {
    // Tooltips are shown above all content via <forge-overlay>
    // We do this by dynamically creating an overlay element and appending it to the shadow root
    // then we move the tooltip content into the overlay element so that it can be presented.
    if (!this._overlayElement) {
      this._overlayElement = document.createElement(OVERLAY_CONSTANTS.elementName);
      this._overlayElement.setAttribute('part', 'root:overlay');
    }

    this._overlayElement.placement = this._component.placement;
    this._overlayElement.anchorElement = this._anchorElement;
    this._overlayElement.arrowElement = this._arrowElement;
    this._overlayElement.offset = { mainAxis: this._component.offset };
    this._overlayElement.flip = this._component.flip;

    if (this._component.fallbackPlacements) {
      this._overlayElement.fallbackPlacements = this._component.fallbackPlacements;
    }

    if (this._component.boundaryElement) {
      this._overlayElement.boundaryElement = this._component.boundaryElement;
    } else if (this._component.boundary) {
      const boundaryEl = locateElementById(this._component, this._component.boundary);
      this._overlayElement.boundaryElement = boundaryEl;
    } else {
      this._overlayElement.boundaryElement = null;
    }

    this._component.shadowRoot?.appendChild(this._overlayElement);
    this._overlayElement.appendChild(this._contentElement);

    this._overlayElement.open = true;
  }

  public hide(): void {
    // Move the tooltip content back into the component, and remove the overlay element to hide the tooltip visually
    // Tooltips are still accessible when hidden, so we don't need to do anything else.
    if (this._overlayElement) {
      this._overlayElement.open = false;
    }
    this._component.shadowRoot?.appendChild(this._contentElement);
    this._overlayElement?.remove();
  }

  /**
   * Attempts to find an element with the given id. If no element is found, the previous sibling or parent element is returned.
   * 
   * For backwards compatibility we allow for `id` to be a selector string, so that is evaluated if no element is found for the id.
   */
  private _tryFindAnchorElement(id: string): HTMLElement | null {
    if (id) {
      const rootNode = this._component.getRootNode() as Document | ShadowRoot;
      const targetEl = rootNode.getElementById(id) ?? rootNode.querySelector<HTMLElement>(id);
      if (targetEl) {
        return targetEl;
      }
    }
    return (this._component.previousElementSibling ?? this._component.parentElement) as HTMLElement;
  }
}
