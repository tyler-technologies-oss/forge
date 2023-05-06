import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core';
import { ISpinnerComponent } from './spinner';
import { SPINNER_CONSTANTS } from './spinner-constants';

export interface ISpinnerAdapter extends IBaseAdapter {
  registerPointerDownHandler: (handler: (event: PointerEvent) => void) => void;
  registerPointerUpHandler: (handler: (event: PointerEvent) => void) => void;
  registerPointerEnterHandler: (handler: (event: PointerEvent) => void) => void;
  deregisterPointerDownHandler: (handler: (event: PointerEvent) => void) => void;
  deregisterPointerUpHandler: (handler: (event: PointerEvent) => void) => void;
  deregisterPointerEnterHandler: (handler: (event: PointerEvent) => void) => void;
  toggleActive: (value: boolean) => void;
  toggleDisabled: (value: boolean) => void;
}

export class SpinnerAdapter extends BaseAdapter<ISpinnerComponent> implements ISpinnerAdapter {
  private _rootElement: HTMLElement;
  private _incrementElement: HTMLElement;
  private _decrementElement: HTMLElement;

  constructor(component: ISpinnerComponent) {
    super(component);
    this._rootElement = getShadowElement(component, SPINNER_CONSTANTS.selectors.ROOT);
    this._incrementElement = getShadowElement(component, SPINNER_CONSTANTS.selectors.INCREMENT);
    this._decrementElement = getShadowElement(component, SPINNER_CONSTANTS.selectors.DECREMENT);
  }

  public registerPointerDownHandler(handler: (event: PointerEvent) => void): void {
    this._rootElement.addEventListener('pointerdown', handler);
  }

  public registerPointerUpHandler(handler: (event: PointerEvent) => void): void {
    this._rootElement.addEventListener('pointerup', handler);
    this._rootElement.addEventListener('pointerleave', handler);
  }

  public registerPointerEnterHandler(handler: (event: PointerEvent) => void): void {
    this._incrementElement.addEventListener('pointerenter', handler);
    this._decrementElement.addEventListener('pointerenter', handler);
  }

  public deregisterPointerDownHandler(handler: (event: PointerEvent) => void): void {
    this._rootElement.removeEventListener('pointerdown', handler);
  }

  public deregisterPointerUpHandler(handler: (event: PointerEvent) => void): void {
    this._rootElement.removeEventListener('pointerup', handler);
    this._rootElement.removeEventListener('pointerleave', handler);
  }

  public deregisterPointerEnterHandler(handler: (event: PointerEvent) => void): void {
    this._incrementElement.removeEventListener('pointerenter', handler);
    this._decrementElement.removeEventListener('pointerenter', handler);
  }

  public toggleActive(value: boolean): void {
    this._rootElement.classList.toggle(SPINNER_CONSTANTS.classes.ACTIVE, value);
  }

  public toggleDisabled(value: boolean): void {
    this._rootElement.classList.toggle(SPINNER_CONSTANTS.classes.DISABLED, value);
  }
}
