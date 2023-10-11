import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IBaseAdapter } from '../core';
import { IOverlayOffset, OverlayPlacement, OverlayPositionStrategy } from './overlay-constants';

export interface IBaseOverlayFoundation extends ICustomElementFoundation {
  initialize(): void;
  disconnect(): void;
  position(): void;
  targetElement: HTMLElement;
  target: string | null;
  open: boolean;
  inline: boolean;
  placement: OverlayPlacement;
  positionStrategy: OverlayPositionStrategy;
  offset: IOverlayOffset;
  hide: boolean;
  static: boolean;
  shift: boolean;
  flip: boolean;
  auto: boolean;
  dialog: boolean;
  modal: boolean;
}

export abstract class BaseOverlayFoundation<T extends IBaseAdapter> implements IBaseOverlayFoundation {
  constructor(protected _adapter: T) {}

  public initialize(): void {}
  public abstract disconnect(): void;
  public abstract position(): void;

  public abstract targetElement: HTMLElement;
  public abstract target: string | null;
  public abstract open: boolean;
  public abstract inline: boolean;
  public abstract placement: OverlayPlacement;
  public abstract positionStrategy: OverlayPositionStrategy;
  public abstract offset: IOverlayOffset;
  public abstract hide: boolean;
  public abstract static: boolean;
  public abstract shift: boolean;
  public abstract flip: boolean;
  public abstract auto: boolean;
  public abstract dialog: boolean;
  public abstract modal: boolean;
}
