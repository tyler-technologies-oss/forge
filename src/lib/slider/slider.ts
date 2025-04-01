import { attachShadowTemplate, coerceBoolean, coerceNumber, customElement, coreProperty, toggleAttribute } from '@tylertech/forge-core';
import { internals } from '../constants';
import { BaseFormComponent, IBaseFormComponent } from '../core/base/base-form-component';
import { FocusIndicatorComponent } from '../focus-indicator/focus-indicator';
import { StateLayerComponent } from '../state-layer/state-layer';
import { SliderAdapter } from './slider-adapter';
import { SLIDER_CONSTANTS, SliderLabelBuilder, ISliderRangeChangeEventData, ISliderChangeEventData } from './slider-constants';
import { SliderCore } from './slider-core';

import template from './slider.html';
import styles from './slider.scss';

export interface ISliderComponent extends IBaseFormComponent<number> {
  valueStart: number;
  valueEnd: number;
  label: string;
  labelStart: string;
  labelEnd: string;
  labelBuilder: SliderLabelBuilder;
  min: number;
  max: number;
  step: number;
  range: boolean;
  tickmarks: boolean;
  labeled: boolean;
  nameStart: string;
  nameEnd: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-slider': ISliderComponent;
  }

  interface HTMLElementEventMap {
    'forge-slider-input': CustomEvent<ISliderChangeEventData>;
    'forge-slider-change': CustomEvent<ISliderChangeEventData>;
    'forge-slider-range-input': CustomEvent<ISliderRangeChangeEventData>;
    'forge-slider-range-change': CustomEvent<ISliderRangeChangeEventData>;
  }
}

