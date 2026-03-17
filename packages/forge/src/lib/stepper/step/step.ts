import { attachShadowTemplate, coerceBoolean, coerceNumber, customElement, coreProperty } from '@tylertech/forge-core';
import { tylIconModeEdit, tylIconWarning, tylIconCheck, tylIconBlock, tylIconKeyboardArrowDown } from '@tylertech/tyler-icons';
import { StepAdapter } from './step-adapter.js';
import { STEP_CONSTANTS } from './step-constants.js';
import { StepCore } from './step-core.js';
import { IconRegistry, IconComponent } from '../../icon/index.js';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component.js';
import { ExpansionPanelComponent } from '../../expansion-panel/index.js';
import { StateLayerComponent } from '../../state-layer/index.js';
import { FocusIndicatorComponent } from '../../focus-indicator/index.js';

import template from './step.html';
import styles from './step.scss';

export interface IStepComponent extends IBaseComponent {
  index: number;
  editable: boolean;
  completed: boolean;
  error: boolean;
  selected: boolean;
  alternative: boolean;
  disabled: boolean;
  vertical: boolean;
  expanded: boolean;
  ignoreUserExpansion: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-step': IStepComponent;
  }

  interface HTMLElementEventMap {
    'forge-step-select': CustomEvent<number>;
    'forge-step-expanded-content-focusin': CustomEvent<IStepComponent>;
    'forge-step-expanded-content-focusout': CustomEvent<IStepComponent>;
  }
}

/**
 * @tag forge-step
 *
 * @summary Individual steps within a stepper component that represent progress in a multi-step process.
 *
 * @property {boolean} [alternative=false] - Whether the step is in the alternative style.
 * @property {boolean} [completed=false] - Whether the step is completed.
 * @property {boolean} [editable=false] - Whether the step is editable.
 * @property {boolean} [error=false] - Whether the step has an error.
 * @property {boolean} [selected=false] - Whether the step is selected.
 * @property {boolean} [disabled=false] - Whether the step is disabled.
 * @property {boolean} [vertical=false] - Whether the step is in vertical mode.
 * @property {boolean} [expanded=false] - Whether the step is expanded.
 * @property {boolean} [ignoreUserExpansion=false] - Whether the step should ignore user expansion.
 * @property {number} [index=undefined] - The index of the step.
 *
 * @attribute {boolean} [alternative=false] - Whether the step is in alternative mode.
 * @attribute {boolean} [completed=false] - Whether the step is completed.
 * @attribute {boolean} [editable=false] - Whether the step is editable.
 * @attribute {boolean} [error=false] - Whether the step has an error.
 * @attribute {boolean} [selected=false] - Whether the step is selected.
 * @attribute {boolean} [disabled=false] - Whether the step is disabled.
 * @attribute {boolean} [vertical=false] - Whether the step is in vertical mode.
 * @attribute {boolean} [expanded=false] - Whether the step is expanded.
 * @attribute {boolean} [ignore-user-expansion=false] - Whether the step should ignore user expansion.
 * @attribute {number} [index=undefined] - The index of the step.
 *
 * @cssproperty --forge-step-primary-color - The primary color of the step. Defaults to the primary theme.
 * @cssproperty --forge-step-text-color - The text color of the step. Defaults to the on-primary theme.
 * @cssproperty --forge-step-border-radius - The border radius of the step. Defaults to the extra-large shape.
 * @cssproperty --forge-step-border-radius-vertical - The border radius of the step in vertical mode. Defaults to the medium shape.
 * @cssproperty --forge-step-disabled-text-color - The text color of the step when disabled. Defaults to the text-low theme.
 * @cssproperty --forge-step-disabled-color - The color of the step when disabled. Defaults to the surface-container-minimum theme.
 * @cssproperty --forge-step-icon-fill - The fill color of the step icon. Defaults to unset.
 * @cssproperty --forge-step-icon-fill-active - The fill color of the step icon when active. Defaults to the primary color.
 * @cssproperty --forge-step-icon-text-color - The text color of the step icon. Defaults to the primary theme.
 * @cssproperty --forge-step-icon-text-color-active - The text color of the step icon when active. Defaults to the on-primary theme.
 * @cssproperty --forge-step-icon-content-size - The size of the step icon content. Defaults to 24px.
 * @cssproperty --forge-step-icon-size - The size of the step icon. Defaults to 0.875em.
 * @cssproperty --forge-step-icon-transition-duration - The duration of the step icon transition. Defaults to the medium4 animation duration.
 * @cssproperty --forge-step-icon-transition-easing - The easing of the step icon transition. Defaults to the standard animation easing.
 * @cssproperty --forge-step-line-color - The color of the step line. Defaults to the outline theme.
 * @cssproperty --forge-step-line-min-width - The minimum width of the step line. Defaults to 10px.
 * @cssproperty --forge-step-line-min-width-clustered - The minimum width of the step line when clustered. Defaults to 25px.
 * @cssproperty --forge-step-label-color - The color of the step label. Defaults to the text-high theme.
 * @cssproperty --forge-step-sub-label-color - The color of the step sub-label. Defaults to the text-medium theme.
 * @cssproperty --forge-step-error-color - The color of the step error. Defaults to the error theme.
 * @cssproperty --forge-step-error-text-color - The text color of the step error. Defaults to the on-error theme.
 * @cssproperty --forge-step-expansion-panel-border-left-width - The border left width of the step expansion panel. Defaults to 1px.
 * @cssproperty --forge-step-expansion-panel-margin-bottom - The margin bottom of the step expansion panel. Defaults to 4px.
 * @cssproperty --forge-step-expansion-panel-margin-left - The margin left of the step expansion panel. Defaults to 60px.
 * @cssproperty --forge-step-expansion-panel-margin-top - The margin top of the step expansion panel. Defaults to 4px.
 * @cssproperty --forge-step-expansion-panel-icon-color - The color of the step expansion panel icon. Defaults to the text-medium theme.
 *
 * @slot - The content of the step.
 * @slot optional - The optional content of the step.
 * @slot expansion-content - The content of the step expansion.
 *
 * @csspart root - The root element.
 * @csspart step - The step container element.
 * @csspart before - The line before the step.
 * @csspart after - The line after the step.
 * @csspart icon-container - The icon container element.
 * @csspart icon-content - The icon content element.
 * @csspart icon - The icon element.
 * @csspart index - The index content container.
 * @csspart text-container - The text container element.
 * @csspart title-container - The title container element.
 * @csspart subtitle-container - The subtitle container element.
 * @csspart state-layer - The state layer surface element.
 * @csspart focus-indicator - The focus indicator element.
 */
