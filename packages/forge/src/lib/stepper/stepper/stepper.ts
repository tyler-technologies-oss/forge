import { attachShadowTemplate, coerceBoolean, customElement, ensureChildren, coreProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component.js';
import { IStepConfiguration, StepperLayoutAlign, StepperLayoutMode } from '../stepper/stepper-constants.js';
import { StepComponent } from '../step/step.js';
import { StepperAdapter } from './stepper-adapter.js';
import { STEPPER_CONSTANTS } from './stepper-constants.js';
import { StepperCore } from './stepper-core.js';

import template from './stepper.html';
import styles from './stepper.scss';

export interface IStepperComponent extends IBaseComponent {
  steps: IStepConfiguration[];
  selectedIndex: number;
  linear: boolean;
  alternative: boolean;
  layoutMode: StepperLayoutMode;
  layoutAlign: StepperLayoutAlign;
  disabled: boolean;
  vertical: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-stepper': IStepperComponent;
  }
}

/**
 * @tag forge-stepper
 *
 * @summary Steppers guide users through multi-step processes by breaking them into logical steps.
 *
 * @dependency forge-step
 *
 * @event {CustomEvent<number>} forge-step-select - Emits the index when a step is selected.
 * @event {CustomEvent<IStepComponent>} forge-step-expanded-content-focusin - Emits the step component when the expanded content is focused.
 * @event {CustomEvent<IStepComponent>} forge-step-expanded-content-focusout - Emits the step component when the expanded content is blurred.
 *
 */
@customElement({
  name: STEPPER_CONSTANTS.elementName,
  dependencies: [StepComponent]
})
export class StepperComponent extends BaseComponent implements IStepperComponent {
  public static get observedAttributes(): string[] {
    return [
      STEPPER_CONSTANTS.attributes.SELECTED_INDEX,
      STEPPER_CONSTANTS.attributes.LINEAR,
      STEPPER_CONSTANTS.attributes.ALTERNATIVE,
      STEPPER_CONSTANTS.attributes.LAYOUT_MODE,
      STEPPER_CONSTANTS.attributes.LAYOUT_ALIGN,
      STEPPER_CONSTANTS.attributes.DISABLED,
      STEPPER_CONSTANTS.attributes.VERTICAL
    ];
  }

  private _core: StepperCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new StepperCore(new StepperAdapter(this));
  }

  public async connectedCallback(): Promise<void> {
    await ensureChildren(this);
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case STEPPER_CONSTANTS.attributes.SELECTED_INDEX:
        this.selectedIndex = Number(newValue) || 0;
        break;
      case STEPPER_CONSTANTS.attributes.LINEAR:
        this.linear = coerceBoolean(newValue);
        break;
      case STEPPER_CONSTANTS.attributes.ALTERNATIVE:
        this.alternative = coerceBoolean(newValue);
        break;
      case STEPPER_CONSTANTS.attributes.LAYOUT_MODE:
        this.layoutMode = newValue as StepperLayoutMode;
        break;
      case STEPPER_CONSTANTS.attributes.LAYOUT_ALIGN:
        this.layoutAlign = newValue as StepperLayoutAlign;
        break;
      case STEPPER_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case STEPPER_CONSTANTS.attributes.VERTICAL:
        this.vertical = coerceBoolean(newValue);
        break;
    }
  }

  /**
   * The step configurations.
   * @default []
   */
  @coreProperty()
  declare public steps: IStepConfiguration[];

  /**
   * The active step index.
   * @default 0
   * @attribute selected-index
   */
  @coreProperty()
  declare public selectedIndex: number;

  /**
   * Whether the stepper is linear or non-linear.
   * @default false
   * @attribute
   */
  @coreProperty()
  declare public linear: boolean;

  /**
   * Whether the stepper uses the default or alternative label layout mode.
   * @default false
   * @attribute
   */
  @coreProperty()
  declare public alternative: boolean;

  /**
   * The layout mode of the stepper.
   * @default "fixed"
   * @attribute layout-mode
   */
  @coreProperty()
  declare public layoutMode: StepperLayoutMode;

  /**
   * The layout alignment of the stepper.
   * @default "center"
   * @attribute layout-align
   */
  @coreProperty()
  declare public layoutAlign: StepperLayoutAlign;

  /**
   * Whether the stepper is disabled.
   * @default false
   * @attribute
   */
  @coreProperty()
  declare public disabled: boolean;

  /**
   * Whether the stepper is vertical.
   * @default false
   * @attribute
   */
  @coreProperty()
  declare public vertical: boolean;
}
