
import { IBaseOverlayFoundation, BaseOverlayFoundation } from './base/base-overlay-foundation';
import { IOverlayAdapter } from './overlay-adapter';
import { SUPPORTS_POPOVER, IOverlayOffset, OverlayLightDismissEventData, OverlayPlacement, OverlayPositionStrategy, OVERLAY_CONSTANTS, OverlayFlipState, OverlayHideState, OverlayLightDismissReason } from './overlay-constants';

export interface IOverlayFoundation extends IBaseOverlayFoundation {
  arrowElement: HTMLElement;
  arrowElementOffset: number;
}

export class OverlayFoundation extends BaseOverlayFoundation<IOverlayAdapter> implements IOverlayFoundation {
  private _anchorElement: HTMLElement;
  private _anchor: string | null;
  private _open = false;
  private _inline = false;
  private _placement: OverlayPlacement = 'bottom';
  private _positionStrategy: OverlayPositionStrategy = 'fixed';
  private _offset: IOverlayOffset = {};
  private _shift = false;
  private _hide = OVERLAY_CONSTANTS.defaults.HIDE as OverlayHideState;
  private _flip = OVERLAY_CONSTANTS.defaults.FLIP as OverlayFlipState;
  private _boundary: string | null;
  private _boundaryElement: HTMLElement | null;
  private _fallbackPlacements: OverlayPlacement[] | null = null;
  private _auto = false;
  private _static = false;
  private _arrowElement: HTMLElement;
  private _arrowElementOffset = 0;
  private _lightDismissListener = this._onLightDismiss.bind(this);

  constructor(adapter: IOverlayAdapter) {
    super(adapter);
  }

  public initialize(): void {
    if (!this._anchorElement && this._anchor) {
      const anchor = this._adapter.locateAnchorElement(this._anchor);
      if (anchor) {
        this._anchorElement = anchor;
      }
    }

    if (!SUPPORTS_POPOVER) {
      this.inline = true;
    }

    if (this._adapter.hasHostAttribute(OVERLAY_CONSTANTS.attributes.OPEN)) {
      this._applyOpen(true);
    }
  }

  public destroy(): void {
    if (this._open) {
      this._hideOverlay();
    }
  }

  public position(): void {
    if (!this._open || !this._anchorElement) {
      return;
    }

    this._adapter.positionElement({
      anchorElement: this._anchorElement,
      strategy: this._positionStrategy,
      placement: this._placement,
      hide: this._hide,
      offset: this._offset,
      shift: this._shift,
      flip: this._flip,
      auto: this._auto,
      boundary: this._boundary,
      boundaryElement: this._boundaryElement,
      fallbackPlacements: this._fallbackPlacements ?? undefined
    });
  }

  private _onLightDismiss(reason: OverlayLightDismissReason): void {
    const detail: OverlayLightDismissEventData = { reason };
    const evt = new CustomEvent<OverlayLightDismissEventData>(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, { bubbles: false, cancelable: true, detail });
    this._adapter.dispatchHostEvent(evt);
    if (evt.defaultPrevented) {
      return;
    }
    this._applyOpen(false);
  }

