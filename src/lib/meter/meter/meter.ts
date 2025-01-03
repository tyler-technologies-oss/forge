import { LitElement, PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedNodes, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Theme } from '../../constants';
import { setDefaultAria, toggleState } from '../../core/utils/a11y-utils';

import styles from './meter.scss';

export type MeterDirection = 'inline' | 'block';
export type MeterDensity = 'default' | 'small' | 'medium' | 'large';
export type MeterShape = 'default' | 'round' | 'squared';
export type MeterInnerShape = 'default' | 'inherit';
export type MeterStatus = 'optimal' | 'suboptimal' | 'least-optimal';
export type MeterTheme = Theme | 'default';

const VALUE_STATE_MAP = new Map<MeterStatus, string>([
  ['optimal', 'optimum-value'],
  ['suboptimal', 'suboptimum-value'],
  ['least-optimal', 'least-optimum-value']
]);

/**
 * @tag forge-meter
 *
 * @summary Meters display a scalar value within a defined range.
 *
 * @attribute {string} aria-valuetext - Defines a text alternative for the current value. Set this if it would be inaccurate to read the value as a percentage.
 *
 * @state vertical - Applied when the meter is oriented in the block direction.
 * @state optimum-value - Applied when the value is within the optimum range.
 * @state suboptimum-value - Applied when the value is within the suboptimum range.
 * @state least-optimum-value - Applied when the value is within the least optimum range.
 *
 * @cssproperty --forge-meter-background - The background color of the meter.
 * @cssproperty --forge-meter-color - The color of the meter's bar.
 * @cssproperty --forge-meter-height - The block size of the meter.
 * @cssproperty --forge-meter-shape - The border radius of the meter.
 * @cssproperty --forge-meter-bar-inner-shape - The border radius of the meter's bar.
 * @cssproperty --forge-meter-tickmarks - The number of tickmarks to display.
 * @cssproperty --forge-meter-tickmark-opacity - The opacity of the tickmarks.
 * @cssproperty --forge-meter-transition-duration - The duration of transitions.
 * @cssproperty --forge-meter-transition-timing - The timing function of transitions.
 *
 * @csspart root - The root container element.
 * @csspart track - The element comprising the meter's background.
 * @csspart bar - The bar representing the value.
 *
 * @slot - The default slot for the meter's label.
 * @slot value - A textual representation of the meter's value.
 */
@customElement('forge-meter')
export class MeterComponent extends LitElement {
  public static styles = unsafeCSS(styles);
  public static formAssociated = true;

  /**
   * The current value of the meter.
   * @default 0
   * @attribute
   */
  @property({ type: Number }) public value = 0;

  /**
   * The minimum value of the meter.
   * @default 0
   * @attribute
   */
  @property({ type: Number }) public min = 0;

  /**
   * The maximum value of the meter.
   * @default 1
   * @attribute
   */
  @property({ type: Number }) public max = 1;

  /**
   * The low value threshold.
   * @default 0
   * @attribute
   */
  @property({ type: Number }) public low: number | null | undefined;

  /**
   * The high value threshold.
   * @default 1
   * @attribute
   */
  @property({ type: Number }) public high: number | null | undefined;

  /**
   * Indicates the region of the optimum value.
   * @default 1
   * @attribute
   */
  @property({ type: Number }) public optimum: number | null | undefined;

  /**
   * Whether to display tickmarks.
   * @default false
   * @attribute
   */
  @property({ type: Boolean }) public tickmarks = false;

  /**
   * Whether the meter is oriented in the inline or block direction.
   * @default 'inline'
   * @attribute
   */
  @property() public direction: MeterDirection = 'inline';

  /**
   * The shape of the meter.
   * @default 'default'
   * @attribute
   */
  @property() public shape: MeterShape = 'default';

  /**
   * The shape of the bar.
   * @default 'default'
   * @attribute inner-shape
   */
  @property({ attribute: 'inner-shape' }) public innerShape: MeterInnerShape = 'default';

  /**
   * The density of the meter.
   * @default 'medium'
   * @attribute
   */
  @property() public density: MeterDensity = 'medium';

  /**
   * The theme of the meter.
   * @default 'default'
   * @attribute
   */
  @property() public theme: MeterTheme = 'default';

  /**
   * Whether the theme is muted.
   * @default false
   * @attribute
   */
  @property({ type: Boolean }) public muted = false;

  /**
   * Gets the percentage of the meter that's filled.
   */
  public get percentage(): number {
    return this._percentage;
  }

  public get labels(): NodeList {
    return this._internals.labels;
  }

  public get form(): HTMLFormElement | null {
    return this._internals.form;
  }

  @state() private _percentage = 0;
  @state() private _status: MeterStatus = 'optimal';
  @state() private _segmented = false;
  @state() private _grouped = false;
  @state() private _hasSlottedContent = false;

