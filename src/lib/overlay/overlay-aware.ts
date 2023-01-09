import { FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { OverlayPositionStrategy } from './overlay-constants';

export interface IOverlayAware extends IBaseComponent {
  positionStrategy: OverlayPositionStrategy;
}

export class OverlayAware extends BaseComponent implements IOverlayAware {
  constructor() {
    super();
  }

  @FoundationProperty()
  public positionStrategy: OverlayPositionStrategy;
}
