import { autoUpdate } from '@floating-ui/dom';
import { getShadowElement, positionElementAsync } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core';
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
    if (value) {
      this._rootElement.classList.add('forge-overlay--entered');
    } else {
      this._rootElement.classList.remove('forge-overlay--entered');
    }
  }

  public positionElement(targetElement: HTMLElement, strategy: OverlayPositionStrategy, placement: OverlayPlacement, hide: boolean, offset: IOverlayPosition): void {
    this.tryCleanupAutoUpdate();

    positionElementAsync({
      element: this._component,
      targetElement,
      placement,
      hide,
      offset
    });

    this._autoUpdateCleanup = autoUpdate(targetElement, this._component, () => {
      positionElementAsync({
        element: this._component,
        targetElement,
        strategy,
        placement,
        hide,
        offset
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
