import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IStateLayerAdapter } from './state-layer-adapter';
import { PointerState, StateLayerCoords, STATE_LAYER_CONSTANTS, TOUCH_DELAY_MS } from './state-layer-constants';

export interface IStateLayerFoundation extends ICustomElementFoundation {
  targetElement: HTMLElement | null;
  target: string | null;
  disabled: boolean;
  playAnimation(coords?: StateLayerCoords): void;
}

export class StateLayerFoundation implements IStateLayerFoundation {
  // State
  private _target: string | null = null;
  private _disabled = false;
  private _attached = false;
  private _deferred = true;
  private _pointerStartEvent: PointerEvent | undefined;
  private _pointerState: PointerState = PointerState.INACTIVE;
  private _checkBoundsAfterContextMenu = false;

  // Listeners
  private _pointerEnterListener: EventListener;
  private _pointerLeaveListener: EventListener;
  private _pointerDownListener: EventListener;
  private _pointerUpListener: EventListener;
  private _pointerCancelListener: EventListener;
  private _clickListener: EventListener;
  private _contextmenuListener: EventListener;

  constructor(private _adapter: IStateLayerAdapter) {
    this._pointerEnterListener = (evt: PointerEvent) => this._onPointerEnter(evt);
    this._pointerLeaveListener = (evt: PointerEvent) => this._onPointerLeave(evt);
    this._pointerDownListener = (evt: PointerEvent) => this._onPointerDown(evt);
    this._pointerUpListener = (evt: PointerEvent) => this._onPointerUp(evt);
    this._pointerCancelListener = (evt: PointerEvent) => this._onPointerCancel(evt);
    this._clickListener = () => this._onClick();
    this._contextmenuListener = () => this._onContextmenu();
  }

  public initialize(): void {
    this._adapter.trySetTarget(this._target);

    // We defer initialization until the first pointerenter event is received.
    //
    // This is a performance optimization to avoid attaching many listeners to the target element
    // until the user is first interacting with it.
    this._deferInitialization();
  }

  public disconnect(): void {
    this._pointerStartEvent = undefined;
    this._pointerState = PointerState.INACTIVE;
    this._adapter.setHovered(false);
    this._adapter.setPressed(false);
    this._removeListeners(); // Must be called before destroying adapter
    this._adapter.destroy();
  }

  public playAnimation(coords?: StateLayerCoords): void {
    this._adapter.startAnimation(coords);
    this._endAnimation();
  }

  private _deferInitialization(): void {
    this._adapter.deferInitialization(this._onDeferredInitialize.bind(this));
  }

  private _applyListeners(): void {
    if (this._disabled) {
      return;
    }

    this._adapter.addTargetListener('pointerenter', this._pointerEnterListener);
    this._adapter.addTargetListener('pointerleave', this._pointerLeaveListener);
    this._adapter.addTargetListener('pointerdown', this._pointerDownListener);
    this._adapter.addTargetListener('pointerup', this._pointerUpListener);
    this._adapter.addTargetListener('pointercancel', this._pointerCancelListener);
    this._adapter.addTargetListener('click', this._clickListener);
    this._adapter.addTargetListener('contextmenu', this._contextmenuListener);
    this._attached = true;
  }

  private _removeListeners(): void {
    this._adapter.removeTargetListener('pointerenter', this._pointerEnterListener);
    this._adapter.removeTargetListener('pointerleave', this._pointerLeaveListener);
    this._adapter.removeTargetListener('pointerdown', this._pointerDownListener);
    this._adapter.removeTargetListener('pointerup', this._pointerUpListener);
    this._adapter.removeTargetListener('pointercancel', this._pointerCancelListener);
    this._adapter.removeTargetListener('click', this._clickListener);
    this._adapter.removeTargetListener('contextmenu', this._contextmenuListener);
    this._attached = false;
  }

  private _onDeferredInitialize(evt?: PointerEvent): void {
    this._applyListeners();

    if (evt?.type === 'pointerenter') {
      // Manually trigger the pointerenter listener since this is in response to a pointerenter event already
      this._pointerEnterListener(evt);
    }
    
    this._deferred = false;
  }

  private _onPointerEnter(evt: PointerEvent): void {
    if (!this._canHandleEvent(evt)) {
      return;
    }
    this._adapter.setHovered(true);
  }

  private _onPointerLeave(evt: PointerEvent): void {
    if (!this._canHandleEvent(evt)) {
      return;
    }

    this._adapter.setHovered(false);

    if (this._pointerState !== PointerState.INACTIVE) {
      this._adapter.endAnimation();
    }
  }

