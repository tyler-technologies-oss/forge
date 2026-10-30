import { defineCustomElement } from '@tylertech/forge-core';
import { TimelineItemComponent } from './timeline-item.js';

export * from './timeline-item.js';

export function defineTimelineItemComponent(): void {
  defineCustomElement(TimelineItemComponent);
}
