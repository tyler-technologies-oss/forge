import { autoUpdate, Boundary } from '@floating-ui/dom';
import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { DEFAULT_FALLBACK_PLACEMENTS, positionElementAsync, PositionPlacement, VirtualElement } from '../core/utils/position-utils';
import { locateElementById } from '../core/utils/utils';
import { IOverlayComponent, OverlayComponent } from './overlay';
import {
  IOverlayOffset,
  OverlayFlipState,
  OverlayHideState,
  OverlayLightDismissReason,
  OverlayPositionStrategy,
  overlayStack,
  OVERLAY_CONSTANTS,
  OVERLAY_FALLBACK_PLACEMENT_MAP,
  SUPPORTS_POPOVER
} from './overlay-constants';

export interface IOverlayAdapter extends IBaseAdapter {
  show(): void;
  hide(): void;
  tryHideDescendantOverlays(): void;
  locateAnchorElement(id: string | null): HTMLElement | null;
  isMostRecentOpenOverlay(): boolean;
  positionElement(config: IPositionElementConfig): void;
  tryCleanupAutoUpdate(): void;
  addLightDismissListener(listener: (reason: OverlayLightDismissReason) => void): void;
  removeLightDismissListener(): void;
}

export interface IPositionElementConfig {
  anchorElement: HTMLElement | VirtualElement;
  strategy: OverlayPositionStrategy;
  placement: PositionPlacement;
  hide: OverlayHideState;
  offset: IOverlayOffset;
  shift: boolean;
  flip: OverlayFlipState;
  boundary: string | null;
  boundaryElement: HTMLElement | null;
  fallbackPlacements: PositionPlacement[] | undefined;
}

export class OverlayAdapter extends BaseAdapter<IOverlayComponent> implements IOverlayAdapter {
  private _rootElement: HTMLElement | HTMLDialogElement;
  private _autoUpdateCleanup?: () => void;
  private _lightDismissEscapeListener?: EventListener;
  private _lightDismissPointerUpListener?: EventListener;

  constructor(component: IOverlayComponent) {
    super(component);
    this._rootElement = getShadowElement(component, OVERLAY_CONSTANTS.selectors.ROOT);
  }

  public async show(): Promise<void> {
    if (!this._component.inline && SUPPORTS_POPOVER) {
      this._rootElement.popover = 'manual';
      this._rootElement.showPopover();
    } else {
      this._rootElement.removeAttribute('popover');
    }

    OverlayComponent[overlayStack].add(this._component);
  }

  public hide(): void {
    this.tryCleanupAutoUpdate();

    if (SUPPORTS_POPOVER && this._rootElement.matches(':popover-open')) {
      this._rootElement.hidePopover();
      this._rootElement.removeAttribute('popover');
    }

    // Remove inline positioning styles
    this._rootElement.style.removeProperty('top');
    this._rootElement.style.removeProperty('left');
    this._rootElement.style.removeProperty('display');

    this._component.arrowElement?.removeAttribute('style');

    // Remove dynamic position attribute
    this._component.removeAttribute(OVERLAY_CONSTANTS.attributes.POSITION_PLACEMENT);

    OverlayComponent[overlayStack].delete(this._component);
  }

  public tryHideDescendantOverlays(): void {
    const descendantOverlays = this._findDescendantOverlays();
    descendantOverlays
      .filter(o => !o.persistent) // Ignore persistent overlays since those are manually controlled
      .forEach(o => o.open = false);
  }

  public locateAnchorElement(id: string | null): HTMLElement | null {
    return locateElementById(this._component, id);
  }

  public positionElement({
    anchorElement,
    strategy,
    placement,
    hide,
    offset,
    shift,
    flip,
    boundary,
    boundaryElement,
    fallbackPlacements
  }: IPositionElementConfig): void {
    this.tryCleanupAutoUpdate();
  
    const originalOffset = { ...offset };
    const boundaryEl: Boundary = (boundaryElement ? boundaryElement : boundary ? this._component.closest(`#${boundary}`) : null) ?? 'clippingAncestors';

    this._autoUpdateCleanup = autoUpdate(anchorElement, this._rootElement, async () => {
      const offsetOptions = { ...originalOffset };

      // If we have an arrow element and an offset, we need to adjust the current offset to account for the arrow length
      if (this._component.arrowElement) {
        const arrowOffset = this._component.arrowElementOffset || Math.sqrt(2 * this._component.arrowElement.offsetWidth ** 2) / 2; // Compute the hypotenuse length of the arrow element
        if (offsetOptions.mainAxis == null) {
          offsetOptions.mainAxis = 0;
        }
        offsetOptions.mainAxis += arrowOffset;
      }

      const result = await positionElementAsync({
        element: this._rootElement,
        anchorElement,
        strategy,
        placement,
        hide: hide !== 'never',
        shift,
        shiftOptions: {
          boundary: boundaryEl
        },
        flip: flip !== 'never',
        flipOptions: {
          boundary: SUPPORTS_POPOVER ? document.body : 'clippingAncestors',
          fallbackStrategy: 'bestFit',
          fallbackPlacements: fallbackPlacements ?? OVERLAY_FALLBACK_PLACEMENT_MAP[placement] ?? DEFAULT_FALLBACK_PLACEMENTS,
          crossAxis: flip === 'cross' || flip === 'auto',
          mainAxis: flip === 'main' || flip === 'auto'
        },
        arrowElement: this._component.arrowElement,
        topLayer: !this._component.inline && SUPPORTS_POPOVER,
        offset: Boolean(offsetOptions),
        offsetOptions
      });

      const side = result.placement.split('-')[0];
      const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[side];
      if (staticSide) {
        // Update the dynamic position "side" via an attribute to allow for state-based position adjustments
        this._component.setAttribute(OVERLAY_CONSTANTS.attributes.POSITION_PLACEMENT, result.placement);
      }

      // Position the optional arrow element
      if (this._component.arrowElement && result.arrow) {
        const { x: arrowX, y: arrowY } = result.arrow;
        const arrowLen = this._component.arrowElement.offsetWidth;
        const { borderWidth = '0' } = getComputedStyle(this._component.arrowElement);
        const arrowBoxAdjust = parseFloat(borderWidth);
        Object.assign(this._component.arrowElement.style, {
          top: arrowY != null ? `${arrowY}px` : '',
          left: arrowX != null ? `${arrowX}px` : '',
          right: '',
          bottom: '',
          [staticSide as string]: `${(-arrowLen / 2) - arrowBoxAdjust}px`
        });
      }
    });
  }