  private async _onPointerDown(evt: PointerEvent): Promise<void> {
    this._pointerStartEvent = evt;

    if (!this._canHandleEvent(evt)) {
      return;
    }
    
    if (!this._isTouch(evt.pointerType)) {
      this._pointerState = PointerState.WAITING_FOR_CLICK;
      this._startAnimation(evt);
      return;
    }

    // after a longpress contextmenu event, an extra `pointerdown` can be
    // dispatched to the pressed element. Check that the down is within
    // bounds of the element in this case.
    if (this._checkBoundsAfterContextMenu && !this._adapter.inBounds(evt.x, evt.y)) {
      return;
    }

    this._checkBoundsAfterContextMenu = false;

    this._pointerState = PointerState.TOUCH_DELAY;
    await new Promise(resolve => setTimeout(resolve, TOUCH_DELAY_MS));

    if (this._pointerState !== PointerState.TOUCH_DELAY) {
      return;
    }

    this._pointerState = PointerState.HOLDING;
    this._startAnimation(evt);
  }

  private _onPointerUp(evt: PointerEvent): void {
    if (!this._canHandleEvent(evt)) {
      return;
    }

    if (this._pointerState === PointerState.HOLDING) {
      this._pointerState = PointerState.WAITING_FOR_CLICK;
      return;
    }

    if (this._pointerState === PointerState.TOUCH_DELAY) {
      this._pointerState = PointerState.WAITING_FOR_CLICK;
      this._startAnimation(this._pointerStartEvent);
      return;
    }
  }

  private _onClick(): void {
    if (this._disabled) {
      return;
    }

    if (this._pointerState === PointerState.WAITING_FOR_CLICK) {
      this._endAnimation();
      return;
    }

    if (this._pointerState === PointerState.INACTIVE) {
      this._startAnimation(this._pointerStartEvent);
      this._endAnimation();
    }
  }

  private _onPointerCancel(evt: PointerEvent): void {
    if (!this._canHandleEvent(evt)) {
      return;
    }
    this._endAnimation();
  }

  private _onContextmenu(): void {
    if (this._disabled) {
      return;
    }

    this._checkBoundsAfterContextMenu = true;
    this._adapter.endAnimation();
  }

  private _startAnimation(evt?: PointerEvent): void {
    const coords = evt ? StateLayerCoords.fromPointerEvent(evt) : undefined;
    this._adapter.startAnimation(coords);
  }

  private _endAnimation(): void {
    this._pointerState = PointerState.INACTIVE;
    this._adapter.endAnimation();
    this._pointerStartEvent = undefined;
  }

  private _canHandleEvent({ type, isPrimary, buttons, pointerType, pointerId }: PointerEvent): boolean {
    if (this._disabled || !isPrimary) {
      return false;
    }

    if (this._pointerStartEvent && this._pointerStartEvent.pointerId !== pointerId) {
      return false;
    }

    if (type === 'pointerenter' || type === 'pointerleave') {
      return !this._isTouch(pointerType);
    }

    const isPrimaryButton = buttons === 1;
    return this._isTouch(pointerType) || isPrimaryButton;
  }

  private _isTouch(pointerType: string): boolean {
    return pointerType === 'touch';
  }

  public get isAttached(): boolean {
    return this._attached;
  }

  public get targetElement(): HTMLElement | null {
    return this._adapter.getTargetElement();
  }
  public set targetElement(el: HTMLElement | null) {
    // Always remove the listeners from the previous target element
    if (this._attached) {
      this._removeListeners();
    } else {
      // If unattached destroy the defer listener to recreate on the new target element
      this._adapter.destroy();
      this._deferred = false;
    }

    this._adapter.setTargetElement(el);

    // If we are not already deferring attaching the listeners, then do that now
    if (!this._deferred) {
      this._deferInitialization();
    }
  }

  public get target(): string | null {
    return this._adapter.getHostAttribute(STATE_LAYER_CONSTANTS.attributes.TARGET);
  }
  public set target(value: string | null) {
    if (this._target !== value) {
      this._target = value;

      if (this._adapter.isConnected) {
        if (this._attached) {
          this._removeListeners();
        } else {
          this._adapter.destroy();
          this._deferred = false;
        }

        this._adapter.trySetTarget(value);

        if (!this._deferred) {
          this._deferInitialization();
        }
      }

      this._adapter.toggleHostAttribute(STATE_LAYER_CONSTANTS.attributes.TARGET, Boolean(this._target), this._target as string);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    value = Boolean(value);
    if (this._disabled !== value) {
      this._disabled = value;

      if (this._adapter.isConnected) {
        if (this._disabled) {
          this._removeListeners();
        } else if (!this._deferred) {
          this._deferInitialization();
        }
      }

      this._adapter.toggleHostAttribute(STATE_LAYER_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }
}
