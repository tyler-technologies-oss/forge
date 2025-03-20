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
  declare public anchorElement: HTMLElement | VirtualElement | null;

  @coreProperty()
  declare public anchor: string | null;

  @coreProperty()
  declare public noAnchor: boolean;

  @coreProperty()
  declare public open: boolean;

  @coreProperty()
  declare public inline: boolean;

  @coreProperty()
  declare public placement: OverlayPlacement;

  @coreProperty()
  declare public positionStrategy: OverlayPositionStrategy;

  @coreProperty()
  declare public offset: IOverlayOffset;

  @coreProperty()
  declare public shift: boolean;

  @coreProperty()
  declare public hide: OverlayHideState;

  @coreProperty()
  declare public persistent: boolean;

  @coreProperty()
  declare public flip: OverlayFlipState;

  @coreProperty()
  declare public boundary: string | null;

  @coreProperty()
  declare public boundaryElement: HTMLElement | null;

  @coreProperty()
  declare public fallbackPlacements: PositionPlacement[] | null;
}
