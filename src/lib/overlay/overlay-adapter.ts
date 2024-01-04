import { autoUpdate, Boundary } from '@floating-ui/dom';
import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { positionElementAsync, PositionPlacement } from '../core/utils/position-utils';
import { locateTargetHeuristic } from '../core/utils/utils';
import { IOverlayComponent, OverlayComponent } from './overlay';
import {
  IOverlayOffset,
  OverlayFlipState,
  OverlayHideState,
  OverlayLightDismissReason,
  OverlayPlacement,
  OverlayPositionStrategy,
  overlayStack,
  OVERLAY_CONSTANTS,
  SUPPORTS_POPOVER
} from './overlay-constants';

export interface IOverlayAdapter extends IBaseAdapter {
  show(): void;
  hide(): void;
  tryHideOpenOverlays(): void;
  locateAnchorElement(id: string | null): HTMLElement | null;
  isMostRecentOpenOverlay(): boolean;
  positionElement(config: IPositionElementConfig): void;
  tryCleanupAutoUpdate(): void;
  addLightDismissListener(listener: (reason: OverlayLightDismissReason) => void): void;
  removeLightDismissListener(): void;
}

export interface IPositionElementConfig {
  anchorElement: HTMLElement;
  strategy: OverlayPositionStrategy;
  placement: PositionPlacement;
  auto: boolean;
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
  private _lightDismissController = new AbortController();

  constructor(component: IOverlayComponent) {
    super(component);
    this._rootElement = getShadowElement(component, OVERLAY_CONSTANTS.selectors.ROOT);
  }

  public show(): void {
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

    // Remove dynamic position attribute
    this._component.removeAttribute(OVERLAY_CONSTANTS.attributes.POSITION_PLACEMENT);

    OverlayComponent[overlayStack].delete(this._component);
  }

  public tryHideOpenOverlays(): void {
    // Attempts to hide any overlays that were opened after this one in reverse order
    const overlays = Array.from(OverlayComponent[overlayStack]);
    const overlaysAfter = overlays.slice(overlays.indexOf(this._component) + 1).reverse();
    overlaysAfter.forEach(o => o.open = false);
  }

  public locateAnchorElement(id: string | null): HTMLElement | null {
    return locateTargetHeuristic(this._component, id);
  }

  public positionElement({
    anchorElement,
    strategy,
    placement,
    auto,
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
        targetElement: anchorElement,
        strategy,
        placement,
        hide: hide !== 'never',
        shift,
        shiftOptions: {
          boundary: boundaryEl
        },
        auto,
        autoOptions: {
          boundary: boundaryEl
        },
        flip: !auto && flip !== 'never',
        flipOptions: {
          boundary: boundaryEl,
          fallbackAxisSideDirection: flip === 'auto' ? 'start' : undefined,
          fallbackPlacements,
          crossAxis: flip === 'cross' || flip === 'auto',
          mainAxis: flip === 'main' || flip === 'auto'
        },
        arrowElement: this._component.arrowElement,
        topLayer: !this._component.inline && SUPPORTS_POPOVER,
        offset: Boolean(offsetOptions),
        offsetOptions,
        transform: false
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
    const escapeListener = (evt: KeyboardEvent): void => {
      if (evt.key === 'Escape') {
        if (this.isMostRecentOpenOverlay()) {
          evt.preventDefault();
          evt.stopPropagation();
          listener('escape');
        }
      }
    };
    this._component.ownerDocument.addEventListener('keydown', escapeListener, { signal: this._lightDismissController.signal });
  
    // Listen for click-outside (any clicks not within our overlay surface or the anchor element)
    const pointerupListener = (evt: PointerEvent): void => {
      const composedPath = evt.composedPath();
      const isExternal = !composedPath.includes(this._component.anchorElement) &&
                         !composedPath.includes(this._rootElement);
      if (isExternal) {
        listener('click');
      }
    };
    this._component.ownerDocument.addEventListener('pointerup', pointerupListener, { capture: true, signal: this._lightDismissController.signal });
  }

  public removeLightDismissListener(): void {
    this._lightDismissController.abort();
    this._lightDismissController = new AbortController();
  }
}
