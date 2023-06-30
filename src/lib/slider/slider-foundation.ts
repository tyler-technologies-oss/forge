import { ICustomElementFoundation } from '@tylertech/forge-core';
import { ISliderAdapter } from './slider-adapter';
import { SLIDER_CONSTANTS } from './slider-constants';

export interface ISliderFoundation extends ICustomElementFoundation {
  ariaLabel: string | null;
  ariaLabelStart: string | null;
  ariaLabelEnd: string | null;
  value: number;
  valueStart: number;
  valueEnd: number;
  min: number;
  max: number;
  step: number;
  tickmarks: boolean;
  labeled: boolean;
  range: boolean;
  disabled: boolean;
}

export class SliderFoundation implements ISliderFoundation {
  // State
  private _value = 50;
  private _valueStart = 33;
  private _valueEnd = 67;
  private _min = 0;
  private _max = 100;
  private _step = SLIDER_CONSTANTS.numbers.DEFAULT_STEP;
  private _disabled = false;
  private _tickmarks = false;
  private _labeled = true;
  private _range = false;

  // Listeners
  private readonly _pointerEnterListener: EventListener;
  private readonly _pointerMoveListener: EventListener;
  private readonly _pointerLeaveListener: EventListener;
  private readonly _changeUpdateListener: EventListener;
  private readonly _focusListener: EventListener;

  constructor(private readonly _adapter: ISliderAdapter) {
    this._pointerEnterListener = (evt: PointerEvent) => this._handlePointerEnter(evt);
    this._pointerMoveListener = (evt: PointerEvent) => this._handlePointerMove(evt);
    this._pointerLeaveListener = (evt: PointerEvent) => this._handlePointerLeave(evt);
    this._changeUpdateListener = (evt: InputEvent) => this._handleInputUpdate(evt);
    this._focusListener = (evt: FocusEvent) => this._handleFocus(evt);
  }

  public initialize(): void {
    this._adapter.initialize();
    this._applyInputListeners();
    this._update();
  }

  public destroy(): void {
    this._adapter.destroy();
  }

  private _update(): void {
    const step = this._step <= 0 ? 1 : this._step;
    const range = Math.max(this._max - this._min, step);
    const startFraction = this._range ? ((this._valueStart ?? this._min) - this._min) / range : 0;
    const valueEnd = this._range ? this._valueEnd : this._value;
    const endFraction = ((valueEnd ?? this.min) - this.min) / range;
    const tickCount = range / step;
    this._adapter.update({
      startFraction,
      endFraction,
      tickCount,
      labels: this._labeled
    });
  }

  private _applyInputListeners(): void {
    this._adapter.addInputListener('pointerdown', (evt: PointerEvent) => {
      const input = evt.target as HTMLInputElement;
      const isStart = input.classList.contains('start');
      // If start and end are equal, then we need to determine which handle the user intends to use
      // based on their initial drag direction and potentially swap the inputs we are referencing
      console.log(`[${evt.type}]`, `"${input.id}"`);
      if (this._valueStart === this._valueEnd) {
        if (isStart) {
          if (input.valueAsNumber > this._valueEnd) {
            console.log('needs flip');
            // User attempted to drag the start input past the end input
            // (this._adapter as any)._endInput.valueAsNumber = input.valueAsNumber;
            // (this._adapter as any)._endInput.focus();
            // this._valueStart = this._valueEnd;
            // input.valueAsNumber = this._valueStart;
            // return;
          }
        } else {
          
        }
      }
    });
    this._adapter.addInputListener('pointerenter', this._pointerEnterListener);
    this._adapter.addInputListener('pointermove', this._pointerMoveListener);
    this._adapter.addInputListener('pointerleave', this._pointerLeaveListener);
    this._adapter.addInputListener('input', this._changeUpdateListener);
    this._adapter.addInputListener('change', this._changeUpdateListener);
    this._adapter.addInputListener('focus', this._focusListener);
  }

  private _handlePointerEnter(evt: PointerEvent): void {
    this._handlePointerMove(evt);
  }

  private _handlePointerMove(evt: PointerEvent): void {
    const { target, x, y } = evt;
    const which = (target as HTMLInputElement).id as 'start' | 'end';

    if (which === 'start') {
      this._adapter.tryHoverStartHandle({ x, y });
    } else {
      this._adapter.tryHoverEndHandle({ x, y });
    }

    if (this._range) {
      this._adapter.tryToggleOverlap();
    }
  }

  private _handlePointerLeave(evt: PointerEvent): void {
    this._adapter.tryBlurStartHandle();
    this._adapter.tryBlurEndHandle();
  }

