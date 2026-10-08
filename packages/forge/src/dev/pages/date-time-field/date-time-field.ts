import '$src/shared';
import '@tylertech/forge/date-time-field';
import '@tylertech/forge/date-time-picker';
import '@tylertech/forge/button';
import '@tylertech/forge/label-value';
import './date-time-field.scss';
import type { IDateTimeFieldChangeEventData, IDateTimeFieldComponent } from '@tylertech/forge/date-time-field';
import type { IDateTimePickerComponent } from '@tylertech/forge/date-time-picker';
import type { ISelectComponent } from '@tylertech/forge/select';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import type { ITextFieldComponent } from '@tylertech/forge/text-field';

// Label, placeholder, and field appearance live on the consumer's text field and input.
const textFieldOf = (f: IDateTimeFieldComponent): ITextFieldComponent => f.querySelector('forge-text-field') as ITextFieldComponent;

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

// The field forwards its modes to a linked picker; setting both keeps the standalone field in step too.
// Range modes take two endpoint inputs; keep each demo text field's input count in step with the mode.
function syncInputCount(f: IDateTimeFieldComponent): void {
  const textField = textFieldOf(f);
  const wanted = f.timeMode !== 'slots' && (f.dateMode === 'range' || f.timeMode === 'range') ? 2 : 1;
  const inputs = Array.from(textField.querySelectorAll(':scope > input'));
  inputs.slice(wanted).forEach(input => input.remove());
  for (let i = inputs.length; i < wanted; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    const last = textField.querySelectorAll(':scope > input');
    last[last.length - 1].after(input);
  }
}

const dateModeSelect = document.getElementById('opt-date-mode') as ISelectComponent;
dateModeSelect.addEventListener('change', () => {
  const mode = dateModeSelect.value as 'single' | 'range';
  field.dateMode = mode;
  picker.dateMode = mode;
  standaloneField.dateMode = mode;
  syncInputCount(field);
  syncInputCount(standaloneField);
});

const timeModeSelect = document.getElementById('opt-time-mode') as ISelectComponent;
timeModeSelect.addEventListener('change', () => {
  const mode = timeModeSelect.value as 'single' | 'range' | 'slots';
  field.timeMode = mode;
  picker.timeMode = mode;
  standaloneField.timeMode = mode;
  syncInputCount(field);
  syncInputCount(standaloneField);
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

bindFieldText('opt-label', (f, v) => {
  const label = textFieldOf(f).querySelector('label');
  if (label) {
    label.textContent = v;
  }
});
bindFieldText('opt-placeholder', (f, v) =>
  textFieldOf(f)
    .querySelectorAll('input')
    .forEach(input => (v ? input.setAttribute('placeholder', v) : input.removeAttribute('placeholder')))
);
bindFieldText('opt-min', (f, v) => (f.min = v || null));
bindFieldText('opt-max', (f, v) => (f.max = v || null));

bindFieldSelect('opt-label-position', (f, v) => (textFieldOf(f).labelPosition = v as ITextFieldComponent['labelPosition']));
bindFieldSelect('opt-label-alignment', (f, v) => (textFieldOf(f).labelAlignment = v as ITextFieldComponent['labelAlignment']));
bindFieldSelect('opt-variant', (f, v) => (textFieldOf(f).variant = v as ITextFieldComponent['variant']));
bindFieldSelect('opt-density', (f, v) => (textFieldOf(f).density = v as ITextFieldComponent['density']));
bindFieldSelect('opt-shape', (f, v) => (textFieldOf(f).shape = v as ITextFieldComponent['shape']));
bindFieldSelect('opt-theme', (f, v) => (textFieldOf(f).theme = v as ITextFieldComponent['theme']));
bindFieldSelect('opt-popover-placement', (f, v) => (f.popoverPlacement = v));
