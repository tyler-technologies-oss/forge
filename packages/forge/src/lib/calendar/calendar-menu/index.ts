import { defineCustomElement } from '@tylertech/forge-core';

import { CalendarMenuComponent } from './calendar-menu.js';

export * from './calendar-menu-adapter.js';
export * from './calendar-menu-constants.js';
export * from './calendar-menu-core.js';
export * from './calendar-menu-utils.js';
export * from './calendar-menu.js';

export function defineCalendarMenuComponent(): void {
  defineCustomElement(CalendarMenuComponent);
}
