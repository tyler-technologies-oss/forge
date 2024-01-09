import { coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { IBaseOverlayFoundation } from './base-overlay-foundation';
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

export abstract class BaseOverlay<T extends IBaseOverlayFoundation> extends BaseComponent implements IBaseOverlay {
  protected _foundation: T;

  constructor() {
    super();
  }

  public position(): void {
    this._foundation.position();
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

  @FoundationProperty()
  public declare anchorElement: HTMLElement | VirtualElement | null;

  @FoundationProperty()
  public declare anchor: string | null;

  @FoundationProperty()
  public declare noAnchor: boolean;

  @FoundationProperty()
  public declare open: boolean;

  @FoundationProperty()
  public declare inline: boolean;

  @FoundationProperty()
  public declare placement: OverlayPlacement;

  @FoundationProperty()
  public declare positionStrategy: OverlayPositionStrategy;

  @FoundationProperty()
  public declare offset: IOverlayOffset;

  @FoundationProperty()
  public declare shift: boolean;

  @FoundationProperty()
  public declare hide: OverlayHideState;

  @FoundationProperty()
  public declare persistent: boolean;

  @FoundationProperty()
  public declare flip: OverlayFlipState;

  @FoundationProperty()
  public declare boundary: string | null;

  @FoundationProperty()
  public declare boundaryElement: HTMLElement | null;

  @FoundationProperty()
  public declare fallbackPlacements: PositionPlacement[] | null;

  @FoundationProperty()
  public declare auto: boolean;
}
