import { MDCSlider } from '@material/slider';
import { CustomElement, coerceBoolean, coerceNumber, emitEvent, attachShadowTemplate, getShadowElement, isDefined, removeAllChildren, replaceShadowTemplate } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { SLIDER_CONSTANTS, SliderType, ISliderChangeEventData, ISliderInputEventData } from './slider-constants';

import continuousTemplate from './slider-continuous.html';
import continuousRangeTemplate from './slider-continuous-range.html';
import discreteTemplate from './slider-discrete.html';
import discreteMarkersTemplate from './slider-discrete-markers.html';
import discreteRangeTemplate from './slider-discrete-range.html';
import discreteRangeMarkersTemplate from './slider-discrete-range-markers.html';
import styles from './slider.scss';

export interface ISliderComponent extends IBaseComponent {
  type: SliderType;
  value: number;
  valueStart: number;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-slider': ISliderComponent;
  }

  interface HTMLElementEventMap {
    'forge-slider-input': CustomEvent<ISliderInputEventData>;
    'forge-slider-change': CustomEvent<ISliderChangeEventData>;
  }
}

/**
 * The custom element class behind the `<forge-slider>` component.
 * 
 * @tag forge-slider
 */
@CustomElement({
  name: SLIDER_CONSTANTS.elementName
})
export class SliderComponent extends BaseComponent implements ISliderComponent {
  public static get observedAttributes(): string[] {
    return [
      SLIDER_CONSTANTS.attributes.TYPE,
      SLIDER_CONSTANTS.attributes.VALUE,
      SLIDER_CONSTANTS.attributes.VALUE_START,
      SLIDER_CONSTANTS.attributes.MAX,
      SLIDER_CONSTANTS.attributes.MIN,
      SLIDER_CONSTANTS.attributes.STEP,
      SLIDER_CONSTANTS.attributes.DISABLED
    ];
  }

  private _mdcSlider: MDCSlider;

  // State
  private _type: SliderType = 'continuous';
  private _value = 0;
  private _valueStart = 0;
  private _min = 0;
  private _max = 100;
  private _step = 0;
  private _disabled = false;

  // Listeners
  private _mdcSliderUpdateListener: (evt: CustomEvent) => void;

  // Element references
  private _rootElement: HTMLElement | undefined;
  private _inputElement: HTMLInputElement | undefined;
  private _inputElementStart: HTMLInputElement | undefined;

  constructor() {
    super();
    this._mdcSliderUpdateListener = evt => this._onSliderUpdate(evt);
  }

  public connectedCallback(): void {
    this._initialize();
  }

