import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IBaseAdapter } from '../../core';
import { IOverlayOffset, OverlayFlipState, OverlayHideState, OverlayPlacement, OverlayPositionStrategy } from '../overlay-constants';

export interface IBaseOverlayFoundation extends ICustomElementFoundation {
  initialize(): void;
  destroy(): void;
  position(): void;
  anchorElement: HTMLElement;
  anchor: string | null;
  open: boolean;
  inline: boolean;
  placement: OverlayPlacement;
  positionStrategy: OverlayPositionStrategy;
  offset: IOverlayOffset;
  hide: OverlayHideState;
  static: boolean;
  shift: boolean;
  flip: OverlayFlipState;
  boundary: string | null;
  boundaryElement: HTMLElement | null;
  fallbackPlacements: OverlayPlacement[] | null;
  auto: boolean;
}

export abstract class BaseOverlayFoundation<T extends IBaseAdapter> implements IBaseOverlayFoundation {
  constructor(protected _adapter: T) {}

  public initialize(): void {}
  public abstract destroy(): void;
  public abstract position(): void;

  public abstract anchorElement: HTMLElement;
  public abstract anchor: string | null;
  public abstract open: boolean;
  public abstract inline: boolean;
  public abstract placement: OverlayPlacement;
  public abstract positionStrategy: OverlayPositionStrategy;
  public abstract offset: IOverlayOffset;
  public abstract hide: OverlayHideState;
  public abstract static: boolean;
  public abstract shift: boolean;
  public abstract flip: OverlayFlipState;
  public abstract boundary: string | null;
  public abstract boundaryElement: HTMLElement | null;
  public abstract fallbackPlacements: OverlayPlacement[] | null;
  public abstract auto: boolean;
}
