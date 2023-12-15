import { BaseAdapter, IBaseAdapter } from '../../core';
import { IOverlayComponent } from '..';
import { IOverlayAware } from '../base/overlay-aware';

export interface IOverlayAwareAdapter extends IBaseAdapter {
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
