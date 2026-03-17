import { getEventPath, isDefined, isNumber, Platform } from '@tylertech/forge-core';
import { STEP_CONSTANTS } from '../step/step-constants.js';
import { StepperUtils } from '../core/stepper-utils.js';
import { IStepComponent } from '../step/step.js';
import { IStepperAdapter } from './stepper-adapter.js';
import { STEPPER_CONSTANTS, IStepConfiguration, StepperLayoutAlign, StepperLayoutMode } from './stepper-constants.js';

export interface IStepperCore {
  steps: IStepConfiguration[];
  selectedIndex: number;
  linear: boolean;
  alternative: boolean;
  layoutMode: StepperLayoutMode;
  layoutAlign: StepperLayoutAlign;
}

export class StepperCore implements IStepperCore {
  private _steps: IStepConfiguration[] = [];
  private _selectedIndex = 0;
  private _linear = false;
  private _alternative = false;
  private _layoutMode: StepperLayoutMode = 'fixed';
  private _layoutAlign: StepperLayoutAlign = 'center';
  private _initialize = false;
  private _disabled: boolean;
  private _vertical: boolean;

  private _clickListener: EventListener;
  private _keyListener: EventListener;
  private _slotChangeListener: EventListener;
  private _stepFocusListener: () => void;
  private _stepBlurListener: () => void;
  private _stepExpandedContentFocusInListener: (event: CustomEvent<IStepComponent>) => void;
  private _stepExpandedContentFocusOutListener: (event: CustomEvent<IStepComponent>) => void;

  constructor(private _adapter: IStepperAdapter) {
    this._clickListener = event => this._handleClick(event);
    this._keyListener = event => this._onKeydown(event as KeyboardEvent);
    this._stepFocusListener = () => this._onStepFocus();
    this._stepBlurListener = () => this._onStepBlur();
    this._stepExpandedContentFocusInListener = event => this._onStepExpandedContentFocusIn(event);
    this._stepExpandedContentFocusOutListener = event => this._onStepExpandedContentFocusOut(event);
    this._slotChangeListener = event => this._onSlotChange(event as Event);
  }

  public initialize(): void {
    this._adapter.initializeAccessibility();
    this._adapter.assignIndices();
    this._adapter.setLinearState(this._linear);
    this._adapter.setAlternativeState(this._alternative);
    this._adapter.setLayoutAlign(this._layoutAlign);
    this._adapter.setLayoutMode(this._layoutMode);
    this._adapter.addRootListener('click', this._clickListener);
    this._adapter.addHostListener('keydown', this._keyListener);
    this._adapter.assignFirstLastStep();
    this._adapter.addRootListener(STEP_CONSTANTS.events.EXPANDED_CONTENT_FOCUSIN, this._stepExpandedContentFocusInListener);
    this._adapter.addRootListener(STEP_CONSTANTS.events.EXPANDED_CONTENT_FOCUSOUT, this._stepExpandedContentFocusOutListener);
    this._applySelectedIndex();
    this._patchBrowser();
    this._adapter.setStepsListener('blur', this._stepBlurListener);
    this._adapter.setStepsListener('focus', this._stepFocusListener);
    if (!this._initialize) {
      this._adapter.addSlotChangeListener(this._slotChangeListener);
    }

    this._initialize = true;
  }

  public destroy(): void {
    this._adapter.removeRootListener('click', this._clickListener);
    this._adapter.removeHostListener('keydown', this._keyListener);
    this._adapter.removeSlotChangeListener(this._slotChangeListener);
    this._adapter.removeStepsListener('blur', this._stepBlurListener);
    this._adapter.removeStepsListener('focus', this._stepFocusListener);
  }

  /** The step configurations. */
  public get steps(): IStepConfiguration[] {
    return this._steps.map(s => ({ ...s })); // Shallow clone
  }
  public set steps(value: IStepConfiguration[]) {
    if (Array.isArray(value) && value.length > 0) {
      this._steps = [...value.map(s => ({ ...s }))];
    } else {
      this._steps = [];
      return;
    }

    this._renderConfiguration();
  }

