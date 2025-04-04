import { Nullable, task } from '../core/utils/utils';
import { ILabelAdapter } from './label-adapter';
import { ILabelAware } from './label-aware';
import { LABEL_CONSTANTS } from './label-constants';

export interface ILabelCore {
  for: Nullable<string>;
  forElement: Nullable<HTMLElement>;
  dynamic: boolean;
  nonInteractive: boolean;
  legend: boolean;
  destroy(): void;
  update(): void;
  updateTarget(target: HTMLElement & ILabelAware): boolean;
}

export class LabelCore implements ILabelCore {
  // State
  private _for: Nullable<string>;
  private _forElement: Nullable<HTMLElement>;
  private _clickTarget: Nullable<HTMLElement>;
  private _dynamic = false;
  private _nonInteractive = false;
  private _legend = false;
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
    if (this._legend) {
      this._initializeAsLegend();
    } else {
      this._initializeAsLabel();
    }
  }

  public destroy(): void {
    this._disconnect();
    this._adapter.destroy();
  }

  public update(): void {
    this._adapter.updateTargetLabel();
  }

  public updateTarget(target: HTMLElement & ILabelAware): boolean {
    this._adapter.setTargetElement(target);
    if (this._adapter.hasTargetElement()) {
      this._connect();
      return true;
    }
    return false;
  }

  /**
   * Emit an event to give ancestor elements a chance to connect
   */
  private async _initializeAsLegend(): Promise<void> {
    // Give ancestor elements a chance to connect to the DOM
    // TODO: see if this works in Angular
    await task();
    this._adapter.dispatchHostEvent(new CustomEvent(LABEL_CONSTANTS.events.CONNECTED, { bubbles: true }));
  }

  /**
   * Search for child or id-targetted elements to connect to
   */
  private async _initializeAsLabel(): Promise<void> {
    this._adapter.addSlotChangeListener(this._slotChangeListener);
    this._adapter.trySetTarget(this._for ?? null);
    if (this._adapter.hasTargetElement()) {
      this._connect();
    }
  }

  private _handleClick(evt: PointerEvent): void {
    // Prevent duplicate clicks from a nested target element or if the event originates
    // from within the target element
    const targetEl = this._clickTarget ?? this._adapter.getTargetElement();
    if (evt.target === targetEl || targetEl?.contains(evt.target as Node)) {
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
    if (!this._nonInteractive) {
      this._adapter.addHostListener('click', this._clickListener);
    }
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

  public get for(): Nullable<string> {
    return this._for;
  }
  public set for(value: Nullable<string>) {
    if (this._for !== value) {
      this._for = value;
      this._adapter.toggleHostAttribute(LABEL_CONSTANTS.attributes.FOR, !!this.for, this.for ?? undefined);
      this._adapter.trySetTarget(this._for ?? null);
      this._tryConnect();
    }
  }

  public get forElement(): Nullable<HTMLElement> {
    return this._forElement;
  }
  public set forElement(value: Nullable<HTMLElement>) {
    if (this._forElement !== value) {
      this._forElement = value;
      this._adapter.setTargetElement(this._forElement ?? null);
      this._tryConnect();
    }
  }

  public get clickTarget(): Nullable<HTMLElement> {
    return this._clickTarget;
  }
  public set clickTarget(value: Nullable<HTMLElement>) {
    if (this._clickTarget !== value) {
      this._clickTarget = value;
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

  public get nonInteractive(): boolean {
    return this._nonInteractive;
  }
  public set nonInteractive(value: boolean) {
    if (this._nonInteractive !== value) {
      this._nonInteractive = value;
      this._adapter.toggleHostAttribute(LABEL_CONSTANTS.attributes.NON_INTERACTIVE, this._nonInteractive);

      // The click listener is only added if the label is connected
      if (!this._isConnected) {
        return;
      }

      if (this._nonInteractive) {
        this._adapter.removeHostListener('click', this._clickListener);
      } else {
        this._adapter.addHostListener('click', this._clickListener);
      }
    }
  }

  public get legend(): boolean {
    return this._legend;
  }
  public set legend(value: boolean) {
    if (this._legend !== value) {
      this._legend = value;
      this._adapter.toggleHostAttribute(LABEL_CONSTANTS.attributes.LEGEND, this._legend);

      if (this._legend) {
        this._adapter.removeSlotChangeListener(this._slotChangeListener);
        this._adapter.dispatchHostEvent(new CustomEvent(LABEL_CONSTANTS.events.CONNECTED, { bubbles: true }));
        return;
      }

      this._adapter.addSlotChangeListener(this._slotChangeListener);
      this._adapter.trySetTarget(this._for ?? null);
      if (this._adapter.hasTargetElement()) {
        this._connect();
      }
    }
  }
}
