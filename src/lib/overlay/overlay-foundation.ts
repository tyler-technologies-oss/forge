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
  position(): void;
  show(): Promise<void>;
  hide(): Promise<void>;
}

export class OverlayFoundation implements IOverlayFoundation {
  private _open = false;
  private _targetElement: HTMLElement;
  private _placement: OverlayPlacement = 'bottom-start';
  private _positionStrategy: OverlayPositionStrategy = 'fixed';
  private _offset: IOverlayPosition = { x: 0, y: 0 };
  private _hideWhenClipped = true;

  constructor(private _adapter: IOverlayAdapter) {}

  public initialize(): void {

  }

  public disconnect(): void {
    this._adapter.tryCleanupAutoUpdate();
  }

  public position(): void {

  }

  public show(): Promise<void> {
    return new Promise<void>(resolve => resolve());
  }

  public hide(): Promise<void> {
    return new Promise<void>(resolve => resolve());
  }

  private _applyOpen(): void {
    this._adapter.setOpen(this._open);
    if (this._targetElement) {
      this._adapter.positionElement(this._targetElement, this._positionStrategy, this._placement, this._hideWhenClipped, this._offset);
    }
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    if (this._open !== value) {
      this._open = !!value;
      this._applyOpen();
      this._adapter.setHostAttribute(OVERLAY_CONSTANTS.attributes.OPEN, `${this._open}`);
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
    if (this._hideWhenClipped !== value) {
      this._hideWhenClipped = value;
      this._adapter.setHostAttribute(OVERLAY_CONSTANTS.attributes.HIDE_WHEN_CLIPPED, `${this._hideWhenClipped}`);
    }
  }
}