  /** The active step index. */
  public get selectedIndex(): number {
    return this._selectedIndex;
  }
  public set selectedIndex(value: number) {
    if (!isDefined(value)) {
      value = 0;
    } else if (!isNumber(value)) {
      const v = Number(value);
      value = !isNaN(v) ? v : 0;
    }

    if (this._selectedIndex !== value) {
      this._selectedIndex = value;
      this._adapter.setHostAttribute(STEPPER_CONSTANTS.attributes.SELECTED_INDEX, this._selectedIndex.toString());
      this._applySelectedIndex();
    }
  }

  /** Whether the stepper is linear or non-linear. */
  public get linear(): boolean {
    return this._linear;
  }
  public set linear(value: boolean) {
    value = Boolean(value);
    if (this._linear !== value) {
      this._linear = value;
      this._adapter.setLinearState(this._linear);
      this._adapter.setHostAttribute(STEPPER_CONSTANTS.attributes.LINEAR, this._linear.toString());
    }
  }

  /** Whether the stepper uses the default or alternative label layout mode. */
  public get alternative(): boolean {
    return this._alternative;
  }
  public set alternative(value: boolean) {
    value = Boolean(value);
    if (this._alternative !== value) {
      this._alternative = value;
      this._adapter.setAlternativeState(this._alternative);
      this._adapter.setHostAttribute(STEPPER_CONSTANTS.attributes.ALTERNATIVE, this._alternative.toString());
    }
  }

  /** The layout mode of the stepper. */
  public get layoutMode(): StepperLayoutMode {
    return this._layoutMode;
  }
  public set layoutMode(value: StepperLayoutMode) {
    if (!/^(fixed|clustered)$/.test(value)) {
      return;
    }

    if (this._layoutMode !== value) {
      this._layoutMode = value;
      this._adapter.setHostAttribute(STEPPER_CONSTANTS.attributes.LAYOUT_MODE, this._layoutMode);
      this._adapter.setLayoutMode(this._layoutMode);
    }
  }

