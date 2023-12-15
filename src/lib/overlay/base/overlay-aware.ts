import { coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { IOverlayComponent } from '../overlay';
import { IOverlayAwareFoundation } from './overlay-aware-foundation';
import { IOverlayOffset, OverlayPlacement, OverlayPositionStrategy, OVERLAY_CONSTANTS } from '../overlay-constants';

export interface IOverlayAware extends IBaseComponent {
  targetElement: HTMLElement;
  target: string | null;
  open: boolean;
  inline: boolean;
  placement: OverlayPlacement;
  positionStrategy: OverlayPositionStrategy;
  offset: IOverlayOffset;
  shift: boolean;
  hide: boolean;
  static: boolean;
  flip: boolean;
  auto: boolean;
  dialog: boolean;
  modal: boolean;
  position(): void;
  overlay: IOverlayComponent;
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
      case OVERLAY_CONSTANTS.observedAttributes.TARGET:
        this.target = newValue;
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
        this.hide = coerceBoolean(newValue);
        break;
      case OVERLAY_CONSTANTS.observedAttributes.STATIC:
        this.static = coerceBoolean(newValue);
        break;
      case OVERLAY_CONSTANTS.observedAttributes.SHIFT:
        this.shift = coerceBoolean(newValue);
        break;
      case OVERLAY_CONSTANTS.observedAttributes.NO_FLIP:
        this.flip = !coerceBoolean(newValue);
        break;
      case OVERLAY_CONSTANTS.observedAttributes.AUTO:
        this.auto = coerceBoolean(newValue);
        break;
      case OVERLAY_CONSTANTS.observedAttributes.DIALOG:
        this.dialog = coerceBoolean(newValue);
        break;
      case OVERLAY_CONSTANTS.observedAttributes.MODAL:
        this.modal = coerceBoolean(newValue);
        break;
    }
  }

  public get overlay(): IOverlayComponent {
    return this._foundation.overlayElement;
  }

  @FoundationProperty()
  public targetElement: HTMLElement;

  @FoundationProperty()
  public declare target: string | null;

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
  public hide: boolean;

  @FoundationProperty()
  public static: boolean;

  @FoundationProperty()
  public flip: boolean;

  @FoundationProperty()
  public auto: boolean;

  @FoundationProperty()
  public dialog: boolean;

  @FoundationProperty()
  public modal: boolean;
}
