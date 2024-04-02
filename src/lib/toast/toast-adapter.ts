import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IOverlayComponent, OVERLAY_CONSTANTS } from '../overlay';
import { IToastComponent } from './toast';

export interface IToastAdapter extends IBaseAdapter {
  show(): void;
  hide(): void;
  registerActionListener: (type: string, listener: (evt: MouseEvent) => void) => void;
  deregisterActionListener: (type: string, listener: (evt: MouseEvent) => void) => void;
}

export class ToastAdapter extends BaseAdapter<IToastComponent> implements IToastAdapter {
  private _overlayElement: IOverlayComponent;
  // private _containerElement: HTMLElement;
  // private _actionButtonElement: IButtonComponent;
  // private _actionButtonPlaceholder: Comment;
  // private _closeButtonElement: HTMLButtonElement;

  constructor(component: IToastComponent) {
    super(component);
    this._overlayElement = getShadowElement(component, OVERLAY_CONSTANTS.elementName) as IOverlayComponent;
    // this._containerElement = getShadowElement(component, TOAST_CONSTANTS.selectors.CONTAINER);
    // this._actionButtonElement = getShadowElement(component, TOAST_CONSTANTS.selectors.ACTION_BUTTON) as IButtonComponent;
    // this._closeButtonElement = getShadowElement(component, TOAST_CONSTANTS.selectors.CLOSE_BUTTON) as HTMLButtonElement;
  }

  public show(): void {
    this._overlayElement.open = true;
  }

  public hide(): void {
    this._overlayElement.open = false;
  }

  public registerActionListener(type: string, listener: (evt: MouseEvent) => void): void {
    // this._actionButtonElement.addEventListener(type, listener);
  }

  public deregisterActionListener(type: string, listener: (evt: MouseEvent) => void): void {
    // this._actionButtonElement.removeEventListener(type, listener);
  }
}
