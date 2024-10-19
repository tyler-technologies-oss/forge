import { LitElement, PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { setDefaultAria } from '../core/utils/a11y-utils';
import { METER_CONSTANTS, MeterDensity, MeterInnerShape, MeterShape, MeterStatus, MeterTheme } from './meter-constants';

import styles from './meter.scss';

export interface IMeterComponent extends LitElement {
  value: number;
  min: number;
  max: number;
  low: number;
  high: number;
  tickmarks: boolean;
  density: MeterDensity;
  shape: MeterShape;
  innerShape: MeterInnerShape;
  theme: MeterTheme;
  muted: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-meter': IMeterComponent;
  }
}

/**
 * @tag forge-meter
 *
 * @summary Meters display a scalar value within a defined range.
 *
 * @csspart root - The root container element.
 * @csspart bar - The bar representing the value.
 */
@customElement(METER_CONSTANTS.elementName)
export class MeterComponent extends LitElement implements IMeterComponent {
  public static styles = unsafeCSS(styles);
  public static formAssociated = true;

  /**
   * The current value of the meter.
   * @default 0
   * @attribute
   */
  @property({ type: Number, reflect: true }) public value = METER_CONSTANTS.numbers.DEFAULT_VALUE;
  /**
   * The minimum value of the meter.
   * @default 0
   * @attribute
   */
  @property({ type: Number, reflect: true }) public min = METER_CONSTANTS.numbers.DEFAULT_MIN;
  /**
   * The maximum value of the meter.
   * @default 1
   * @attribute
   */
  @property({ type: Number, reflect: true }) public max = METER_CONSTANTS.numbers.DEFAULT_MAX;
  /**
   * The low value threshold.
   * @default 0
   * @attribute
   */
  @property({ type: Number, reflect: true }) public low = METER_CONSTANTS.numbers.DEFAULT_LOW;
  /**
   * The high value threshold.
   * @default 1
   * @attribute
   */
  @property({ type: Number, reflect: true }) public high = METER_CONSTANTS.numbers.DEFAULT_HIGH;
  /**
   * Whether to display tickmarks.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true }) public tickmarks = false;
  /**
   * The shape of the meter.
   * @default 'default'
   * @attribute
   */
  @property({ reflect: true }) public shape: MeterShape = 'default';
  /**
   * The shape of the bar.
   * @default 'default'
   * @attribute
   */
  @property({ reflect: true, attribute: 'inner-shape' }) public innerShape: MeterInnerShape = 'default';
  /**
   * The density of the meter.
   * @default 'medium'
   * @attribute
   */
  @property({ reflect: true }) public density: MeterDensity = 'medium';
  /**
   * The theme of the meter.
   * @default 'default'
   * @attribute
   */
  @property({ reflect: true }) public theme: MeterTheme = 'default';
  /**
   * Whether the theme is muted.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true }) public muted = false;

  public get labels(): NodeList {
    return this._internals.labels;
  }

  public get form(): HTMLFormElement | null {
    return this._internals.form;
  }

  @state() private _percentage = 0;
  @state() private _status: MeterStatus = 'middle';
  @state() private _segmented = false;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this._internals, {
      role: 'meter',
      ariaValueNow: `${this.value}`,
      ariaValueMin: `${this.min}`,
      ariaValueMax: `${this.max}`
    });
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    const keys = Array.from(changedProperties.keys());
    if (keys.some(key => ['value', 'min', 'max', 'low', 'high'].includes(key.toString()))) {
      this._getStatus();
    }
    if (keys.some(key => ['min', 'max', 'low', 'high'].includes(key.toString()))) {
      this._getSegmented();
    }

    // Update default ARIA when the current, min, or max value changes.
    changedProperties.forEach((_, key) => {
      switch (key) {
        case 'value':
          setDefaultAria(this, this._internals, { ariaValueNow: `${this.value}` });
          break;
        case 'min':
          setDefaultAria(this, this._internals, { ariaValueMin: `${this.min}` });
          break;
        case 'max':
          setDefaultAria(this, this._internals, { ariaValueMax: `${this.max}` });
          break;
      }
    });
  }

  public render(): TemplateResult {
    return html`
      <div
        part="root"
        class=${classMap({
          'forge-meter': true,
          segmented: this._segmented,
          low: this._status === 'low',
          high: this._status === 'high',
          lowest: this._percentage === 0,
          tickmarks: this.tickmarks
        })}>
        <div part="bar" class="bar" style=${styleMap({ '--percentage': this._percentage + '%' })}></div>
      </div>
    `;
  }

  /**
   * Determines the percentage of the meter that's filled and whether the value is low or high.
   */
  private _getStatus(): void {
    const range = this.max - this.min;
    this._percentage = range ? ((this.value - this.min) / range) * 100 : 0;
    this._percentage = Math.max(0, Math.min(100, this._percentage));

    if (this.value < this.low) {
      this._status = 'low';
    } else if (this.value > this.high) {
      this._status = 'high';
    } else {
      this._status = 'middle';
    }
  }

  /**
   * Determines whether low and high ranges are set. The meter is segmented if either the low or
   * high property is within the range of possible values.
   *
   * When the meter is segmented the default or themed color scheme is replaced by semantic colors
   * corresponding to low, middle, and high values.
   */
  private _getSegmented(): void {
    this._segmented = this.low > this.min || this.high < this.max;
  }
}