  private _handleInputUpdate(evt: InputEvent): void {
    const input = evt.target as HTMLInputElement;
    
    if (this._range) {
      const isStart = input.classList.contains('start');

      if (isStart) {
        this._valueStart = input.valueAsNumber;
      } else {
        this._valueEnd = input.valueAsNumber;
      }

      // Clamp values to keep start and end from going past each other
      if (this._needsClamping()) {
        if (isStart) {
          this._valueStart = this._valueEnd;
        } else {
          this._valueEnd = this._valueStart;
        }

        // Ensure our underlying inputs are synchronized with our state since they
        // continue moving even when we clamp
        this._adapter.syncInputValues(this._valueStart, this._valueEnd);
        return; // We don't dispatch events when clamping
      }
    } else {
      this._value = input.valueAsNumber;
    }

    const type = evt.type === 'change' ? SLIDER_CONSTANTS.events.CHANGE : SLIDER_CONSTANTS.events.INPUT;
    const data = this._range ? { valueStart: this._valueStart, valueEnd: this._valueEnd } : this._value;
    this._adapter.emitHostEvent(type, data, true);
    this._update();
  }

  private _handleFocus(_evt: FocusEvent): void {
    this._adapter.updateHandleLayering();
  }

  private _needsClamping(): boolean {
    return this._valueStart > this._valueEnd || this._valueEnd < this._valueStart;
  }

  private _sanitizeNumberValue(value: number, fallback: number, min?: number, max?: number): number {
    // Validate min (if provided)
    if (typeof min === 'number' && value < min) {
      value = 0;
      return value;
    }

    // Validate max (if provided)
    if (typeof max === 'number' && value > max) {
      value = max;
      return value;
    }

    // Check for NaN and null/undefined
    if (isNaN(value)) {
      value = fallback;
    } else {
      value = value ?? fallback;
    }

    return value;
  }

  public get value(): number {
    return this._value;
  }
  public set value(value: number) {
    if (this._value !== value) {
      this._value = this._sanitizeNumberValue(value, 0, this._min, this._max);
      this._update();
      this._adapter.setHostAttribute(SLIDER_CONSTANTS.attributes.VALUE, String(this._value));
    }
  }

  public get valueStart(): number {
    return this._valueStart;
  }
  public set valueStart(value: number) {
    if (this._valueStart !== value) {
      this._valueStart = this._sanitizeNumberValue(value, 0, this._min, this._max);
      this._update();
      this._adapter.setHostAttribute(SLIDER_CONSTANTS.attributes.VALUE_START, String(this._valueStart));
    }
  }

  public get valueEnd(): number {
    return this._valueEnd;
  }
  public set valueEnd(value: number) {
    if (this._valueEnd !== value) {
      this._valueEnd = this._sanitizeNumberValue(value, 0, this._min, this._max);
      this._update();
      this._adapter.setHostAttribute(SLIDER_CONSTANTS.attributes.VALUE_END, String(this._valueEnd));
    }
  }

  public get min(): number {
    return this._min;
  }
  public set min(value: number) {
    if (this._min !== value) {
      this._min = this._sanitizeNumberValue(value, 0, 0, this._max);
      this._adapter.setMin(this._min);
      this._update();
      this._adapter.setHostAttribute(SLIDER_CONSTANTS.attributes.MIN, String(this._min));
    }
  }

  public get max(): number {
    return this._max;
  }
  public set max(value: number) {
    if (this._max !== value) {
      this._max = this._sanitizeNumberValue(value, 100, this._min, 100);
      this._adapter.setMax(this._max);
      this._update();
      this._adapter.setHostAttribute(SLIDER_CONSTANTS.attributes.MAX, String(this._max));
    }
  }

  public get step(): number {
    return this._step;
  }
  public set step(value: number) {
    if (this._step !== value) {
      this._step = this._sanitizeNumberValue(value, SLIDER_CONSTANTS.numbers.DEFAULT_STEP);
      this._adapter.setStep(this._step);
      this._update();
      this._adapter.setHostAttribute(SLIDER_CONSTANTS.attributes.STEP, String(this._step));
    }
  }

  public get tickmarks(): boolean {
    return this._tickmarks;
  }
  public set tickmarks(value: boolean) {
    if (this._tickmarks !== value) {
      this._tickmarks = value;
      this._adapter.setTickmarks(this._tickmarks);
      this._adapter.toggleHostAttribute(SLIDER_CONSTANTS.attributes.TICKMARKS, this._tickmarks);
    }
  }

  public get labeled(): boolean {
    return this._labeled;
  }
  public set labeled(value: boolean) {
    if (this._labeled !== value) {
      this._labeled = value;
      this._adapter.toggleLabels(this._labeled);
      this._adapter.toggleHostAttribute(SLIDER_CONSTANTS.attributes.LABELED, this._labeled);
    }
  }

  public get range(): boolean {
    return this._range;
  }
  public set range(value: boolean) {
    if (this._range !== value) {
      this._range = value;
      this._adapter.setRange(this._range);
      if (this._range) {
        this._applyInputListeners();
      }
      this._update();
      this._adapter.toggleHostAttribute(SLIDER_CONSTANTS.attributes.RANGE, this._range);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setDisabled(value);
      this._adapter.toggleHostAttribute(SLIDER_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public set ariaLabel(value: string | null) {
    this.ariaLabelEnd = value;
  }

  public set ariaLabelStart(value: string | null) {
    this._adapter.setStartAriaLabel(value);
  }

  public set ariaLabelEnd(value: string | null) {
    this._adapter.setEndAriaLabel(value);
  }
}