  public tryCleanupAutoUpdate(): void {
    this._autoUpdateCleanup?.();
    this._autoUpdateCleanup = undefined;
  }

  public isMostRecentOpenOverlay(): boolean {
    return Array.from(OverlayComponent[overlayStack]).at(-1) === this._component;
  }

  public addLightDismissListener(listener: (reason: OverlayLightDismissReason) => void): void {
    this.removeLightDismissListener();

    // Listen for escape key globally
    this._lightDismissEscapeListener = (evt: KeyboardEvent): void => {
      if (evt.key === 'Escape') {
        if (this.isMostRecentOpenOverlay()) {
          evt.preventDefault();
          evt.stopPropagation();
          listener('escape');
        }
      }
    };
    this._component.ownerDocument.addEventListener('keydown', this._lightDismissEscapeListener);
  
    // Listen for click-outside (any clicks not within our overlay surface or the anchor element)
    this._lightDismissPointerUpListener = (evt: PointerEvent): void => {
      const composedPath = evt.composedPath();
      const stack = Array.from(OverlayComponent[overlayStack]);
      const stackIndex = stack.indexOf(this._component);
      const isFromOverlayAboveUs = composedPath.some(el => el instanceof OverlayComponent && stack.indexOf(el) > stackIndex);
      const isRightClick = evt.button === 2;

      // We ignore light dismiss events if the click originated from an overlay that is higher in the
      // stack than us, or if the click was a right-click (potential context menu)
      if (isFromOverlayAboveUs || isRightClick) {
        return;
      }

      const isWithinAnchor = this._component.anchorElement instanceof VirtualElement ? false : this._component.anchorElement && composedPath.includes(this._component.anchorElement);
      const isWithinOverlay = composedPath.includes(this._rootElement);
      if (!isWithinAnchor && !isWithinOverlay) {
        listener('click');
      }
    };
    this._component.ownerDocument.addEventListener('pointerup', this._lightDismissPointerUpListener, { capture: true });
  }

  public removeLightDismissListener(): void {
    if (this._lightDismissEscapeListener) {
      this._component.ownerDocument.removeEventListener('keydown', this._lightDismissEscapeListener);
      this._lightDismissEscapeListener = undefined;
    }

    if (this._lightDismissPointerUpListener) {
      this._component.ownerDocument.removeEventListener('pointerup', this._lightDismissPointerUpListener, { capture: true });
      this._lightDismissPointerUpListener = undefined;
    }
  }

  /**
   * Finds all descendant overlays that are not persistent.
   * @returns An array of descendant overlays.
   */
  private _findDescendantOverlays(): IOverlayComponent[] {
    const allOverlays = Array.from(OverlayComponent[overlayStack]);
    const overlaysAboveUs = allOverlays.slice(allOverlays.indexOf(this._component) + 1).reverse();
    const descendantOverlays: IOverlayComponent[] = [];
    
    if (overlaysAboveUs.length) {
      // Dispatch an event on each overlay after us to see if it is a descendant of our overlay
      const listener: EventListener = evt => descendantOverlays.push(evt.target as IOverlayComponent);
      this._component.addEventListener(OVERLAY_CONSTANTS.events.DESCENDANT_TEST, listener);
      overlaysAboveUs.forEach(o => o.dispatchEvent(new CustomEvent(OVERLAY_CONSTANTS.events.DESCENDANT_TEST, { bubbles: true, composed: true })));
      this._component.removeEventListener(OVERLAY_CONSTANTS.events.DESCENDANT_TEST, listener);
    }

    return descendantOverlays;
  }
}
