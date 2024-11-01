import { html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedElements, queryAssignedNodes, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { setDefaultAria } from '../../core/utils/a11y-utils';
import { IMeterComponent } from '../meter/meter';
import { METER_CONSTANTS, MeterDensity, MeterShape } from '../meter/meter-constants';
import { METER_GROUP_CONSTANTS } from './meter-group-constants';

import styles from './meter-group.scss';
import { debounce } from '@tylertech/forge-core';

export interface IMeterGroupComponent extends LitElement {
  min: number;
  max: number;
  tickmarks: boolean;
  density: MeterDensity;
  shape: MeterShape;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-meter-group': IMeterGroupComponent;
  }
}

/**
 * @tag forge-meter-group
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
 * @slot - The default slot for grouped `<forge-meter>` elements.
 * @slot label - Positions a label above the meter group.
 * @slot value - A textual representation of the meter's value.
 */
@customElement(METER_GROUP_CONSTANTS.elementName)
export class MeterGroupComponent extends LitElement implements IMeterGroupComponent {
  /* @ignore */
  public static styles = unsafeCSS(styles);
  public static formAssociated = true;

  @property({ type: Number, reflect: true }) public min = METER_CONSTANTS.numbers.DEFAULT_MIN;
  @property({ type: Number, reflect: true }) public max = METER_CONSTANTS.numbers.DEFAULT_MAX;
  @property({ type: Boolean, reflect: true }) public tickmarks = false;
  @property({ reflect: true }) public density: MeterDensity = 'default';
  @property({ reflect: true }) public shape: MeterShape = 'default';

  /* @ignore */
  public get labels(): NodeList {
    return this._internals.labels;
  }

  /* @ignore */
  public get form(): HTMLFormElement | null {
    return this._internals.form;
  }

  @state() private _hasSlottedHeadingContent = false;

  @queryAssignedNodes() private _labelNodes: Node[];
  @queryAssignedNodes({ slot: 'value' }) private _valueNodes: Node[];
  @queryAssignedElements({ selector: 'forge-meter' }) private _meters: IMeterComponent[];

  /* @ignore */
  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this._internals, { role: 'group' });
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    const keys = Array.from(changedProperties.keys());
    if (keys.some(key => ['min', 'max'].includes(key.toString()))) {
      this._syncMeters();
    }
  }

  /* @internal */
  public render(): TemplateResult {
    return html`
      <div part="root" class="forge-meter-group" @change=${this._debounceMeterChange}>
        <div class=${classMap({ heading: true, 'not-empty': this._hasSlottedHeadingContent })} @slotchange=${this._handleHeadingSlotChange}>
          <div class="label"><slot name="label"></slot></div>
          <div class="value"><slot name="value"></slot></div>
        </div>
        <div part="track" class=${classMap({ track: true, tickmarks: this.tickmarks })}>
          <slot @slotchange=${this._debounceMeterChange}></slot>
        </div>
      </div>
    `;
  }

  /**
   * Apply the min and max values to each meter in the group. These should always be set on the
   * meter group component to ensure that all meters are in sync.
   */
  private _syncMeters(): void {
    this._meters.forEach(meter => {
      meter.min = this.min;
      meter.max = this.max;
    });
  }

  /**
   * Debounce the handler to reduce the number of times it's called during rapid changes,
   * especially when the component is first connected.
   *
   * @internal
   * */
  private _debounceMeterChange = debounce(this._handleMeterChange.bind(this), 0);
  /**
   * Handle changes to the meters in the group, updating their arrangement relative to each other.
   */
  private _handleMeterChange(): void {
    // Iterate through each slotted meter, applying z-indices based on their order and setting an
    // inset equal to the widths of all preceding meters.
    this._meters.reduce((inset, meter, index, meters) => {
      meter.style.setProperty('--z-index', `${meters.length - index}`);
      meter.style.setProperty('--inset-inline-start', `${inset}%`);
      return inset + meter.percentage;
    }, 0);
  }

  /**
   * Checks whether the meter group has any slotted heading content.
   */
  private _handleHeadingSlotChange(): void {
    const nodes = [...this._labelNodes, ...this._valueNodes].filter(node => !!node.textContent?.trim());
    this._hasSlottedHeadingContent = !!nodes.length;
  }
}