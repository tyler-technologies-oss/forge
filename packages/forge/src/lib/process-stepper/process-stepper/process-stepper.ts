import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, ForgeResizeObserver } from '@tylertech/forge-core';
import { TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedElements, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { hideWhenEmpty } from '../../core/utils/lit-utils.js';
import { PROCESS_STEP_CONSTANTS } from '../process-step/process-step-constants.js';
import { ProcessStepComponent } from '../process-step/process-step.js';
import { IProcessStepperChangeEventData, PROCESS_STEPPER_CONSTANTS, PROCESS_STEPPER_NUMBERS, ProcessStepperOrientation } from './process-stepper-constants.js';

import styles from './process-stepper.scss';

/**
 * @tag forge-process-stepper
 *
 * @summary Process steppers display progress through a multi-step process, and allow actions to be
 * completed from within each step.
 *
 * @dependency forge-process-step
 *
 * @slot - The default slot for `<forge-process-step>` elements.
 * @slot title - A heading displayed above the process.
 *
 * @fires {CustomEvent<IProcessStepperChangeEventData>} forge-process-stepper-change - Dispatches when a clickable step is activated.
 *
 * @cssproperty --forge-process-stepper-title-margin - The spacing between the title and the steps.
 *
 * @csspart root - The root element.
 * @csspart title - The element containing the slotted title.
 * @csspart steps - The element containing the steps.
 */
@customElement(PROCESS_STEPPER_CONSTANTS.elementName)
export class ProcessStepperComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = PROCESS_STEPPER_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [ProcessStepComponent];

  /**
   * The orientation of the process.
   * @default 'vertical'
   * @attribute
   */
  @property({ reflect: true })
  public orientation: ProcessStepperOrientation = 'vertical';

  /**
   * Whether each step displays its number within the marker. Steps with an icon marker, such as
   * completed and error steps, always show the icon instead.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public numbered = false;

  @queryAssignedElements({ selector: PROCESS_STEP_CONSTANTS.elementName })
  private readonly _steps!: ProcessStepComponent[];

  @state()
  private _narrow = false;

  readonly #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, { role: 'list' });
    this.addEventListener(PROCESS_STEP_CONSTANTS.events.SELECT, this.#onStepSelect);
    ForgeResizeObserver.observe(this, entry => this.#handleResize(entry));
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener(PROCESS_STEP_CONSTANTS.events.SELECT, this.#onStepSelect);
    ForgeResizeObserver.unobserve(this);
  }

  public updated(): void {
    this.#syncSteps();
  }

  /**
   * The steps within the process.
   * @readonly
   */
  public get steps(): ProcessStepComponent[] {
    return [...this._steps];
  }

  /**
   * Whether the stepper has collapsed to its compact layout. A horizontal stepper in a container
   * narrower than 600px lays its steps out vertically, because there is not enough width for
   * legible step labels side by side.
   * @readonly
   */
  public get compact(): boolean {
    return this._narrow && this.orientation === 'horizontal';
  }

  /**
   * The number of completed steps as a fraction of the total number of steps, between 0 and 1.
   * @readonly
   */
  public get progress(): number {
    const steps = this._steps;
    if (!steps.length) {
      return 0;
    }
    const completed = steps.filter(step => step.state === 'completed').length;
    return completed / steps.length;
  }

  /* @internal */
  public render(): TemplateResult {
    return html`
      <div part="root" class=${classMap({ 'forge-process-stepper': true, [this.#effectiveOrientation]: true, compact: this.compact })}>
        <div part="title" class="title" ${hideWhenEmpty()}><slot name="title"></slot></div>
        <div part="steps" class="steps">
          <slot @slotchange=${this.#handleSlotChange}></slot>
        </div>
      </div>
    `;
  }

  /** The orientation the steps are actually laid out in, which is vertical while compact. */
  get #effectiveOrientation(): ProcessStepperOrientation {
    return this.compact ? 'vertical' : this.orientation;
  }

  #handleResize(entry: ResizeObserverEntry): void {
    const width = entry.contentRect.width;
    if (width > 0) {
      this._narrow = width <= PROCESS_STEPPER_NUMBERS.COMPACT_MAX_WIDTH;
    }
  }

  #onStepSelect: EventListener = (evt: Event) => this.#handleStepSelect(evt);

  #handleSlotChange(): void {
    this.#syncSteps();
  }

  #syncSteps(): void {
    const steps = this._steps;
    steps.forEach((step, i) => {
      step.index = i + 1;
      step.count = steps.length;
      step.last = i === steps.length - 1;
      step.numbered = this.numbered;
      step.orientation = this.#effectiveOrientation;
    });
  }

  #handleStepSelect(evt: Event): void {
    const step = evt.target as ProcessStepComponent;
    const index = this._steps.indexOf(step);
    if (index === -1) {
      return;
    }

    evt.stopPropagation();
    this.dispatchEvent(
      new CustomEvent<IProcessStepperChangeEventData>('forge-process-stepper-change', {
        detail: { index, step },
        bubbles: true,
        composed: true
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-process-stepper': ProcessStepperComponent;
  }

  interface HTMLElementEventMap {
    'forge-process-stepper-change': CustomEvent<IProcessStepperChangeEventData>;
  }
}
