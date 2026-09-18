import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { tylIconCheck, tylIconExclamation } from '@tylertech/tyler-icons';
import { TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedElements, queryAssignedNodes } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { hideWhenEmpty } from '../../core/utils/lit-utils.js';
import { toggleState } from '../../core/utils/utils.js';
import { IconRegistry } from '../../icon/icon-registry.js';
import { FocusIndicatorComponent } from '../../focus-indicator/focus-indicator.js';
import { IconComponent } from '../../icon/icon.js';
import type { ProcessStepperOrientation } from '../process-stepper/process-stepper-constants.js';
import { ERROR_STATES, PARTIAL_STATES, PROCESS_STEP_CONSTANTS, PROGRESS_LINE_STATES, ProcessStepState } from './process-step-constants.js';

import styles from './process-step.scss';

/**
 * @tag forge-process-step
 *
 * @summary Process steps represent a single stage of a process. A step containing a link or a
 * button is actionable; a step containing only text is a read-only indicator of progress.
 *
 * @dependency forge-icon
 * @dependency forge-focus-indicator
 *
 * @slot - The step label. A slotted link or button in this slot becomes the step's interactive area.
 * @slot marker - Replaces the generated state marker.
 * @slot additional-content - Content displayed under the label, such as inline form fields.
 * @slot meta - Supporting information displayed under the label, such as dates or assigned users.
 * @slot message - Validation or warning messaging displayed under the meta content.
 * @slot actions - Actions displayed at the end of the step content.
 *
 * @fires {CustomEvent<void>} forge-process-step-select - Dispatches when an interactive step is activated.
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
 * @cssproperty --forge-process-step-focus-indicator-offset - The distance between the label text and the focus ring along the inline axis.
 * @cssproperty --forge-process-step-focus-indicator-offset-block - The distance between the label text and the focus ring along the block axis.
 * @cssproperty --forge-process-step-focus-indicator-shape - The corner radius of the focus ring.
 *
 * @csspart root - The root element.
 * @csspart line - The progress line element.
 * @csspart marker - The state marker element.
 * @csspart content - The element containing the description, meta, message, and slotted content.
 * @csspart label - The element containing the slotted label.
 * @csspart focus-indicator - The focus indicator shown when an interactive step has keyboard focus.
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
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [IconComponent, FocusIndicatorComponent];

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
   * The description displayed under the label.
   * @attribute
   */
  @property()
  public description = '';

  /**
   * Whether to ignore an interactive element in the default slot. A step containing a link or a
   * button is interactive by default.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public noninteractive = false;

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

  @queryAssignedElements()
  private readonly _labelElements!: Element[];

  @queryAssignedNodes()
  private readonly _labelNodes!: Node[];

  readonly #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, { role: 'listitem' });
    this.addEventListener('click', this.#onClick);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this.#onClick);
  }

  public willUpdate(): void {
    toggleState(this.#internals, 'disabled', this.state === 'disabled');
    setDefaultAria(this, this.#internals, {
      ariaCurrent: this.state === 'current' ? 'step' : null,
      ariaPosInSet: this.index ? `${this.index}` : null,
      ariaSetSize: this.count ? `${this.count}` : null
    });
  }

  /**
   * Whether the progress line through this step is filled.
   * @readonly
   */
  public get lineActive(): boolean {
    return PROGRESS_LINE_STATES.includes(this.state);
  }

  /**
   * Whether the step has an interactive element, which makes it actionable rather than a read-only
   * indicator of progress.
   * @readonly
   */
  public get interactive(): boolean {
    return !!this.#interactiveElement;
  }

  /**
   * The step's label as plain text, taken from the default slot.
   * @readonly
   */
  public get labelText(): string {
    return (this._labelNodes ?? [])
      .map(node => node.textContent ?? '')
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
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

  /* @internal */
  public render(): TemplateResult {
    const interactive = this.interactive;

    return html`
      <div part="root" class=${classMap({ 'forge-process-step': true, [this.orientation]: true, [this.state]: true, interactive })}>
        <div part="line" class=${classMap({ line: true, active: this.lineActive, last: this.last })} aria-hidden="true"></div>
        <div class="sidebar">${this.#marker}</div>
        <div part="label" class="label-row">
          <span class="label">
            <slot @slotchange=${this.#handleLabelSlotChange}></slot>
            ${when(interactive, () => html`<forge-focus-indicator part="focus-indicator"></forge-focus-indicator>`)}
          </span>
        </div>
        <div part="content" class="content">
          ${when(this.description, () => html`<span part="description" class="description">${this.description}</span>`)}
          <div part="meta" class="meta" ${hideWhenEmpty()}><slot name="meta"></slot></div>
          <div part="message" class="message" ${hideWhenEmpty()}><slot name="message"></slot></div>
          <slot name="additional-content"></slot>
          <div part="actions" class="actions" ${hideWhenEmpty()}><slot name="actions"></slot></div>
        </div>
      </div>
    `;
  }

  public updated(): void {
    const indicator = this.shadowRoot?.querySelector<FocusIndicatorComponent>('forge-focus-indicator');
    if (indicator) {
      indicator.targetElement = this.#interactiveElement ?? undefined;
    }
  }

  /**
   * The step's interactive element, which is a slotted link or button in the default slot. Content
   * in the other slots is ignored, so an action button does not make the label interactive.
   */
  get #interactiveElement(): HTMLElement | null {
    if (this.noninteractive) {
      return null;
    }

    const elements = this._labelElements ?? [];
    const anchor = elements.find(el => el.matches(PROCESS_STEP_CONSTANTS.selectors.ANCHOR));
    return (anchor ?? elements.find(el => el.matches(PROCESS_STEP_CONSTANTS.selectors.BUTTON_LIKE)) ?? null) as HTMLElement | null;
  }

  #onClick: EventListener = (evt: Event) => this.#handleClick(evt);

  #handleLabelSlotChange(): void {
    this.requestUpdate();
  }

  #handleMarkerSlotChange(): void {
    this.requestUpdate();
  }

  #handleClick(evt: Event): void {
    const interactiveElement = this.#interactiveElement;
    if (!interactiveElement || !evt.composedPath().includes(interactiveElement)) {
      return;
    }

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
