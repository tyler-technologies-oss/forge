import { autoUpdate } from '@floating-ui/dom';
import { getShadowElement, positionElementAsync, toggleClass } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter, supportsPopover } from '../core';
import { IOverlayComponent } from './overlay';
import { IOverlayPosition, OverlayPlacement, OverlayPositionStrategy } from './overlay-constants';

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
  offset: IOverlayPosition;
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
  private _autoUpdateCleanup: undefined | (() => void);

  constructor(component: IOverlayComponent) {
    super(component);
    this._rootElement = getShadowElement(component, '.forge-overlay');
  }

  public initialize(): void {
    if (canUsePopover) {
      this._rootElement.popover = 'auto';
    }
    // TODO: anything we need to do here for non-popover behavior?
  }

  public addLightDismissListener(listener: EventListener): void {
    if (canUsePopover) {
      this._rootElement.addEventListener('toggle', listener);
    } else {
      // TODO: implement custom light dismiss behavior
    }
  }

  public removeLightDismissListener(listener: EventListener): void {
    if (canUsePopover) {
      this._rootElement.removeEventListener('toggle', listener);
    } else {
      // TODO: remove custom light dismiss behavior
    }
  }

  public setOpen(value: boolean): void {
    toggleClass(this._rootElement, value, 'forge-overlay--open');

    if (value) {
      (this._component.internals as any).states?.add('--forge-overlay-open');
      if (canUsePopover) {
        this._rootElement.popover = 'auto'; // TODO: if static, use `manual` instead
        this._rootElement.showPopover();
      } else {
        // TODO: Fallback to dynamically appending element to <body> with cloned assigned nodes?
        //       Also, we could conditionally check if this element is within a containment block and just fixed positioning in that case?
      }
    } else {
      (this._component.internals as any).states?.delete('--forge-overlay-open');
      if (canUsePopover && this._rootElement.matches(':popover-open')) {
        this._rootElement.hidePopover();
      } else {
        // TODO: Remove fallback element
      }
    }
  }

  public positionElement({ targetElement, strategy, placement, hide, offset }: IPositionElementConfig): void {
    this.tryCleanupAutoUpdate();
    this._autoUpdateCleanup = autoUpdate(targetElement, this._rootElement, () => {
      positionElementAsync({
        element: this._rootElement,
        targetElement,
        strategy,
        placement,
        hide,
        offset,
        transform: false
      });
    });
  }

  public tryCleanupAutoUpdate(): void {
    if (typeof this._autoUpdateCleanup === 'function') {
      this._autoUpdateCleanup();
      this._autoUpdateCleanup = undefined;
    }
  }
}