  @queryAssignedNodes() private _defaultNodes: Node[];
  @queryAssignedNodes({ slot: 'value' }) private _valueNodes: Node[];

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
    this._getGrouped();
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    const keys = Array.from(changedProperties.keys());
    if (keys.some(key => ['value', 'min', 'max', 'low', 'high', 'optimum'].includes(key.toString()))) {
      this._getStatus();
    }
    if (keys.some(key => ['low', 'high'].includes(key.toString()))) {
      this._getSegmented();
    }

    // Update default ARIA when the current, min, or max value changes. Set the state when the
    // direction changes.
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
        case 'direction':
          toggleState(this._internals, 'vertical', this.direction === 'block');
          break;
      }
    });
  }

  public render(): TemplateResult {
    const classes = {
      'inner-shape--inherit': this.innerShape === 'inherit',
      muted: this.muted,
      [`density--${this.density}`]: true,
      [`shape--${this.shape}`]: true,
      [`theme--${this.theme}`]: true
    };
    return this._grouped
      ? html`
          <div
            part="root"
            class=${classMap({ 'forge-meter': true, grouped: true, ...classes })}
            style=${styleMap({ '--_meter-percentage': this._percentage + '%' })}></div>
        `
      : html`
          <div part="root" class=${classMap({ 'forge-meter': true, ...classes })}>
            <div class=${classMap({ heading: true, 'not-empty': this._hasSlottedContent })} @slotchange=${this._handleSlotChange}>
              <div class="label"><slot></slot></div>
              <div class="value"><slot name="value"></slot></div>
            </div>
            <div
              part="track"
              class=${classMap({
                track: true,
                segmented: this._segmented,
                optimal: this._status === 'optimal',
                suboptimal: this._status === 'suboptimal',
                'least-optimal': this._status === 'least-optimal',
                lowest: this._percentage === 0,
                tickmarks: this.tickmarks
              })}>
              <div part="bar" class="bar" style=${styleMap({ '--_meter-percentage': this._percentage + '%' })}></div>
            </div>
          </div>
        `;
  }

  /**
   * Determines the percentage of the meter that's filled and whether the value is optimal,
   * suboptimal, or least optimal.
   */
  private _getStatus(): void {
    const range = this.max - this.min;
    this._percentage = range ? ((this.value - this.min) / range) * 100 : 0;

    // Clamp the percentage between 0 and 100. Round to 3 decimal places to avoid floating point errors.
    this._percentage = +Math.max(0, Math.min(100, this._percentage)).toFixed(3);

    // Fallback to 0 if the percentage is NaN.
    if (isNaN(this._percentage)) {
      this._percentage = 0;
    }

    // Dispatch an event to the parent group.
    if (this._grouped) {
      const event = new Event('change', { bubbles: true, composed: true });
      this.dispatchEvent(event);
    }

    // Use working values in case the properties are not set.
    const low = this.low ?? this.min;
    const high = this.high ?? this.max;
    const optimum = this.optimum ?? this.max;

    // The region that contains the optimum value is optimal. A region is suboptimal if it
    // neighbors the optimal region and least-optimal otherwise.
    if (optimum < low) {
      this._status = this.value < low ? 'optimal' : this.value < high ? 'suboptimal' : 'least-optimal';
    } else if (optimum > high) {
      this._status = this.value > high ? 'optimal' : this.value > low ? 'suboptimal' : 'least-optimal';
    } else {
      this._status = this.value < low ? 'suboptimal' : this.value > high ? 'suboptimal' : 'optimal';
    }
    this._setValueState();
  }

  /**
   * Determines whether low and high ranges are set. The meter is segmented if either the low or
   * high property is defined.
   *
   * When the meter is segmented the default or themed color scheme is replaced by semantic colors
   * corresponding to optimal, suboptimal, and least optimal values.
   */
  private _getSegmented(): void {
    this._segmented = this.low != null || this.high != null;
  }

  /**
   * Checks if the meter is part of a group and inherits the min and max values.
   */
  private async _getGrouped(): Promise<void> {
    const group = this.closest('forge-meter-group');
    this._grouped = !!group;

    if (group) {
      await group.updateComplete;
      this.direction = group.direction;
      this.min = group.min;
      this.max = group.max;
    }
  }

  /**
   * Checks whether the meter has any slotted content.
   */
  private _handleSlotChange(): void {
    const nodes = [...this._defaultNodes, ...this._valueNodes].filter(node => !!node.textContent?.trim());
    this._hasSlottedContent = !!nodes.length;
  }

  /**
   * Updates the internal state of the meter based on the current status.
   */
  private _setValueState(): void {
    VALUE_STATE_MAP.forEach((value, status) => toggleState(this._internals, value, this._status === status));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-meter': MeterComponent;
  }
}
