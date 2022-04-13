import { getShadowElement, toggleClass } from '@tylertech/forge-core';
import { BACKDROP_CONSTANTS, IBackdropComponent } from '../../backdrop';
import { BaseDrawerAdapter, IBaseDrawerAdapter } from '../base';
import { IModalDrawerComponent } from './modal-drawer';

export interface IModalDrawerAdapter extends IBaseDrawerAdapter {
  setBackdropCloseListener(listener: (evt: Event) => void): void;
  setBackdropVisibility(visible: boolean): Promise<void>;
  toggleBackdropClass(hasClass: boolean, className: string): void;
}

export class ModalDrawerAdapter extends BaseDrawerAdapter implements IModalDrawerAdapter {
  private _backdropElement: IBackdropComponent;

  constructor(protected _component: IModalDrawerComponent) {
    super(_component);
    this._backdropElement = getShadowElement(this._component, BACKDROP_CONSTANTS.elementName) as IBackdropComponent;
  }

  public setBackdropCloseListener(listener: (evt: Event) => void): void {
    this._backdropElement.addEventListener(BACKDROP_CONSTANTS.events.BACKDROP_CLICK, listener);
  }

  public setBackdropVisibility(visible: boolean): Promise<void> {
    if (this._backdropElement.hasAttribute('hidden')) {
      this._backdropElement.removeAttribute('hidden');
    }
    if (!this._backdropElement.fadeIn || !this._backdropElement.fadeOut) {
      return Promise.resolve();
    }
    return visible ? this._backdropElement.fadeIn() : this._backdropElement.fadeOut();
  }

  public toggleBackdropClass(hasClass: boolean, className: string): void {
    toggleClass(this._backdropElement, hasClass, className);
  }
}
