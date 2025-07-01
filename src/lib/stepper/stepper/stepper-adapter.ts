import { getShadowElement, toggleClass } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../../core/base';
import { StepperUtils } from '../core/stepper-utils';
import { IStepComponent } from '../step/step';
import { STEP_CONSTANTS } from '../step/step-constants';
import { IStepperComponent } from './stepper';
import { StepperLayoutAlign, StepperLayoutMode, STEPPER_CONSTANTS } from './stepper-constants';

export interface IStepperAdapter extends IBaseAdapter {
  initializeAccessibility(): void;
  toggleDisabled(disabled: boolean): void;
  patchSafari(): void;
  getFocusedOrSelectedStep(): IStepComponent;
  applyConfiguredSteps(steps: IStepComponent[]): void;
  setLinearState(linear: boolean): void;
  setLayoutAlign(layoutAlign: StepperLayoutAlign): void;
  setLayoutMode(layoutMode: StepperLayoutMode): void;
  setAlternativeState(alternative: boolean): void;
  setVertical(vertical: boolean): void;
  assignIndices(): void;
  addRootListener(event: string, listener: EventListener): void;
  removeRootListener(event: string, listener: EventListener): void;
  setSelected(step: IStepComponent): void;
  setSelectedByIndex(index: number): void;
  assignFirstLastStep(): void;
  getStep(index: number): IStepComponent;
  getLastStep(): IStepComponent;
  addSlotChangeListener(listener: EventListener): void;
  removeSlotChangeListener(listener: EventListener): void;
  toggleRootClass(className: string, show: boolean): void;
  isStepperFocused(): boolean;
  setStepsListener(event: string, listener: EventListener): void;
  removeStepsListener(event: string, listener: EventListener): void;
}

export class StepperAdapter extends BaseAdapter<IStepperComponent> implements IStepperAdapter {
  private _rootElement: HTMLElement;
  private _slotElement: HTMLSlotElement;

  constructor(component: IStepperComponent) {
    super(component);
    this._rootElement = getShadowElement(component, STEPPER_CONSTANTS.selectors.STEPPER);
    this._slotElement = this._rootElement.querySelector('slot') as HTMLSlotElement;
  }

  public initializeAccessibility(): void {
    if (!this._component.hasAttribute('role')) {
      this._component.setAttribute('role', 'tablist');
    }
  }

  public patchSafari(): void {
    this._applyToSteps(s => s.setAttribute('safari', ''));
  }

  public addSlotChangeListener(listener: EventListener): void {
    this._slotElement.addEventListener('slotchange', listener);
  }
  public removeSlotChangeListener(listener: EventListener): void {
    this._slotElement.addEventListener('slotchange', listener);
  }

  public getLastStep(): IStepComponent {
    const steps = this._getSteps();
    return steps.item(steps.length - 1);
  }

  public setSelected(step: IStepComponent): void {
    this._getSteps().forEach(s => {
      if (s === step) {
        s.selected = true;
      } else {
        s.selected = false;
      }
    });
  }

  public assignIndices(): void {
    const steps = this._getSteps();

    steps.forEach((tab, index) => {
      tab.index = index;
    });
  }

  public assignFirstLastStep(): void {
    const steps = this._getSteps();
    if (steps && steps.length > 1) {
      steps[0].setAttribute('first', '');
      steps[steps.length - 1].setAttribute('last', '');
    }
  }

  public setLayoutAlign(layoutAlign: StepperLayoutAlign): void {
    StepperUtils.setLayoutAlign(this._rootElement, layoutAlign);
  }
  public setLayoutMode(layoutMode: StepperLayoutMode): void {
    StepperUtils.setLayoutMode(this._rootElement, layoutMode);
    this._applyToSteps(s => s.setAttribute(STEP_CONSTANTS.attributes.CLUSTERED, ''));
  }
  public setAlternativeState(alternative: boolean): void {
    StepperUtils.setAlternativeState(this._rootElement, alternative);
    this._applyToSteps(step => (step.alternative = alternative));
  }

  public setVertical(vertical: boolean): void {
    toggleClass(this._rootElement, vertical, STEPPER_CONSTANTS.classes.VERTICAL);
    this._applyToSteps(step => (step.vertical = vertical));
  }

  public setLinearState(linear: boolean): void {
    StepperUtils.setLinearState(this._rootElement, linear);
  }

  public removeRootListener(event: string, listener: EventListener): void {
    this._rootElement.removeEventListener('click', listener);
  }
  public addRootListener(event: string, listener: EventListener): void {
    this._rootElement.addEventListener(event, listener);
  }

  public setSelectedByIndex(index: number): void {
    this._applyToSteps(step => {
      if (step.selected && step.index !== index) {
        step.selected = false;
      }

      if (step.index === index) {
        step.selected = true;
      }
    });
  }

  public applyConfiguredSteps(steps: IStepComponent[]): void {
    this._component.querySelectorAll(STEP_CONSTANTS.elementName).forEach(n => {
      this._component.removeChild(n);
    });

    steps.forEach(s => this._component.appendChild(s));
  }

  public tryGetFocusedStep(): IStepComponent | undefined {
    let focusedStep: IStepComponent | undefined;
    this._applyToSteps(step => {
      if (step.matches(':focus-within')) {
        focusedStep = step;
      }
    });
    return focusedStep;
  }

  public getFocusedOrSelectedStep(): IStepComponent {
    let focusedStep = this.tryGetFocusedStep();
    if (!focusedStep) {
      focusedStep = this._getSteps()[0];
      focusedStep.focus();
    }
    return focusedStep;
  }

  public getStep(index: number): IStepComponent {
    let realIndex = 0;
    const steps = this._getSteps();

    if (index < 0) {
      return steps.item(steps.length - 1);
    }

    if (steps.length > index) {
      realIndex = index;
    }
    return steps.item(realIndex);
  }

  public toggleDisabled(disabled: boolean): void {
    this._applyToSteps(s => (s.disabled = disabled));
  }

  public toggleRootClass(className: string, show: boolean): void {
    toggleClass(this._rootElement, show, className);
  }

  public isStepperFocused(): boolean {
    return this._rootElement.classList.contains(STEPPER_CONSTANTS.classes.FOCUSED);
  }

  public setStepsListener(event: string, listener: EventListener): void {
    this._applyToSteps(s => s.addEventListener(event, listener));
  }

  public removeStepsListener(event: string, listener: EventListener): void {
    this._applyToSteps(s => s.removeEventListener(event, listener));
  }

  private _applyToSteps(action: (step: IStepComponent, index?: number) => void): void {
    this._getSteps().forEach(action);
  }

  private _getSteps(): NodeListOf<IStepComponent> {
    return this._component.querySelectorAll<IStepComponent>(STEP_CONSTANTS.elementName);
  }
}
