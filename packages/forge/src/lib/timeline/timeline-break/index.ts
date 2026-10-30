import { defineCustomElement } from '@tylertech/forge-core';
import { TimelineBreakComponent } from './timeline-break.js';

export * from './timeline-break.js';

export function defineTimelineBreakComponent(): void {
  defineCustomElement(TimelineBreakComponent);
}
