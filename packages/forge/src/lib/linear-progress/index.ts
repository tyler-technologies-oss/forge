import { defineCustomElement } from '@tylertech/forge-core';
import { LinearProgressComponent } from './linear-progress.js';

export * from './linear-progress-constants.js';
export * from './linear-progress.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/linear-progress'`). */
export function defineLinearProgressComponent(): void {
  defineCustomElement(LinearProgressComponent);
}
