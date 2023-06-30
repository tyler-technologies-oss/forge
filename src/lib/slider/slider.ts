import { attachShadowTemplate, coerceBoolean, coerceNumber, CustomElement, FoundationProperty, toggleAttribute } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { SliderAdapter } from './slider-adapter';
import { ISliderChangeEventData, ISliderInputEventData, SLIDER_CONSTANTS } from './slider-constants';
import { SliderFoundation } from './slider-foundation';

import template from './slider.html';
import styles from './slider.scss';

export interface ISliderComponent extends IBaseComponent {
  value: number;
  valueStart: number;
  valueEnd: number;
  min: number;
  max: number;
  step: number;
  range: boolean;
  tickmarks: boolean;
  labeled: boolean;
  disabled: boolean;
  readonly: boolean;
  form: HTMLFormElement | null;
  name: string | null;
  // labelCallback: (({ value: number, which: 'start' | 'end' }): ILabelCallbackArgs) => string;
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
 * @tag forge-slider
 * 
 * @summary Sliders allow users to make selections from a range of values.
 * 
 * @description Use sliders to enable users to select a value from a continuous or discrete range of values.
 */
@CustomElement({
  name: SLIDER_CONSTANTS.elementName
})
export class SliderComponent extends BaseComponent implements ISliderComponent {
  public static get observedAttributes(): string[] {
    return [
      SLIDER_CONSTANTS.attributes.ARIA_LABEL,
      SLIDER_CONSTANTS.attributes.ARIA_LABEL_START,
      SLIDER_CONSTANTS.attributes.ARIA_LABEL_END,
      SLIDER_CONSTANTS.attributes.VALUE,
      SLIDER_CONSTANTS.attributes.VALUE_START,
      SLIDER_CONSTANTS.attributes.VALUE_END,
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
    return this._internals.form;
  }

  public get labels(): NodeList {
    return this._internals.labels;
  }

  public get name(): string | null {
    return this.getAttribute('name');
  }
  public set name(value: string | null) {
    toggleAttribute(this, !!value, 'name', value ?? '');
  }

  private readonly _internals: ElementInternals;
  private readonly _foundation: SliderFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._internals = this.attachInternals();
    this._foundation = new SliderFoundation(new SliderAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case SLIDER_CONSTANTS.attributes.ARIA_LABEL:
        this._foundation.ariaLabel = newValue;
        break;
      case SLIDER_CONSTANTS.attributes.ARIA_LABEL_START:
        this._foundation.ariaLabelStart = newValue;
        break;
      case SLIDER_CONSTANTS.attributes.ARIA_LABEL_END:
        this._foundation.ariaLabelEnd = newValue;
        break;
      case SLIDER_CONSTANTS.attributes.VALUE:
        this.value = coerceNumber(newValue);
        break;
      case SLIDER_CONSTANTS.attributes.VALUE_START:
        this.valueStart = coerceNumber(newValue);
        break;
      case SLIDER_CONSTANTS.attributes.VALUE_END:
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

  }

  public formStateRestoreCallback(): void {

  }

  @FoundationProperty()
  public declare value: number;

  @FoundationProperty()
  public declare valueStart: number;

  @FoundationProperty()
  public declare valueEnd: number;

  @FoundationProperty()
  public declare min: number;

  @FoundationProperty()
  public declare max: number;

  @FoundationProperty()
  public declare step: number;

  @FoundationProperty()
  public declare tickmarks: boolean;
  
  @FoundationProperty()
  public declare labeled: boolean;

  @FoundationProperty()
  public declare range: boolean;

  @FoundationProperty()
  public declare disabled: boolean;

  @FoundationProperty()
  public declare readonly: boolean;
}
