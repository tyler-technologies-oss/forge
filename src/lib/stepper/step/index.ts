import { defineCustomElement } from '@tylertech/forge-core';

import { StepComponent } from './step';

export * from './step-adapter';
export * from './step-constants';
export * from './step-foundation';
export * from './step';

export function defineStepComponent(): void {
  defineCustomElement(StepComponent);
}
