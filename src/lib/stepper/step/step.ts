import { attachShadowTemplate, coerceBoolean, coerceNumber, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { tylIconModeEdit, tylIconWarning, tylIconCheck, tylIconBlock, tylIconKeyboardArrowDown } from '@tylertech/tyler-icons/standard';
import { StepAdapter } from './step-adapter';
import { STEP_CONSTANTS } from './step-constants';
import { StepFoundation } from './step-foundation';
import { IconRegistry, IconComponent } from '../../icon';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { ExpansionPanelComponent } from '../../expansion-panel';

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
 * The web component class behind the `<forge-step>` custom element.
 * 
 * @tag forge-step
 */
@CustomElement({
  name: STEP_CONSTANTS.elementName,
  dependencies: [
    IconComponent,
    ExpansionPanelComponent
  ]
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

  private _foundation: StepFoundation;

  constructor() {
    super();
    IconRegistry.define([
      tylIconModeEdit,
      tylIconCheck,
      tylIconWarning,
      tylIconBlock,
      tylIconKeyboardArrowDown
    ]);
    attachShadowTemplate(this, template, styles);
    this._foundation = new StepFoundation(new StepAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
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

  @FoundationProperty()
  public declare alternative: boolean;

  @FoundationProperty()
  public declare index: number;

  @FoundationProperty()
  public declare editable: boolean;

  @FoundationProperty()
  public declare completed: boolean;

  @FoundationProperty()
  public declare error: boolean;

  @FoundationProperty()
  public declare selected: boolean;

  @FoundationProperty()
  public declare disabled: boolean;

  @FoundationProperty()
  public declare vertical: boolean;
  
  @FoundationProperty()
  public declare expanded: boolean;
  
  @FoundationProperty()
  public declare ignoreUserExpansion: boolean;
}
