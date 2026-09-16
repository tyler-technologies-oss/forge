import { defineCustomElement } from '@tylertech/forge-core';
import { TimestampComponent } from './timestamp.js';

export * from './timestamp.js';

export function defineTimestampComponent(): void {
  defineCustomElement(TimestampComponent);
}
