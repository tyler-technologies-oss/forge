import { ICustomElementFoundation } from '@tylertech/forge-core';
import { ILabelAdapter } from './label-adapter';
import { LABEL_CONSTANTS } from './label-constants';

export interface ILabelFoundation extends ICustomElementFoundation {
  for: string | null | undefined;
  forElement: HTMLElement | null | undefined;
  freeze: boolean;
  disconnect(): void;
  update(): void;
}

export class LabelFoundation implements ILabelFoundation {
  // State
  private _for: string | null | undefined;
  private _forElement: HTMLElement | null | undefined;
  private _freeze = false;
  private _isConnected = false;

  // Listeners
  private readonly _clickListener: EventListener;
  private readonly _mutationCallback: MutationCallback;

  constructor(private _adapter: ILabelAdapter) {
    this._clickListener = (evt: PointerEvent) => this._handleClick(evt);
    this._mutationCallback = () => this._handleMutation();
  }

  public initialize(): void {
    this._adapter.trySetTarget(null);
    if (this._adapter.hasTargetElement()) {
      this._connect();
    }
  }

  public disconnect(): void {
    this._disconnect();
    this._adapter.destroy();
  }

  public update(): void {
    this._adapter.updateTargetLabel();
  }

  private _handleClick(evt: PointerEvent): void {
    // Prevent duplicate clicks from a nested target element
    if (evt.target === this._adapter.getTargetElement()) {
      return;
    }
    this._adapter.clickTarget();
  }

  private _handleMutation(): void {
    this._adapter.updateTargetLabel();
  }

  private _connect(): void {
    this._adapter.addHostListener('click', this._clickListener);
    if (!this._freeze) {
      this._adapter.addMutationObserver(this._mutationCallback);
    }
    this._isConnected = true;
  }

  private _disconnect(): void {
    this._adapter.removeHostListener('click', this._clickListener);
    this._adapter.removeMutationObserver();
    this._isConnected = false;
  }

  private _tryConnect(): void {
    if (!this._adapter.hasTargetElement()) {
      this._disconnect();
    } else if (!this._isConnected) {
      this._connect();
    }
  }

  public get for(): string | null | undefined {
    return this._for;
  }
  public set for(value: string | null | undefined) {
    if (this._for !== value) {
      this._for = value;
      this._adapter.toggleHostAttribute(LABEL_CONSTANTS.attributes.FOR, !!this.for, this.for ?? undefined);
      this._adapter.trySetTarget(this._for ?? null);
      this._tryConnect();
    }
  }

  public get forElement(): HTMLElement | null | undefined {
    return this._forElement;
  }
  public set forElement(value: HTMLElement | null | undefined) {
    if (this._forElement !== value) {
      this._forElement = value;
      this._adapter.setTargetElement(this._forElement ?? null);
      this._tryConnect();
    }
  }

  public get freeze(): boolean {
    return this._freeze;
  }
  public set freeze(value: boolean) {
    if (this._freeze !== value) {
      this._freeze = value;
      this._adapter.toggleHostAttribute(LABEL_CONSTANTS.attributes.FREEZE, this._freeze);
      if (this._freeze) {
        this._adapter.removeMutationObserver();
        this._adapter.updateTargetLabel();
      } else if (this._adapter.hasTargetElement()) {
        this._adapter.addMutationObserver(this._mutationCallback);
      }
    }
  }
}
