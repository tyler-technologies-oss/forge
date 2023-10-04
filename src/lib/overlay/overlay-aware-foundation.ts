import { IBaseOverlayFoundation } from './base-overlay-foundation';
import { IOverlayAwareAdapter } from './overlay-aware-adapter';
import { IOverlayOffset, OverlayPlacement, OverlayPositionStrategy, OverlayToggleEventData, OVERLAY_CONSTANTS } from './overlay-constants';

export interface IOverlayAwareFoundation extends IBaseOverlayFoundation {}

export abstract class OverlayAwareFoundation<T extends IOverlayAwareAdapter> implements IOverlayAwareFoundation {
  private _toggleListener: (evt: CustomEvent<OverlayToggleEventData>) => void;

  constructor(protected _adapter: T) {
    this._toggleListener = (evt: CustomEvent<OverlayToggleEventData>) => this._onToggle(evt);
  }

  public abstract disconnect(): void;
  protected abstract _onToggle(evt: CustomEvent<OverlayToggleEventData>): void;

  public initialize(): void {
    this._adapter.overlay.addEventListener(OVERLAY_CONSTANTS.events.TOGGLE, this._toggleListener);
  }

  public get open(): boolean {
    return this._adapter.overlay.open;
  }
  public set open(value: boolean) {
    this._adapter.overlay.open = value;
  }

  public get inline(): boolean {
    return this._adapter.overlay.inline;
  }
  public set inline(value: boolean) {
    this._adapter.overlay.inline = value;
  }

  public get placement(): OverlayPlacement {
    return this._adapter.overlay.placement;
  }
  public set placement(value: OverlayPlacement) {
    this._adapter.overlay.placement = value;
  }

  public get positionStrategy(): OverlayPositionStrategy {
    return this._adapter.overlay.positionStrategy;
  }
  public set positionStrategy(value: OverlayPositionStrategy) {
    this._adapter.overlay.positionStrategy = value;
  }

  public get offset(): IOverlayOffset {
    return this._adapter.overlay.offset;
  }
  public set offset(value: IOverlayOffset) {
    this._adapter.overlay.offset = value;
  }

  public get hide(): boolean {
    return this._adapter.overlay.hide;
  }
  public set hide(value: boolean) {
    this._adapter.overlay.hide = value;
  }

  public get static(): boolean {
    return this._adapter.overlay.static;
  }
  public set static(value: boolean) {
    this._adapter.overlay.static = value;
  }
  
  public position(): void {
    this._adapter.overlay.position();
  }
}
