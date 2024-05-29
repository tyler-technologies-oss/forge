import { coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { IOverlayComponent } from '../overlay';
import { IOverlayAwareFoundation } from './overlay-aware-foundation';
import { IOverlayOffset, OverlayFlipState, OverlayHideState, OverlayPlacement, OverlayPositionStrategy, OVERLAY_CONSTANTS } from '../overlay-constants';
import { PositionPlacement, VirtualElement } from '../../core/utils/position-utils';
import { IBaseOverlay } from './base-overlay';

export interface IOverlayAware extends IBaseComponent, IBaseOverlay {
  readonly overlay: IOverlayComponent;
}

/**
 * @property {HTMLElement | VirtualElement | null} anchorElement - The anchor element to position the overlay relative to.
 * @property {string | null} anchor - The IDREF of the anchor element to position the overlay relative to.
 * @property {boolean} [noAnchor=false] - Whether the overlay should not be anchored to an element. This allows for custom positioning.
 * @property {boolean} [open=false] - Whether the overlay is open.
 * @property {boolean} [inline=false] - Whether the overlay is inline (not in the top-layer).
 * @property {OverlayPlacement} [placement="bottom"] - The placement of the overlay.
 * @property {OverlayPositionStrategy} [positionStrategy="fixed"] - The position strategy of the overlay.
 * @property {IOverlayOffset} [offset={}] - The offset of the overlay.
 * @property {boolean} [shift=false] - Whether the overlay should shift to fit within the viewport.
 * @property {OverlayHideState} [hide="anchor-hidden"] - The hide state of the overlay.
 * @property {boolean} [persistent=false] - Whether the overlay should persist when the anchor is removed.
 * @property {OverlayFlipState} [flip="auto"] - Whether the overlay should flip placements to another side fit within the viewport.
 * @property {string | null} boundary - An IDREF to boundary element to constrain the overlay within.
 * @property {HTMLElement | null} boundaryElement - The boundary element instance to constrain the overlay within.
 * @property {PositionPlacement[] | null} fallbackPlacements - The fallback placements of the overlay.
 * @property {IOverlayComponent} overlay - A readonly reference to the internal `<forge-overlay>` element instance.
 *
 * @attribute {string | null} anchor - The IDREF of the anchor element to position the overlay relative to.
 * @attribute {boolean} [no-anchor=false] - Whether the overlay should not be anchored to an element. This allows for custom positioning.
 * @attribute {boolean} [open=false] - Whether the overlay is open.
 * @attribute {boolean} [inline=false] - Whether the overlay is inline.
 * @attribute {OverlayPlacement} [placement="bottom"] - The placement of the overlay.
 * @attribute {OverlayPositionStrategy} [position-strategy="fixed"] - The position strategy of the overlay.
 * @attribute {IOverlayOffset} offset - The offset of the overlay.
 * @attribute {boolean} [shift=false] - Whether the overlay should shift to fit within the viewport.
 * @attribute {OverlayHideState} [hide="anchor-hidden"] - The hide state of the overlay.
 * @attribute {boolean} [persistent=false] - Whether the overlay should persist when the anchor is removed.
 * @attribute {OverlayFlipState} [flip="auto"] - Whether the overlay should flip placements to another side fit within the viewport.
 * @attribute {string | null} boundary - An IDREF to boundary element to constrain the overlay within.
 */
export abstract class OverlayAware<T extends IOverlayAwareFoundation> extends BaseComponent implements IOverlayAware {
  protected _foundation: T;

  constructor() {
    super();
  }

  /**
   * Forces the overlay to reposition itself.
   */
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
    }
  }

  public get overlay(): IOverlayComponent {
    return this._foundation.overlayElement;
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
}
