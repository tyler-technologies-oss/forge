import { coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { IOverlayComponent } from '../overlay';
import { IOverlayAwareFoundation } from './overlay-aware-foundation';
import { IOverlayOffset, OverlayFlipState, OverlayHideState, OverlayPlacement, OverlayPositionStrategy, OVERLAY_CONSTANTS } from '../overlay-constants';

export interface IOverlayAware extends IBaseComponent {
  anchorElement: HTMLElement | null;
  anchor: string | null;
  open: boolean;
  inline: boolean;
  placement: OverlayPlacement;
  positionStrategy: OverlayPositionStrategy;
  offset: IOverlayOffset;
  shift: boolean;
  hide: OverlayHideState;
  boundary: string | null;
  boundaryElement: HTMLElement | null;
  persistent: boolean;
  flip: OverlayFlipState;
  fallbackPlacements: OverlayPlacement[] | null;
  position(): void;
  readonly overlay: IOverlayComponent;
}

export abstract class OverlayAware<T extends IOverlayAwareFoundation> extends BaseComponent implements IOverlayAware {
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
    }
  }

  public get overlay(): IOverlayComponent {
    return this._foundation.overlayElement;
  }

  @FoundationProperty()
  public declare anchorElement: HTMLElement | null;

  @FoundationProperty()
  public declare anchor: string | null;

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
  public declare fallbackPlacements: OverlayPlacement[] | null;
}
