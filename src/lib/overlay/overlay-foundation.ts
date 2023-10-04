
import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IOverlayAdapter } from './overlay-adapter';
import { IOverlayOffset, OverlayPlacement, OverlayPositionStrategy, OverlayToggleEvent, OverlayToggleEventData, OVERLAY_CONSTANTS } from './overlay-constants';

export interface IOverlayFoundation extends ICustomElementFoundation {
  targetElement: HTMLElement;
  arrowElement: HTMLElement;
  arrowElementOffset: number;
  inline: boolean;
  placement: OverlayPlacement;
  positionStrategy: OverlayPositionStrategy;
  offset: IOverlayOffset;
  shift: boolean;
  hide: boolean;
  static: boolean;
}

export class OverlayFoundation implements IOverlayFoundation {
  private _isConnected = false;
  private _open = false;
  private _inline = false;
  private _placement: OverlayPlacement = 'bottom';
  private _positionStrategy: OverlayPositionStrategy = 'fixed';
  private _offset: IOverlayOffset = {};
  private _shift = false;
  private _hide = true;
  private _flip = true;
  private _auto = false;
  private _static = false;
  private _targetElement: HTMLElement;
  private _arrowElement: HTMLElement;
  private _arrowElementOffset = 0;
  private _lightDismissListener: (evt: OverlayToggleEvent) => void;

  constructor(private _adapter: IOverlayAdapter) {
    this._lightDismissListener = evt => {
      if (evt.newState === 'closed') {
        this._onLightDismiss();
      }
    };
  }

  public initialize(): void {
    this._isConnected = true;
    this._adapter.initialize();
  }

  public disconnect(): void {
    this._adapter.tryCleanupAutoUpdate();
    this._isConnected = false;
  }

  public position(): void {
    if (!this._open || !this._targetElement) {
      return;
    }

    this._adapter.positionElement({
      targetElement: this._targetElement,
      strategy: this._positionStrategy,
      placement: this._placement,
      hide: this._hide,
      offset: this._offset,
      shift: this._shift,
      flip: this._flip,
      auto: this._auto
    });
  }

  private _onLightDismiss(): void {
    this._applyOpen(false);
  }

  protected _applyOpen(newState: boolean): void {
    if (this._open === newState || !this._isConnected) {
      return;
    }

    const oldState = this._open;
    this._open = newState;
    
    const isCancelled = this._adapter.dispatchHostEvent({
      type: OVERLAY_CONSTANTS.events.BEFORETOGGLE,
      detail: { open: this._open } as OverlayToggleEventData,
      cancelable: true,
      composed: true
    });
    if (isCancelled) {
      this._open = oldState;
      return;
    }
    
    this._adapter.setOpen(this._open);

    this._adapter.dispatchHostEvent({
      type: OVERLAY_CONSTANTS.events.TOGGLE,
      detail: { open: this._open } as OverlayToggleEventData,
      composed: true
    });

    if (this._open) {
      if (!this._static) {
        this._adapter.addLightDismissListener(this._lightDismissListener);
      }
    } else {
      this._adapter.removeLightDismissListener(this._lightDismissListener);
    }

    if (this._open) {
      this.position();
    }
    
    this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.OPEN, this._open);
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

  public get targetElement(): HTMLElement {
    return this._targetElement;
  }
  public set targetElement(value: HTMLElement) {
    this._targetElement = value;
  }

  public get arrowElement(): HTMLElement {
    return this._arrowElement;
  }
  public set arrowElement(value: HTMLElement) {
    this._arrowElement = value;
  }

  public get arrowElementOffset(): number {
    return this._arrowElementOffset;
  }
  public set arrowElementOffset(value: number) {
    this._arrowElementOffset = value;
  }

  public get inline(): boolean {
    return this._inline;
  }
  public set inline(value: boolean) {
    value = Boolean(value);
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
      this._adapter.setHostAttribute(OVERLAY_CONSTANTS.attributes.PLACEMENT, this._placement);
    }
  }

  public get positionStrategy(): OverlayPositionStrategy {
    return this._positionStrategy;
  }
  public set positionStrategy(value: OverlayPositionStrategy) {
    if (this._positionStrategy !== value) {
      this._positionStrategy = value;
      this._adapter.setHostAttribute(OVERLAY_CONSTANTS.attributes.POSITION_STRATEGY, this._positionStrategy);
    }
  }

  public get offset(): IOverlayOffset {
    return this._offset;
  }
  public set offset(value: IOverlayOffset) {
    this._offset = value;
  }

  public get shift(): boolean {
    return this._shift;
  }
  public set shift(value: boolean) {
    value = Boolean(value);
    if (this._shift !== value) {
      this._shift = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.SHIFT, this._shift);
    }
  }

  public get hide(): boolean {
    return this._hide;
  }
  public set hide(value: boolean) {
    if (this._hide !== !!value) {
      this._hide = !!value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.HIDE, this._hide);
    }
  }

  public get static(): boolean {
    return this._static;
  }
  public set static(value: boolean) {
    value = Boolean(value);
    if (this._static !== value) {
      this._static = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.STATIC, this._static);
    }
  }

  public get flip(): boolean {
    return this._flip;
  }
  public set flip(value: boolean) {
    value = Boolean(value);
    if (this._flip !== value) {
      this._flip = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.NO_FLIP, !this._flip);
    }
  }

  public get auto(): boolean {
    return this._auto;
  }
  public set auto(value: boolean) {
    value = Boolean(value);
    if (this._auto !== value) {
      this._auto = value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.AUTO, this._auto);
    }
  }
}