/**
 * @tag forge-slider
 *
 * @summary Sliders allow users to make selections from a range of values.
 *
 * @description Use sliders to enable users to select a value from a continuous or discrete range of values.
 *
 * @dependency forge-focus-indicator
 * @dependency forge-state-layer
 *
 * @property {number} [value=50] - The current value of the slider.
 * @property {number} [valueStart=33] - The current start value of the slider.
 * @property {number} [valueEnd=67] - The current end value of the slider.
 * @property {string} label - The label text for the slider handle.
 * @property {string} labelStart - The label text for the start slider handle.
 * @property {string} labelEnd - The label text for the end slider handle.
 * @property {SliderLabelBuilder} labelBuilder - A function that returns a label for the slider handle.
 * @property {number} [min=0] - The minimum value of the slider.
 * @property {number} [max=100] - The maximum value of the slider.
 * @property {number} [step=1] - The step value of the slider.
 * @property {boolean} [range=false] - Controls range mode.
 * @property {boolean} [tickmarks=false] - Controls if tickmarks are visible.
 * @property {boolean} [labeled=true] - Controls if labels are visible.
 * @property {boolean} [disabled=false] - Controls if the slider is disabled.
 * @property {boolean} [readonly=false] - Controls if the slider is readonly.
 * @property {string} name - The form control name.
 * @property {string} nameStart - The form control name for the start handle in range mode.
 * @property {string} nameEnd - The form control name for the end handle in range mode.
 *
 * @attribute {string} data-aria-label - Sets the `aria-label` attribute on the slider handle.
 * @attribute {string} data-aria-label-start - Sets the `aria-label` attribute on the start handle in range mode.
 * @attribute {string} data-aria-label-end - Sets the `aria-label` attribute on the end handle in range mode.
 * @attribute {number} [value=50] - Sets the current value of the slider.
 * @attribute {number} [value-start=33] - Sets the current start value of the slider in range mode.
 * @attribute {number} [value-end=67] - Sets the current end value of the slider in range mode.
 * @attribute {string} label - Sets the label text for the slider handle.
 * @attribute {string} label-start - Sets the label text for the start slider handle in range mode.
 * @attribute {string} label-end - Sets the label text for the end slider handle in range mode.
 * @attribute {number} [min=0] - Sets the minimum value of the slider.
 * @attribute {number} [max=100] - Sets the maximum value of the slider.
 * @attribute {number} [step=1] - Sets the step value of the slider.
 * @attribute {boolean} [range=false] - Controls range mode.
 * @attribute {boolean} [tickmarks=false] - Controls if tickmarks are visible.
 * @attribute {boolean} [labeled=true] - Controls if labels are visible.
 * @attribute {boolean} [disabled=false] - Controls if the slider is disabled.
 * @attribute {boolean} [readonly=false] - Controls if the slider is readonly.
 * @attribute {string} name - Controls the form control name.
 * @attribute {string} name-start - Controls the form control name for the start handle in range mode.
 * @attribute {string} name-end - Controls the form control name for the end handle in range mode.
 *
 * @event {CustomEvent<ISliderChangeEventData>} forge-slider-input - Dispatches when the slider value changes.
 * @event {CustomEvent<ISliderChangeEventData>} forge-slider-change - Dispatches when the slider value changes and the value has been committed.
 * @event {CustomEvent<ISliderRangeChangeEventData>} forge-slider-range-input - Dispatches when the slider range values change.
 * @event {CustomEvent<ISliderRangeChangeEventData>} forge-slider-range-change - Dispatches when the slider range values change and the values have been committed.
 *
 * @cssproperty --forge-theme-primary - The primary color of the slider.
 * @cssproperty --forge-theme-on-primary - The color of elements placed on top of the primary color (the label text for example).
 * @cssproperty --forge-slider-track-height - The height of the track.
 * @cssproperty --forge-slider-active-track-color - The color of the active track.
 * @cssproperty --forge-slider-active-track-height - The height of the active track.
 * @cssproperty --forge-slider-active-track-shape - The shape of the active track.
 * @cssproperty --forge-slider-disabled-active-track-color - The color of the active track when disabled.
 * @cssproperty --forge-slider-disabled-active-track-opacity - The opacity of the active track when disabled.
 * @cssproperty --forge-slider-disabled-handle-color - The color of the slider handle when disabled.
 * @cssproperty --forge-slider-disabled-inactive-track-color - The color of the inactive track when disabled.
 * @cssproperty --forge-slider-disabled-inactive-track-opacity - The opacity of the inactive track when disabled.
 * @cssproperty --forge-slider-focus-handle-color - The color of the slider handle when focused.
 * @cssproperty --forge-slider-handle-color - The color of the slider handle.
 * @cssproperty --forge-slider-handle-height - The height of the slider handle.
 * @cssproperty --forge-slider-handle-width - The width of the slider handle.
 * @cssproperty --forge-slider-handle-shape - The shape of the slider handle.
 * @cssproperty --forge-slider-hover-handle-color - The color of the slider handle when hovered.
 * @cssproperty --forge-slider-inactive-track-color - The color of the inactive track.
 * @cssproperty --forge-slider-inactive-track-height - The height of the inactive track.
 * @cssproperty --forge-slider-inactive-track-shape - The shape of the inactive track.
 * @cssproperty --forge-slider-label-container-shape - The shape of the label container.
 * @cssproperty --forge-slider-label-container-color - The color of the label container.
 * @cssproperty --forge-slider-label-container-height - The height of the label container.
 * @cssproperty --forge-slider-label-text-color - The color of the label text.
 * @cssproperty --forge-slider-pressed-handle-color - The color of the slider handle when pressed.
 * @cssproperty --forge-slider-state-layer-size - The size of the state layer.
 * @cssproperty --forge-slider-with-overlap-handle-outline-color - The color of the slider handle outline when overlapping.
 * @cssproperty --forge-slider-with-overlap-handle-outline-width - The width of the slider handle outline when overlapping.
 * @cssproperty --forge-slider-with-tick-marks-active-container-color - The color of the active tick mark container when tick marks are visible.
 * @cssproperty --forge-slider-with-tick-marks-container-size - The size of the tick mark container when tick marks are visible.
 * @cssproperty --forge-slider-with-tick-marks-disabled-active-container-color - The color of the active tick mark container when tick marks are visible and disabled.
 * @cssproperty --forge-slider-with-tick-marks-disabled-inactive-container-color - The color of the inactive tick mark container when tick marks are visible and disabled.
 * @cssproperty --forge-slider-with-tick-marks-inactive-container-color - The color of the inactive tick mark container when tick marks are visible.
 *
 * @csspart slider - Styles the slider container element.
 * @csspart track - Styles the track element.
 * @csspart handle-end - Styles the end handle element.
 * @csspart handle-end-thumb - Styles the end handle thumb element.
 * @csspart handle-end-label - Styles the end handle label element.
 * @csspart handle-end-label-content - Styles the end handle label content element.
 * @csspart handle-start - Styles the start handle element.
 * @csspart handle-start-thumb - Styles the start handle thumb element.
 * @csspart handle-start-label - Styles the start handle label element.
 * @csspart handle-start-label-content - Styles the start handle label content element.
 */
@customElement({
  name: SLIDER_CONSTANTS.elementName,
  dependencies: [FocusIndicatorComponent, StateLayerComponent]
})
export class SliderComponent extends BaseFormComponent<number> implements ISliderComponent {
  public static get observedAttributes(): string[] {
    return [
      SLIDER_CONSTANTS.attributes.ARIA_LABEL,
      SLIDER_CONSTANTS.attributes.ARIA_LABEL_START,
      SLIDER_CONSTANTS.attributes.ARIA_LABEL_END,
      SLIDER_CONSTANTS.attributes.VALUE,
      SLIDER_CONSTANTS.attributes.VALUE_START,
      SLIDER_CONSTANTS.attributes.VALUE_END,
      SLIDER_CONSTANTS.attributes.LABEL,
      SLIDER_CONSTANTS.attributes.LABEL_START,
      SLIDER_CONSTANTS.attributes.LABEL_END,
      SLIDER_CONSTANTS.attributes.MAX,
      SLIDER_CONSTANTS.attributes.MIN,
      SLIDER_CONSTANTS.attributes.STEP,
      SLIDER_CONSTANTS.attributes.TICKMARKS,
      SLIDER_CONSTANTS.attributes.LABELED,
      SLIDER_CONSTANTS.attributes.RANGE,
      SLIDER_CONSTANTS.attributes.DISABLED,
      SLIDER_CONSTANTS.attributes.READONLY
    ];
  }

