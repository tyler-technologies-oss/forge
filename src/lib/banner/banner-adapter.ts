import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import type { IBannerComponent } from './banner';
import { BANNER_CONSTANTS } from './banner-constants';

export interface IBannerAdapter extends IBaseAdapter {
  initialize(): void;
  setDismissButtonVisibility(visible: boolean): void;
  addDismissListener(callback: EventListener): void;
  removeDismissListener(callback: EventListener): void;
  setDismissed(value: boolean): void;
}

export class BannerAdapter extends BaseAdapter<IBannerComponent> implements IBannerAdapter {
  private _rootElement: HTMLElement = this._component;
  private _dismissButtonElement: HTMLButtonElement;
  private _iconSlotElement: HTMLSlotElement;

  constructor(component: IBannerComponent) {
    super(component);
    this._rootElement = getShadowElement(component, '.forge-banner');
    this._dismissButtonElement = getShadowElement(component, BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLButtonElement;
    this._iconSlotElement = getShadowElement(component, BANNER_CONSTANTS.selectors.ICON_SLOT) as HTMLSlotElement;
  }
  
  public initialize(): void {
    this._iconSlotElement.addEventListener('slotchange', this._onIconSlotChange.bind(this));
    this._onIconSlotChange();
  }

  public setDismissButtonVisibility(visible: boolean): void {
    this._dismissButtonElement.hidden = !visible;
  }

  public addDismissListener(callback: EventListener): void {
    this._dismissButtonElement.addEventListener('click', callback);
  }

  public removeDismissListener(callback: EventListener): void {
    this._dismissButtonElement.removeEventListener('click', callback);
  }

  public setDismissed(value: boolean): void {
    this._rootElement.inert = value;
  }

  private _onIconSlotChange(): void {
    this._rootElement.classList.toggle(BANNER_CONSTANTS.classes.HAS_ICON, this._iconSlotElement.assignedNodes().length > 0);
  }
}
