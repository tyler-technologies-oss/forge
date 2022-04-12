import { addClass, getShadowElement, removeClass } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/adapters/base-adapter';
import { IBadgeComponent } from './badge';
import { BADGE_CONSTANTS } from './badge-constants';

export interface IBadgeAdapter extends IBaseAdapter {
  setRootClass(classes: string | string[]): void;
  removeRootClass(classes: string | string[]): void;
}

export class BadgeAdapter extends BaseAdapter<IBadgeComponent> implements IBadgeAdapter {
  private _rootElement: HTMLElement;

  constructor(component: IBadgeComponent) {
    super(component);
    this._rootElement = getShadowElement(component, BADGE_CONSTANTS.selectors.ROOT);
  }

  public setRootClass(classes: string | string[]): void {
    addClass(classes, this._rootElement);
  }

  public removeRootClass(classes: string | string[]): void {
    removeClass(classes, this._rootElement);
  }
}
