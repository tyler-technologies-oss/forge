import { defineCustomElement } from '@tylertech/forge-core';

import { CalendarMenuComponent } from './calendar-menu';

export * from './calendar-menu-adapter';
export * from './calendar-menu-constants';
export * from './calendar-menu-foundation';
export * from './calendar-menu-utils';
export * from './calendar-menu';

export function defineCalendarMenuComponent(): void {
  defineCustomElement(CalendarMenuComponent);
}
