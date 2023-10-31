import { IFocusIndicatorAdapter } from './focus-indicator-adapter';
import { FOCUS_INDICATOR_CONSTANTS } from './focus-indicator-constants';

export interface IFocusIndicatorFoundation {
  targetElement: HTMLElement | null;
  target: string | null;
  active: boolean;
  inward: boolean;
  circular: boolean;
  allowFocus: boolean;
  initialize(): void;
  destroy(): void;
}

export class FocusIndicatorFoundation implements IFocusIndicatorFoundation {
  private _target: string | null = null;
  private _active = false;
  private _inward = false;
  private _circular = false;
  private _allowFocus = false;
  private _interactionListener: EventListener;

  constructor(private _adapter: IFocusIndicatorAdapter) {
    this._interactionListener = evt => this._onInteraction(evt);
  }

  public initialize(): void {
    if (!this._adapter.hasTargetElement()) {
      this._adapter.trySetTarget(this._target);
    }
    this._addListeners();
  }

  public destroy(): void {
    this._removeListeners(); // Must be called before destroying adapter
    this._adapter.destroy();
  }

  private _addListeners(): void {
    this._adapter.addTargetListener('focusin', this._interactionListener);
    this._adapter.addTargetListener('focusout', this._interactionListener);
    this._adapter.addTargetListener('pointerdown', this._interactionListener);
  }

  private _removeListeners(): void {
    this._adapter.removeTargetListener('focusin', this._interactionListener);
    this._adapter.removeTargetListener('focusout', this._interactionListener);
    this._adapter.removeTargetListener('pointerdown', this._interactionListener);
  }

  private _onInteraction(evt: Event): void {
    const target = evt.target as HTMLElement | null;
    switch (evt.type) {
      case 'focusin':
        this.active = this._adapter.isActive(this._allowFocus ? ':focus' : ':focus-visible', target);
        break;
      case 'focusout':
        this.active = false;
        break;
      case 'pointerdown':
        this.active = this._allowFocus ? this._adapter.isActive(':focus', target) : this._adapter.isActive(':focus-visible', target);
        break;
    }
  }

  public get targetElement(): HTMLElement | null {
    return this._adapter.getTargetElement();
  }
  public set targetElement(value: HTMLElement | null) {
    this._removeListeners();
    this._adapter.setTargetElement(value);
    this._addListeners();
  }

  public get target(): string | null {
    return this._adapter.getHostAttribute(FOCUS_INDICATOR_CONSTANTS.attributes.TARGET);
  }
  public set target(value: string | null) {
    if (this._target !== value) {
      this._target = value;
      if (this._adapter.isConnected) {
        this._adapter.trySetTarget(value);
      }
      this._adapter.toggleHostAttribute(FOCUS_INDICATOR_CONSTANTS.attributes.TARGET, Boolean(this._target), this._target as string);
    }
  }

  public get active(): boolean {
    return this._active;
  }
  public set active(value: boolean) {
    value = Boolean(value);
    if (this._active !== value) {
      this._active = value;
      this._adapter.toggleHostAttribute(FOCUS_INDICATOR_CONSTANTS.attributes.ACTIVE, this._active);
    }
  }

  public get inward(): boolean {
    return this._inward;
  }
  public set inward(value: boolean) {
    value = Boolean(value);
    if (this._inward !== value) {
      this._inward = value;
      this._adapter.toggleHostAttribute(FOCUS_INDICATOR_CONSTANTS.attributes.INWARD, this._inward);
    }
  }

  public get circular(): boolean {
    return this._circular;
  }
  public set circular(value: boolean) {
    value = Boolean(value);
    if (this._circular !== value) {
      this._circular = value;
      this._adapter.toggleHostAttribute(FOCUS_INDICATOR_CONSTANTS.attributes.CIRCULAR, this._circular);
    }
  }

  public get allowFocus(): boolean {
    return this._allowFocus;
  }
  public set allowFocus(value: boolean) {
    value = Boolean(value);
    if (this._allowFocus !== value) {
      this._allowFocus = value;
      this._adapter.toggleHostAttribute(FOCUS_INDICATOR_CONSTANTS.attributes.ALLOW_FOCUS, this._allowFocus);
    }
  }
}
