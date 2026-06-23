import { defineCustomElement } from '@tylertech/forge-core';

import { CalendarComponent } from './calendar.js';

export * from './calendar-adapter.js';
export * from './calendar-component-delegate.js';
export * from './calendar-constants.js';
export * from './calendar-dom-utils.js';
export * from './calendar-dropdown/index.js';
export * from './calendar-core.js';
export * from './calendar-locale-utils.js';
export * from './calendar-menu/index.js';
export * from './calendar-utils.js';
export * from './calendar.js';
export * from './core/index.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/calendar'`). */
export function defineCalendarComponent(): void {
  defineCustomElement(CalendarComponent);
}
