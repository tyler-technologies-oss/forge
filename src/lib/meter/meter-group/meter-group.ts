import { debounce } from '@tylertech/forge-core';
import { html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedElements, queryAssignedNodes, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { setDefaultAria, toggleState } from '../../core/utils/a11y-utils';
import { MeterComponent, MeterDensity, MeterDirection, MeterInnerShape, MeterShape } from '../meter/meter';

import styles from './meter-group.scss';

/**
 * @tag forge-meter-group
 *
 * @summary Meter groups display several meters together on one track.
 *
 * @state vertical - Applied when the meter group is oriented vertically.
 *
 * @cssproperty --forge-meter-group-background - The background color of the meter group.
 * @cssproperty --forge-meter-group-height - The block size of the meter group.
 * @cssproperty --forge-meter-group-shape - The border radius of the meter group.
 * @cssproperty --forge-meter-group-tickmarks - The number of tickmarks to display.
 * @cssproperty --forge-meter-group-tickmark-color - The color of the tickmarks.
 * @cssproperty --forge-meter-group-tickmark-opacity - The opacity of the tickmarks.
 *
 * @csspart root - The root container element.
 * @csspart track - The element comprising the meter group's background.
 *
 * @slot - The default slot for grouped `<forge-meter>` elements.
 * @slot label - Positions a label above the meter group.
 * @slot value - A textual representation of the meter's value.
 */
@customElement('forge-meter-group')
export class MeterGroupComponent extends LitElement {
  /* @ignore */
  public static styles = unsafeCSS(styles);
  public static formAssociated = true;

  /**
   * The minimum value of each meter in the group.
   * @default 0
   * @attribute
   */
  @property({ type: Number }) public min = 0;

  /**
   * The maximum value of each meter in the group.
   * @default 1
   * @attribute
   */
  @property({ type: Number }) public max = 1;
  /**
   * Whether to display tickmarks.
   * @default false
   * @attribute
   */
  @property({ type: Boolean }) public tickmarks = false;

  /**
   * Whether the meter is oriented horizontally or vertically.
   * @default 'horizontal'
   * @attribute
   */
  @property() public direction: MeterDirection = 'horizontal';

  /**
   * The density of the meter group.
   * @default 'default'
   * @attribute
   */
  @property() public density: MeterDensity = 'default';

  /**
   * The shape of the meter group.
   * @default 'default'
   * @attribute
   */
  @property() public shape: MeterShape = 'default';

  /**
   * The shape of each meter in the group.
   * @default 'default'
   * @attribute inner-shape
   */
  @property({ attribute: 'inner-shape' }) public innerShape: MeterInnerShape = 'default';

  public get labels(): NodeList {
    return this._internals.labels;
  }

  public get form(): HTMLFormElement | null {
    return this._internals.form;
  }

  @state() private _hasSlottedHeadingContent = false;

  @queryAssignedNodes({ slot: 'label' }) private _labelNodes: Node[];
  @queryAssignedNodes({ slot: 'value' }) private _valueNodes: Node[];
  @queryAssignedElements({ selector: 'forge-meter' }) private _meters: MeterComponent[];

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
    if (keys.includes('direction')) {
      toggleState(this._internals, 'vertical', this.direction === 'vertical');
    }
    if (keys.some(key => ['direction', 'min', 'max'].includes(key.toString()))) {
      this._syncMeters();
    }
  }

  public render(): TemplateResult {
    return html`
      <div part="root" class="forge-meter-group" @change=${this._debounceMeterChange}>
        <div class=${classMap({ heading: true, 'not-empty': this._hasSlottedHeadingContent })} @slotchange=${this._handleHeadingSlotChange}>
          <div class="label"><slot name="label"></slot></div>
          <div class="value"><slot name="value"></slot></div>
        </div>
        <div
          part="track"
          class=${classMap({
            track: true,
            tickmarks: this.tickmarks,
            [`density--${this.density}`]: true,
            [`inner-shape--${this.innerShape}`]: true,
            [`shape--${this.shape}`]: true
          })}>
          <slot @slotchange=${this._debounceMeterChange}></slot>
        </div>
      </div>
    `;
  }

  /**
   * Applies the min and max values to each meter in the group. These should always be set on the
   * meter group component to ensure that all meters are in sync.
   */
  private _syncMeters(): void {
    this._meters.forEach(meter => {
      meter.direction = this.direction;
      meter.min = this.min;
      meter.max = this.max;
    });
  }

  /**
   * Debounce the handler to reduce the number of times it's called during rapid changes,
   * especially when the component is first connected.
   */
  private _debounceMeterChange = debounce(this._handleMeterChange.bind(this), 0);

  /**
   * Handles changes to the meters in the group, updating their arrangement relative to each other.
   */
  private _handleMeterChange(evt: Event): void {
    evt.stopPropagation();

    // Iterate through each slotted meter, applying z-indices based on their order and setting an
    // inset equal to the widths of all preceding meters.
    this._meters.reduce((inset, meter, index, meters) => {
      meter.style.setProperty('--_meter-z-index', `${meters.length - index}`);
      meter.style.setProperty('--_meter-inset', `${inset}%`);
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

declare global {
  interface HTMLElementTagNameMap {
    'forge-meter-group': MeterGroupComponent;
  }
}
