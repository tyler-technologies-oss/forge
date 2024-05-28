import { BaseAdapter, IBaseAdapter } from '../../core';
import { IOverlayComponent } from '../overlay';
import { IOverlayAware } from '../base/overlay-aware';

export interface IOverlayAwareAdapter<T extends IOverlayAware = IOverlayAware> extends IBaseAdapter<T> {
  readonly overlayElement: IOverlayComponent;
}

export abstract class OverlayAwareAdapter<T extends IOverlayAware> extends BaseAdapter<T> implements IOverlayAwareAdapter {
  protected _overlayElement: IOverlayComponent;

  constructor(component: T) {
    super(component);
    this._initializeOverlayElement();
  }

  protected abstract _initializeOverlayElement(): void;

  public get overlayElement(): IOverlayComponent {
    return this._overlayElement;
  }
}
