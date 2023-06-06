import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IOverlayAdapter } from './overlay-adapter';
import { IOverlayPosition, OverlayPlacement, OverlayPositionStrategy, OVERLAY_CONSTANTS } from './overlay-constants';

export interface IOverlayFoundation extends ICustomElementFoundation {
  open: boolean;
  targetElement: HTMLElement;
  placement: OverlayPlacement;
  positionStrategy: OverlayPositionStrategy;
  offset: IOverlayPosition;
  hideWhenClipped: boolean;
  static: boolean;
  position(): void;
}

// TODO: Remove when native typings support this interface
interface ToggleEvent extends Event {
  newState: 'closed' | 'open';
  oldState: 'closed' | 'open';
}

export class OverlayFoundation implements IOverlayFoundation {
  private _isConnected = false;
  private _open = false;
  private _targetElement: HTMLElement;
  private _placement: OverlayPlacement = 'bottom-start';
  private _positionStrategy: OverlayPositionStrategy = 'absolute';
  private _offset: IOverlayPosition = { x: 0, y: 0 };
  private _hideWhenClipped = true;
  private _static = false;
  private _lightDismissListener: (evt: ToggleEvent) => void;

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
      hide: this._hideWhenClipped,
      offset: this._offset
    });
  }

  private _onLightDismiss(): void {
    this._applyOpen(false);
  }

  private _applyOpen(newState: boolean): void {
    if (this._open === newState || !this._isConnected) {
      return;
    }

    this._open = newState;
    
    const isCancelled = this._adapter.dispatchHostEvent({
      type: 'forge-overlay-beforetoggle',
      detail: { open: this._open },
      cancelable: true,
      composed: true
    });
    if (isCancelled) {
      this._open = !newState;
      return;
    }
    
    this._adapter.setOpen(this._open);

    this._adapter.dispatchHostEvent({ type: 'forge-overlay-toggle', detail: { open: this._open }, composed: true });

    if (this._open) {
      if (!this._static) {
        this._adapter.addLightDismissListener(this._lightDismissListener);
      }
    } else {
      this._adapter.removeLightDismissListener(this._lightDismissListener);
    }

    this.position();

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

  public get offset(): IOverlayPosition {
    return this._offset;
  }
  public set offset(value: IOverlayPosition) {
    this._offset = value;
  }

  public get hideWhenClipped(): boolean {
    return this._hideWhenClipped;
  }
  public set hideWhenClipped(value: boolean) {
    if (this._hideWhenClipped !== !!value) {
      this._hideWhenClipped = !!value;
      this._adapter.toggleHostAttribute(OVERLAY_CONSTANTS.attributes.HIDE_WHEN_CLIPPED, this._hideWhenClipped);
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
}
