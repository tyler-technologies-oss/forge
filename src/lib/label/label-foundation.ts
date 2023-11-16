import { ICustomElementFoundation } from '@tylertech/forge-core';
import { ILabelAdapter } from './label-adapter';
import { LABEL_CONSTANTS } from './label-constants';

export interface ILabelFoundation extends ICustomElementFoundation {
  for: string | null | undefined;
  forElement: HTMLElement | null | undefined;
  dynamic: boolean;
  disconnect(): void;
  update(): void;
}

export class LabelFoundation implements ILabelFoundation {
  // State
  private _for: string | null | undefined;
  private _forElement: HTMLElement | null | undefined;
  private _dynamic = false;
  private _isConnected = false;

  // Listeners
  private readonly _clickListener: EventListener;
  private readonly _slotChangeListener: EventListener;
  private readonly _mutationCallback: MutationCallback;

  constructor(private _adapter: ILabelAdapter) {
    this._clickListener = (evt: PointerEvent) => this._handleClick(evt);
    this._slotChangeListener = () => this._handleSlotChange();
    this._mutationCallback = () => this._handleMutation();
  }

  public initialize(): void {
    this._adapter.addSlotChangeListener(this._slotChangeListener);
    this._adapter.trySetTarget(this._for ?? null);
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

  private _handleSlotChange(): void {
    if (!this._for && !this._forElement) {
      this._adapter.trySetTarget(null);
      this._tryConnect();
    }
  }

  private _handleMutation(): void {
    this._adapter.updateTargetLabel();
  }

  private _connect(): void {
    this._adapter.addHostListener('click', this._clickListener);
    this._adapter.updateTargetLabel();
    if (this._dynamic) {
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

  public get dynamic(): boolean {
    return this._dynamic;
  }
  public set dynamic(value: boolean) {
    if (this._dynamic !== value) {
      this._dynamic = value;
      this._adapter.toggleHostAttribute(LABEL_CONSTANTS.attributes.DYNAMIC, this._dynamic);

      if (!this._dynamic) {
        this._adapter.removeMutationObserver();
      } else if (this._adapter.hasTargetElement()) {
        this._adapter.addMutationObserver(this._mutationCallback);
      }
    }
  }
}
