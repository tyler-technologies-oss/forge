import { defineCustomElement } from '@tylertech/forge-core';

import { LinearProgressComponent } from './linear-progress';

export * from './linear-progress-constants';
export * from './linear-progress';

export function defineLinearProgressComponent(): void {
  defineCustomElement(LinearProgressComponent);
}
