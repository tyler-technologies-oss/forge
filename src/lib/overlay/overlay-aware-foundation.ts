import { IBaseOverlayFoundation } from './base-overlay-foundation';
import { IOverlayComponent } from './overlay';
import { IOverlayAwareAdapter } from './overlay-aware-adapter';
import { IOverlayOffset, OverlayPlacement, OverlayPositionStrategy, OVERLAY_CONSTANTS } from './overlay-constants';

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
    if (!this.static) {
      this._adapter.overlayElement.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, this._lightDismissListener);
    }
  }

  public disconnect(): void {
    this._adapter.overlayElement.removeEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, this._lightDismissListener);
  }

  public get overlayElement(): IOverlayComponent {
    return this._adapter.overlayElement;
  }

  public get targetElement(): HTMLElement {
    return this._adapter.overlayElement.targetElement;
  }
  public set targetElement(value: HTMLElement) {
    this._adapter.overlayElement.targetElement = value;
  }

  public get target(): string | null {
    return this._adapter.overlayElement.target;
  }
  public set target(value: string | null) {
    this._adapter.overlayElement.target = value;
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

  public get hide(): boolean {
    return this._adapter.overlayElement.hide;
  }
  public set hide(value: boolean) {
    if (this._adapter.overlayElement.hide !== value) {
      this._adapter.overlayElement.hide = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.HIDE, this._adapter.overlayElement.hide);
    }
  }

  public get static(): boolean {
    return this._adapter.overlayElement.static;
  }
  public set static(value: boolean) {
    if (this._adapter.overlayElement.static !== value) {
      this._adapter.overlayElement.static = value;

      if (!this.static) {
        this._adapter.overlayElement.addEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, this._lightDismissListener);
      } else {
        this._adapter.overlayElement.removeEventListener(OVERLAY_CONSTANTS.events.LIGHT_DISMISS, this._lightDismissListener);
      }

      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.STATIC, this._adapter.overlayElement.static);
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

  public get flip(): boolean {
    return this._adapter.overlayElement.flip;
  }
  public set flip(value: boolean) {
    if (this._adapter.overlayElement.flip !== value) {
      this._adapter.overlayElement.flip = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.NO_FLIP, !this._adapter.overlayElement.flip);
    }
  }

  public get auto(): boolean {
    return this._adapter.overlayElement.auto;
  }
  public set auto(value: boolean) {
    if (this._adapter.overlayElement.auto !== value) {
      this._adapter.overlayElement.auto = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.AUTO, this._adapter.overlayElement.auto);
    }
  }

  public get dialog(): boolean {
    return this._adapter.overlayElement.dialog;
  }
  public set dialog(value: boolean) {
    if (this._adapter.overlayElement.dialog !== value) {
      this._adapter.overlayElement.dialog = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.DIALOG, this._adapter.overlayElement.dialog);
    }
  }

  public get modal(): boolean {
    return this._adapter.overlayElement.modal;
  }
  public set modal(value: boolean) {
    if (this._adapter.overlayElement.modal !== value) {
      this._adapter.overlayElement.modal = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.MODAL, this._adapter.overlayElement.modal);
    }
  }
  
  public position(): void {
    this._adapter.overlayElement.position();
  }
}