  public static formAssociated = true;

  public get form(): HTMLFormElement | null {
    return this[internals].form;
  }

  public get labels(): NodeList {
    return this[internals].labels;
  }

  public get name(): string {
    return this.getAttribute('name') ?? '';
  }
  public set name(value: string) {
    toggleAttribute(this, !!value, 'name', value ?? '');
  }

  public get nameStart(): string {
    return this.getAttribute('name-start') ?? this.name;
  }
  public set nameStart(value: string) {
    toggleAttribute(this, !!value, 'name-start', value ?? '');
  }

  public get nameEnd(): string {
    return this.getAttribute('name-end') ?? this.nameStart;
  }
  public set nameEnd(value: string) {
    toggleAttribute(this, !!value, 'name-end', value ?? '');
  }

  public readonly [internals]: ElementInternals;
  private readonly _core: SliderCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this[internals] = this.attachInternals();
    this._core = new SliderCore(new SliderAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case SLIDER_CONSTANTS.attributes.ARIA_LABEL:
        this._core.ariaLabel = newValue;
        break;
      case SLIDER_CONSTANTS.attributes.ARIA_LABEL_START:
        this._core.ariaLabelStart = newValue;
        break;
      case SLIDER_CONSTANTS.attributes.ARIA_LABEL_END:
        this._core.ariaLabelEnd = newValue;
        break;
      case SLIDER_CONSTANTS.attributes.VALUE:
        this.value = coerceNumber(newValue);
        break;
      case SLIDER_CONSTANTS.attributes.VALUE_START:
        this.valueStart = coerceNumber(newValue);
        break;
      case SLIDER_CONSTANTS.attributes.VALUE_END:
        this.valueEnd = coerceNumber(newValue);
        break;
      case SLIDER_CONSTANTS.attributes.LABEL:
        this.label = newValue;
        break;
      case SLIDER_CONSTANTS.attributes.LABEL_START:
        this.labelStart = newValue;
        break;
      case SLIDER_CONSTANTS.attributes.LABEL_END:
        this.labelEnd = newValue;
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
      case SLIDER_CONSTANTS.attributes.TICKMARKS:
        this.tickmarks = coerceBoolean(newValue);
        break;
      case SLIDER_CONSTANTS.attributes.LABELED:
        this.labeled = coerceBoolean(newValue);
        break;
      case SLIDER_CONSTANTS.attributes.RANGE:
        this.range = coerceBoolean(newValue);
        break;
      case SLIDER_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case SLIDER_CONSTANTS.attributes.READONLY:
        this.readonly = coerceBoolean(newValue);
        break;
    }
  }

  public formResetCallback(): void {
    if (this._core.range) {
      const valueStart = this.getAttribute('value-start');
      this.valueStart = valueStart !== null ? Number(valueStart) : SLIDER_CONSTANTS.numbers.DEFAULT_START_VALUE;
      const valueEnd = this.getAttribute('value-end');
      this.valueEnd = valueEnd !== null ? Number(valueEnd) : SLIDER_CONSTANTS.numbers.DEFAULT_END_VALUE;
      return;
    }
    const value = this.getAttribute('value');
    this.value = value !== null ? Number(value) : SLIDER_CONSTANTS.numbers.DEFAULT_VALUE;
  }

  public formStateRestoreCallback(state: string | Array<[string, string]> | null): void {
    if (state && state[0] instanceof FormData) {
      const values = Array.from(state[0]);
      const [[, valueStart], [, valueEnd]] = values;
      this.valueStart = Number(valueStart);
      this.valueEnd = Number(valueEnd);
      this.range = true;
      return;
    }

    this.value = Number(state);
    this.range = false;
  }

  public formDisabledCallback(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @coreProperty()
  declare public value: number;

  @coreProperty()
  declare public valueStart: number;

  @coreProperty()
  declare public valueEnd: number;

  @coreProperty()
  declare public label: string;

  @coreProperty()
  declare public labelStart: string;

  @coreProperty()
  declare public labelEnd: string;

  @coreProperty()
  declare public labelBuilder: SliderLabelBuilder;

  @coreProperty()
  declare public min: number;

  @coreProperty()
  declare public max: number;

  @coreProperty()
  declare public step: number;

  @coreProperty()
  declare public tickmarks: boolean;

  @coreProperty()
  declare public labeled: boolean;

  @coreProperty()
  declare public range: boolean;

  @coreProperty()
  declare public disabled: boolean;

  @coreProperty()
  declare public readonly: boolean;
}
