import { defineCustomElement } from '@tylertech/forge-core';

import { CalendarComponent } from './calendar';

export * from './calendar-adapter';
export * from './calendar-component-delegate';
export * from './calendar-constants';
export * from './calendar-dom-utils';
export * from './calendar-dropdown';
export * from './calendar-core';
export * from './calendar-locale-utils';
export * from './calendar-menu';
export * from './calendar-utils';
export * from './calendar';
export * from './core';

export function defineCalendarComponent(): void {
  defineCustomElement(CalendarComponent);
}
