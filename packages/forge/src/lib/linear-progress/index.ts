import { defineCustomElement } from '@tylertech/forge-core';
import { LinearProgressComponent } from './linear-progress.js';

export * from './linear-progress-constants.js';
export * from './linear-progress.js';

export function defineLinearProgressComponent(): void {
  defineCustomElement(LinearProgressComponent);
}
