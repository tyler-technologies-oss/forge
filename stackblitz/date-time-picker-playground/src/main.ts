// Register forge dependencies the date-time-picker composes
import '@tylertech/forge/button';
import '@tylertech/forge/calendar';
import '@tylertech/forge/icon';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/popover';
import '@tylertech/forge/text-field';
import '@tylertech/forge/time-picker';

import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconInsertInvitation } from '@tylertech/tyler-icons';

// Register the date-time-picker calendar-icon used by the inline variant trigger
IconRegistry.define(tylIconInsertInvitation);

// Register the new component
import './forge-date-time-picker/date-time-picker.js';

import './styles.css';

import type {
  IDateTimePickerChangeEventData,
  IDateTimePickerComponent
} from './forge-date-time-picker/date-time-picker.js';

const picker = document.getElementById('demo') as IDateTimePickerComponent;
const sourceEl = document.getElementById('demo-source') as HTMLElement;
const completeEl = document.getElementById('demo-complete') as HTMLElement;
const valueEl = document.getElementById('demo-value') as HTMLElement;
const footerSummary = document.getElementById('demo-footer-summary') as HTMLElement;
const headerSlot = document.getElementById('demo-header') as HTMLElement;
const footerStartSlot = document.getElementById('demo-footer-start') as HTMLElement;
const footerEndSlot = document.getElementById('demo-footer-end') as HTMLElement;
const timeLabelSlot = document.getElementById('demo-time-label') as HTMLElement;

function formatValueDebug(value: unknown): string {
  if (value == null) {
    return 'null';
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === 'object' && 'from' in value && 'to' in value) {
    const r = value as { from: Date; to: Date };
    return JSON.stringify({ from: r.from.toISOString(), to: r.to.toISOString() }, null, 2);
  }
  return String(value);
}

function formatSummary(detail: IDateTimePickerChangeEventData): string {
  if (!detail.complete) {
    return '';
  }
  const v = detail.value;
  if (v instanceof Date) {
    return `Booked for ${v.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })} at ${v.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}.`;
  }
  if (v && typeof v === 'object' && 'from' in v) {
    const r = v as { from: Date; to: Date };
    return `${r.from.toLocaleDateString()} ${r.from.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })} – ${r.to.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
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

function bindSelect<T extends string>(id: string, setter: (value: T) => void): void {
  const el = document.getElementById(id) as HTMLSelectElement;
  el.addEventListener('change', () => setter(el.value as T));
}

function bindCheck(id: string, setter: (value: boolean) => void): void {
  const el = document.getElementById(id) as HTMLInputElement;
  el.addEventListener('change', () => setter(el.checked));
}

bindSelect<'static' | 'inline'>('opt-variant', v => (picker.variant = v));
bindSelect<'slots' | 'range' | 'single'>('opt-time-mode', v => (picker.timeMode = v));
bindSelect<'auto' | 'horizontal' | 'vertical'>('opt-orientation', v => (picker.orientation = v));
bindSelect('opt-locale', (v: string) => (picker.locale = v));
bindSelect('opt-step', (v: string) => (picker.step = Number(v)));

bindCheck('opt-24h', v => (picker.use24HourTime = v));
bindCheck('opt-seconds', v => (picker.allowSeconds = v));
bindCheck('opt-summary', v => (picker.summary = v));
bindCheck('opt-header', v => (headerSlot.hidden = !v));
bindCheck('opt-footer', v => {
  picker.showFooter = v;
  footerStartSlot.hidden = !v;
  footerEndSlot.hidden = !v;
});
bindCheck('opt-time-label', v => (timeLabelSlot.hidden = !v));
bindCheck('opt-required', v => (picker.required = v));
bindCheck('opt-disabled', v => (picker.disabled = v));
bindCheck('opt-clear-button', v => (picker.clearButton = v));
bindCheck('opt-today-button', v => (picker.todayButton = v));
