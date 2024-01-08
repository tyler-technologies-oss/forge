import { coerceBoolean } from '@tylertech/forge-core';
import { AbstractConstructor, MixinBase } from '../../constants';
import { coerceStringToArray } from '../../core/utils/utils';
import { IBaseComponent } from '../../core/base/base-component';
import { IOverlayComponent } from '../overlay';
import { IOverlayOffset, OverlayFlipState, OverlayHideState, OverlayPlacement, OverlayPositionStrategy, OVERLAY_CONSTANTS } from '../overlay-constants';
import { PositionPlacement, VirtualElement } from '../../core/utils/position-utils';

/**
 * An element that exposes a common API to its underlying `<forge-overlay>`.
 */
export interface IWithOverlayAware extends IBaseComponent {
  /**
   * The underlying `<forge-overlay>` element.
   */
  readonly overlayElement: IOverlayComponent;

  /**
   * The element to which the overlay is anchored.
   */
  anchorElement: HTMLElement | VirtualElement | null;

  /**
   * The CSS selector of the element to which the overlay is anchored.
   */
  anchor: string | null;

  /**
   * Whether the overlay is open.
   */
  open: boolean;

  /**
   * Whether the overlay is inline.
   */
  inline: boolean;

  /**
   * The placement of the overlay.
   */
  placement: OverlayPlacement;

  /**
   * The position strategy of the overlay.
   */
  positionStrategy: OverlayPositionStrategy;

  /**
   * The offset of the overlay.
   */
  offset: IOverlayOffset;

  /**
   * Whether the overlay shifts to avoid being cut off.
   */
  shift: boolean;

  /**
   * Whether the overlay hides when the anchor is clicked.
   */
  hide: boolean;

  /**
   * Whether the overlay is persistent (disables light dismiss).
   */
  persistent: boolean;

  /**
   * Whether the overlay flips when it would be cut off.
   */
  flip: boolean;

  /**
   * The id for the position boundary element that is an ancestor of the overlay.
   */
  boundary: string | null;

  /**
   * The position boundary element that is an ancestor of the overlay.
   */
  boundaryElement: HTMLElement | null;

  /**
   * The fallback placements of the overlay.
   */
  fallbackPlacements: OverlayPlacement[] | null;

  /**
   * Positions the overlay.
   */
  position(): void;
}

export declare abstract class WithOverlayAwareContract {
  public get overlayElement(): IOverlayComponent;

  public anchorElement: HTMLElement | VirtualElement | null;
  public anchor: string | null;
  public open: boolean;
  public inline: boolean;
  public placement: OverlayPlacement;
  public positionStrategy: OverlayPositionStrategy;
  public offset: IOverlayOffset;
  public shift: boolean;
  public hide: OverlayHideState;
  public persistent: boolean;
  public flip: OverlayFlipState;
  public boundary: string | null;
  public boundaryElement: HTMLElement | null;
  public fallbackPlacements: OverlayPlacement[] | null;

  public position(): void;
  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}

/**
 * 
 * 
 * @param base The base component to mix into.
 * @returns The mixed-in base component.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function WithOverlayAware<TBase extends MixinBase>(base: TBase) {
  abstract class OverlayAware extends base implements WithOverlayAwareContract {
    //
    // Abstract members
    //

    public abstract readonly overlayElement: IOverlayComponent;

    //
    // Public members
    //

    public get anchorElement(): HTMLElement | VirtualElement | null {
      return this.overlayElement.anchorElement;
    }
    public set anchorElement(value: HTMLElement | VirtualElement | null) {
      this.overlayElement.anchorElement = value;
    }

    public get anchor(): string | null {
      return this.overlayElement.anchor;
    }
    public set anchor(value: string | null) {
      this.overlayElement.anchor = value;
    }

    public get open(): boolean {
      return this.overlayElement.open;
    }
    public set open(value: boolean) {
      this.overlayElement.open = value;
    }

    public get inline(): boolean {
      return this.overlayElement.inline;
    }
    public set inline(value: boolean) {
      this.overlayElement.inline = value;
    }

    public get placement(): OverlayPlacement {
      return this.overlayElement.placement;
    }
    public set placement(value: OverlayPlacement) {
      this.overlayElement.placement = value;
    }

    public get positionStrategy(): OverlayPositionStrategy {
      return this.overlayElement.positionStrategy;
    }
    public set positionStrategy(value: OverlayPositionStrategy) {
      this.overlayElement.positionStrategy = value;
    }

    public get offset(): IOverlayOffset {
      return this.overlayElement.offset;
    }
    public set offset(value: IOverlayOffset) {
      this.overlayElement.offset = value;
    }

    public get shift(): boolean {
      return this.overlayElement.shift;
    }
    public set shift(value: boolean) {
      this.overlayElement.shift = value;
    }

    public get hide(): OverlayHideState {
      return this.overlayElement.hide;
    }
    public set hide(value: OverlayHideState) {
      this.overlayElement.hide = value;
    }

    public get persistent(): boolean {
      return this.overlayElement.persistent;
    }
    public set persistent(value: boolean) {
      this.overlayElement.persistent = value;
    }

    public get flip(): OverlayFlipState {
      return this.overlayElement.flip;
    }
    public set flip(value: OverlayFlipState) {
      this.overlayElement.flip = value;
    }

    public get boundary(): string | null {
      return this.overlayElement.boundary;
    }
    public set boundary(value: string | null) {
      this.overlayElement.boundary = value;
    }

    public get boundaryElement(): HTMLElement | null {
      return this.overlayElement.boundaryElement;
    }
    public set boundaryElement(value: HTMLElement | null) {
      this.overlayElement.boundaryElement = value;
    }

    public get fallbackPlacements(): PositionPlacement[] | null {
      return this.overlayElement.fallbackPlacements;
    }
    public set fallbackPlacements(value: PositionPlacement[] | null) {
      this.overlayElement.fallbackPlacements = value;
    }

    //
    // Public methods
    //

    public position(): void {
      this.overlayElement.position();
    }

    public attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
      super.attributeChangedCallback?.(name, _oldValue, newValue);

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
        case OVERLAY_CONSTANTS.observedAttributes.FALLBACK_PLACEMENTS:
          this.fallbackPlacements = newValue?.trim() ? coerceStringToArray<PositionPlacement>(newValue) : null;
          break;
      }
    }
  }

  return OverlayAware as AbstractConstructor<WithOverlayAwareContract> & TBase;
}
