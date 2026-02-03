import { defineCustomElement } from '@tylertech/forge-core';
import { StepperComponent } from './stepper';

export * from './stepper';
export * from './stepper-adapter';
export * from './stepper-constants';
export * from './stepper-core';

export function defineStepperComponent(): void {
  defineCustomElement(StepperComponent);
}
