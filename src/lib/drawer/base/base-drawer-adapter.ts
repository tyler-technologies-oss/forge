import { addClass, getShadowElement, removeClass } from '@tylertech/forge-core';
import { proxyShadowScrollEvent } from '../../core/utils/event-utils';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IBaseDrawerComponent } from './base-drawer';
import { DrawerDirection, BASE_DRAWER_CONSTANTS } from './base-drawer-constants';

export interface IBaseDrawerAdapter extends IBaseAdapter {
  proxyScrollEvent(): void;
  tryUnproxyScrollEvent(): void;
  setDirection(direction: DrawerDirection): void;
  removeDrawerClass(className: string | string[]): void;
  setDrawerClass(className: string | string[]): void;
  listenTransitionComplete(listener: () => void): void;
}

export class BaseDrawerAdapter extends BaseAdapter<IBaseDrawerComponent> implements IBaseDrawerAdapter {
  protected _drawerElement: HTMLElement;
  private _activeTransitionListener: ((evt: TransitionEvent) => void) | undefined;
  private _unproxyScrollEventCb: (() => void) | undefined;

  constructor(protected _component: IBaseDrawerComponent) {
    super(_component);
    this._drawerElement = getShadowElement(this._component, BASE_DRAWER_CONSTANTS.selectors.DRAWER);
  }

  public proxyScrollEvent(): void {
    // We proxy the scroll event because our internal scroll container does not dispatch this event outside of the shadow root to any listeners.
    // This is a problem because if we have any components that need to react to the scroll event, such as our popup elements, they will not be
    // notified. This will ensure we always proxy this event out from the host. 
    this.tryUnproxyScrollEvent();
    this._unproxyScrollEventCb = proxyShadowScrollEvent(this._component.shadowRoot as ShadowRoot, this._component);
  }

  public tryUnproxyScrollEvent(): void {
    if (this._unproxyScrollEventCb) {
      this._unproxyScrollEventCb();
    }
  }

  public setDirection(direction: DrawerDirection): void {
    switch (direction) {
      case 'left':
        this._drawerElement.classList.remove(BASE_DRAWER_CONSTANTS.classes.RIGHT);
        this._drawerElement.classList.add(BASE_DRAWER_CONSTANTS.classes.LEFT);
        break;
      case 'right':
        this._drawerElement.classList.remove(BASE_DRAWER_CONSTANTS.classes.LEFT);
        this._drawerElement.classList.add(BASE_DRAWER_CONSTANTS.classes.RIGHT);
        break;
    }
  }

  public removeDrawerClass(className: string | string[]): void {
    removeClass(className, this._drawerElement);
  }

  public setDrawerClass(className: string | string[]): void {
    addClass(className, this._drawerElement);
  }

  public listenTransitionComplete(listener: () => void): void {
    if (this._activeTransitionListener) {
      this._drawerElement.removeEventListener('transitionend', this._activeTransitionListener);
    }
    this._activeTransitionListener = (evt: TransitionEvent) => {
      if (evt.propertyName === 'transform') {
        if (this._activeTransitionListener) {
          this._drawerElement.removeEventListener('transitionend', this._activeTransitionListener);
          this._activeTransitionListener = undefined;
        }
        listener();
      }
    };
    this._drawerElement.addEventListener('transitionend', this._activeTransitionListener);
  }
}
