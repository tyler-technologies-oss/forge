import { BaseAdapter, IBaseAdapter } from '../../core/index.js';
import { IOverlayComponent } from '../overlay.js';
import { IOverlayAware } from '../base/overlay-aware.js';

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
