import { defineCustomElement } from '@tylertech/forge-core';

import { CircularProgressComponent } from './circular-progress.js';

export * from './circular-progress-constants.js';
export * from './circular-progress.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/circular-progress'`). */
export function defineCircularProgressComponent(): void {
  defineCustomElement(CircularProgressComponent);
}
