import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IBaseAdapter } from '../core';
import { IOverlayOffset, OverlayPlacement, OverlayPositionStrategy } from './overlay-constants';

export interface IBaseOverlayFoundation extends ICustomElementFoundation {
  initialize(): void;
  disconnect(): void;
  position(): void;
  open: boolean;
  inline: boolean;
  placement: OverlayPlacement;
  positionStrategy: OverlayPositionStrategy;
  offset: IOverlayOffset;
  hide: boolean;
  static: boolean;
}

export abstract class BaseOverlayFoundation implements IBaseOverlayFoundation {
  constructor(protected _adapter: IBaseAdapter) {}

  public abstract initialize(): void;
  public abstract disconnect(): void;
  public abstract position(): void;

  public abstract open: boolean;
  public abstract inline: boolean;
  public abstract placement: OverlayPlacement;
  public abstract positionStrategy: OverlayPositionStrategy;
  public abstract offset: IOverlayOffset;
  public abstract hide: boolean;
  public abstract static: boolean;
}
