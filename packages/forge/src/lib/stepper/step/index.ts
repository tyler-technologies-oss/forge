import { defineCustomElement } from '@tylertech/forge-core';

import { StepComponent } from './step';

export * from './step-adapter';
export * from './step-constants';
export * from './step-core';
export * from './step';

export function defineStepComponent(): void {
  defineCustomElement(StepComponent);
}
