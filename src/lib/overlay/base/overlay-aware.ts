import { coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { IOverlayComponent } from '../overlay';
import { IOverlayAwareFoundation } from './overlay-aware-foundation';
import { IOverlayOffset, OverlayFlipState, OverlayHideState, OverlayPlacement, OverlayPositionStrategy, OVERLAY_CONSTANTS } from '../overlay-constants';

export interface IOverlayAware extends IBaseComponent {
  anchorElement: HTMLElement;
  anchor: string | null;
  open: boolean;
  inline: boolean;
  placement: OverlayPlacement;
  positionStrategy: OverlayPositionStrategy;
  offset: IOverlayOffset;
  shift: boolean;
  hide: OverlayHideState;
  persistent: boolean;
  flip: OverlayFlipState;
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
    }
  }

  public get overlay(): IOverlayComponent {
    return this._foundation.overlayElement;
  }

  @FoundationProperty()
  public anchorElement: HTMLElement;

  @FoundationProperty()
  public declare anchor: string | null;

  @FoundationProperty()
  public open: boolean;

  @FoundationProperty()
  public inline: boolean;

  @FoundationProperty()
  public placement: OverlayPlacement;

  @FoundationProperty()
  public positionStrategy: OverlayPositionStrategy;

  @FoundationProperty()
  public offset: IOverlayOffset;

  @FoundationProperty()
  public shift: boolean;

  @FoundationProperty()
  public hide: OverlayHideState;

  @FoundationProperty()
  public persistent: boolean;

  @FoundationProperty()
  public flip: OverlayFlipState;
}
