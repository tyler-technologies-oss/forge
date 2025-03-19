import { ISliderAdapter } from './slider-adapter';
import { SLIDER_CONSTANTS, SliderLabelBuilder } from './slider-constants';

export interface ISliderCore {
  ariaLabel: string | null;
  ariaLabelStart: string | null;
  ariaLabelEnd: string | null;
  value: number;
  valueStart: number;
  valueEnd: number;
  label: string;
  labelStart: string;
  labelEnd: string;
  labelBuilder: SliderLabelBuilder;
  min: number;
  max: number;
  step: number;
  tickmarks: boolean;
  labeled: boolean;
  range: boolean;
  disabled: boolean;
  readonly: boolean;
}

export class SliderCore implements ISliderCore {
  // State
  private _value = SLIDER_CONSTANTS.numbers.DEFAULT_VALUE;
  private _valueStart = SLIDER_CONSTANTS.numbers.DEFAULT_START_VALUE;
  private _valueEnd = SLIDER_CONSTANTS.numbers.DEFAULT_END_VALUE;
  private _labelStart: string;
  private _labelEnd: string;
  private _labelBuilder: SliderLabelBuilder;
  private _min = 0;
  private _max = 100;
  private _step = SLIDER_CONSTANTS.numbers.DEFAULT_STEP;
  private _tickmarks = false;
  private _labeled = true;
  private _range = false;
  private _disabled = false;
  private _readonly = false;

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
    this._applyInputListeners();
    this._update();
  }

  private _update(): void {
    const { value: renderValue, valueStart: renderValueStart, valueEnd: renderValueEnd } = this._clampMinMax();
    const step = this._step <= 0 ? 1 : this._step;
    const range = Math.max(this._max - this._min, step);
    const startFraction = this._range ? ((renderValueStart ?? this._min) - this._min) / range : 0;
    const valueEnd = this._range ? renderValueEnd : renderValue;
    const endFraction = ((valueEnd ?? this.min) - this.min) / range;
    const tickCount = range / step;

    this._adapter.update({ startFraction, endFraction, tickCount });
    this._adapter.syncInputValues(renderValueStart, this._range ? renderValueEnd : renderValue);

    if (this._range) {
      this._adapter.tryDetectOverlap();
    }

    let labelStart = this._labelStart ?? String(renderValueStart);
    let labelEnd = this._labelEnd ?? String(this._range ? renderValueEnd : renderValue);

    if (typeof this._labelBuilder === 'function') {
      if (this._range) {
        labelStart = this._labelBuilder(renderValueStart, 'start');
        labelEnd = this._labelBuilder(renderValueEnd, 'end');
      } else {
        labelEnd = this._labelBuilder(renderValue);
      }
    }

    this._adapter.updateLabels(labelStart, labelEnd);
  }

  private _clampMinMax(): { value: number; valueStart: number; valueEnd: number } {
    // We make copies of our values so we can mutate them without affecting the original values
    let valueCopy = this._value;
    let valueStartCopy = this._valueStart;
    let valueEndCopy = this._valueEnd;

    if (this._range) {
      if (valueStartCopy > this._max) {
        valueStartCopy = this._max;
      } else if (valueStartCopy < this._min) {
        valueStartCopy = this._min;
      }

      if (valueEndCopy > this._max) {
        valueEndCopy = this._max;
      } else if (valueEndCopy < this._min) {
        valueEndCopy = this._min;
      }
    } else {
      if (valueCopy > this._max) {
        valueCopy = this._max;
      } else if (this._value < this._min) {
        valueCopy = this._min;
      }
    }

    return {
      value: valueCopy,
      valueStart: valueStartCopy,
      valueEnd: valueEndCopy
    };
  }

  private _applyInputListeners(): void {
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

  private _handlePointerMove({ target, x, y }: PointerEvent): void {
    const isStart = (target as HTMLInputElement).id === 'start';
    if (isStart) {
      this._adapter.tryHoverStartHandle({ x, y });
    } else {
      this._adapter.tryHoverEndHandle({ x, y });
    }
  }

  private _handlePointerLeave(_evt: PointerEvent): void {
    this._adapter.leaveHandleContainer();
  }

  private _handleInputUpdate(evt: InputEvent): void {
    evt.stopPropagation(); // We don't allow the native input & change events to bubble outside of the component

    if (this._disabled || this._readonly) {
      this._adapter.syncInputValues(this._valueStart, this._range ? this._valueEnd : this._value);
      return;
    }

    const input = evt.target as HTMLInputElement;

    if (this._range) {
      const isStart = input.id === 'start';
      if (isStart) {
        this._valueStart = input.valueAsNumber;
      } else {
        this._valueEnd = input.valueAsNumber;
      }

      // Clamp values to keep start and end from going past each other
      if (this._canClamp()) {
        if (isStart) {
          this._valueStart = this._valueEnd;
        } else {
          this._valueEnd = this._valueStart;
        }

        // Ensure our underlying inputs are synchronized with our state since they continue moving even when we clamp
        this._adapter.syncInputValues(this._valueStart, this._valueEnd);
        this._update();
        return; // We don't dispatch events when clamping
      }
    } else {
      this._value = input.valueAsNumber;
    }

    const eventMap: Record<'range' | 'default', { [key: string]: string }> = {
      default: {
        change: SLIDER_CONSTANTS.events.CHANGE,
        input: SLIDER_CONSTANTS.events.INPUT
      },
      range: {
        change: SLIDER_CONSTANTS.events.RANGE_CHANGE,
        input: SLIDER_CONSTANTS.events.RANGE_INPUT
      }
    };
    const type = this._range ? eventMap.range[evt.type] : eventMap.default[evt.type];
    const detail = this._range ? { valueStart: this._valueStart, valueEnd: this._valueEnd } : { value: this._value };
    const event = new CustomEvent(type, { detail, bubbles: true });
    this._adapter.dispatchHostEvent(event);
    this._update();
  }

  private _handleFocus(_evt: FocusEvent): void {
    this._adapter.updateHandleLayering();
  }

  private _canClamp(): boolean {
    return this._valueStart > this._valueEnd || this._valueEnd < this._valueStart;
  }

  public get value(): number {
    return this._value;
  }
  public set value(value: number) {
    if (this._value !== value) {
      this._value = value;
      this._update();
    }
  }

  public get valueStart(): number {
    return this._valueStart;
  }
  public set valueStart(value: number) {
    if (this._valueStart !== value) {
      this._valueStart = value;
      this._update();
    }
  }

  public get valueEnd(): number {
    return this._valueEnd;
  }
  public set valueEnd(value: number) {
    if (this._valueEnd !== value) {
      this._valueEnd = value;
      this._update();
    }
  }

  public get label(): string {
    return this.labelEnd;
  }
  public set label(value: string) {
    this.labelEnd = value;
  }

  public get labelStart(): string {
    return this._labelStart;
  }
  public set labelStart(value: string) {
    if (this._labelStart !== value) {
      this._labelStart = value;
      this._adapter.updateLabels(this._labelStart, this._labelEnd);
    }
  }

  public get labelEnd(): string {
    return this._labelEnd;
  }
  public set labelEnd(value: string) {
    if (this._labelEnd !== value) {
      this._labelEnd = value;
      this._adapter.updateLabels(this._labelStart, this._labelEnd);
    }
  }

  public get labelBuilder(): SliderLabelBuilder {
    return this._labelBuilder;
  }
  public set labelBuilder(cb: SliderLabelBuilder) {
    this._labelBuilder = cb;
    this._update();
  }

  public get min(): number {
    return this._min;
  }
  public set min(value: number) {
    if (this._min !== value) {
      this._min = value;
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
      this._max = value;
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
      this._step = value;
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
      this._update();
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

  public get readonly(): boolean {
    return this._readonly;
  }
  public set readonly(value: boolean) {
    if (this._readonly !== value) {
      this._readonly = value;
      this._adapter.setReadonly(value);
      this._adapter.toggleHostAttribute(SLIDER_CONSTANTS.attributes.READONLY, this._readonly);
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
