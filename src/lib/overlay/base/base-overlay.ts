import { coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { IBaseOverlayFoundation } from './base-overlay-foundation';
import { IOverlayOffset, OverlayPlacement, OverlayPositionStrategy, OVERLAY_CONSTANTS } from '../overlay-constants';

export interface IBaseOverlay extends IBaseComponent {
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

  @FoundationProperty()
  public declare targetElement: HTMLElement;

  @FoundationProperty()
  public declare target: string | null;

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
  public declare hide: boolean;

  @FoundationProperty()
  public declare static: boolean;

  @FoundationProperty()
  public declare flip: boolean;

  @FoundationProperty()
  public declare auto: boolean;

  @FoundationProperty()
  public declare dialog: boolean;

  @FoundationProperty()
  public declare modal: boolean;
}
