import { IBaseAdapter } from '../../core/index.js';
import { PositionPlacement, VirtualElement } from '../../core/utils/position-utils.js';
import { IOverlayOffset, OverlayFlipState, OverlayHideState, OverlayPlacement, OverlayPositionStrategy, OverlayShiftState } from '../overlay-constants.js';

export interface IBaseOverlayCore {
  initialize(): void;
  destroy(): void;
  position(): void;
  anchorElement: HTMLElement | VirtualElement | null;
  anchor: string | null;
  open: boolean;
  inline: boolean;
  placement: OverlayPlacement;
  positionStrategy: OverlayPositionStrategy;
  offset: IOverlayOffset;
  hide: OverlayHideState;
  persistent: boolean;
  shift: OverlayShiftState;
  flip: OverlayFlipState;
  boundary: string | null;
  boundaryElement: HTMLElement | null;
  fallbackPlacements: PositionPlacement[] | null;
}

export abstract class BaseOverlayCore<T extends IBaseAdapter> implements IBaseOverlayCore {
  constructor(protected _adapter: T) {}

  public initialize(): void {}
  public abstract destroy(): void;
  public abstract position(): void;

  public abstract anchorElement: HTMLElement | VirtualElement | null;
  public abstract anchor: string | null;
  public abstract noAnchor: boolean;
  public abstract open: boolean;
  public abstract inline: boolean;
  public abstract placement: OverlayPlacement;
  public abstract positionStrategy: OverlayPositionStrategy;
  public abstract offset: IOverlayOffset;
  public abstract hide: OverlayHideState;
  public abstract persistent: boolean;
  public abstract shift: OverlayShiftState;
  public abstract flip: OverlayFlipState;
  public abstract boundary: string | null;
  public abstract boundaryElement: HTMLElement | null;
  public abstract fallbackPlacements: PositionPlacement[] | null;
}
