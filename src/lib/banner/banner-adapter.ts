import { getShadowElement } from '@tylertech/forge-core';

import { BaseAdapter, IBaseAdapter } from '../core/adapters/base-adapter';
import { IIconButtonComponent } from '../icon-button';
import { IBannerComponent } from './banner';
import { BANNER_CONSTANTS } from './banner-constants';

export interface IBannerAdapter extends IBaseAdapter {
  addRootClass(className: string): void;
  removeRootClass(className: string): void;
  addDismissButtonAttribute(name: string, value?: string): void;
  removeDismissButtonAttribute(name: string): void;
  addDismissEventListener(event: string, callback: (event: Event) => void): void;
  removeDismissEventListener(event: string, callback: (event: Event) => void): void;
}

export class BannerAdapter extends BaseAdapter<IBannerComponent> implements IBannerAdapter {
  private _rootElement: HTMLElement;
  private _forgeIconButtonDismiss: IIconButtonComponent;
  private _buttonDismiss: HTMLButtonElement;

  constructor(component: IBannerComponent) {
    super(component);
    this._rootElement = getShadowElement(component, BANNER_CONSTANTS.selectors.BANNER);
  }

  public addRootClass(name: string): void {
    this._rootElement.classList.add(name);
  }

  public removeRootClass(name: string): void {
    this._rootElement.classList.remove(name);
  }

  public addDismissButtonAttribute(name: string, value = ''): void {
    this.forgeIconButtonDismiss.setAttribute(name, value);
  }

  public removeDismissButtonAttribute(name: string): void {
    this.forgeIconButtonDismiss.removeAttribute(name);
  }

  public addDismissEventListener(event: string, callback: (event: Event) => void): void {
    this.buttonDismiss.addEventListener(event, callback);
  }

  public removeDismissEventListener(event: string, callback: (event: Event) => void): void {
    this.buttonDismiss.removeEventListener(event, callback);
  }

  public get forgeIconButtonDismiss(): IIconButtonComponent {
    if (!this._forgeIconButtonDismiss) {
      this._forgeIconButtonDismiss = getShadowElement(this._component, BANNER_CONSTANTS.selectors.FORGE_DISMISS_BUTTON) as IIconButtonComponent;
    }

    return this._forgeIconButtonDismiss;
  }

  public get buttonDismiss(): HTMLButtonElement {
    if (!this._buttonDismiss) {
      this._buttonDismiss = getShadowElement(this._component, BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLButtonElement;
    }

    return this._buttonDismiss;
  }
}