  /** The layout alignment of the stepper. */
  public get layoutAlign(): StepperLayoutAlign {
    return this._layoutAlign;
  }
  public set layoutAlign(value: StepperLayoutAlign) {
    if (!/^(left|center|right)$/.test(value)) {
      return;
    }

    if (this._layoutAlign !== value) {
      this._layoutAlign = value;
      this._adapter.setLayoutAlign(this._layoutAlign);
      this._adapter.setHostAttribute(STEPPER_CONSTANTS.attributes.LAYOUT_ALIGN, this._layoutAlign);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (value !== this._disabled) {
      this._disabled = value;
      this._applyDisabled();
    }
  }

  public get vertical(): boolean {
    return this._vertical;
  }
  public set vertical(value: boolean) {
    if (value !== this._vertical) {
      this._vertical = value;
      this._applyVertical();
      this._adapter.toggleHostAttribute(STEPPER_CONSTANTS.attributes.VERTICAL, this._vertical);
    }
  }

  private _applyVertical(): void {
    this._adapter.setVertical(this._vertical);
  }

  private _applyDisabled(): void {
    if (this._disabled) {
      this._adapter.setHostAttribute(STEPPER_CONSTANTS.attributes.DISABLED, 'disabled');
    } else {
      this._adapter.removeHostAttribute(STEPPER_CONSTANTS.attributes.DISABLED);
    }

    this._adapter.toggleDisabled(this._disabled);
  }

  private _applySelectedIndex(): void {
    this._adapter.setSelectedByIndex(this._selectedIndex);
  }

  private _handleClick(event: Event): void {
    event.preventDefault();
    if (this._linear) {
      return;
    }
    const eventPath = getEventPath(event);
    const step = eventPath.filter(el => el.nodeType === Node.ELEMENT_NODE).find(el => el.matches(STEP_CONSTANTS.elementName)) as IStepComponent | undefined;

    if (step && !step.selected && !step.disabled && this._adapter.emitHostEvent(STEP_CONSTANTS.events.SELECT, step.index, true, true)) {
      this._adapter.setSelected(step);
      this.selectedIndex = step.index;
    }
  }

  private _renderConfiguration(): void {
    const steps = StepperUtils.createSteps({
      steps: this._steps,
      vertical: this._vertical,
      selectedIndex: this._selectedIndex,
      alternative: this._alternative,
      layoutAlign: this._layoutAlign,
      layoutMode: this._layoutMode,
      linear: this._linear
    });

    this.destroy();
    this._adapter.applyConfiguredSteps(steps);
    this.initialize();
  }

  private _onKeydown(event: KeyboardEvent): void {
    if (this._linear) {
      return;
    }

    const key = this._getKeyFromEvent(event);

    // If the expanded content is currently being focused, ignore stepper specific keys
    if (!this._adapter.isStepperFocused()) {
      return;
    }

    // Early exit if the event key isn't one of the keyboard navigation keys
    if (!key) {
      return;
    }

    if (
      [
        STEP_CONSTANTS.strings.HOME_KEY,
        STEP_CONSTANTS.strings.END_KEY,
        STEP_CONSTANTS.strings.ARROW_DOWN_KEY,
        STEPPER_CONSTANTS.strings.ARROW_UP_KEY,
        STEPPER_CONSTANTS.strings.ENTER_KEY,
        STEPPER_CONSTANTS.strings.SPACE_KEY
      ].includes(key)
    ) {
      event.preventDefault();
    }

    if ([STEPPER_CONSTANTS.strings.ENTER_KEY, STEPPER_CONSTANTS.strings.SPACE_KEY].includes(key)) {
      this._adapter.getFocusedOrSelectedStep()?.click();
      return;
    }

    const step = this._vertical ? this._determineVerticalMoveTarget(key) : this._determineMoveTarget(key);

    if (step) {
      this._moveFocusTo(step);
    }
  }

  private _moveFocusTo(step: IStepComponent): void {
    step.focus();
  }

  private _getKeyFromEvent(evt: KeyboardEvent): string {
    if (STEPPER_CONSTANTS.ACCEPTABLE_KEYS.includes(evt.key)) {
      return evt.key;
    }
    return STEPPER_CONSTANTS.KEYCODE_MAP[evt.keyCode];
  }

  private _determineMoveTarget(key: string): IStepComponent {
    const step = this._adapter.getFocusedOrSelectedStep();

    if (step) {
      switch (key) {
        case STEPPER_CONSTANTS.strings.ARROW_RIGHT_KEY:
          return this._adapter.getStep(step.index + 1);
        case STEPPER_CONSTANTS.strings.ARROW_LEFT_KEY:
          return this._adapter.getStep(step.index - 1);
        case STEPPER_CONSTANTS.strings.HOME_KEY:
          return this._adapter.getStep(0);
        case STEPPER_CONSTANTS.strings.END_KEY:
          return this._adapter.getLastStep();
      }
    }

    return step as IStepComponent;
  }

  private _determineVerticalMoveTarget(key: string): IStepComponent {
    const step = this._adapter.getFocusedOrSelectedStep();

    if (step) {
      switch (key) {
        case STEPPER_CONSTANTS.strings.ARROW_DOWN_KEY:
          return this._adapter.getStep(step.index + 1);
        case STEPPER_CONSTANTS.strings.ARROW_UP_KEY:
          return this._adapter.getStep(step.index - 1);
        case STEPPER_CONSTANTS.strings.HOME_KEY:
          return this._adapter.getStep(0);
        case STEPPER_CONSTANTS.strings.END_KEY:
          return this._adapter.getLastStep();
      }
    }

    return step as IStepComponent;
  }

  private _onSlotChange(event: Event): void {
    this.destroy();
    this.initialize();
  }

  private _onStepExpandedContentFocusIn(event: CustomEvent<IStepComponent>): void {
    const step = this._adapter.getStep(event.detail.index + 1);
    if (step) {
      step.tabIndex = 0;
    }
    event.detail.tabIndex = 0;
  }

  private _onStepExpandedContentFocusOut(event: CustomEvent<IStepComponent>): void {
    const focusOutStep = event.target as IStepComponent;
    const step = this._adapter.getStep(focusOutStep.index + 1);

    if (step) {
      step.tabIndex = -1;
    }

    focusOutStep.tabIndex = -1;
  }

  private _onStepFocus(): void {
    this._adapter.toggleRootClass(STEPPER_CONSTANTS.classes.FOCUSED, true);
  }

  private _onStepBlur(): void {
    this._adapter.toggleRootClass(STEPPER_CONSTANTS.classes.FOCUSED, false);
  }

  private _patchBrowser(): void {
    if (new Platform().SAFARI()) {
      this._adapter.patchSafari();
    }
  }
}
