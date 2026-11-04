import { defineCustomElement } from '@tylertech/forge-core';

import { ProcessStepComponent } from './process-step.js';

export * from './process-step-constants.js';
export * from './process-step.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/process-stepper'`). */
export function defineProcessStepComponent(): void {
  defineCustomElement(ProcessStepComponent);
}
