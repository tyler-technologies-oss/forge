import { autoUpdate } from '@floating-ui/dom';
import { getShadowElement, positionElementAsync } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter, supportsPopover } from '../core';
import { IOverlayComponent } from './overlay';
import { IOverlayPosition, OverlayPlacement, OverlayPositionStrategy } from './overlay-constants';

export interface IOverlayAdapter extends IBaseAdapter {
  setOpen(value: boolean): void;
  positionElement(targetElement: HTMLElement, strategy: OverlayPositionStrategy, placement: OverlayPlacement, hide: boolean, offset: IOverlayPosition): void;
  tryCleanupAutoUpdate(): void;
}

export class OverlayAdapter extends BaseAdapter<IOverlayComponent> implements IOverlayAdapter {
  private _rootElement: HTMLElement;
  private _autoUpdateCleanup: undefined | (() => void);

  constructor(component: IOverlayComponent) {
    super(component);
    this._rootElement = getShadowElement(component, '.forge-overlay');
  }

  public setOpen(value: boolean): void {
    // TODO: refactor this to properly handle transitions after PoC
    if (value) {
      if (supportsPopover()) {
        this._rootElement.setAttribute('popover', 'manual');
        (this._rootElement as any).showPopover();
      }

      // this._rootElement.classList.remove('forge-overlay--entered');
      // this._rootElement.classList.remove('forge-overlay--exiting');
      // this._rootElement.classList.add('forge-overlay--entering');

      // setTimeout(() => {
      //   this._rootElement.classList.remove('forge-overlay--entering');
      //   this._rootElement.classList.add('forge-overlay--entered');
      // }, 120);
    } else {
      // this._rootElement.classList.remove('forge-overlay--entering');
      // this._rootElement.classList.remove('forge-overlay--entered');
      // this._rootElement.classList.add('forge-overlay--exiting');

      // setTimeout(() => {
      //   this._rootElement.classList.remove('forge-overlay--exiting');

      if (supportsPopover()) {
        (this._rootElement as any).hidePopover();
        this._rootElement.removeAttribute('popover');
        this._rootElement.style.removeProperty('top');
        this._rootElement.style.removeProperty('left');
        this._rootElement.style.removeProperty('visibility');
      }
      // }, 120);
    }
  }

  public positionElement(targetElement: HTMLElement, strategy: OverlayPositionStrategy, placement: OverlayPlacement, hide: boolean, offset: IOverlayPosition): void {
    this.tryCleanupAutoUpdate();

    positionElementAsync({
      element: this._rootElement,
      targetElement,
      strategy,
      placement,
      hide,
      offset,
      transform: false
    });

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
    if (this._autoUpdateCleanup) {
      this._autoUpdateCleanup();
      this._autoUpdateCleanup = undefined;
    }
  }
}