@customElement({
  name: STEP_CONSTANTS.elementName,
  dependencies: [IconComponent, ExpansionPanelComponent, StateLayerComponent, FocusIndicatorComponent]
})
export class StepComponent extends BaseComponent implements IStepComponent {
  public static get observedAttributes(): string[] {
    return [
      STEP_CONSTANTS.attributes.COMPLETED,
      STEP_CONSTANTS.attributes.EDITABLE,
      STEP_CONSTANTS.attributes.ERROR,
      STEP_CONSTANTS.attributes.INDEX,
      STEP_CONSTANTS.attributes.SELECTED,
      STEP_CONSTANTS.attributes.ALTERNATIVE,
      STEP_CONSTANTS.attributes.DISABLED,
      STEP_CONSTANTS.attributes.VERTICAL,
      STEP_CONSTANTS.attributes.EXPANDED,
      STEP_CONSTANTS.attributes.IGNORE_USER_EXPANSION
    ];
  }

  private _core: StepCore;

  constructor() {
    super();
    IconRegistry.define([tylIconModeEdit, tylIconCheck, tylIconWarning, tylIconBlock, tylIconKeyboardArrowDown]);
    attachShadowTemplate(this, template, styles);
    this._core = new StepCore(new StepAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case STEP_CONSTANTS.attributes.INDEX:
        this.index = coerceNumber(newValue);
        break;
      case STEP_CONSTANTS.attributes.COMPLETED:
        this.completed = coerceBoolean(newValue);
        break;
      case STEP_CONSTANTS.attributes.EDITABLE:
        this.editable = coerceBoolean(newValue);
        break;
      case STEP_CONSTANTS.attributes.ERROR:
        this.error = coerceBoolean(newValue);
        break;
      case STEP_CONSTANTS.attributes.SELECTED:
        this.selected = coerceBoolean(newValue);
        break;
      case STEP_CONSTANTS.attributes.ALTERNATIVE:
        this.alternative = coerceBoolean(newValue);
        break;
      case STEP_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case STEP_CONSTANTS.attributes.VERTICAL:
        this.vertical = coerceBoolean(newValue);
        break;
      case STEP_CONSTANTS.attributes.EXPANDED:
        this.expanded = coerceBoolean(newValue);
        break;
      case STEP_CONSTANTS.attributes.IGNORE_USER_EXPANSION:
        this.ignoreUserExpansion = coerceBoolean(newValue);
        break;
    }
  }

  @coreProperty()
  declare public alternative: boolean;

  @coreProperty()
  declare public index: number;

  @coreProperty()
  declare public editable: boolean;

  @coreProperty()
  declare public completed: boolean;

  @coreProperty()
  declare public error: boolean;

  @coreProperty()
  declare public selected: boolean;

  @coreProperty()
  declare public disabled: boolean;

  @coreProperty()
  declare public vertical: boolean;

  @coreProperty()
  declare public expanded: boolean;

  @coreProperty()
  declare public ignoreUserExpansion: boolean;
}
