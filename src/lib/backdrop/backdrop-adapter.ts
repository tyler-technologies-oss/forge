import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/adapters/base-adapter';
import { IBackdropComponent } from './backdrop';
import { BACKDROP_CONSTANTS } from './backdrop-constants';

export interface IBackdropAdapter extends IBaseAdapter {
  setBackdropOpacity: (opacity: number) => void;
  addBackdropEventListener: (type: string, listener: (evt: Event) => void) => void;
  removeBackdropEventListener: (type: string, listener: (evt: Event) => void) => void;
}

/**
 * Provides facilities for interacting with the internal DOM of `BackdropComponent`.
 */
export class BackdropAdapter extends BaseAdapter<IBackdropComponent> implements IBackdropAdapter {
  private _backdropElement: HTMLElement;

  constructor(component: IBackdropComponent) {
    super(component);
    this._backdropElement = getShadowElement(component, BACKDROP_CONSTANTS.selectors.CONTAINER);
  }

  /**
   * Sets the backdrop element opacity.
   * @param opacity The opacity amount.
   */
  public setBackdropOpacity(opacity: number): void {
    this._backdropElement.style.opacity = opacity.toString();
  }

  /**
   * Adds a click event to the backdrop container element.
   * @param type The event type.
   * @param listener The event listener.
   */
  public addBackdropEventListener(type: string, listener: (evt: Event) => void): void {
    this._backdropElement.addEventListener('click', listener);
  }

  /**
   * Removes a click event from the backdrop container element.
   * @param type The event type.
   * @param listener The event listener.
   */
  public removeBackdropEventListener(type: string, listener: (evt: Event) => void): void {
    this._backdropElement.removeEventListener('click', listener);
  }
}
