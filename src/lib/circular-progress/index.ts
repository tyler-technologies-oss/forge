import { defineCustomElement } from '@tylertech/forge-core';

import { CircularProgressComponent } from './circular-progress';

export * from './circular-progress-adapter';
export * from './circular-progress-constants';
export * from './circular-progress-foundation';
export * from './circular-progress';

export function defineCircularProgressComponent(): void {
  defineCustomElement(CircularProgressComponent);
}
