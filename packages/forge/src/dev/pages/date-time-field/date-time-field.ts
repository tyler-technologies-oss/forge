import '$src/shared';
import '@tylertech/forge/date-time-field';
import '@tylertech/forge/date-time-picker';
import '@tylertech/forge/button';
import '@tylertech/forge/label-value';
import type { IDateTimeFieldChangeEventData, IDateTimeFieldComponent } from '@tylertech/forge/date-time-field';
import type { IDateTimePickerComponent } from '@tylertech/forge/date-time-picker';
import type { ISelectComponent } from '@tylertech/forge/select';
import type { ISwitchComponent } from '@tylertech/forge/switch';

const field = document.getElementById('demo-date-time-field') as IDateTimeFieldComponent;
const picker = document.getElementById('demo-date-time-picker') as IDateTimePickerComponent;
const completeEl = document.getElementById('demo-complete') as HTMLElement;
const valueEl = document.getElementById('demo-value') as HTMLElement;

// Demonstrates the format-hint fallback: show-mask off with no placeholder.
const formatHintsField = document.getElementById('demo-format-hints') as IDateTimeFieldComponent | null;
if (formatHintsField) {
  formatHintsField.showMask = false;
}

// Standalone field — no `picker` attribute, so users type the date/time directly.
const standaloneField = document.getElementById('demo-standalone-field') as IDateTimeFieldComponent;
const standaloneCompleteEl = document.getElementById('demo-standalone-complete') as HTMLElement;
const standaloneValueEl = document.getElementById('demo-standalone-value') as HTMLElement;

function formatValueDebug(value: unknown): string {
  if (value == null) {
    return 'null';
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === 'object' && value !== null && 'from' in value && 'to' in value) {
    const r = value as { from: unknown; to: unknown };
    return JSON.stringify({ from: String(r.from), to: String(r.to) }, null, 2);
  }
  return String(value);
}

field.addEventListener('forge-date-time-field-change', evt => {
  const detail = (evt as CustomEvent<IDateTimeFieldChangeEventData>).detail;
  console.log('[forge-date-time-field-change]', detail);
  completeEl.textContent = String(detail.complete);
  valueEl.textContent = formatValueDebug(detail.value);
});

standaloneField.addEventListener('forge-date-time-field-change', evt => {
  const detail = (evt as CustomEvent<IDateTimeFieldChangeEventData>).detail;
  console.log('[standalone forge-date-time-field-change]', detail);
  standaloneCompleteEl.textContent = String(detail.complete);
  standaloneValueEl.textContent = formatValueDebug(detail.value);
});

document.getElementById('demo-validate')?.addEventListener('click', () => {
  console.log('valid:', field.reportValidity());
});

// The field and picker are independent — shared config must be set on both
// (the field warns on mismatch rather than forwarding config across the link).
const dateModeSelect = document.getElementById('opt-date-mode') as ISelectComponent;
dateModeSelect.addEventListener('change', () => {
  const mode = dateModeSelect.value as 'single' | 'range';
  field.dateMode = mode;
  picker.dateMode = mode;
  standaloneField.dateMode = mode;
});

const timeModeSelect = document.getElementById('opt-time-mode') as ISelectComponent;
timeModeSelect.addEventListener('change', () => {
  const mode = timeModeSelect.value as 'single' | 'range' | 'slots';
  field.timeMode = mode;
  picker.timeMode = mode;
  standaloneField.timeMode = mode;
});

const valueModeSelect = document.getElementById('opt-value-mode') as ISelectComponent;
valueModeSelect.addEventListener('change', () => {
  const mode = valueModeSelect.value as 'temporal' | 'iso' | 'date';
  field.valueMode = mode;
  picker.valueMode = mode;
  standaloneField.valueMode = mode;
});

const localeSelect = document.getElementById('opt-locale') as ISelectComponent;
localeSelect.addEventListener('change', () => {
  field.locale = localeSelect.value as string;
  picker.locale = localeSelect.value as string;
  standaloneField.locale = localeSelect.value as string;
});

const use24hSwitch = document.getElementById('opt-24h') as ISwitchComponent;
use24hSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  field.use24HourTime = detail;
  picker.use24HourTime = detail;
  standaloneField.use24HourTime = detail;
});

const secondsSwitch = document.getElementById('opt-seconds') as ISwitchComponent;
secondsSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  field.allowSeconds = detail;
  picker.allowSeconds = detail;
  standaloneField.allowSeconds = detail;
});

const requiredSwitch = document.getElementById('opt-required') as ISwitchComponent;
requiredSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  field.required = detail;
  standaloneField.required = detail;
});

const requiredPartsSelect = document.getElementById('opt-required-parts') as ISelectComponent;
requiredPartsSelect.addEventListener('change', () => {
  field.requiredParts = requiredPartsSelect.value as 'both' | 'date' | 'time';
  standaloneField.requiredParts = requiredPartsSelect.value as 'both' | 'date' | 'time';
});

const disabledSwitch = document.getElementById('opt-disabled') as ISwitchComponent;
disabledSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  field.disabled = detail;
  standaloneField.disabled = detail;
});

const readonlySwitch = document.getElementById('opt-readonly') as ISwitchComponent;
readonlySwitch.addEventListener('forge-switch-change', ({ detail }) => {
  field.readonly = detail;
  standaloneField.readonly = detail;
});

const persistentSwitch = document.getElementById('opt-persistent') as ISwitchComponent;
persistentSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  field.persistent = detail;
  picker.persistent = detail;
});

const showMaskSwitch = document.getElementById('opt-show-mask') as ISwitchComponent;
showMaskSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  field.showMask = detail;
  standaloneField.showMask = detail;
});

const persistMaskSwitch = document.getElementById('opt-persist-mask') as ISwitchComponent;
persistMaskSwitch.addEventListener('forge-switch-change', ({ detail }) => {
  field.persistMask = detail;
  standaloneField.persistMask = detail;
});

// Apply a text-field control's value to both demo fields as they type.
function bindFieldText(id: string, apply: (field: IDateTimeFieldComponent, value: string) => void): void {
  const input = document.getElementById(id) as HTMLInputElement;
  input.addEventListener('input', () => {
    apply(field, input.value);
    apply(standaloneField, input.value);
  });
}

// Apply a select control's value to both demo fields on change.
function bindFieldSelect(id: string, apply: (field: IDateTimeFieldComponent, value: string) => void): void {
  const select = document.getElementById(id) as ISelectComponent;
  select.addEventListener('change', () => {
    apply(field, select.value as string);
    apply(standaloneField, select.value as string);
  });
}

bindFieldText('opt-label', (f, v) => (f.label = v));
bindFieldText('opt-placeholder', (f, v) => (f.placeholder = v));
bindFieldText('opt-min', (f, v) => (f.min = v || null));
bindFieldText('opt-max', (f, v) => (f.max = v || null));

bindFieldSelect('opt-label-position', (f, v) => (f.labelPosition = v as typeof f.labelPosition));
bindFieldSelect('opt-label-alignment', (f, v) => (f.labelAlignment = v as typeof f.labelAlignment));
bindFieldSelect('opt-variant', (f, v) => (f.variant = v as typeof f.variant));
bindFieldSelect('opt-density', (f, v) => (f.density = v as typeof f.density));
bindFieldSelect('opt-shape', (f, v) => (f.shape = v as typeof f.shape));
bindFieldSelect('opt-theme', (f, v) => (f.theme = v as typeof f.theme));
bindFieldSelect('opt-popover-placement', (f, v) => (f.popoverPlacement = v));
