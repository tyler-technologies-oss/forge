import { defineCustomElement } from '@tylertech/forge-core';
import { StepperComponent } from './stepper.js';

export * from './stepper.js';
export * from './stepper-adapter.js';
export * from './stepper-constants.js';
export * from './stepper-core.js';

export function defineStepperComponent(): void {
  defineCustomElement(StepperComponent);
}