  public disconnectedCallback(): void {
    if (this._mdcSlider) {
      this._mdcSlider.destroy();
    }
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case SLIDER_CONSTANTS.attributes.TYPE:
        this.type = newValue as SliderType;
        break;
      case SLIDER_CONSTANTS.attributes.VALUE:
        this.value = coerceNumber(newValue);
        break;
      case SLIDER_CONSTANTS.attributes.VALUE_START:
        this.valueStart = coerceNumber(newValue);
        break;
      case SLIDER_CONSTANTS.attributes.MIN:
        this.min = coerceNumber(newValue);
        break;
      case SLIDER_CONSTANTS.attributes.MAX:
        this.max = coerceNumber(newValue);
        break;
      case SLIDER_CONSTANTS.attributes.STEP:
        this.step = coerceNumber(newValue);
        break;
      case SLIDER_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
    }
  }

  private _setTemplate(template: string): void {
    if (this.shadowRoot) {
      replaceShadowTemplate(this, template, styles);
    } else {
      attachShadowTemplate(this, template, styles);
    }
  }

  private _initializeTemplate(): void {
    switch (this._type) {
      case 'continuous':
        this._setTemplate(continuousTemplate);
        break;
      case 'continuous-range':
        this._setTemplate(continuousRangeTemplate);
        break;
      case 'discrete':
        this._setTemplate(discreteTemplate);
        break;
      case 'discrete-markers':
        this._setTemplate(discreteMarkersTemplate);
        break;
      case 'discrete-range':
        this._setTemplate(discreteRangeTemplate);
        break;
      case 'discrete-range-markers':
        this._setTemplate(discreteRangeMarkersTemplate);
        break;
      default:
        throw new Error(`Invalid slider type provided: ${this._type}. Must be one of "continuous", "continuous-range", "discrete", "discrete-markers", "discrete-range", "discrete-range-markers".`);
    }
  }

  private _initialize(): void {
    this._initializeTemplate();

    this._rootElement = getShadowElement(this, SLIDER_CONSTANTS.selectors.ROOT) as HTMLElement;
    this._inputElement = getShadowElement(this, SLIDER_CONSTANTS.selectors.VALUE_INPUT) as HTMLInputElement;
    this._inputElementStart = getShadowElement(this, SLIDER_CONSTANTS.selectors.VALUE_INPUT_START) as HTMLInputElement;

    // We need to initialize MDCSlider in the next cycle after our template has been placed in the DOM
    window.setTimeout(() => {
      if (!this._rootElement) {
        return;
      }
      if (this._mdcSlider) {
        this._mdcSlider.destroy();
      }
      this._mdcSlider = new MDCSlider(this._rootElement);
      this._syncToSlider();
      this._mdcSlider.initialize();
      this._rootElement.addEventListener(SLIDER_CONSTANTS.events.MDC_INPUT, this._mdcSliderUpdateListener);
      this._rootElement.addEventListener(SLIDER_CONSTANTS.events.MDC_CHANGE, this._mdcSliderUpdateListener);
    });
  }

  private _onSliderUpdate(evt: CustomEvent): void {
    evt.stopPropagation();
    this._syncFromSlider();

    const data: ISliderChangeEventData | ISliderInputEventData = this._isRangeSlider ? { valueStart: this._valueStart, valueEnd: this._value } : { value: this._value };
    const type = evt.type === SLIDER_CONSTANTS.events.MDC_CHANGE ? SLIDER_CONSTANTS.events.FORGE_CHANGE : SLIDER_CONSTANTS.events.FORGE_INPUT;
    emitEvent(this, type, data);
  }

  private _syncToSlider(): void {
    this._mdcSlider.setValue(this._value);
    if (this._isRangeSlider) {
      this._mdcSlider.setValueStart(this._valueStart);
    }
    this._applyMin(this._min);
    this._applyMax(this._max);
    this._applyStep(this._step);
    this._mdcSlider.setDisabled(this._disabled);
  }

  private _syncFromSlider(): void {
    this._value = this._mdcSlider.getValue();
    if (this._isRangeSlider) {
      this._valueStart = this._mdcSlider.getValueStart();
    }
    this.setAttribute(SLIDER_CONSTANTS.attributes.VALUE, this._value.toString());
  }

  private _applyMin(min: number): void {
    if (this._inputElement) {
      this._inputElement.min = `${min}`;
    }
    if (this._inputElementStart) {
      this._inputElementStart.min = `${min}`;
    }
    this._mdcSlider?.layout();
  }

  private _applyMax(max: number): void {
    if (this._inputElement) {
      this._inputElement.max = `${max}`;
    }
    if (this._inputElementStart) {
      this._inputElementStart.max = `${max}`;
    }
    this._mdcSlider?.layout();
  }

  private _applyStep(step: number): void {
    if (this._inputElement) {
      this._inputElement.step = `${step}`;
    }
    if (this._inputElementStart) {
      this._inputElementStart.step = `${step}`;
    }
    this._mdcSlider?.layout();
  }

  private get _isRangeSlider(): boolean {
    return this._type.includes('range');
  }

  /**
   * Gets/sets the type of slider this is: `continuous` (default), `discrete`, `discrete-markers`
   */
  public get type(): SliderType {
    return this._type;
  }
  public set type(value: SliderType) {
    this._type = value;
    if (this.isConnected) {
      this._initialize();
    }
  }

  /**
   * Gets/sets the value of the slider.
   */
  public get value(): number {
    return this._value;
  }
  public set value(value: number) {
    if (this._value !== value) {
      if (isNaN(value) || typeof value !== 'number') {
        value = 0;
      }

      this._value = value;

      if (this._mdcSlider) {
        this._mdcSlider.setValue(value);
      }
      
      this.setAttribute(SLIDER_CONSTANTS.attributes.VALUE, isDefined(this._value) ? this._value.toString() : '');
    }
  }


  /**
   * Gets/sets the start value of the slider (only applicable for range sliders).
   */
  public get valueStart(): number {
    return this._valueStart;
  }
  public set valueStart(value: number) {
    if (this._valueStart !== value) {
      this._valueStart = value;
      if (this._mdcSlider) {
        this._mdcSlider.setValueStart(value);
      }
      this.setAttribute(SLIDER_CONSTANTS.attributes.VALUE_START, isDefined(this._valueStart) ? this._valueStart.toString() : '');
    }
  }

  /**
   * Gets/sets the minimum value for the slider.
   */
  public get min(): number {
    return this._min;
  }
  public set min(value: number) {
    if (this._min !== value) {
      this._min = value;
      if (this._mdcSlider) {
        this._applyMin(this._min);
      }
      this.setAttribute(SLIDER_CONSTANTS.attributes.MIN, isDefined(this._min) ? this._min.toString() : '');
    }
  }

  /**
   * Gets/sets the maximum value for the slider.
   */
  public get max(): number {
    return this._max;
  }
  public set max(value: number) {
    if (this._max !== value) {
      this._max = value;
      if (this._mdcSlider) {
        this._applyMax(this._max);
      }
      this.setAttribute(SLIDER_CONSTANTS.attributes.MAX, isDefined(this._max) ? this._max.toString() : '');
    }
  }

  /**
   * Gets/sets the step value for the slider when in discrete mode.
   */
  public get step(): number {
    return this._step;
  }
  public set step(value: number) {
    if (this._step !== value) {
      this._step = value;
      if (this._mdcSlider) {
        this._applyStep(this._step);
      }
      this.setAttribute(SLIDER_CONSTANTS.attributes.STEP, isDefined(this._step) ? this._step.toString() : '');
    }
  }

  /**
   * Gets/sets the disabled state of the slider.
   */
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      if (this._mdcSlider) {
        this._mdcSlider.setDisabled(value);
      }
      this.setAttribute(SLIDER_CONSTANTS.attributes.DISABLED, isDefined(this._disabled) ? this._disabled.toString() : '');
    }
  }
}
