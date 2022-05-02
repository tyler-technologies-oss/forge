import { IStepComponent, STEP_CONSTANTS } from '../step';
import { STEPPER_CONSTANTS, IStepConfiguration, IStepperConfiguration, StepperLayoutAlign, StepperLayoutMode } from '../stepper/stepper-constants';

export class StepperUtils {
  /**
   * Creates a step element using the provided configuration.
   * @param {IStepConfiguration} step The step configuration
   * @param {number} index The index of the step.
   * @param {number} activeStepIndex The currently active step index.
   * @param {boolean} linear Whether the stepper is in linear mode or not.
   */
  public static createStepElement(step: IStepConfiguration, index: number, stepperConfig: IStepperConfiguration): IStepComponent {
    const stepElement = document.createElement(STEP_CONSTANTS.elementName);

    stepElement.index = index;
    stepElement.completed = step.completed || false;
    stepElement.editable = step.editable || false;
    stepElement.selected = stepperConfig.selectedIndex === index;
    stepElement.alternative = stepperConfig.alternative;
    stepElement.error = step.error || false;
    stepElement.disabled = step.disabled || false;
    stepElement.vertical = step.vertical || false;
    stepElement.ignoreUserExpansion = step.ignoreUserExpansion || false;
    stepElement.expanded = step.expanded || false;

    if (stepperConfig.linear && index > stepperConfig.selectedIndex) {
      stepElement.tabIndex = -1;
    }

    stepElement.textContent = step.label;

    if (step.optionalLabel) {
      stepElement.appendChild(this.createStepOptionalLabel(step.optionalLabel));
    }

    return stepElement;
  }

  /**
   * Creates the step label element using the provided configuration.
   * @param {IStepConfiguration} step The step configuration.
   */
  public static createStepOptionalLabel(labelText: string): HTMLElement {
    const label = document.createElement('span');
    label.slot = 'optional';
    label.textContent = labelText || '';
    return label;
  }

  /**
   * Sets the stepper to the provided linear state.
   * @param {HTMLElement} stepperElement The stepper element.
   * @param {boolean} isLinear Whether the stepper is in linear mode or not.
   */
  public static setLinearState(stepperElement: HTMLElement, isLinear: boolean): void {
    let hasLinearClass = stepperElement.classList.contains(STEPPER_CONSTANTS.classes.LINEAR);

    if (hasLinearClass && !isLinear) {
      stepperElement.classList.remove(STEPPER_CONSTANTS.classes.LINEAR);
      hasLinearClass = false;
    }

    if (!hasLinearClass && isLinear) {
      stepperElement.classList.add(STEPPER_CONSTANTS.classes.LINEAR);
    }
  }

  /**
   * Sets the stepper to the provided label state.
   * @param {HTMLElement} stepperElement The stepper element.
   * @param {boolean} isAlternative Whether the stepper is in alternative mode or not.
   */
  public static setAlternativeState(stepperElement: HTMLElement, isAlternative: boolean): void {
    let hasAlternativeClass = stepperElement.classList.contains(STEPPER_CONSTANTS.classes.ALTERNATIVE);

    if (hasAlternativeClass && !isAlternative) {
      stepperElement.classList.remove(STEPPER_CONSTANTS.classes.ALTERNATIVE);
      hasAlternativeClass = false;
    }

    if (!hasAlternativeClass && isAlternative) {
      stepperElement.classList.add(STEPPER_CONSTANTS.classes.ALTERNATIVE);
    }
  }

  /**
   * Sets the stepper layout mode.
   * @param {HTMLElement} stepperElement The stepper element.
   * @param {StepperLayoutMode} mode The layout mode.
   */
  public static setLayoutMode(stepperElement: HTMLElement, mode: StepperLayoutMode): void {
    switch (mode) {
      case 'clustered':
        if (stepperElement.classList.contains(STEPPER_CONSTANTS.classes.FIXED)) {
          stepperElement.classList.remove(STEPPER_CONSTANTS.classes.FIXED);
        }
        stepperElement.classList.add(STEPPER_CONSTANTS.classes.CLUSTERED);
        break;
      case 'fixed':
        if (stepperElement.classList.contains(STEPPER_CONSTANTS.classes.CLUSTERED)) {
          stepperElement.classList.remove(STEPPER_CONSTANTS.classes.CLUSTERED);
        }
        stepperElement.classList.add(STEPPER_CONSTANTS.classes.FIXED);
        break;
    }
  }

  /**
   * Sets the stepper layout alignment.
   * @param {HTMLElement} stepperElement The stepper element.
   * @param {StepperLayoutAlign} mode The layout alignment.
   */
  public static setLayoutAlign(stepperElement: HTMLElement, mode: StepperLayoutAlign): void {
    if (stepperElement.classList.contains(STEPPER_CONSTANTS.classes.ALIGN_LEFT)) {
      stepperElement.classList.remove(STEPPER_CONSTANTS.classes.ALIGN_LEFT);
    }

    if (stepperElement.classList.contains(STEPPER_CONSTANTS.classes.ALIGN_CENTER)) {
      stepperElement.classList.remove(STEPPER_CONSTANTS.classes.ALIGN_CENTER);
    }

    if (stepperElement.classList.contains(STEPPER_CONSTANTS.classes.ALIGN_RIGHT)) {
      stepperElement.classList.remove(STEPPER_CONSTANTS.classes.ALIGN_RIGHT);
    }

    switch (mode) {
      case 'left':
        stepperElement.classList.add(STEPPER_CONSTANTS.classes.ALIGN_LEFT);
        break;
      case 'center':
        stepperElement.classList.add(STEPPER_CONSTANTS.classes.ALIGN_CENTER);
        break;
      case 'right':
        stepperElement.classList.add(STEPPER_CONSTANTS.classes.ALIGN_RIGHT);
        break;
    }
  }

  /**
   * Creates a stepper with all of its step elements.
   * @param {IStepperConfiguration} stepperConfiguration The stepper configuration.
   */
  public static createSteps(stepperConfiguration: IStepperConfiguration): IStepComponent[] {
    const steps: IStepComponent[] = [];

    stepperConfiguration.steps.forEach((step, index) => {
      const stepElement = StepperUtils.createStepElement(step, index, stepperConfiguration);
      steps.push(stepElement);
    });

    steps[0].setAttribute(STEP_CONSTANTS.attributes.FIRST, '');
    steps[steps.length - 1].setAttribute(STEP_CONSTANTS.attributes.LAST, '');

    return steps;
  }
}
