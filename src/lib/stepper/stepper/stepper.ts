import { attachShadowTemplate, coerceBoolean, customElement, ensureChildren, coreProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { IStepConfiguration, StepperLayoutAlign, StepperLayoutMode } from '../stepper/stepper-constants';
import { StepComponent } from '../step/step';
import { StepperAdapter } from './stepper-adapter';
import { STEPPER_CONSTANTS } from './stepper-constants';
import { StepperCore } from './stepper-core';

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
    this._core.disconnect();
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

  /** The step configurations. */
  @coreProperty()
  public declare steps: IStepConfiguration[];

  /** The active step index. */
  @coreProperty()
  public declare selectedIndex: number;

  /** Whether the stepper is linear or non-linear. */
  @coreProperty()
  public declare linear: boolean;

  /** Whether the stepper uses the default or alternative label layout mode. */
  @coreProperty()
  public declare alternative: boolean;

  /** The layout mode of the stepper. */
  @coreProperty()
  public declare layoutMode: StepperLayoutMode;

  /** The layout alignment of the stepper. */
  @coreProperty()
  public declare layoutAlign: StepperLayoutAlign;

  @coreProperty()
  public declare disabled: boolean;

  @coreProperty()
  public declare vertical: boolean;
}