  protected _applyOpen(value: boolean): void {
    if (!this._adapter.isConnected) {
      return;
    }

    this._open = value;

    if (this._open) {
      this._showOverlay();
    } else {
      this._hideOverlay();
    }

    this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.OPEN, this._open);
  }

  private _showOverlay(): void {
    this._adapter.show();
      
    if (!this._static) {
      this._applyLightDismissListener();
    }

    if (this._anchorElement) {
      this.position();
    }
  }

  private _hideOverlay(): void {
    this._adapter.hide();
    this._adapter.removeLightDismissListener();
  }

  private _applyLightDismissListener(): void {
    this._adapter.addLightDismissListener(this._lightDismissListener);
  }

  public get anchorElement(): HTMLElement {
    return this._anchorElement;
  }
  public set anchorElement(value: HTMLElement) {
    this._anchorElement = value;
  }

  public get anchor(): string | null {
    return this._anchor;
  }
  public set anchor(value: string | null) {
    if (this._anchor !== value) {
      this._anchor = value;
      if (this._adapter.isConnected && this._anchor) {
        const anchor = this._adapter.locateAnchorElement(this._anchor);
        if (anchor) {
          this._anchorElement = anchor;
        }
      }
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.ANCHOR, !!this._anchor, this._anchor as string);
    }
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    value = Boolean(value);
    if (this._open !== value) {
      this._applyOpen(value);
    }
  }

  public get arrowElement(): HTMLElement {
    return this._arrowElement;
  }
  public set arrowElement(value: HTMLElement) {
    this._arrowElement = value;
    if (this._open) {
      this.position();
    }
  }

  public get arrowElementOffset(): number {
    return this._arrowElementOffset;
  }
  public set arrowElementOffset(value: number) {
    this._arrowElementOffset = value;
    if (this._open) {
      this.position();
    }
  }

  public get inline(): boolean {
    return this._inline;
  }
  public set inline(value: boolean) {
    // We force inline mode to true when the native Popover API isn't supported
    value = SUPPORTS_POPOVER ? Boolean(value) : true;
    if (this._inline !== value) {
      this._inline = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.INLINE, this._inline);
    }
  }

  public get placement(): OverlayPlacement {
    return this._placement;
  }
  public set placement(value: OverlayPlacement) {
    if (this._placement !== value) {
      this._placement = value;
      if (this._open) {
        this.position();
      }
      this._adapter.setHostAttribute(OVERLAY_CONSTANTS.attributes.PLACEMENT, this._placement);
    }
  }

  public get positionStrategy(): OverlayPositionStrategy {
    return this._positionStrategy;
  }
  public set positionStrategy(value: OverlayPositionStrategy) {
    if (this._positionStrategy !== value) {
      this._positionStrategy = value;
      if (this._open) {
        this.position();
      }
      this._adapter.setHostAttribute(OVERLAY_CONSTANTS.attributes.POSITION_STRATEGY, this._positionStrategy);
    }
  }

  public get offset(): IOverlayOffset {
    return this._offset;
  }
  public set offset(value: IOverlayOffset) {
    this._offset = value;
    if (this._open) {
      this.position();
    }
  }

  public get shift(): boolean {
    return this._shift;
  }
  public set shift(value: boolean) {
    value = Boolean(value);
    if (this._shift !== value) {
      this._shift = value;
      if (this._open) {
        this.position();
      }
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.SHIFT, this._shift);
    }
  }

  public get hide(): OverlayHideState {
    return this._hide;
  }
  public set hide(value: OverlayHideState) {
    if (this._hide !== value) {
      this._hide = value ?? OVERLAY_CONSTANTS.defaults.HIDE;
      if (this._open) {
        this.position();
      }
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.HIDE, this._hide !== OVERLAY_CONSTANTS.defaults.HIDE, String(this._hide));
    }
  }

  public get static(): boolean {
    return this._static;
  }
  public set static(value: boolean) {
    value = Boolean(value);
    if (this._static !== value) {
      this._static = value;
  
      if (this._static) {
        this._adapter.removeLightDismissListener();
      } else if (this._open) {
        this._applyLightDismissListener();
      }

      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.STATIC, this._static);
    }
  }

  public get flip(): OverlayFlipState {
    return this._flip;
  }
  public set flip(value: OverlayFlipState) {
    if (this._flip !== value) {
      this._flip = value ?? OVERLAY_CONSTANTS.defaults.FLIP;
      if (this._open) {
        this.position();
      }
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.FLIP, this._flip !== OVERLAY_CONSTANTS.defaults.FLIP, String(this._flip));
    }
  }

  public get boundary(): string | null {
    return this._boundary;
  }
  public set boundary(value: string | null) {
    if (this._boundary !== value) {
      this._boundary = value;
      if (this._open) {
        this.position();
      }
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.BOUNDARY, !!this._boundary, this._boundary as string);
    }
  }

  public get boundaryElement(): HTMLElement | null {
    return this._boundaryElement;
  }
  public set boundaryElement(value: HTMLElement | null) {
    this._boundaryElement = value;
    if (this._open) {
      this.position();
    }
  }

  public get fallbackPlacements(): OverlayPlacement[] | null {
    return this._fallbackPlacements;
  }
  public set fallbackPlacements(value: OverlayPlacement[] | null) {
    this._fallbackPlacements = value;
    if (this._open) {
      this.position();
    }
  }

  public get auto(): boolean {
    return this._auto;
  }
  public set auto(value: boolean) {
    value = Boolean(value);
    if (this._auto !== value) {
      this._auto = value;
      if (this._open) {
        this.position();
      }
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.AUTO, this._auto);
    }
  }
}