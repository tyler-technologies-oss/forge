import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { tylIconCheck, tylIconExclamation } from '@tylertech/tyler-icons';
import { TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { hideWhenEmpty } from '../../core/utils/lit-utils.js';
import { toggleState } from '../../core/utils/utils.js';
import { IconRegistry } from '../../icon/icon-registry.js';
import { IconComponent } from '../../icon/icon.js';
import type { ProcessStepperOrientation } from '../process-stepper/process-stepper-constants.js';
import { ERROR_STATES, PARTIAL_STATES, PROCESS_STEP_CONSTANTS, PROGRESS_LINE_STATES, ProcessStepState } from './process-step-constants.js';

import styles from './process-step.scss';

/**
 * @tag forge-process-step
 *
 * @summary Process steps represent a single stage of a process, and may contain interactive content.
 *
 * @dependency forge-icon
 *
 * @slot - The default slot for supporting content, such as inline form fields or actions.
 * @slot marker - Replaces the generated state marker.
 * @slot meta - Supporting information displayed under the label, such as dates or assigned users.
 * @slot message - Validation or warning messaging displayed under the meta content.
 * @slot actions - Actions displayed at the end of the step content.
 *
 * @fires {CustomEvent<void>} forge-process-step-select - Dispatches when a clickable step is activated.
 *
 * @cssproperty --forge-process-step-marker-size - The size of the state marker.
 * @cssproperty --forge-process-step-marker-background - The background color of the marker, which masks the progress line behind it.
 * @cssproperty --forge-process-step-marker-shape - The corner radius of the state marker.
 * @cssproperty --forge-process-step-marker-color - The color of a completed or active marker.
 * @cssproperty --forge-process-step-marker-icon-color - The color of the icon within a filled marker.
 * @cssproperty --forge-process-step-marker-inactive-color - The color of an upcoming marker.
 * @cssproperty --forge-process-step-marker-border-width - The border width of an unfilled marker.
 * @cssproperty --forge-process-step-marker-error-color - The color of a marker in an error state.
 * @cssproperty --forge-process-step-line-width - The thickness of the inactive progress line.
 * @cssproperty --forge-process-step-line-active-width - The thickness of the filled progress line.
 * @cssproperty --forge-process-step-line-color - The color of the inactive progress line.
 * @cssproperty --forge-process-step-line-active-color - The color of the filled progress line.
 * @cssproperty --forge-process-step-line-gap - The spacing between the progress line and the step content.
 * @cssproperty --forge-process-step-sidebar-gap - The spacing between the marker and the step content.
 * @cssproperty --forge-process-step-content-gap - The spacing between the label, description, and meta content.
 * @cssproperty --forge-process-step-content-padding-block-end - The spacing below a step in the vertical orientation.
 * @cssproperty --forge-process-step-row-min-block-size - The minimum height of a step in the vertical orientation, which keeps the spacing between steps even.
 * @cssproperty --forge-process-step-content-padding-inline-end - The spacing after a step in the horizontal orientation.
 * @cssproperty --forge-process-step-meta-gap - The spacing between rows of slotted meta content.
 * @cssproperty --forge-process-step-meta-column-gap - The spacing between the label and value columns of slotted meta content.
 * @cssproperty --forge-process-step-control-inset - The amount slotted form controls are pulled back by so their visible box aligns with the text column.
 * @cssproperty --forge-process-step-actions-gap - The spacing between slotted actions.
 * @cssproperty --forge-process-step-actions-margin - The spacing above the slotted actions.
 * @cssproperty --forge-process-step-label-color - The color of the label.
 * @cssproperty --forge-process-step-description-color - The color of the description.
 * @cssproperty --forge-process-step-disabled-opacity - The opacity applied to a disabled step.
 *
 * @csspart root - The root element.
 * @csspart line - The progress line element.
 * @csspart marker - The state marker element.
 * @csspart content - The element containing the description, meta, message, and slotted content.
 * @csspart label - The label element.
 * @csspart label-button - The button rendered for a clickable step.
 * @csspart description - The description element.
 * @csspart meta - The element containing the slotted meta content.
 * @csspart message - The element containing the slotted message content.
 * @csspart actions - The element containing the slotted actions.
 */
@customElement(PROCESS_STEP_CONSTANTS.elementName)
export class ProcessStepComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = PROCESS_STEP_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [IconComponent];

  static {
    IconRegistry.define([tylIconCheck, tylIconExclamation]);
  }

  /**
   * The state of the step within the process.
   * @default 'not-started'
   * @attribute
   */
  @property({ reflect: true })
  public state: ProcessStepState = 'not-started';

  /**
   * The label of the step.
   * @attribute
   */
  @property()
  public label = '';

  /**
   * The description displayed under the label.
   * @attribute
   */
  @property()
  public description = '';

  /**
   * Whether the step label is interactive. Clickable steps render a button and dispatch a
   * `forge-process-step-select` event when activated.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public clickable = false;

  /**
   * The one-based position of the step within the process. Set by the parent
   * `<forge-process-stepper>`.
   * @default 0
   */
  @property({ type: Number, attribute: false })
  public index = 0;

  /**
   * Whether the step number is displayed within the marker when the step has no icon treatment.
   * Set by the parent `<forge-process-stepper>`.
   * @default false
   */
  @property({ type: Boolean, attribute: false })
  public numbered = false;

  /**
   * The total number of steps in the process. Set by the parent `<forge-process-stepper>`.
   * @default 0
   */
  @property({ type: Number, attribute: false })
  public count = 0;

  /**
   * Whether this is the last step in the process. Set by the parent `<forge-process-stepper>`.
   * @default false
   */
  @property({ type: Boolean, attribute: false })
  public last = false;

  /**
   * The orientation inherited from the parent `<forge-process-stepper>`.
   * @default 'vertical'
   */
  @property({ attribute: false })
  public orientation: ProcessStepperOrientation = 'vertical';

  @queryAssignedElements({ slot: 'marker' })
  private readonly _markerElements!: Element[];

  readonly #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, { role: 'listitem' });
  }

  public willUpdate(): void {
    toggleState(this.#internals, 'disabled', this.state === 'disabled');
    setDefaultAria(this, this.#internals, {
      ariaCurrent: this.state === 'current' ? 'step' : null,
      ariaPosInSet: this.index ? `${this.index}` : null,
      ariaSetSize: this.count ? `${this.count}` : null
    });
  }

  /** Whether the progress line through this step is filled. */
  public get lineActive(): boolean {
    return PROGRESS_LINE_STATES.includes(this.state);
  }

  get #markerIcon(): string | null {
    if (this.state === 'completed') {
      return 'check';
    }
    return ERROR_STATES.includes(this.state) ? 'exclamation' : null;
  }

  get #marker(): TemplateResult {
    const icon = this.#markerIcon;
    const custom = this._markerElements?.length > 0;
    const classes = {
      marker: true,
      custom,
      partial: !custom && PARTIAL_STATES.includes(this.state),
      error: !custom && ERROR_STATES.includes(this.state),
      filled: !custom && this.state === 'completed',
      dashed: !custom && !icon && !PARTIAL_STATES.includes(this.state)
    };

    return html`
      <div part="marker" class=${classMap(classes)} aria-hidden="true">
        <slot name="marker" @slotchange=${this.#handleMarkerSlotChange}
          >${icon ? html`<forge-icon name=${icon}></forge-icon>` : html`${this.numbered ? this.index || nothing : nothing}`}</slot
        >
      </div>
    `;
  }

  get #label(): TemplateResult {
    return when(
      this.clickable,
      () => html`
        <button part="label-button" class="label-button" ?disabled=${this.state === 'disabled'} @click=${this.#handleClick}>
          <span part="label" class="label">${this.label}</span>
        </button>
      `,
      () => html`<span part="label" class="label">${this.label}</span>`
    );
  }

  /* @internal */
  public render(): TemplateResult {
    return html`
      <div part="root" class=${classMap({ 'forge-process-step': true, [this.orientation]: true, [this.state]: true })}>
        <div part="line" class=${classMap({ line: true, active: this.lineActive, last: this.last })} aria-hidden="true"></div>
        <div class="sidebar">${this.#marker}</div>
        <div class="label-row">${this.#label}</div>
        <div part="content" class="content">
          ${when(this.description, () => html`<span part="description" class="description">${this.description}</span>`)}
          <div part="meta" class="meta" ${hideWhenEmpty()}><slot name="meta"></slot></div>
          <div part="message" class="message" ${hideWhenEmpty()}><slot name="message"></slot></div>
          <slot></slot>
          <div part="actions" class="actions" ${hideWhenEmpty()}><slot name="actions"></slot></div>
        </div>
      </div>
    `;
  }

  #handleMarkerSlotChange(): void {
    this.requestUpdate();
  }

  #handleClick(): void {
    this.dispatchEvent(new CustomEvent('forge-process-step-select', { bubbles: true, composed: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-process-step': ProcessStepComponent;
  }

  interface HTMLElementEventMap {
    'forge-process-step-select': CustomEvent<void>;
  }
}
