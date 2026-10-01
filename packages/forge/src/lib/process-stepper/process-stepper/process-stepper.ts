import { provide } from '@lit/context';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, ForgeResizeObserver, tryDefine } from '@tylertech/forge-core';
import { PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { property, queryAssignedElements, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { PROCESS_STEP_CONSTANTS, stepIndex } from '../process-step/process-step-constants.js';
import { ProcessStepComponent } from '../process-step/process-step.js';
import {
  IProcessStepperContext,
  PROCESS_STEPPER_CONSTANTS,
  PROCESS_STEPPER_CONTEXT,
  PROCESS_STEPPER_NUMBERS,
  ProcessStepperOrientation
} from './process-stepper-constants.js';

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
 *
 * @fires {Event} change - Dispatches when an interactive step is activated. The activated step is available from `selectedStep`.
 *
 * @csspart root - The root element.
 * @csspart steps - The element containing the steps.
 */
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
  @property()
  public orientation: ProcessStepperOrientation = 'vertical';

  /**
   * Whether each step displays its number within the marker. Steps with an icon marker, such as
   * completed and error steps, always show the icon instead.
   * @default false
   * @attribute
   */
  @property({ type: Boolean })
  public numbered = false;

  @queryAssignedElements({ selector: PROCESS_STEP_CONSTANTS.elementName })
  private readonly _steps!: ProcessStepComponent[];

  @state()
  private _narrow = false;

  @provide({ context: PROCESS_STEPPER_CONTEXT })
  private _context: IProcessStepperContext = { count: 0, numbered: false, orientation: 'vertical' };

  readonly #internals: ElementInternals;

  #selectedStep: ProcessStepComponent | null = null;

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

  public willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    this.#updateContext();
  }

  /**
   * The steps within the process.
   * @readonly
   */
  public get steps(): ProcessStepComponent[] {
    return [...this._steps];
  }

  /**
   * The step most recently activated by the user, or `null` if no step has been activated.
   * @readonly
   */
  public get selectedStep(): ProcessStepComponent | null {
    return this.#selectedStep && this._steps.includes(this.#selectedStep) ? this.#selectedStep : null;
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

  #updateContext(): void {
    const context: IProcessStepperContext = {
      count: this._steps?.length ?? 0,
      numbered: this.numbered,
      orientation: this.#effectiveOrientation
    };
    const changed = (Object.keys(context) as (keyof IProcessStepperContext)[]).some(key => context[key] !== this._context[key]);
    if (changed) {
      this._context = context;
    }
  }

  #handleResize(entry: ResizeObserverEntry): void {
    const width = entry.contentRect.width;
    if (width > 0) {
      this._narrow = width <= PROCESS_STEPPER_NUMBERS.COMPACT_MAX_WIDTH;
    }
  }

  #onStepSelect: EventListener = (evt: Event) => this.#handleStepSelect(evt);

  #handleSlotChange(): void {
    this._steps.forEach((step, i) => (step[stepIndex] = i + 1));
    this.requestUpdate();
  }

  #handleStepSelect(evt: Event): void {
    const step = evt.target as ProcessStepComponent;
    if (!this._steps.includes(step)) {
      return;
    }

    evt.stopPropagation();
    this.#selectedStep = step;
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

tryDefine(PROCESS_STEPPER_CONSTANTS.elementName, ProcessStepperComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-process-stepper': ProcessStepperComponent;
  }
}
