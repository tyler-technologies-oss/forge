import { ICustomElementFoundation } from '@tylertech/forge-core';
import { OverlayPositionStrategy } from './overlay-constants';

export interface IOverlayFoundation extends ICustomElementFoundation {
  positionStrategy: OverlayPositionStrategy;
}

export class OverlayAwareFoundation implements IOverlayFoundation {
  private _positionStrategy: OverlayPositionStrategy = 'fixed';

  public get positionStrategy(): OverlayPositionStrategy {
    return this._positionStrategy;
  }
  public set positionStrategy(value: OverlayPositionStrategy) {
    if (this._positionStrategy !== value) {
      this._positionStrategy = value;
    }
  }
}
