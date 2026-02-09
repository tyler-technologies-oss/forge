import { defineCustomElement } from '@tylertech/forge-core';

import { CircularProgressComponent } from './circular-progress.js';

export * from './circular-progress-adapter.js';
export * from './circular-progress-constants.js';
export * from './circular-progress-core.js';
export * from './circular-progress.js';

export function defineCircularProgressComponent(): void {
  defineCustomElement(CircularProgressComponent);
}
