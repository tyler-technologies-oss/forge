import { IBaseOverlayFoundation } from './base-overlay-foundation';
import { IOverlayComponent } from '../overlay';
import { IOverlayAwareAdapter } from './overlay-aware-adapter';
import { IOverlayOffset, OverlayFlipState, OverlayHideState, OverlayPlacement, OverlayPositionStrategy, OVERLAY_CONSTANTS } from '../overlay-constants';
import { PositionPlacement } from '../../core/utils/position-utils';

export interface IOverlayAwareFoundation extends IBaseOverlayFoundation {
  readonly overlayElement: IOverlayComponent;
}

export abstract class OverlayAwareFoundation<T extends IOverlayAwareAdapter> implements IOverlayAwareFoundation {
  private _lightDismissListener: (evt: CustomEvent) => void;

  constructor(protected _adapter: T) {
    this._lightDismissListener = (evt: CustomEvent) => this._onOverlayLightDismiss(evt);
  }

  protected abstract _onOverlayLightDismiss(evt: CustomEvent): void;

  public initialize(): void {
    if (!this.persistent) {
      this._adapter.overlayElement.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, this._lightDismissListener);
    }
  }

  public destroy(): void {
    this._adapter.overlayElement.removeEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, this._lightDismissListener);
  }

  public get overlayElement(): IOverlayComponent {
    return this._adapter.overlayElement;
  }

  public get anchorElement(): HTMLElement | null {
    return this._adapter.overlayElement.anchorElement;
  }
  public set anchorElement(value: HTMLElement | null) {
    this._adapter.overlayElement.anchorElement = value;
  }

  public get anchor(): string | null {
    return this._adapter.overlayElement.anchor;
  }
  public set anchor(value: string | null) {
    this._adapter.overlayElement.anchor = value;
  }

  public get open(): boolean {
    return this._adapter.overlayElement.open;
  }
  public set open(value: boolean) {
    this._adapter.overlayElement.open = value;
    this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.OPEN, this._adapter.overlayElement.open);
  }

  public get inline(): boolean {
    return this._adapter.overlayElement.inline;
  }
  public set inline(value: boolean) {
    if (this._adapter.overlayElement.inline !== value) {
      this._adapter.overlayElement.inline = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.INLINE, this._adapter.overlayElement.inline);
    }
  }

  public get placement(): OverlayPlacement {
    return this._adapter.overlayElement.placement;
  }
  public set placement(value: OverlayPlacement) {
    if (this._adapter.overlayElement.placement !== value) {
      this._adapter.overlayElement.placement = value;
      this._adapter.setHostAttribute(OVERLAY_CONSTANTS.attributes.PLACEMENT, this._adapter.overlayElement.placement);
    }
  }

  public get positionStrategy(): OverlayPositionStrategy {
    return this._adapter.overlayElement.positionStrategy;
  }
  public set positionStrategy(value: OverlayPositionStrategy) {
    this._adapter.overlayElement.positionStrategy = value;
    this._adapter.setHostAttribute(OVERLAY_CONSTANTS.attributes.POSITION_STRATEGY, this._adapter.overlayElement.positionStrategy);
  }

  public get offset(): IOverlayOffset {
    return this._adapter.overlayElement.offset;
  }
  public set offset(value: IOverlayOffset) {
    if (this._adapter.overlayElement.offset !== value) {
      this._adapter.overlayElement.offset = value;
    }
  }

  public get hide(): OverlayHideState {
    return this._adapter.overlayElement.hide;
  }
  public set hide(value: OverlayHideState) {
    if (this._adapter.overlayElement.hide !== value) {
      this._adapter.overlayElement.hide = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.HIDE, this._adapter.overlayElement.hide !== OVERLAY_CONSTANTS.defaults.HIDE, String(this._adapter.overlayElement.hide));
    }
  }

  public get persistent(): boolean {
    return this._adapter.overlayElement.persistent;
  }
  public set persistent(value: boolean) {
    if (this._adapter.overlayElement.persistent !== value) {
      this._adapter.overlayElement.persistent = value;

      if (!this.persistent) {
        this._adapter.overlayElement.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, this._lightDismissListener);
      } else {
        this._adapter.overlayElement.removeEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, this._lightDismissListener);
      }

      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.PERSISTENT, this._adapter.overlayElement.persistent);
    }
  }

  public get shift(): boolean {
    return this._adapter.overlayElement.shift;
  }
  public set shift(value: boolean) {
    if (this._adapter.overlayElement.shift !== value) {
      this._adapter.overlayElement.shift = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.SHIFT, this._adapter.overlayElement.shift);
    }
  }

  public get flip(): OverlayFlipState {
    return this._adapter.overlayElement.flip;
  }
  public set flip(value: OverlayFlipState) {
    if (this._adapter.overlayElement.flip !== value) {
      this._adapter.overlayElement.flip = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.FLIP, this._adapter.overlayElement.flip !== OVERLAY_CONSTANTS.defaults.FLIP, String(this._adapter.overlayElement.flip));
    }
  }
  
  public get boundary(): string | null {
    return this._adapter.overlayElement.boundary;
  }
  public set boundary(value: string | null) {
    if (this._adapter.overlayElement.boundary !== value) {
      this._adapter.overlayElement.boundary = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.BOUNDARY, !!this._adapter.overlayElement.boundary, this._adapter.overlayElement.boundary as string);
    }
  }

  public get boundaryElement(): HTMLElement | null {
    return this._adapter.overlayElement.boundaryElement;
  }
  public set boundaryElement(value: HTMLElement | null) {
    if (this._adapter.overlayElement.boundaryElement !== value) {
      this._adapter.overlayElement.boundaryElement = value;
    }
  }

  public get fallbackPlacements(): PositionPlacement[] | null {
    return this._adapter.overlayElement.fallbackPlacements;
  }
  public set fallbackPlacements(value: PositionPlacement[] | null) {
    if (this._adapter.overlayElement.fallbackPlacements !== value) {
      this._adapter.overlayElement.fallbackPlacements = value;
    }
  }

  public position(): void {
    this._adapter.overlayElement.position();
  }
}
