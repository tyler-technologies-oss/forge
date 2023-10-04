import { BaseAdapter, IBaseAdapter } from '../core';
import { IOverlayComponent } from './overlay';
import { IOverlayAware } from './overlay-aware';

export interface IOverlayAwareAdapter extends IBaseAdapter {
  readonly overlay: IOverlayComponent;
}

export abstract class OverlayAwareAdapter<T extends IOverlayAware> extends BaseAdapter<T> implements IOverlayAwareAdapter {
  protected _overlayElement: IOverlayComponent;

  constructor(component: T) {
    super(component);
    this._initializeOverlayElement();
  }

  protected abstract _initializeOverlayElement(): void;

  public get overlay(): IOverlayComponent {
    return this._overlayElement;
  }
}
