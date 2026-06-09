import '$src/shared';
import '@tylertech/forge/date-time-picker';
import '@tylertech/forge/button';
import '@tylertech/forge/label-value';
import type { IDateTimePickerChangeEventData, IDateTimePickerComponent } from '@tylertech/forge/date-time-picker';
import type { ISelectComponent } from '@tylertech/forge/select';
import type { ISwitchComponent } from '@tylertech/forge/switch';

const picker = document.getElementById('demo-date-time-picker') as IDateTimePickerComponent;
const sourceEl = document.getElementById('demo-source') as HTMLElement;
const completeEl = document.getElementById('demo-complete') as HTMLElement;
const valueEl = document.getElementById('demo-value') as HTMLElement;
const footerSummary = document.getElementById('demo-footer-summary') as HTMLElement;
const headerSlot = document.getElementById('demo-header') as HTMLElement;
const timeLabelSlot = document.getElementById('demo-time-label') as HTMLElement;

function formatValueDebug(value: unknown): string {
  if (value == null) {
    return 'null';
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === 'object' && value !== null && 'from' in value && 'to' in value) {
    const r = value as { from: Date; to: Date };
    return JSON.stringify({ from: r.from.toISOString(), to: r.to.toISOString() }, null, 2);
  }
  return String(value);
}

function formatSummary(detail: IDateTimePickerChangeEventData): string {
  if (!detail.complete) {
    return '';
  }
  const d = detail.value;
  if (d instanceof Date) {
    return `Your meeting is booked for ${d.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })} at ${d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}.`;
  }
  if (d && typeof d === 'object' && 'from' in d) {
    const r = d as { from: Date; to: Date };
    return `Booked ${r.from.toLocaleDateString()} ${r.from.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })} – ${r.to.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`;
  }
  return '';
}

picker.addEventListener('forge-date-time-picker-change', evt => {
  const detail = (evt as CustomEvent<IDateTimePickerChangeEventData>).detail;
  console.log('[forge-date-time-picker-change]', detail);
  sourceEl.textContent = detail.source;
  completeEl.textContent = String(detail.complete);
  valueEl.textContent = formatValueDebug(detail.value);
  footerSummary.textContent = formatSummary(detail);
});

document.getElementById('demo-continue')?.addEventListener('click', () => {
  console.log('Continue clicked with value:', picker.value);
});

// === Option wiring ===

const timeModeSelect = document.getElementById('opt-time-mode') as ISelectComponent;
timeModeSelect.addEventListener('change', () => {
  picker.timeMode = timeModeSelect.value as 'slots' | 'range' | 'single';
});

const orientationSelect = document.getElementById('opt-orientation') as ISelectComponent;
orientationSelect.addEventListener('change', () => {
  picker.orientation = orientationSelect.value as 'auto' | 'horizontal' | 'vertical';
});

const localeSelect = document.getElementById('opt-locale') as ISelectComponent;
localeSelect.addEventListener('change', () => {
  picker.locale = localeSelect.value as string;
});

const stepSelect = document.getElementById('opt-step') as ISelectComponent;
stepSelect.addEventListener('change', () => {
  picker.step = Number(stepSelect.value);
});

const use24hSwitch = document.getElementById('opt-24h') as ISwitchComponent;
use24hSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  picker.use24HourTime = detail;
});

const secondsSwitch = document.getElementById('opt-seconds') as ISwitchComponent;
secondsSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  picker.allowSeconds = detail;
});

const summarySwitch = document.getElementById('opt-summary') as ISwitchComponent;
summarySwitch.addEventListener('forge-switch-change', ({ detail }) => {
  picker.summary = detail;
});

const headerSwitch = document.getElementById('opt-header') as ISwitchComponent;
headerSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  headerSlot.hidden = !detail;
});

const footerSwitch = document.getElementById('opt-footer') as ISwitchComponent;
footerSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  picker.showFooter = detail;
});

const timeLabelSwitch = document.getElementById('opt-time-label') as ISwitchComponent;
timeLabelSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  timeLabelSlot.hidden = !detail;
});

const requiredSwitch = document.getElementById('opt-required') as ISwitchComponent;
requiredSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  picker.required = detail;
});

const disabledSwitch = document.getElementById('opt-disabled') as ISwitchComponent;
disabledSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  picker.disabled = detail;
});

const clearButtonSwitch = document.getElementById('opt-clear-button') as ISwitchComponent;
clearButtonSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  picker.clearButton = detail;
});

const todayButtonSwitch = document.getElementById('opt-today-button') as ISwitchComponent;
todayButtonSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  picker.todayButton = detail;
});
