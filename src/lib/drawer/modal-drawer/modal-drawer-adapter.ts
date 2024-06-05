import { getShadowElement, toggleClass } from '@tylertech/forge-core';
import { BACKDROP_CONSTANTS, IBackdropComponent } from '../../backdrop';
import { BaseDrawerAdapter, IBaseDrawerAdapter } from '../base';
import { IModalDrawerComponent } from './modal-drawer';

export interface IModalDrawerAdapter extends IBaseDrawerAdapter {
  setBackdropCloseListener(listener: EventListener): void;
  setBackdropVisibility(visible: boolean, options?: { immediate?: boolean }): Promise<void>;
  toggleBackdropClass(hasClass: boolean, className: string): void;
}

export class ModalDrawerAdapter extends BaseDrawerAdapter implements IModalDrawerAdapter {
  private _backdropElement: IBackdropComponent;

  constructor(protected _component: IModalDrawerComponent) {
    super(_component);
    this._backdropElement = getShadowElement(this._component, BACKDROP_CONSTANTS.elementName) as IBackdropComponent;
  }

  public setBackdropCloseListener(listener: EventListener): void {
    this._backdropElement.addEventListener('click', listener);
  }

  public setBackdropVisibility(visible: boolean, { immediate }: { immediate?: boolean }): Promise<void> {
    this._backdropElement.toggleAttribute('hidden', !visible);

    if (!this._backdropElement.fadeIn || !this._backdropElement.fadeOut) {
      if (immediate) {
        this._backdropElement.toggleAttribute(BACKDROP_CONSTANTS.attributes.VISIBLE, visible);
      }
      return Promise.resolve();
    }

    if (immediate) {
      return Promise.resolve(visible ? this._backdropElement.show() : this._backdropElement.hide());
    }

    return visible ? this._backdropElement.fadeIn() : this._backdropElement.fadeOut();
  }

  public toggleBackdropClass(hasClass: boolean, className: string): void {
    toggleClass(this._backdropElement, hasClass, className);
  }
}
