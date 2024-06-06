import { coerceBoolean, coreProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { IOverlayComponent } from '../overlay';
import { IOverlayAwareCore } from './overlay-aware-core';
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
export abstract class OverlayAware<T extends IOverlayAwareCore> extends BaseComponent implements IOverlayAware {
  protected _core: T;

  constructor() {
    super();
  }

  /**
   * Forces the overlay to reposition itself.
   */
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
    }
  }

  public get overlay(): IOverlayComponent {
    return this._core.overlayElement;
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
