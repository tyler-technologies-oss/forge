import { ICustomElementFoundation, getEventPath } from '@tylertech/forge-core';

import { ISpinnerAdapter } from './spinner-adapter';
import { SPINNER_CONSTANTS } from './spinner-constants';

export interface ISpinnerFoundation extends ICustomElementFoundation {
  disabled: boolean;
}

export class SpinnerFoundation implements ISpinnerFoundation {
  private _disabled = false;
  private _currentAction: 'increment' | 'decrement' | null = null;
  private _timeoutId: number | undefined;
  private _intervalId: number | undefined;
  private _pointerDownHandler: (event: PointerEvent) => void;
  private _pointerUpHandler: (event: PointerEvent) => void;
  private _pointerEnterHandler: (event: PointerEvent) => void;

  constructor(private _adapter: ISpinnerAdapter) {
    this._pointerDownHandler = (event: PointerEvent) => this._onPointerDown(event);
    this._pointerUpHandler = (event: PointerEvent) => this._onPointerUp(event);
    this._pointerEnterHandler = (event: PointerEvent) => this._onPointerEnter(event);
  }

  public initialize(): void {
    this._adapter.registerPointerDownHandler(this._pointerDownHandler);
  }

  public disconnect(): void {
    this._cancelAction();
    this._adapter.deregisterPointerDownHandler(this._pointerDownHandler);
    this._adapter.deregisterPointerUpHandler(this._pointerUpHandler);
    this._adapter.deregisterPointerEnterHandler(this._pointerEnterHandler);
  }

  private _onPointerDown(event: PointerEvent): void {
    this._adapter.toggleActive(true);
    this._adapter.registerPointerUpHandler(this._pointerUpHandler);
    this._adapter.registerPointerEnterHandler(this._pointerEnterHandler);
    this._detectCurrentAction(event);
    this._startAction();
  }

  private _onPointerUp(event: PointerEvent): void {
    this._cancelAction();
    this._adapter.toggleActive(false);
    this._adapter.deregisterPointerUpHandler(this._pointerUpHandler);
    this._adapter.deregisterPointerEnterHandler(this._pointerEnterHandler);
  }

  private _onPointerEnter(event: PointerEvent): void {
    this._detectCurrentAction(event);
  }

  private _detectCurrentAction(event: PointerEvent): void {
    const composedPath = getEventPath(event);
    const buttonElement = composedPath.find(el => el.classList && el.classList.contains(SPINNER_CONSTANTS.classes.BUTTON));
    if (buttonElement) {
      this._currentAction = buttonElement.id === SPINNER_CONSTANTS.ids.INCREMENT ? 'increment': 'decrement';
    }
  }

  /**
   * Executes the action once, waits for the delay time to pass, then re-executes at a set interval
   * until cancelled.
   */
  private _startAction(): void {
    this._handleAction();

    this._timeoutId = window.setTimeout(() => {
      this._intervalId = window.setInterval(() => {
        this._handleAction();
      }, SPINNER_CONSTANTS.numbers.REPEAT_DEBOUNCE_MILLISECONDS);
    }, SPINNER_CONSTANTS.numbers.REPEAT_DELAY_MILLISECONDS);
  }

  private _handleAction(): void {
    const eventType = this._currentAction === 'increment' ? SPINNER_CONSTANTS.events.INCREMENT : SPINNER_CONSTANTS.events.DECREMENT;
    this._adapter.emitHostEvent(eventType, null, true, false);
  }

  private _cancelAction(): void {
    window.clearTimeout(this._timeoutId);
    window.clearInterval(this._intervalId);
    this._currentAction = null;
  }

  /** Whether the spinner is disabled. */
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._applyDisabled();
    }
  }

  private _applyDisabled(): void {
    this._adapter.toggleHostAttribute(SPINNER_CONSTANTS.attributes.DISABLED, this._disabled);
    this._adapter.toggleDisabled(this._disabled);

    if (this._disabled) {
      this._cancelAction();
      this._adapter.deregisterPointerDownHandler(this._pointerDownHandler);
      this._adapter.deregisterPointerUpHandler(this._pointerUpHandler);
      this._adapter.deregisterPointerEnterHandler(this._pointerEnterHandler);
    } else {
      this._adapter.registerPointerDownHandler(this._pointerDownHandler);
    }
  }
}
