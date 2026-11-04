import { defineCustomElement } from '@tylertech/forge-core';
import { TimelineComponent } from './timeline.js';

export * from './timeline.js';

export function defineTimelineComponent(): void {
  defineCustomElement(TimelineComponent);
}
