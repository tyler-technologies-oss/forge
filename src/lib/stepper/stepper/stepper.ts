import { attachShadowTemplate, coerceBoolean, CustomElement, ensureChildren, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { IStepConfiguration, StepperLayoutAlign, StepperLayoutMode } from '../stepper/stepper-constants';
import { StepComponent } from '../step/step';
import { StepperAdapter } from './stepper-adapter';
import { STEPPER_CONSTANTS } from './stepper-constants';
import { StepperFoundation } from './stepper-foundation';

import template from './stepper.html';
import styles from './stepper.scss?inline';

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
 * The web component class behind the `<forge-stepper>` custom element.
 * 
 * @tag forge-stepper
 */
@CustomElement({
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

  private _foundation: StepperFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new StepperFoundation(new StepperAdapter(this));
  }

  public async connectedCallback(): Promise<void> {
    await ensureChildren(this);
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
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
  @FoundationProperty()
  public declare steps: IStepConfiguration[];

  /** The active step index. */
  @FoundationProperty()
  public declare selectedIndex: number;

  /** Whether the stepper is linear or non-linear. */
  @FoundationProperty()
  public declare linear: boolean;

  /** Whether the stepper uses the default or alternative label layout mode. */
  @FoundationProperty()
  public declare alternative: boolean;

  /** The layout mode of the stepper. */
  @FoundationProperty()
  public declare layoutMode: StepperLayoutMode;

  /** The layout alignment of the stepper. */
  @FoundationProperty()
  public declare layoutAlign: StepperLayoutAlign;

  @FoundationProperty()
  public declare disabled: boolean;

  @FoundationProperty()
  public declare vertical: boolean;
}
