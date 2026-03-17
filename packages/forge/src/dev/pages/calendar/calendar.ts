import '@tylertech/forge/calendar';
import '$src/shared';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import type { ICalendarComponent } from '@tylertech/forge/calendar';
import type { ISelectComponent } from '@tylertech/forge/select';

const calendar = document.querySelector('forge-calendar') as ICalendarComponent;

const showTodayToggle = document.querySelector('#calendar-today') as ISwitchComponent;
showTodayToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  calendar.showToday = selected;
});

const readonlyToggle = document.querySelector('#calendar-readonly') as ISwitchComponent;
readonlyToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  calendar.readonly = selected;
});

const modeSelect = document.querySelector('#calendar-mode') as ISelectComponent;
modeSelect.addEventListener('change', ({ detail }) => {
  calendar.mode = detail;
});

const firstDaySelect = document.querySelector('#calendar-first-day') as ISelectComponent;
firstDaySelect.addEventListener('change', ({ detail }) => {
  calendar.firstDayOfWeek = detail;
});
