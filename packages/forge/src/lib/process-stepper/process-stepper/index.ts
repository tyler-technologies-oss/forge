import { defineCustomElement } from '@tylertech/forge-core';

import { ProcessStepperComponent } from './process-stepper.js';

export * from './process-stepper-constants.js';
export * from './process-stepper.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/process-stepper'`). */
export function defineProcessStepperComponent(): void {
  defineCustomElement(ProcessStepperComponent);
}
