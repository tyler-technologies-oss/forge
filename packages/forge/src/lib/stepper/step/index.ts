import { defineCustomElement } from '@tylertech/forge-core';

import { StepComponent } from './step.js';

export * from './step-adapter.js';
export * from './step-constants.js';
export * from './step-core.js';
export * from './step.js';

export function defineStepComponent(): void {
  defineCustomElement(StepComponent);
}
