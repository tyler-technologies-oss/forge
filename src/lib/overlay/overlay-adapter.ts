import { autoUpdate } from '@floating-ui/dom';
import { getShadowElement, notChildEventListener, positionElementAsync } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter, supportsPopover } from '../core';
import { IOverlayComponent } from './overlay';
import { IOverlayOffset, OverlayPlacement, OverlayPositionStrategy, OverlayToggleEvent, OVERLAY_CONSTANTS } from './overlay-constants';

export interface IOverlayAdapter extends IBaseAdapter {
  initialize(): void;
  setOpen(value: boolean): void;
  addLightDismissListener(listener: EventListener): void;
  removeLightDismissListener(listener: EventListener): void;
  positionElement(config: IPositionElementConfig): void;
  tryCleanupAutoUpdate(): void;
}

export interface IPositionElementConfig {
  targetElement: HTMLElement;
  strategy: OverlayPositionStrategy;
  placement: OverlayPlacement;
  hide: boolean;
  offset: IOverlayOffset;
  shift: boolean;
  auto: boolean;
  flip: boolean;
}

declare global {
  interface HTMLElement {
    popover: 'manual' | 'auto' | null | undefined;
    showPopover(): void;
    hidePopover(): void;
    togglePopover(): void;
  }
}

const canUsePopover = supportsPopover();

export class OverlayAdapter extends BaseAdapter<IOverlayComponent> implements IOverlayAdapter {
  private _rootElement: HTMLElement;
  private _arrowElement: HTMLElement;
  private _autoUpdateCleanup: undefined | (() => void);
  private _inlineLightDismissCleanup: undefined | (() => void);

  constructor(component: IOverlayComponent) {
    super(component);
    this._rootElement = getShadowElement(component, OVERLAY_CONSTANTS.selectors.ROOT);
    this._arrowElement = getShadowElement(component, OVERLAY_CONSTANTS.selectors.ARROW);
  }

  public initialize(): void {
    if (canUsePopover) {
      this._rootElement.popover = 'auto';
    }
  }

  public addLightDismissListener(listener: EventListener): void {
    if (!this._component.inline && canUsePopover) {
      this._rootElement.addEventListener('toggle', listener);
    } else {
      const escapeListener = ({ key }: KeyboardEvent): void => {
        if (key === 'Escape') {
          listener({ newState: 'closed' } as OverlayToggleEvent);
          window.removeEventListener('keydown', escapeListener);
        }
      };
      window.addEventListener('keydown', escapeListener);
      this._inlineLightDismissCleanup = notChildEventListener(this._component, activeElement => {
        if (!this._component.contains(activeElement)) {
          listener({ newState: 'closed' } as OverlayToggleEvent);
        }
      }, true );
    }
  }

  public removeLightDismissListener(listener: EventListener): void {
    if (!this._component.inline && canUsePopover) {
      this._rootElement.removeEventListener('toggle', listener);
    } else {
      this._inlineLightDismissCleanup?.();
      this._inlineLightDismissCleanup = undefined;
    }
  }

  public setOpen(value: boolean): void {
    if (value) {
      if (!this._component.inline && canUsePopover) {
        this._rootElement.popover = this._component.static ? 'manual' : 'auto';
        this._rootElement.showPopover();
      } else {
        this._rootElement.removeAttribute('popover');
      }
    } else {
      this.tryCleanupAutoUpdate();
      if (canUsePopover && this._rootElement.matches(':popover-open')) {
        this._rootElement.hidePopover();
      }
      this._component.removeAttribute(OVERLAY_CONSTANTS.attributes.POSITION_PLACEMENT);
    }
  }

  public positionElement({ targetElement, strategy, placement, hide, offset, shift, auto, flip }: IPositionElementConfig): void {
    this.tryCleanupAutoUpdate();
    const originalOffset = { ...offset };
    
    this._autoUpdateCleanup = autoUpdate(targetElement, this._rootElement, async () => {
      const offsetOptions = { ...originalOffset };

      // If we have an arrow element and an offset, we need to adjust the current offset to account for the arrow
      if (this._component.arrowElement && typeof this._component.arrowElementOffset === 'number') {
        if (offsetOptions.mainAxis == null) {
          offsetOptions.mainAxis = 0;
        }
        offsetOptions.mainAxis += this._component.arrowElementOffset;
      }

      const result = await positionElementAsync({
        element: this._rootElement,
        targetElement,
        strategy,
        placement,
        hide,
        shift,
        auto,
        flip: !auto && flip,
        flipOptions: {
          fallbackAxisSideDirection: 'start'
        },
        arrowElement: this._component.arrowElement,
        topLayer: !this._component.inline && canUsePopover,
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

      // Position our optional arrow element
      if (this._component.arrowElement && result.arrow) {
        const { x: arrowX, y: arrowY } = result.arrow;
        const arrowLen = this._component.arrowElement.offsetWidth;
        Object.assign(this._component.arrowElement.style, {
          top: arrowY != null ? `${arrowY}px` : '',
          left: arrowX != null ? `${arrowX}px` : '',
          [staticSide as string]: `${-arrowLen / 2}px`
        });
      }
    });
  }

  public tryCleanupAutoUpdate(): void {
    if (typeof this._autoUpdateCleanup === 'function') {
      this._autoUpdateCleanup();
      this._autoUpdateCleanup = undefined;
    }
  }
}
