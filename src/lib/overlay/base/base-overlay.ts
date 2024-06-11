import { coerceBoolean, coreProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { IBaseOverlayCore } from './base-overlay-core';
import { IOverlayOffset, OverlayFlipState, OverlayHideState, OverlayPlacement, OverlayPositionStrategy, OVERLAY_CONSTANTS } from '../overlay-constants';
import { coerceStringToArray } from '../../core/utils';
import { PositionPlacement, VirtualElement } from '../../core/utils/position-utils';

export interface IBaseOverlay extends IBaseComponent {
  anchorElement: HTMLElement | VirtualElement | null;
  anchor: string | null;
  noAnchor: boolean;
  open: boolean;
  inline: boolean;
  placement: OverlayPlacement;
  positionStrategy: OverlayPositionStrategy;
  offset: IOverlayOffset;
  shift: boolean;
  hide: OverlayHideState;
  persistent: boolean;
  flip: OverlayFlipState;
  boundary: string | null;
  boundaryElement: HTMLElement | null;
  fallbackPlacements: PositionPlacement[] | null;
  position(): void;
}

export abstract class BaseOverlay<T extends IBaseOverlayCore> extends BaseComponent implements IBaseOverlay {
  protected _core: T;

  constructor() {
    super();
  }

  public position(): void {
    this._core.position();
  }

  public attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case OVERLAY_CONSTANTS.observedAttributes.ANCHOR:
        this.anchor = newValue;
        break;
      case OVERLAY_CONSTANTS.observedAttributes.NO_ANCHOR:
        this.noAnchor = coerceBoolean(newValue);
        break;
      case OVERLAY_CONSTANTS.observedAttributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case OVERLAY_CONSTANTS.observedAttributes.INLINE:
        this.inline = coerceBoolean(newValue);
        break;
      case OVERLAY_CONSTANTS.observedAttributes.PLACEMENT:
        this.placement = newValue as OverlayPlacement;
        break;
      case OVERLAY_CONSTANTS.observedAttributes.POSITION_STRATEGY:
        this.positionStrategy = newValue as OverlayPositionStrategy;
        break;
      case OVERLAY_CONSTANTS.observedAttributes.HIDE:
        this.hide = newValue as OverlayHideState;
        break;
      case OVERLAY_CONSTANTS.observedAttributes.PERSISTENT:
        this.persistent = coerceBoolean(newValue);
        break;
      case OVERLAY_CONSTANTS.observedAttributes.SHIFT:
        this.shift = coerceBoolean(newValue);
        break;
      case OVERLAY_CONSTANTS.observedAttributes.FLIP:
        this.flip = newValue as OverlayFlipState;
        break;
      case OVERLAY_CONSTANTS.observedAttributes.BOUNDARY:
        this.boundary = newValue;
        break;
      case OVERLAY_CONSTANTS.observedAttributes.FALLBACK_PLACEMENTS:
        this.fallbackPlacements = newValue?.trim() ? coerceStringToArray<PositionPlacement>(newValue) : null;
        break;
    }
  }

  @coreProperty()
  public declare anchorElement: HTMLElement | VirtualElement | null;

  @coreProperty()
  public declare anchor: string | null;

  @coreProperty()
  public declare noAnchor: boolean;

  @coreProperty()
  public declare open: boolean;

  @coreProperty()
  public declare inline: boolean;

  @coreProperty()
  public declare placement: OverlayPlacement;

  @coreProperty()
  public declare positionStrategy: OverlayPositionStrategy;

  @coreProperty()
  public declare offset: IOverlayOffset;

  @coreProperty()
  public declare shift: boolean;

  @coreProperty()
  public declare hide: OverlayHideState;

  @coreProperty()
  public declare persistent: boolean;

  @coreProperty()
  public declare flip: OverlayFlipState;

  @coreProperty()
  public declare boundary: string | null;

  @coreProperty()
  public declare boundaryElement: HTMLElement | null;

  @coreProperty()
  public declare fallbackPlacements: PositionPlacement[] | null;
}
