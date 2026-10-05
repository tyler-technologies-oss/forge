import { ContextRoot, consume } from '@lit/context';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, LiveAnnouncer, tryDefine } from '@tylertech/forge-core';
import { createHideRef, hideWhenEmpty } from '@tylertech/forge/core/utils/lit-utils.js';
import { tylIconAlertCircleOutline, tylIconCheckCircle, tylIconCircleDotted, tylIconCircleHalfFull } from '@tylertech/tyler-icons';
import { PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { property, query, queryAssignedNodes, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { supportsElementInternalsAria } from '../../core/utils/feature-detection.js';
import { toggleState } from '../../core/utils/utils.js';
import { FocusIndicatorComponent } from '../../focus-indicator/focus-indicator.js';
import { IconRegistry } from '../../icon/icon-registry.js';
import { IconComponent } from '../../icon/icon.js';
import { StateLayerComponent } from '../../state-layer/state-layer.js';
import {
  IProcessStepperContext,
  PROCESS_STEPPER_CONSTANTS,
  PROCESS_STEPPER_CONTEXT,
  PROCESS_STEPPER_ORIENTATIONS
} from '../process-stepper/process-stepper-constants.js';
import { PROCESS_STEP_CONSTANTS, PROCESS_STEP_STATES, ProcessStepState, stepIndex } from './process-step-constants.js';

import styles from './process-step.scss';

/**
 * @tag forge-process-step
 *
 * @summary Process steps represent a single stage of a process. A step renders a button, or a link
 * when `href` is set, so it can be activated to navigate or to perform an action. In a read-only
 * stepper, a step renders only its label.
 *
 * @dependency forge-icon
 * @dependency forge-focus-indicator
 * @dependency forge-state-layer
 *
 * @slot - The step label, which is rendered inside the step's button or link.
 * @slot marker - Replaces the generated state marker.
 * @slot support-text - Descriptive text displayed alongside the label.
 * @slot detail - Content displayed under the label, such as dates, inline form fields, actions, or validation messaging.
 *
 * @fires {Event} forge-process-step-select - Dispatches when the step is activated.
 *
 * @cssproperty --forge-process-step-marker-size - The size of the state marker.
 * @cssproperty --forge-process-step-marker-color - The color of the state marker.
 * @cssproperty --forge-process-step-track-width - The thickness of the progress line.
 * @cssproperty --forge-process-step-track-background - The color of the inactive progress line.
 * @cssproperty --forge-process-step-track-color - The color of the filled progress line.
 * @cssproperty --forge-process-step-track-padding - The spacing between the progress line and the step header.
 * @cssproperty --forge-process-step-padding - The padding around and between elements inside the step.
 * @cssproperty --forge-process-step-min-block-size - The minimum height of a step in the vertical orientation, which keeps the spacing between steps even.
 * @cssproperty --forge-process-step-disabled-opacity - The opacity applied to a disabled step.
 * @cssproperty --forge-theme-error - The color of a step in the critical state.
 * @cssproperty --forge-theme-text-high - The color of the label and marker number.
 * @cssproperty --forge-theme-text-medium - The color of the support text.
 *
 * @csspart root - The root element.
 * @csspart marker - The state marker element.
 * @csspart marker-number - The element containing the marker number.
 * @csspart detail - The element containing the slotted detail content.
 * @csspart label - The element containing the button or link.
 * @csspart support-text - The element containing the slotted support text.
 * @csspart focus-indicator - The focus indicator shown when the step has keyboard focus.
 * @csspart state-layer - The state layer shown when the step is hovered or pressed.
 *
 * @state disabled - Applied when the step is disabled.
 * @state readonly - Applied when the stepper is read-only.
 * @state not-started - Applied when the step has not been started.
 * @state in-progress - Applied when the step is currently in progress.
 * @state completed - Applied when the step has been completed.
 * @state critical - Applied when the step is in a critical state.
 * @state horizontal - Applied when the stepper is in the horizontal orientation.
 * @state vertical - Applied when the stepper is in the vertical orientation.
 */
export class ProcessStepComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = PROCESS_STEP_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [IconComponent, FocusIndicatorComponent, StateLayerComponent];

  /** @internal */
  public static contextRoot = new ContextRoot();

  static {
    IconRegistry.define([tylIconCheckCircle, tylIconCircleDotted, tylIconCircleHalfFull, tylIconAlertCircleOutline]);
  }

  /**
   * The state of the step within the process.
   * @default 'not-started'
   * @attribute
   */
  @property()
  public state: ProcessStepState = 'not-started';

  /**
   * The URL that the step links to. When set, the step renders a link instead of a button. This is
   * ignored when the stepper is read-only.
   * @default undefined
   * @attribute
   */
  @property()
  public href?: string;

  /**
   * Whether the step is disabled. A disabled step keeps the marker of its state, is dimmed, and
   * ignores interaction.
   * @default false
   * @attribute
   */
  @property({ type: Boolean })
  public disabled = false;

  /** @internal */
  @property({ attribute: false })
  public [stepIndex] = 0;

  @state()
  @consume({ context: PROCESS_STEPPER_CONTEXT, subscribe: true })
  private _stepperContext?: IProcessStepperContext;

  /** A position set by the consumer, which takes precedence over the step's position in the DOM. */
  @property({ attribute: 'aria-posinset' })
  private _consumerPosInSet: string | null = null;

  /** A process size set by the consumer, which takes precedence over the number of steps in the DOM. */
  @property({ attribute: 'aria-setsize' })
  private _consumerSetSize: string | null = null;

  @query('.control')
  private readonly _control?: HTMLElement;

  @queryAssignedNodes()
  private readonly _labelNodes!: Node[];

  readonly #internals: ElementInternals;

  #supportTextSlotHideRef = createHideRef();
  #detailSlotHideRef = createHideRef();

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public connectedCallback(): void {
    // Attach the parent stepper's context root so that context is provided even if the step is
    // upgraded before the stepper. This must happen before super.connectedCallback().
    const stepper = this.closest(PROCESS_STEPPER_CONSTANTS.elementName);
    if (stepper) {
      ProcessStepComponent.contextRoot.attach(stepper);
    }

    super.connectedCallback();
    setDefaultAria(this, this.#internals, { role: 'listitem' });
    this.addEventListener('click', this.#onClick);

    if (this.hasUpdated) {
      this.requestUpdate();
    }
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this.#onClick);
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('disabled')) {
      toggleState(this.#internals, 'disabled', this.disabled);
    }

    if (changedProperties.has('state')) {
      setDefaultAria(this, this.#internals, {
        ariaCurrent: this.state === 'current' ? 'step' : null
      });
      PROCESS_STEP_STATES.forEach(stepState => toggleState(this.#internals, stepState, this.state === stepState));
    }

    // The orientation and readonly come from the stepper's context, so they are synced on every update.
    toggleState(this.#internals, 'readonly', this.#readonly);
    PROCESS_STEPPER_ORIENTATIONS.forEach(orientation => toggleState(this.#internals, orientation, this.#orientation === orientation));

    // Positional ARIA is only applied through ElementInternals, so aria-posinset and aria-setsize
    // set on the host by the consumer take precedence rather than being overwritten.
    if (supportsElementInternalsAria()) {
      this.#internals.ariaPosInSet = this.#position ? `${this.#position}` : null;
      this.#internals.ariaSetSize = this.#setSize ? `${this.#setSize}` : null;
    }

    if (this.hasUpdated && changedProperties.has('state') && this.state === 'current') {
      this.#announce();
    }
  }

  public updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('state')) {
      this.dispatchEvent(new Event(PROCESS_STEP_CONSTANTS.events.STATE_CHANGE, { bubbles: true }));
    }

    const target = this._control;
    const indicator = this.shadowRoot?.querySelector<FocusIndicatorComponent>('forge-focus-indicator');
    const stateLayer = this.shadowRoot?.querySelector<StateLayerComponent>('forge-state-layer');
    if (target && indicator && stateLayer) {
      indicator.targetElement = target;
      stateLayer.targetElement = target;
    }
  }

  /* @internal */
  public get touched(): boolean {
    if (this.state === 'current') {
      return true;
    }

    const currentIndex = this._stepperContext?.currentIndex ?? 0;
    return currentIndex > 0 && this[stepIndex] <= currentIndex;
  }
  /* @internal */
  public get labelText(): string {
    return this._labelNodes
      .map(node => node.textContent)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  get #orientation(): string {
    return this._stepperContext?.orientation ?? 'vertical';
  }

  get #readonly(): boolean {
    return this._stepperContext?.readonly ?? false;
  }

  get #position(): number {
    return Number(this._consumerPosInSet) || this[stepIndex];
  }

  get #setSize(): number {
    return Number(this._consumerSetSize) || (this._stepperContext?.count ?? 0);
  }

  get #markerIcon(): string | null {
    switch (this.state) {
      case 'not-started':
        return 'circle_dotted';
      case 'completed':
        return 'check_circle';
      case 'current':
      case 'in-progress':
        return 'circle_half_full';
      case 'critical':
        return 'alert_circle_outline';
      default:
        return null;
    }
  }

  get #stateText(): string {
    switch (this.state) {
      case 'not-started':
        return 'Not started';
      case 'completed':
        return 'Completed';
      case 'current':
        return 'Current';
      case 'in-progress':
        return 'In progress';
      case 'critical':
        return 'Critical';
      default:
        return '';
    }
  }

  /* @internal */
  public render(): TemplateResult {
    const icon = this.#markerIcon;
    const readonly = this.#readonly;

    return html`
      <div
        part="root"
        class=${classMap({
          'forge-process-step': true,
          [this.#orientation]: true,
          [this.state]: true,
          disabled: this.disabled,
          touched: this.touched
        })}>
        <div class="header">
          <div part="marker" class="marker">
            ${this._stepperContext?.numbered && this.state === 'not-started'
              ? html`<span part="marker-number" class="marker-number">${this.#position || nothing}</span>`
              : nothing}
            <slot name="marker" @slotchange=${this.#handleMarkerSlotChange}>${icon ? html`<forge-icon name=${icon}></forge-icon>` : nothing}</slot>
          </div>
          ${this.#renderLabel()}
          <div part="support-text" id="support-text" class="support-text" ${hideWhenEmpty(this.#supportTextSlotHideRef)}><slot name="support-text"></slot></div>
          ${when(
            !readonly,
            () => html`
              <forge-state-layer exportparts="surface:state-layer" .disabled=${this.disabled}></forge-state-layer>
              <forge-focus-indicator part="focus-indicator" inward></forge-focus-indicator>
            `
          )}
        </div>
        <div part="detail" class="detail" ${hideWhenEmpty(this.#detailSlotHideRef)}><slot name="detail"></slot></div>
      </div>
    `;
  }

  #renderLabel(): TemplateResult {
    const stateText = html`<span class="visually-hidden">(${this.#stateText})</span>`;

    if (this.#readonly) {
      return html`
        <div part="label" class="label">
          <slot></slot>
          ${stateText}
        </div>
      `;
    } else if (this.href) {
      return html`
        <div part="label" class="label">
          <a
            class="control"
            href=${ifDefined(this.disabled ? undefined : this.href)}
            role=${ifDefined(this.disabled ? 'link' : undefined)}
            aria-describedby="support-text"
            aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
            aria-current=${ifDefined(this.state === 'current' ? 'step' : undefined)}>
            <slot></slot>
            ${stateText}
          </a>
        </div>
      `;
    }

    return html`
      <div part="label" class="label">
        <button
          class="control"
          type="button"
          aria-describedby="support-text"
          aria-current=${ifDefined(this.state === 'current' ? 'step' : undefined)}
          ?disabled=${this.disabled}>
          <slot></slot>
          ${stateText}
        </button>
      </div>
    `;
  }

  /** Announces the position of the step when the process moves to it. */
  #announce(): void {
    const position = this.#position;
    const setSize = this.#setSize;
    if (!this._stepperContext || !position || !setSize) {
      return;
    }

    const label = this.labelText;
    const announcement = `Step ${position} of ${setSize}`;
    LiveAnnouncer.instance.announce(label ? `${announcement}: ${label}` : announcement, 'polite');
  }

  #onClick: EventListener = (evt: Event) => this.#handleClick(evt);

  #handleMarkerSlotChange(): void {
    this.requestUpdate();
  }

  #handleClick(evt: Event): void {
    const control = this._control;
    if (this.disabled || !control || !evt.composedPath().includes(control)) {
      return;
    }

    this.dispatchEvent(new Event('forge-process-step-select', { bubbles: true, composed: true }));
  }
}

tryDefine(PROCESS_STEP_CONSTANTS.elementName, ProcessStepComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-process-step': ProcessStepComponent;
  }

  interface HTMLElementEventMap {
    'forge-process-step-select': Event;
  }
}
