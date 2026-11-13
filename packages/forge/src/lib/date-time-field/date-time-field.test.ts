import { afterEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import { render } from 'vitest-browser-lit';
import { userEvent } from 'vitest/browser';
import { html, type LitElement } from 'lit';
import 'temporal-polyfill/global';
import type { Temporal } from 'temporal-polyfill';
import { defineDateTimeFieldComponent, type IDateTimeFieldComponent, type IDateTimeFieldChangeEventData } from './index.js';
import type { DateTimeFieldDateMode } from './date-time-field-constants.js';
import type { IDateTimePickerChangeEventData, IDateTimePickerComponent, IDateTimePickerRange, ITimeSlot, TimeMode } from '../date-time-picker/index.js';
import type { ITextFieldComponent } from '../text-field/index.js';
import type { IPopoverComponent } from '../popover/index.js';

defineDateTimeFieldComponent();

// imask applies caret changes on a 10ms timer, so type slower than that
const KEY_DELAY = 30;
const SEPARATOR_SELECTOR = '[data-forge-multi-input-separator]';
const TOGGLE_SELECTOR = ':scope > forge-icon-button[slot="end"]';
const DATETIME_HINT = 'MM/DD/YYYY hh:mm aa';
const DATE_HINT = 'MM/DD/YYYY';
const TIME_HINT = 'hh:mm aa';

interface IRenderOptions {
  dateMode?: DateTimeFieldDateMode;
  timeMode?: TimeMode;
  /** Number of `<input>` elements to slot; defaults to the endpoint count for the mode. */
  inputs?: number;
  picker?: boolean;
  /** Text of the slotted `<label>`; `null` omits the label. */
  label?: string | null;
  labelPosition?: string;
  attrs?: Record<string, string>;
  pickerAttrs?: Record<string, string>;
  inputAttrs?: Array<Record<string, string>>;
  form?: boolean;
  textFieldContent?: (textField: HTMLElement) => void;
  configurePicker?: (picker: IDateTimePickerComponent) => void;
}

interface IFieldHarness {
  el: IDateTimeFieldComponent;
  textField: ITextFieldComponent;
  inputs: HTMLInputElement[];
  picker: IDateTimePickerComponent | null;
  wrapper: HTMLElement;
}

let pickerCount = 0;

const wait = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
const frame = (): Promise<void> => new Promise(resolve => requestAnimationFrame(() => resolve()));

function endpointCount(dateMode?: DateTimeFieldDateMode, timeMode?: TimeMode): number {
  if (timeMode === 'slots') {
    return 1;
  }
  return dateMode === 'range' || timeMode === 'range' ? 2 : 1;
}

async function settle(...elements: Array<Element | null | undefined>): Promise<void> {
  for (let pass = 0; pass < 2; pass++) {
    await Promise.all(elements.map(element => (element as LitElement | null | undefined)?.updateComplete));
    await frame();
  }
}

function setAttributes(element: Element, attrs: Record<string, string>): void {
  Object.entries(attrs).forEach(([name, value]) => element.setAttribute(name, value));
}

function createInput(attrs: Record<string, string> = {}): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'text';
  setAttributes(input, attrs);
  return input;
}

function createTextField(count: number, { label = 'When', labelPosition, inputAttrs = [] }: IRenderOptions = {}): ITextFieldComponent {
  const textField = document.createElement('forge-text-field');
  if (labelPosition) {
    textField.setAttribute('label-position', labelPosition);
  }
  if (label !== null) {
    const labelEl = document.createElement('label');
    labelEl.slot = 'label';
    labelEl.textContent = label;
    textField.append(labelEl);
  }
  textField.append(...Array.from({ length: count }, (_, index) => createInput(inputAttrs[index])));
  return textField;
}

async function renderField(options: IRenderOptions = {}): Promise<IFieldHarness> {
  const { dateMode, timeMode, picker = false, attrs = {}, pickerAttrs = {}, form = false, textFieldContent, configurePicker } = options;
  const screen = render(html`<div></div>`);
  const host = screen.container.firstElementChild as HTMLElement;
  const wrapper = document.createElement(form ? 'form' : 'div');
  const el = document.createElement('forge-date-time-field');
  if (dateMode) {
    el.setAttribute('date-mode', dateMode);
  }
  if (timeMode) {
    el.setAttribute('time-mode', timeMode);
  }
  setAttributes(el, attrs);
  const textField = createTextField(options.inputs ?? endpointCount(dateMode, timeMode), options);
  textFieldContent?.(textField);
  el.append(textField);
  wrapper.append(el);

  let pickerEl: IDateTimePickerComponent | null = null;
  if (picker) {
    pickerEl = document.createElement('forge-date-time-picker');
    pickerEl.id = `picker-${++pickerCount}`;
    el.setAttribute('picker', pickerEl.id);
    if (dateMode) {
      pickerEl.setAttribute('date-mode', dateMode);
    }
    if (timeMode) {
      pickerEl.setAttribute('time-mode', timeMode);
    }
    setAttributes(pickerEl, pickerAttrs);
    configurePicker?.(pickerEl);
    wrapper.append(pickerEl);
  }
  host.append(wrapper);
  await settle(el, pickerEl);
  return { el, textField, inputs: Array.from(textField.querySelectorAll<HTMLInputElement>(':scope > input')), picker: pickerEl, wrapper };
}

function getToggle(textField: HTMLElement): HTMLElement | null {
  return textField.querySelector<HTMLElement>(TOGGLE_SELECTOR);
}

function getSupportText(textField: HTMLElement, slot: 'support-text' | 'support-text-end'): HTMLElement[] {
  return Array.from(textField.querySelectorAll<HTMLElement>(`:scope > [slot="${slot}"]`));
}

function getPopover(picker: IDateTimePickerComponent): IPopoverComponent | null {
  return picker.shadowRoot?.querySelector<IPopoverComponent>('forge-popover') ?? null;
}

async function focusInput(input: HTMLInputElement): Promise<void> {
  input.focus();
  await wait(KEY_DELAY);
}

/** Types one key at a time at human speed so imask's deferred caret updates keep up. */
async function typeKeys(input: HTMLInputElement, keys: string): Promise<void> {
  if (document.activeElement !== input) {
    await focusInput(input);
  }
  for (const key of keys) {
    await userEvent.keyboard(key);
    await wait(KEY_DELAY);
  }
}

async function press(key: string): Promise<void> {
  await userEvent.keyboard(key);
  await wait(KEY_DELAY);
}

async function blurInput(input: HTMLInputElement, el: Element): Promise<void> {
  input.blur();
  await settle(el);
}

/** Inserts several chars in one `insertText` event, like IME, dictation, or automation tools. */
function insertText(input: HTMLInputElement, text: string): void {
  const start = input.selectionStart ?? 0;
  const end = input.selectionEnd ?? start;
  input.value = `${input.value.slice(0, start)}${text}${input.value.slice(end)}`;
  input.setSelectionRange(start + text.length, start + text.length);
  input.dispatchEvent(new InputEvent('input', { inputType: 'insertText', data: text, bubbles: true }));
}

function collectChanges(el: IDateTimeFieldComponent): IDateTimeFieldChangeEventData[] {
  const events: IDateTimeFieldChangeEventData[] = [];
  el.addEventListener('forge-date-time-field-change', event => events.push((event as CustomEvent<IDateTimeFieldChangeEventData>).detail));
  return events;
}

function countEvents(el: Element, type: string): string[] {
  const events: string[] = [];
  el.addEventListener(type, () => events.push(type));
  return events;
}

function firePickerChange(picker: IDateTimePickerComponent, detail: Partial<IDateTimePickerChangeEventData>): void {
  const fullDetail: IDateTimePickerChangeEventData = {
    value: null,
    date: null,
    dateTo: null,
    time: null,
    from: null,
    to: null,
    source: 'date',
    complete: false,
    ...detail
  };
  picker.dispatchEvent(new CustomEvent('forge-date-time-picker-change', { detail: fullDetail, bubbles: true, composed: true }));
}

type WarnSpy = MockInstance<typeof console.warn>;

function silenceWarnings(): WarnSpy {
  return vi.spyOn(console, 'warn').mockImplementation(() => {});
}

function warnedWith(spy: WarnSpy, text: string): boolean {
  return spy.mock.calls.some(args => String(args[0]).includes(text));
}

const RANGE = (): IDateTimePickerRange => ({ from: new Date(2025, 5, 12, 9, 0), to: new Date(2025, 5, 15, 17, 0) });

afterEach(() => {
  vi.restoreAllMocks();
});

describe('DateTimeField / discovery', () => {
  it('should render only a default slot in its shadow root', async () => {
    const { el } = await renderField();
    const children = Array.from(el.shadowRoot!.children);
    expect(children.map(child => child.localName)).toEqual(['slot']);
  });

  it('should mask a single slotted input when in single mode', async () => {
    const { el, inputs } = await renderField();
    el.value = new Date(2025, 5, 12, 10, 30);
    await settle(el);
    expect(inputs[0].value).toBe('06/12/2025 10:30 AM');
  });

  it('should configure an input that is added to the text field after render', async () => {
    silenceWarnings();
    const { el, textField, inputs } = await renderField({ dateMode: 'range', timeMode: 'range', inputs: 1 });
    const late = createInput();
    textField.append(late);
    await settle(el);
    expect(inputs[0].getAttribute('aria-label')).toBe('Start date and time');
    expect(late.getAttribute('aria-label')).toBe('End date and time');
    expect(late.getAttribute('autocomplete')).toBe('off');
    expect(inputs[0].nextElementSibling?.matches(SEPARATOR_SELECTOR)).toBe(true);
  });

  it('should display a late-added input as part of the value when it completes the range', async () => {
    silenceWarnings();
    const { el, textField } = await renderField({ dateMode: 'range', timeMode: 'range', inputs: 1, attrs: { 'value-mode': 'date' } });
    el.value = RANGE();
    await settle(el);
    const late = createInput();
    textField.append(late);
    await settle(el);
    expect(late.value).toBe('06/15/2025 05:00 PM');
  });

  it('should warn once when there are fewer inputs than the mode needs', async () => {
    const warn = silenceWarnings();
    const { el } = await renderField({ dateMode: 'range', timeMode: 'range', inputs: 1 });
    el.showDuration = false;
    await settle(el);
    const shortfallWarnings = warn.mock.calls.filter(args => String(args[0]).includes('expected 2 <input> element(s)'));
    expect(shortfallWarnings.length).toBe(1);
    expect(String(shortfallWarnings[0][0])).toContain('found 1');
  });

  it('should warn when a slotted input has a name', async () => {
    const warn = silenceWarnings();
    await renderField({ inputAttrs: [{ name: 'when' }] });
    expect(warnedWith(warn, 'remove the `name` from slotted inputs')).toBe(true);
  });

  it('should ignore inputs beyond the endpoint count when in single mode', async () => {
    const { inputs } = await renderField({ inputs: 2 });
    expect(inputs[0].getAttribute('autocomplete')).toBe('off');
    expect(inputs[1].hasAttribute('autocomplete')).toBe(false);
    expect(inputs[1].hasAttribute('placeholder')).toBe(false);
  });

  it('should adopt a replacement text field and restore the one it replaced', async () => {
    const { el, textField, inputs } = await renderField({ labelPosition: 'block-start' });
    const replacement = createTextField(1, { label: 'New label', labelPosition: 'block-start' });
    textField.replaceWith(replacement);
    await settle(el);
    const [newInput] = Array.from(replacement.querySelectorAll('input'));
    expect(newInput.getAttribute('placeholder')).toBe(DATETIME_HINT);
    expect(newInput.getAttribute('autocomplete')).toBe('off');
    expect(el.getAttribute('aria-label')).toBe('New label');
    expect(inputs[0].hasAttribute('placeholder')).toBe(false);
    expect(inputs[0].hasAttribute('autocomplete')).toBe(false);
  });

  it('should move the picker anchor to a replacement text field', async () => {
    const { el, textField, picker } = await renderField({ picker: true });
    const replacement = createTextField(1);
    textField.replaceWith(replacement);
    await settle(el, picker);
    expect(picker!.anchorElement).toBe(replacement.popoverTargetElement);
    expect(getToggle(replacement)).not.toBeNull();
  });
});

describe('DateTimeField / input attributes', () => {
  it('should turn off autocomplete and spellcheck on each endpoint input', async () => {
    const { inputs } = await renderField({ dateMode: 'range', timeMode: 'range' });
    inputs.forEach(input => {
      expect(input.getAttribute('autocomplete')).toBe('off');
      expect(input.getAttribute('spellcheck')).toBe('false');
    });
  });

  it('should keep authored autocomplete, spellcheck and inputmode values', async () => {
    const { inputs } = await renderField({ inputAttrs: [{ autocomplete: 'bday', spellcheck: 'true', inputmode: 'text' }] });
    expect(inputs[0].getAttribute('autocomplete')).toBe('bday');
    expect(inputs[0].getAttribute('spellcheck')).toBe('true');
    expect(inputs[0].getAttribute('inputmode')).toBe('text');
  });

  it('should give both inputs the minimum natural size when the mode is range by range', async () => {
    const { inputs } = await renderField({ dateMode: 'range', timeMode: 'range' });
    expect(inputs.map(input => input.getAttribute('size'))).toEqual(['23', '23']);
  });

  it('should give a date-only end input the minimum natural size', async () => {
    const { inputs } = await renderField({ dateMode: 'range', timeMode: 'single' });
    expect(inputs[1].getAttribute('size')).toBe('22');
  });

  it('should grow an input past the minimum when its hint is longer', async () => {
    const { inputs } = await renderField({ attrs: { 'allow-seconds': '' } });
    expect(Number(inputs[0].getAttribute('size'))).toBeGreaterThan(22);
  });

  it('should fit the format hint without truncating it', async () => {
    const { inputs } = await renderField({ labelPosition: 'block-start' });
    const [input] = inputs;
    input.style.inlineSize = 'auto';
    expect(input.scrollWidth).toBeLessThanOrEqual(input.clientWidth);
    const context = document.createElement('canvas').getContext('2d')!;
    context.font = getComputedStyle(input).font;
    const { paddingInlineStart, paddingInlineEnd } = getComputedStyle(input);
    const contentWidth = input.clientWidth - parseFloat(paddingInlineStart) - parseFloat(paddingInlineEnd);
    expect(context.measureText(input.placeholder).width).toBeLessThanOrEqual(contentWidth);
  });

  it('should give a time-only end input the minimum natural size', async () => {
    const { inputs } = await renderField({ dateMode: 'single', timeMode: 'range' });
    expect(inputs[1].getAttribute('size')).toBe('22');
  });

  it('should add format hint placeholders when the label is not inset', async () => {
    const { inputs } = await renderField({ dateMode: 'range', timeMode: 'single', labelPosition: 'block-start' });
    expect(inputs[0].getAttribute('placeholder')).toBe(DATETIME_HINT);
    expect(inputs[1].getAttribute('placeholder')).toBe(DATE_HINT);
  });

  it('should add a time hint placeholder to a time-only end input when the label is not inset', async () => {
    const { inputs } = await renderField({ timeMode: 'range', labelPosition: 'block-start' });
    expect(inputs[1].getAttribute('placeholder')).toBe(TIME_HINT);
  });

  it('should not add a placeholder when the label is inset', async () => {
    const { inputs } = await renderField();
    expect(inputs[0].hasAttribute('placeholder')).toBe(false);
  });

  it('should keep an authored placeholder', async () => {
    const { inputs } = await renderField({ labelPosition: 'block-start', inputAttrs: [{ placeholder: 'Pick a time' }] });
    expect(inputs[0].getAttribute('placeholder')).toBe('Pick a time');
  });

  it('should use 24-hour hints when use-24-hour-time is set', async () => {
    const { inputs } = await renderField({ timeMode: 'range', labelPosition: 'block-start', attrs: { 'use-24-hour-time': '' } });
    expect(inputs[0].getAttribute('placeholder')).toBe('MM/DD/YYYY HH:mm');
    expect(inputs[1].getAttribute('placeholder')).toBe('HH:mm');
    expect(inputs[1].getAttribute('size')).toBe('22');
  });

  it('should add seconds to the hints when allow-seconds is set', async () => {
    const { inputs } = await renderField({ labelPosition: 'block-start', attrs: { 'allow-seconds': '' } });
    expect(inputs[0].getAttribute('placeholder')).toBe('MM/DD/YYYY hh:mm:ss aa');
  });

  it('should use a numeric inputmode for date-only inputs', async () => {
    const { inputs } = await renderField({ dateMode: 'range', timeMode: 'single' });
    expect(inputs[0].hasAttribute('inputmode')).toBe(false);
    expect(inputs[1].getAttribute('inputmode')).toBe('numeric');
  });

  it('should use a numeric inputmode for every input when use-24-hour-time is set', async () => {
    const { inputs } = await renderField({ timeMode: 'range', attrs: { 'use-24-hour-time': '' } });
    inputs.forEach(input => expect(input.getAttribute('inputmode')).toBe('numeric'));
  });
});

describe('DateTimeField / ARIA', () => {
  it('should name both inputs start and end date and time when the mode is range by range', async () => {
    const { inputs } = await renderField({ dateMode: 'range', timeMode: 'range' });
    expect(inputs.map(input => input.getAttribute('aria-label'))).toEqual(['Start date and time', 'End date and time']);
  });

  it('should name the end input end date when the mode is range by single', async () => {
    const { inputs } = await renderField({ dateMode: 'range', timeMode: 'single' });
    expect(inputs.map(input => input.getAttribute('aria-label'))).toEqual(['Start date and time', 'End date']);
  });

  it('should name the end input end time when the mode is single by range', async () => {
    const { inputs } = await renderField({ dateMode: 'single', timeMode: 'range' });
    expect(inputs.map(input => input.getAttribute('aria-label'))).toEqual(['Start date and time', 'End time']);
  });

  it('should not name a single input when the text field has a label', async () => {
    const { inputs } = await renderField();
    expect(inputs[0].hasAttribute('aria-label')).toBe(false);
  });

  it('should name a single input date and time when the text field has no label', async () => {
    const { inputs } = await renderField({ label: null });
    expect(inputs[0].getAttribute('aria-label')).toBe('Date and time');
  });

  it('should keep an authored aria-label or aria-labelledby on an input', async () => {
    const { inputs } = await renderField({
      dateMode: 'range',
      timeMode: 'range',
      inputAttrs: [{ 'aria-label': 'Check in' }, { 'aria-labelledby': 'elsewhere' }]
    });
    expect(inputs[0].getAttribute('aria-label')).toBe('Check in');
    expect(inputs[1].hasAttribute('aria-label')).toBe(false);
  });

  it('should set aria-required on every input when required', async () => {
    const { inputs } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { required: '' } });
    inputs.forEach(input => expect(input.getAttribute('aria-required')).toBe('true'));
  });

  it('should not set aria-required on a date-only input when required-parts is time', async () => {
    const { inputs } = await renderField({ dateMode: 'range', timeMode: 'single', attrs: { required: '', 'required-parts': 'time' } });
    expect(inputs[0].getAttribute('aria-required')).toBe('true');
    expect(inputs[1].hasAttribute('aria-required')).toBe(false);
  });

  it('should not set aria-required on a time-only input when required-parts is date', async () => {
    const { inputs } = await renderField({ timeMode: 'range', attrs: { required: '', 'required-parts': 'date' } });
    expect(inputs[0].getAttribute('aria-required')).toBe('true');
    expect(inputs[1].hasAttribute('aria-required')).toBe(false);
  });

  it('should remove aria-required when required is turned off', async () => {
    const { el, inputs } = await renderField({ attrs: { required: '' } });
    el.required = false;
    await settle(el);
    expect(inputs[0].hasAttribute('aria-required')).toBe(false);
  });

  it('should add popup attributes to the inputs when a picker is linked', async () => {
    const { inputs, picker } = await renderField({ dateMode: 'range', timeMode: 'range', picker: true });
    inputs.forEach(input => {
      expect(input.getAttribute('aria-haspopup')).toBe('dialog');
      expect(input.getAttribute('aria-expanded')).toBe('false');
      expect(input.getAttribute('aria-controls')).toBe(picker!.id);
    });
  });

  it('should not add popup attributes when no picker is linked', async () => {
    const { inputs } = await renderField();
    expect(inputs[0].hasAttribute('aria-haspopup')).toBe(false);
    expect(inputs[0].hasAttribute('aria-expanded')).toBe(false);
    expect(inputs[0].hasAttribute('aria-controls')).toBe(false);
  });

  it('should reflect the open state in aria-expanded on the inputs and toggle', async () => {
    const { el, textField, inputs, picker } = await renderField({ picker: true });
    const toggle = getToggle(textField)!;
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    toggle.click();
    await settle(el, picker);
    expect(inputs[0].getAttribute('aria-expanded')).toBe('true');
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(toggle.getAttribute('aria-haspopup')).toBe('dialog');
  });

  it('should be a group named by the label text', async () => {
    const { el } = await renderField({ label: 'Appointment' });
    expect(el.getAttribute('role')).toBe('group');
    expect(el.getAttribute('aria-label')).toBe('Appointment');
  });

  it('should name the group date and time when there is no label', async () => {
    const { el } = await renderField({ label: null });
    expect(el.getAttribute('aria-label')).toBe('Date and time');
  });

  it('should keep an authored group name', async () => {
    const { el } = await renderField({ attrs: { 'aria-label': 'Custom name' } });
    expect(el.getAttribute('aria-label')).toBe('Custom name');
  });

  it('should rename the group when the label text changes', async () => {
    const { el, textField } = await renderField({ label: 'Before' });
    textField.querySelector('label')!.textContent = 'After';
    await settle(el);
    expect(el.getAttribute('aria-label')).toBe('After');
  });

  it('should keep naming the group from the label after the field is reconnected', async () => {
    const { el, textField, wrapper } = await renderField({ label: 'Before' });
    el.remove();
    wrapper.append(el);
    await settle(el);
    textField.querySelector('label')!.textContent = 'After';
    await settle(el);
    expect(el.getAttribute('aria-label')).toBe('After');
  });
});

describe('DateTimeField / forwarding', () => {
  it('should forward disabled to the text field', async () => {
    const { el, textField } = await renderField();
    el.disabled = true;
    await settle(el);
    expect(textField.disabled).toBe(true);
    el.disabled = false;
    await settle(el);
    expect(textField.disabled).toBe(false);
  });

  it('should forward required to the text field', async () => {
    const { textField } = await renderField({ attrs: { required: '' } });
    expect(textField.required).toBe(true);
  });

  it('should forward invalid to the text field after validation is reported', async () => {
    const { el, textField } = await renderField({ attrs: { required: '' } });
    expect(textField.invalid).toBe(false);
    el.reportValidity();
    await settle(el);
    expect(textField.invalid).toBe(true);
  });

  it('should make the inputs read-only when readonly is set', async () => {
    const { el, inputs } = await renderField({ timeMode: 'range', attrs: { readonly: '' } });
    inputs.forEach(input => expect(input.readOnly).toBe(true));
    el.readonly = false;
    await settle(el);
    inputs.forEach(input => expect(input.readOnly).toBe(false));
  });

  it('should become disabled when its fieldset is disabled', async () => {
    const { el, textField, wrapper } = await renderField();
    const fieldset = document.createElement('fieldset');
    wrapper.append(fieldset);
    fieldset.append(el);
    await settle(el);
    fieldset.disabled = true;
    await settle(el);
    expect(el.disabled).toBe(true);
    expect(textField.disabled).toBe(true);
  });

  it('should disable the toggle when disabled', async () => {
    const { el, textField, picker } = await renderField({ picker: true });
    el.disabled = true;
    await settle(el, picker);
    expect((getToggle(textField) as HTMLElement & { disabled: boolean }).disabled).toBe(true);
  });
});

describe('DateTimeField / cleanup and restoration', () => {
  it('should restore the original input attributes when the text field is removed', async () => {
    const { el, textField, inputs } = await renderField({
      dateMode: 'range',
      timeMode: 'range',
      labelPosition: 'block-start',
      attrs: { required: '', readonly: '' },
      inputAttrs: [{ size: '4' }, {}]
    });
    textField.remove();
    await settle(el);
    const [start, end] = inputs;
    expect(start.getAttribute('size')).toBe('4');
    ['placeholder', 'autocomplete', 'spellcheck', 'aria-label', 'aria-required'].forEach(name => {
      expect(start.hasAttribute(name)).toBe(false);
      expect(end.hasAttribute(name)).toBe(false);
    });
    expect(end.hasAttribute('size')).toBe(false);
    expect(start.readOnly).toBe(false);
  });

  it('should remove its separator, toggle, error text and duration when the field is disconnected', async () => {
    const { el, textField, inputs, picker } = await renderField({ dateMode: 'range', timeMode: 'range', picker: true, attrs: { 'value-mode': 'date' } });
    el.value = RANGE();
    await settle(el, picker);
    expect(getSupportText(textField, 'support-text-end').length).toBe(1);
    el.value = { from: new Date(2025, 5, 15), to: new Date(2025, 5, 12) };
    await settle(el);
    el.reportValidity();
    await settle(el);
    expect(getSupportText(textField, 'support-text').length).toBe(1);
    el.remove();
    await settle(el);
    expect(textField.querySelector(SEPARATOR_SELECTOR)).toBeNull();
    expect(getToggle(textField)).toBeNull();
    expect(getSupportText(textField, 'support-text').length).toBe(0);
    expect(getSupportText(textField, 'support-text-end').length).toBe(0);
    inputs.forEach(input => {
      expect(input.hasAttribute('aria-haspopup')).toBe(false);
      expect(input.hasAttribute('aria-expanded')).toBe(false);
      expect(input.hasAttribute('aria-controls')).toBe(false);
    });
  });

  it('should restore the end input when the mode changes to a single endpoint', async () => {
    const { el, textField, inputs } = await renderField({ dateMode: 'range', timeMode: 'range', labelPosition: 'block-start' });
    el.dateMode = 'single';
    el.timeMode = 'single';
    await settle(el);
    const [, end] = inputs;
    ['placeholder', 'size', 'autocomplete', 'spellcheck', 'aria-label'].forEach(name => expect(end.hasAttribute(name), name).toBe(false));
    expect(textField.querySelector(SEPARATOR_SELECTOR)).toBeNull();
  });

  it('should drop the start label when the mode changes to a single endpoint', async () => {
    const { el, inputs } = await renderField({ dateMode: 'range', timeMode: 'range' });
    el.dateMode = 'single';
    el.timeMode = 'single';
    await settle(el);
    expect(inputs[0].hasAttribute('aria-label')).toBe(false);
  });

  it('should configure the second input when the mode changes to a range', async () => {
    const { el, textField, inputs } = await renderField({ inputs: 2 });
    el.timeMode = 'range';
    await settle(el);
    expect(inputs[1].getAttribute('aria-label')).toBe('End time');
    expect(inputs[1].getAttribute('size')).toBe('22');
    expect(inputs[0].nextElementSibling?.matches(SEPARATOR_SELECTOR)).toBe(true);
    expect(textField.querySelectorAll(SEPARATOR_SELECTOR).length).toBe(1);
  });

  it('should remove its toggle when the picker is unlinked', async () => {
    const { el, textField, inputs } = await renderField({ picker: true });
    expect(getToggle(textField)).not.toBeNull();
    el.pickerElement = null;
    await settle(el);
    expect(getToggle(textField)).toBeNull();
    expect(inputs[0].hasAttribute('aria-haspopup')).toBe(false);
    expect(inputs[0].hasAttribute('aria-controls')).toBe(false);
  });

  it('should keep a consumer toggle but remove its popup attributes when the picker is unlinked', async () => {
    const { el, textField } = await renderField({
      picker: true,
      textFieldContent: host => {
        const consumerToggle = document.createElement('forge-icon-button');
        consumerToggle.slot = 'end';
        consumerToggle.setAttribute('aria-label', 'Open');
        host.append(consumerToggle);
      }
    });
    el.pickerElement = null;
    await settle(el);
    const toggle = getToggle(textField);
    expect(toggle).not.toBeNull();
    expect(toggle!.hasAttribute('aria-haspopup')).toBe(false);
    expect(toggle!.hasAttribute('aria-expanded')).toBe(false);
  });
});

describe('DateTimeField / toggle and separator', () => {
  it('should add a toggle only when a picker is linked', async () => {
    const { textField } = await renderField();
    expect(getToggle(textField)).toBeNull();
    const linked = await renderField({ picker: true });
    const toggle = getToggle(linked.textField);
    expect(toggle).not.toBeNull();
    expect(toggle!.getAttribute('aria-label')).toBe('Toggle date and time picker');
  });

  it('should keep its toggle out of the tab order', async () => {
    const { textField } = await renderField({ picker: true });
    expect(getToggle(textField)!.getAttribute('tabindex')).toBe('-1');
  });

  it('should reuse a consumer toggle instead of creating one', async () => {
    const { el, textField, picker } = await renderField({
      picker: true,
      textFieldContent: host => {
        const consumerToggle = document.createElement('forge-icon-button');
        consumerToggle.slot = 'end';
        consumerToggle.id = 'my-toggle';
        host.append(consumerToggle);
      }
    });
    const toggles = textField.querySelectorAll(TOGGLE_SELECTOR);
    expect(toggles.length).toBe(1);
    expect(toggles[0].id).toBe('my-toggle');
    (toggles[0] as HTMLElement).click();
    await settle(el, picker);
    expect(picker!.open).toBe(true);
  });

  it('should add the toggle when a picker is linked by element reference', async () => {
    const { el, textField, wrapper } = await renderField();
    const picker = document.createElement('forge-date-time-picker');
    wrapper.append(picker);
    el.pickerElement = picker;
    await settle(el, picker);
    expect(getToggle(textField)).not.toBeNull();
  });

  it('should add a hidden-from-assistive-tech separator after the start input when there are two inputs', async () => {
    const { textField, inputs } = await renderField({ dateMode: 'range', timeMode: 'range', labelPosition: 'block-start' });
    const separator = inputs[0].nextElementSibling as HTMLElement;
    expect(separator.matches(SEPARATOR_SELECTOR)).toBe(true);
    expect(separator.getAttribute('aria-hidden')).toBe('true');
    expect(separator.hidden).toBe(false);
    expect(textField.querySelectorAll(SEPARATOR_SELECTOR).length).toBe(1);
  });

  it('should not add a separator when there is one input', async () => {
    const { textField } = await renderField();
    expect(textField.querySelector(SEPARATOR_SELECTOR)).toBeNull();
  });

  it('should reuse a consumer separator instead of creating one', async () => {
    const { textField } = await renderField({
      dateMode: 'range',
      timeMode: 'range',
      textFieldContent: host => {
        const separator = document.createElement('span');
        separator.setAttribute('data-forge-multi-input-separator', '');
        separator.textContent = 'to';
        host.querySelector('input')!.after(separator);
      }
    });
    const separators = textField.querySelectorAll(SEPARATOR_SELECTOR);
    expect(separators.length).toBe(1);
    expect(separators[0].textContent).toBe('to');
  });

  it('should hide the separator at rest when the label is inset and the field is empty', async () => {
    const { textField } = await renderField({ dateMode: 'range', timeMode: 'range' });
    expect((textField.querySelector(SEPARATOR_SELECTOR) as HTMLElement).hidden).toBe(true);
  });

  it('should hide the separator at rest when an authored placeholder shows', async () => {
    const { textField } = await renderField({ dateMode: 'range', timeMode: 'range', labelPosition: 'block-start', inputAttrs: [{ placeholder: 'Start' }] });
    expect((textField.querySelector(SEPARATOR_SELECTOR) as HTMLElement).hidden).toBe(true);
  });

  it('should show the separator when the field holds a value', async () => {
    const { el, textField } = await renderField({ dateMode: 'range', timeMode: 'range' });
    el.value = RANGE();
    await settle(el);
    expect((textField.querySelector(SEPARATOR_SELECTOR) as HTMLElement).hidden).toBe(false);
  });

  it('should show the separator while an input is focused', async () => {
    const { el, textField, inputs } = await renderField({ dateMode: 'range', timeMode: 'range' });
    await focusInput(inputs[0]);
    await settle(el);
    expect((textField.querySelector(SEPARATOR_SELECTOR) as HTMLElement).hidden).toBe(false);
  });
});

describe('DateTimeField / error text', () => {
  it('should show the validation message as support text while invalid', async () => {
    const { el, textField } = await renderField({ attrs: { required: '' } });
    expect(getSupportText(textField, 'support-text').length).toBe(0);
    el.reportValidity();
    await settle(el);
    const [support] = getSupportText(textField, 'support-text');
    expect(support.textContent).toBe('Please select a date and time.');
  });

  it('should show support text when the invalid event fires from checkValidity', async () => {
    const { el, textField } = await renderField({ attrs: { required: '' } });
    el.checkValidity();
    await settle(el);
    expect(getSupportText(textField, 'support-text').length).toBe(1);
  });

  it('should remove the support text once the value becomes valid', async () => {
    const { el, textField } = await renderField({ attrs: { required: '', 'value-mode': 'date' } });
    el.reportValidity();
    await settle(el);
    el.value = new Date(2025, 5, 12, 10, 30);
    await settle(el);
    expect(getSupportText(textField, 'support-text').length).toBe(0);
    expect(textField.invalid).toBe(false);
  });

  it('should not inject support text when the consumer provides their own', async () => {
    const { el, textField } = await renderField({
      attrs: { required: '' },
      textFieldContent: host => {
        const help = document.createElement('span');
        help.slot = 'support-text';
        help.textContent = 'Consumer help';
        host.append(help);
      }
    });
    el.reportValidity();
    await settle(el);
    const support = getSupportText(textField, 'support-text');
    expect(support.length).toBe(1);
    expect(support[0].textContent).toBe('Consumer help');
  });

  it('should update the support text when the validation message changes', async () => {
    const { el, textField } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { 'value-mode': 'date', min: '2025-06-01T00:00' } });
    el.value = { from: new Date(2025, 5, 15), to: new Date(2025, 5, 12) };
    await settle(el);
    el.reportValidity();
    await settle(el);
    expect(getSupportText(textField, 'support-text')[0].textContent).toBe('End must be after start.');
    el.value = { from: new Date(2025, 4, 1), to: new Date(2025, 5, 12) };
    await settle(el);
    el.reportValidity();
    await settle(el);
    expect(getSupportText(textField, 'support-text')[0].textContent).toBe('Selected date and time is before the earliest allowed.');
  });
});

describe('DateTimeField / duration', () => {
  it('should show the duration in the end support text for a complete range', async () => {
    const { el, textField } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { 'value-mode': 'date' } });
    el.value = RANGE();
    await settle(el);
    const [duration] = getSupportText(textField, 'support-text-end');
    expect(duration.textContent).toMatch(/3\s*day/);
    expect(duration.textContent).toMatch(/8\s*hour/);
  });

  it('should update the duration when the range changes', async () => {
    const { el, textField } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { 'value-mode': 'date' } });
    el.value = RANGE();
    await settle(el);
    el.value = { from: new Date(2025, 5, 12, 9, 0), to: new Date(2025, 5, 13, 9, 0) };
    await settle(el);
    const durations = getSupportText(textField, 'support-text-end');
    expect(durations.length).toBe(1);
    expect(durations[0].textContent).toMatch(/1\s*day/);
    expect(durations[0].textContent).not.toMatch(/hour/);
  });

  it('should show the duration for a same-day time range', async () => {
    const { el, textField } = await renderField({ timeMode: 'range', attrs: { 'value-mode': 'date' } });
    el.value = { from: new Date(2025, 5, 12, 9, 0), to: new Date(2025, 5, 12, 17, 0) };
    await settle(el);
    expect(getSupportText(textField, 'support-text-end')[0].textContent).toMatch(/8\s*hour/);
  });

  it('should not show a duration for a single value', async () => {
    const { el, textField } = await renderField({ attrs: { 'value-mode': 'date' } });
    el.value = new Date(2025, 5, 12, 9, 0);
    await settle(el);
    expect(getSupportText(textField, 'support-text-end').length).toBe(0);
  });

  it('should not show a duration when the end is before the start', async () => {
    const { el, textField } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { 'value-mode': 'date' } });
    el.value = { from: new Date(2025, 5, 15, 17, 0), to: new Date(2025, 5, 12, 9, 0) };
    await settle(el);
    expect(getSupportText(textField, 'support-text-end').length).toBe(0);
  });

  it('should not show an empty duration when the start equals the end', async () => {
    const { el, textField } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { 'value-mode': 'date' } });
    el.value = { from: new Date(2025, 5, 12, 9, 0), to: new Date(2025, 5, 12, 9, 0) };
    await settle(el);
    const durations = getSupportText(textField, 'support-text-end');
    expect(durations.every(duration => duration.textContent !== '')).toBe(true);
  });

  it('should not show a duration when show-duration is off', async () => {
    const { el, textField } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { 'value-mode': 'date' } });
    el.showDuration = false;
    el.value = RANGE();
    await settle(el);
    expect(getSupportText(textField, 'support-text-end').length).toBe(0);
  });

  it('should hide the duration while the picker is open and restore it on close', async () => {
    const { el, textField, picker } = await renderField({ dateMode: 'range', timeMode: 'range', picker: true, attrs: { 'value-mode': 'date' } });
    el.value = RANGE();
    await settle(el, picker);
    expect(getSupportText(textField, 'support-text-end').length).toBe(1);
    el.open = true;
    await settle(el, picker);
    expect(getSupportText(textField, 'support-text-end').length).toBe(0);
    el.open = false;
    await settle(el, picker);
    expect(getSupportText(textField, 'support-text-end').length).toBe(1);
  });

  it('should not inject a duration when the consumer provides their own end support text', async () => {
    const { el, textField } = await renderField({
      dateMode: 'range',
      timeMode: 'range',
      attrs: { 'value-mode': 'date' },
      textFieldContent: host => {
        const count = document.createElement('span');
        count.slot = 'support-text-end';
        count.textContent = 'Mine';
        host.append(count);
      }
    });
    el.value = RANGE();
    await settle(el);
    const ends = getSupportText(textField, 'support-text-end');
    expect(ends.length).toBe(1);
    expect(ends[0].textContent).toBe('Mine');
  });
});

describe('DateTimeField / mask guide', () => {
  it('should rest empty when empty and unfocused', async () => {
    const { inputs } = await renderField();
    expect(inputs[0].value).toBe('');
  });

  it('should reveal the format guide on focus and hide it on blur', async () => {
    const { el, inputs } = await renderField();
    await focusInput(inputs[0]);
    expect(inputs[0].value).toBe(DATETIME_HINT);
    await blurInput(inputs[0], el);
    expect(inputs[0].value).toBe('');
  });

  it('should keep the guide hidden on focus when show-mask is off', async () => {
    const { el, inputs } = await renderField();
    el.showMask = false;
    await settle(el);
    await focusInput(inputs[0]);
    expect(inputs[0].value).toBe('');
  });

  it('should show the guide at rest when persist-mask is set', async () => {
    const { inputs } = await renderField({ labelPosition: 'block-start', attrs: { 'persist-mask': '' }, inputAttrs: [{ placeholder: 'Pick' }] });
    expect(inputs[0].value).toContain('/');
  });

  it('should keep an authored placeholder visible on focus until the user types', async () => {
    const { inputs } = await renderField({ labelPosition: 'block-start', inputAttrs: [{ placeholder: 'Pick' }] });
    await focusInput(inputs[0]);
    expect(inputs[0].value).toBe('');
  });

  it('should show the guide on every endpoint input when one is focused', async () => {
    const { inputs } = await renderField({ timeMode: 'range' });
    await focusInput(inputs[0]);
    expect(inputs[1].value).toBe(TIME_HINT);
  });
});

describe('DateTimeField / letter guide', () => {
  const DATETIME_STEPS: Array<[string, string, number]> = [
    ['1', '1M/DD/YYYY hh:mm aa', 1],
    ['2', '12/DD/YYYY hh:mm aa', 3],
    ['2', '12/2D/YYYY hh:mm aa', 4],
    ['8', '12/28/YYYY hh:mm aa', 6],
    ['2', '12/28/2YYY hh:mm aa', 7],
    ['0', '12/28/20YY hh:mm aa', 8],
    ['2', '12/28/202Y hh:mm aa', 9],
    ['6', '12/28/2026 hh:mm aa', 10],
    ['1', '12/28/2026 01:mm aa', 13],
    ['0', '12/28/2026 10:mm aa', 14],
    ['4', '12/28/2026 10:04 aa', 16],
    ['5', '12/28/2026 10:45 aa', 16],
    ['a', '12/28/2026 10:45 AM', 19]
  ];
  const DATE_STEPS: Array<[string, string, number]> = [
    ['1', '1M/DD/YYYY', 1],
    ['2', '12/DD/YYYY', 3],
    ['2', '12/2D/YYYY', 4],
    ['8', '12/28/YYYY', 6],
    ['2', '12/28/2YYY', 7],
    ['0', '12/28/20YY', 8],
    ['2', '12/28/202Y', 9],
    ['6', '12/28/2026', 10]
  ];
  const TIME_STEPS: Array<[string, string, number]> = [
    ['1', '01:mm aa', 2],
    ['0', '10:mm aa', 3],
    ['4', '10:04 aa', 5],
    ['5', '10:45 aa', 5],
    ['a', '10:45 AM', 8]
  ];

  // imask defers caret moves on a 10ms timer; background tabs throttle it.
  const IMASK_CURSOR_DELAY = 10;
  const THROTTLED_DELAY = 60_000;

  function throttleCursorTimer(): MockInstance {
    const realSetTimeout = window.setTimeout.bind(window);
    return vi
      .spyOn(window, 'setTimeout')
      .mockImplementation(((handler: TimerHandler, ms?: number, ...args: unknown[]) =>
        realSetTimeout(handler, ms === IMASK_CURSOR_DELAY ? THROTTLED_DELAY : ms, ...args)) as typeof window.setTimeout);
  }

  async function expectSteps(input: HTMLInputElement, steps: Array<[string, string, number]>): Promise<void> {
    await focusInput(input);
    await press('{Home}');
    for (const [key, value, caret] of steps) {
      await typeKeys(input, key);
      expect(input.value, `value after ${key}`).toBe(value);
      expect(input.selectionStart, `caret after ${key}`).toBe(caret);
    }
  }

  async function expectThrottledSteps(input: HTMLInputElement, steps: Array<[string, string, number]>): Promise<void> {
    const spy = throttleCursorTimer();
    try {
      await expectSteps(input, steps);
    } finally {
      spy.mockRestore();
    }
  }

  it('should advance the caret past each separator when the caret timer is throttled in a single field', async () => {
    const { inputs } = await renderField();
    await expectThrottledSteps(inputs[0], DATETIME_STEPS);
  });

  it('should advance the caret past each separator when the caret timer is throttled in a range field with persist-mask', async () => {
    const { inputs } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { 'persist-mask': '' } });
    await expectThrottledSteps(inputs[0], DATETIME_STEPS);
  });

  it('should advance the caret past each separator when the caret timer is throttled in a time-only end input', async () => {
    const { inputs } = await renderField({ timeMode: 'range' });
    await expectThrottledSteps(inputs[1], TIME_STEPS);
  });

  it('should advance the caret past each separator when the caret timer is throttled in a date-only end input', async () => {
    const { inputs } = await renderField({ dateMode: 'range' });
    await expectThrottledSteps(inputs[1], DATE_STEPS);
  });

  it('should advance the caret past each separator when typing a date and time in a single field', async () => {
    const { inputs } = await renderField();
    await expectSteps(inputs[0], DATETIME_STEPS);
  });

  it('should advance the caret past each separator when typing in the start input of a range field', async () => {
    const { inputs } = await renderField({ dateMode: 'range', timeMode: 'range', picker: true });
    await expectSteps(inputs[0], DATETIME_STEPS);
  });

  it('should advance the caret past each separator when typing in a range field with persist-mask', async () => {
    const { inputs } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { 'persist-mask': '' } });
    await expectSteps(inputs[0], DATETIME_STEPS);
  });

  it('should advance the caret past each separator when typing in a single field with persist-mask', async () => {
    const { inputs } = await renderField({ attrs: { 'persist-mask': '' } });
    await expectSteps(inputs[0], DATETIME_STEPS);
  });

  it('should advance the caret past each separator when typing in a date-only end input', async () => {
    const { inputs } = await renderField({ dateMode: 'range' });
    await expectSteps(inputs[1], DATE_STEPS);
  });

  it('should advance the caret past each separator when typing in a time-only end input', async () => {
    const { inputs } = await renderField({ timeMode: 'range' });
    await expectSteps(inputs[1], TIME_STEPS);
  });

  const ADVANCE_CASES: Array<{ name: string; dateMode: DateTimeFieldDateMode; timeMode: TimeMode; endKeys: string; to: Date }> = [
    { name: 'a datetime end input', dateMode: 'range', timeMode: 'range', endKeys: '123120260530pm', to: new Date(2026, 11, 31, 17, 30) },
    { name: 'a time-only end input', dateMode: 'single', timeMode: 'range', endKeys: '0530pm', to: new Date(2026, 11, 28, 17, 30) },
    { name: 'a date-only end input', dateMode: 'range', timeMode: 'single', endKeys: '12312026', to: new Date(2026, 11, 31, 10, 45) }
  ];

  for (const { name, dateMode, timeMode, endKeys, to } of ADVANCE_CASES) {
    for (const persist of [false, true]) {
      for (const throttled of [false, true]) {
        const when = `${persist ? 'with' : 'without'} persist-mask${throttled ? ' and a throttled caret timer' : ''}`;
        it(`should move to the start of ${name} and commit the typed range ${when}`, async () => {
          const attrs: Record<string, string> = { 'value-mode': 'date', ...(persist ? { 'persist-mask': '' } : {}) };
          const { el, inputs } = await renderField({ dateMode, timeMode, attrs });
          const spy = throttled ? throttleCursorTimer() : undefined;
          try {
            await typeKeys(inputs[0], '122820261045am');
            expect(document.activeElement).toBe(inputs[1]);
            expect(inputs[1].selectionStart).toBe(0);
            expect(inputs[1].selectionEnd).toBe(0);
            await typeKeys(inputs[1], endKeys);
          } finally {
            spy?.mockRestore();
          }
          const value = el.value as IDateTimePickerRange;
          expect(value.from.getTime()).toBe(new Date(2026, 11, 28, 10, 45).getTime());
          expect(value.to.getTime()).toBe(to.getTime());
        });
      }
    }
  }

  for (const { name, dateMode, timeMode, endKeys, to } of ADVANCE_CASES) {
    for (const persist of [false, true]) {
      it(`should move to the start of ${name} and commit a range inserted as whole strings ${persist ? 'with' : 'without'} persist-mask`, async () => {
        const attrs: Record<string, string> = { 'value-mode': 'date', ...(persist ? { 'persist-mask': '' } : {}) };
        const { el, inputs } = await renderField({ dateMode, timeMode, attrs });
        await focusInput(inputs[0]);
        inputs[0].setSelectionRange(0, 0);
        insertText(inputs[0], '122820261045am');
        await wait(KEY_DELAY);
        expect(inputs[0].value).toBe('12/28/2026 10:45 AM');
        expect(document.activeElement).toBe(inputs[1]);
        expect(inputs[1].selectionStart).toBe(0);
        insertText(inputs[1], endKeys);
        await wait(KEY_DELAY);
        const value = el.value as IDateTimePickerRange;
        expect(value.from.getTime()).toBe(new Date(2026, 11, 28, 10, 45).getTime());
        expect(value.to.getTime()).toBe(to.getTime());
      });
    }
  }

  const CLICK_CASES: Array<{ name: string; dateMode?: DateTimeFieldDateMode; timeMode?: TimeMode; index: number; keys: string; expected: string }> = [
    { name: 'datetime', index: 0, keys: '12', expected: '12/DD/YYYY hh:mm aa' },
    { name: 'date-only', dateMode: 'range', index: 1, keys: '12', expected: '12/DD/YYYY' },
    { name: 'time-only', timeMode: 'range', index: 1, keys: '9', expected: '09:mm aa' }
  ];

  for (const { name, dateMode, timeMode, index, keys, expected } of CLICK_CASES) {
    for (const persist of [false, true]) {
      it(`should place the caret at the first slot when an empty ${name} input is clicked ${persist ? 'with' : 'without'} persist-mask`, async () => {
        const { inputs } = await renderField({ dateMode, timeMode, attrs: persist ? { 'persist-mask': '' } : {} });
        const input = inputs[index];
        await userEvent.click(input);
        await wait(KEY_DELAY);
        expect(input.selectionStart).toBe(0);
        await typeKeys(input, keys);
        expect(input.value).toBe(expected);
      });
    }
  }

  it('should show the 24 hour letter guide when use-24-hour-time is set', async () => {
    const { inputs } = await renderField({ attrs: { 'use-24-hour-time': '' } });
    await focusInput(inputs[0]);
    expect(inputs[0].value).toBe('MM/DD/YYYY HH:mm');
  });

  it('should show the seconds letters when allow-seconds is set', async () => {
    const { inputs } = await renderField({ attrs: { 'allow-seconds': '' } });
    await focusInput(inputs[0]);
    expect(inputs[0].value).toBe('MM/DD/YYYY hh:mm:ss aa');
  });

  it('should show typed digits followed by the remaining letters when partially typed', async () => {
    const { inputs } = await renderField();
    await typeKeys(inputs[0], '12');
    expect(inputs[0].value).toBe('12/DD/YYYY hh:mm aa');
    await typeKeys(inputs[0], '2');
    expect(inputs[0].value).toBe('12/2D/YYYY hh:mm aa');
  });

  it('should restore the letter when a typed digit is deleted with Backspace', async () => {
    const { inputs } = await renderField();
    await typeKeys(inputs[0], '122');
    await press('{Backspace}');
    expect(inputs[0].value).toBe('12/DD/YYYY hh:mm aa');
  });

  it('should not flag badInput or commit a value when the letter guide is untouched', async () => {
    const { el, inputs } = await renderField({ attrs: { 'value-mode': 'date' } });
    await focusInput(inputs[0]);
    expect(inputs[0].value).toBe(DATETIME_HINT);
    expect(el.value).toBeNull();
    expect(el.validity.badInput).toBe(false);
    await press('{Enter}');
    await blurInput(inputs[0], el);
    expect(el.value).toBeNull();
    expect(el.validity.badInput).toBe(false);
    expect(inputs[0].value).toBe('');
  });

  it('should not set a meridiem when show-mask is turned off with a partial time', async () => {
    const { el, inputs } = await renderField();
    await typeKeys(inputs[0], '010220261030');
    expect(inputs[0].value).toBe('01/02/2026 10:30 aa');
    el.showMask = false;
    await settle(el);
    expect(inputs[0].value.trimEnd()).toBe('01/02/2026 10:30');
    el.showMask = true;
    await settle(el);
    expect(inputs[0].value).toBe('01/02/2026 10:30 aa');
  });

  it('should keep focus and not coerce the start input when show-mask is turned off in a range field', async () => {
    const { el, inputs } = await renderField({ dateMode: 'range', timeMode: 'range' });
    await typeKeys(inputs[0], '010220261030');
    el.showMask = false;
    await settle(el);
    expect(document.activeElement).toBe(inputs[0]);
    expect(inputs[0].value.trimEnd()).toBe('01/02/2026 10:30');
  });

  it('should keep a typed meridiem when show-mask is turned off', async () => {
    const { el, inputs } = await renderField();
    await typeKeys(inputs[0], '010220261030a');
    el.showMask = false;
    await settle(el);
    expect(inputs[0].value).toBe('01/02/2026 10:30 AM');
  });

  it('should flag badInput when a partial value is typed over the letter guide', async () => {
    const { el, inputs } = await renderField();
    await typeKeys(inputs[0], '0102');
    expect(inputs[0].value).toBe('01/02/YYYY hh:mm aa');
    expect(el.validity.badInput).toBe(true);
  });

  it('should fill AM and commit when a is typed in the meridiem slot', async () => {
    const { el, inputs } = await renderField({ attrs: { 'value-mode': 'date' } });
    await typeKeys(inputs[0], '122820261045a');
    expect(inputs[0].value).toBe('12/28/2026 10:45 AM');
    expect((el.value as Date).getTime()).toBe(new Date(2026, 11, 28, 10, 45).getTime());
  });

  it('should fill PM and commit when p is typed in the meridiem slot', async () => {
    const { el, inputs } = await renderField({ attrs: { 'value-mode': 'date' } });
    await typeKeys(inputs[0], '122820261045p');
    expect(inputs[0].value).toBe('12/28/2026 10:45 PM');
    expect((el.value as Date).getTime()).toBe(new Date(2026, 11, 28, 22, 45).getTime());
  });

  it('should keep the value when m is typed after a filled meridiem', async () => {
    const { el, inputs } = await renderField({ attrs: { 'value-mode': 'date' } });
    await typeKeys(inputs[0], '122820261045pm');
    expect(inputs[0].value).toBe('12/28/2026 10:45 PM');
    expect((el.value as Date).getTime()).toBe(new Date(2026, 11, 28, 22, 45).getTime());
  });

  it('should replace AM with PM when p is typed over the meridiem', async () => {
    const { el, inputs } = await renderField({ attrs: { 'value-mode': 'date' } });
    await typeKeys(inputs[0], '122820261045a');
    inputs[0].setSelectionRange(17, 17);
    await typeKeys(inputs[0], 'p');
    expect(inputs[0].value).toBe('12/28/2026 10:45 PM');
    expect((el.value as Date).getTime()).toBe(new Date(2026, 11, 28, 22, 45).getTime());
  });

  it('should fill the whole meridiem when a value ending in p is pasted', async () => {
    const { el, inputs } = await renderField({ attrs: { 'value-mode': 'date' } });
    await focusInput(inputs[0]);
    inputs[0].setSelectionRange(0, 0);
    insertText(inputs[0], '122820261045p');
    await wait(KEY_DELAY);
    expect(inputs[0].value).toBe('12/28/2026 10:45 PM');
    expect((el.value as Date).getTime()).toBe(new Date(2026, 11, 28, 22, 45).getTime());
  });

  it('should fill the whole meridiem in a time-only end input', async () => {
    const { el, inputs } = await renderField({ timeMode: 'range', attrs: { 'value-mode': 'date' } });
    await typeKeys(inputs[0], '122820261045a');
    expect(document.activeElement).toBe(inputs[1]);
    await typeKeys(inputs[1], '0530p');
    expect(inputs[1].value).toBe('05:30 PM');
    expect((el.value as IDateTimePickerRange).to.getTime()).toBe(new Date(2026, 11, 28, 17, 30).getTime());
  });

  it('should move to the end input after a and land the following keys there when am is typed', async () => {
    const { el, inputs } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { 'value-mode': 'date' } });
    await typeKeys(inputs[0], '122820261045a');
    expect(document.activeElement).toBe(inputs[1]);
    expect(inputs[1].selectionStart).toBe(0);
    await typeKeys(inputs[1], 'm');
    expect(inputs[1].value).toBe(DATETIME_HINT);
    expect(inputs[1].selectionStart).toBe(0);
    await typeKeys(inputs[1], '123120260530p');
    expect(inputs[1].value).toBe('12/31/2026 05:30 PM');
    const value = el.value as IDateTimePickerRange;
    expect(value.from.getTime()).toBe(new Date(2026, 11, 28, 10, 45).getTime());
    expect(value.to.getTime()).toBe(new Date(2026, 11, 31, 17, 30).getTime());
  });

  it('should show the date letter guide on a date-only range endpoint', async () => {
    const { inputs } = await renderField({ dateMode: 'range' });
    await focusInput(inputs[0]);
    expect(inputs[1].value).toBe(DATE_HINT);
    await typeKeys(inputs[1], '12');
    expect(inputs[1].value).toBe('12/DD/YYYY');
  });

  it('should show the time letter guide on a time-only range endpoint', async () => {
    const { inputs } = await renderField({ timeMode: 'range' });
    await typeKeys(inputs[1], '9');
    expect(inputs[1].value).toBe('09:mm aa');
  });

  it('should show the 24 hour time letter guide on a time-only range endpoint', async () => {
    const { inputs } = await renderField({ timeMode: 'range', attrs: { 'use-24-hour-time': '' } });
    await focusInput(inputs[1]);
    expect(inputs[1].value).toBe('HH:mm');
  });
});

describe('DateTimeField / value and events', () => {
  it('should be null by default', async () => {
    const { el } = await renderField();
    expect(el.value).toBeNull();
  });

  it('should display a programmatic single value', async () => {
    const { el, inputs } = await renderField({ attrs: { 'value-mode': 'date' } });
    el.value = new Date(2025, 5, 12, 10, 30);
    await settle(el);
    expect(inputs[0].value).toBe('06/12/2025 10:30 AM');
  });

  it('should display a range across both datetime inputs when the mode is range by range', async () => {
    const { el, inputs } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { 'value-mode': 'date' } });
    el.value = RANGE();
    await settle(el);
    expect(inputs.map(input => input.value)).toEqual(['06/12/2025 09:00 AM', '06/15/2025 05:00 PM']);
  });

  it('should display the end date only when the mode is range by single', async () => {
    const { el, inputs } = await renderField({ dateMode: 'range', timeMode: 'single', attrs: { 'value-mode': 'date' } });
    el.value = { from: new Date(2025, 5, 9, 9, 0), to: new Date(2025, 5, 12, 9, 0) };
    await settle(el);
    expect(inputs.map(input => input.value)).toEqual(['06/09/2025 09:00 AM', '06/12/2025']);
  });

  it('should display the end time only when the mode is single by range', async () => {
    const { el, inputs } = await renderField({ timeMode: 'range', attrs: { 'value-mode': 'date' } });
    el.value = { from: new Date(2025, 5, 12, 9, 0), to: new Date(2025, 5, 12, 17, 0) };
    await settle(el);
    expect(inputs.map(input => input.value)).toEqual(['06/12/2025 09:00 AM', '05:00 PM']);
  });

  it('should display 24-hour time when use-24-hour-time is set', async () => {
    const { el, inputs } = await renderField({ attrs: { 'value-mode': 'date', 'use-24-hour-time': '' } });
    el.value = new Date(2025, 5, 12, 17, 5);
    await settle(el);
    expect(inputs[0].value).toBe('06/12/2025 17:05');
  });

  it('should clear the inputs when the value is set to null', async () => {
    const { el, inputs } = await renderField({ timeMode: 'range', attrs: { 'value-mode': 'date' } });
    el.value = { from: new Date(2025, 5, 12, 9, 0), to: new Date(2025, 5, 12, 17, 0) };
    await settle(el);
    el.value = null;
    await settle(el);
    expect(el.value).toBeNull();
    expect(inputs.map(input => input.value)).toEqual(['', '']);
  });

  it('should not dispatch a change event when the value is set programmatically', async () => {
    const { el } = await renderField({ attrs: { 'value-mode': 'date' } });
    const events = collectChanges(el);
    el.value = new Date(2025, 5, 12, 10, 30);
    await settle(el);
    expect(events.length).toBe(0);
  });

  it('should dispatch a complete change event when a quick key completes the value', async () => {
    const { el, inputs } = await renderField({ attrs: { 'value-mode': 'date' } });
    const events = collectChanges(el);
    await typeKeys(inputs[0], 'n');
    expect(events.length).toBeGreaterThan(0);
    expect(events.at(-1)!.complete).toBe(true);
    expect(events.at(-1)!.value).toBeInstanceOf(Date);
  });

  it('should dispatch an incomplete change event when a committed value is cleared', async () => {
    const { el, inputs } = await renderField({ attrs: { 'value-mode': 'date' } });
    el.value = new Date(2025, 5, 12, 10, 30);
    await settle(el);
    const events = collectChanges(el);
    await focusInput(inputs[0]);
    inputs[0].select();
    await press('{Backspace}');
    await blurInput(inputs[0], el);
    expect(el.value).toBeNull();
    expect(events.at(-1)).toEqual({ value: null, complete: false });
  });
});

describe('DateTimeField / value modes', () => {
  it('should expose a Temporal.PlainDateTime when value-mode is temporal', async () => {
    const { el } = await renderField({ attrs: { 'value-mode': 'temporal' } });
    el.value = new Date(2025, 5, 12, 10, 30);
    await settle(el);
    const value = el.value as unknown as Temporal.PlainDateTime;
    expect(value.year).toBe(2025);
    expect(value.month).toBe(6);
    expect(value.hour).toBe(10);
  });

  it('should round-trip a datetime-local string when value-mode is iso', async () => {
    const { el, inputs } = await renderField({ attrs: { 'value-mode': 'iso' } });
    el.value = '2025-06-12T10:30';
    await settle(el);
    expect(el.value).toBe('2025-06-12T10:30');
    expect(inputs[0].value).toBe('06/12/2025 10:30 AM');
  });

  it('should expose a Date when value-mode is date', async () => {
    const { el } = await renderField({ attrs: { 'value-mode': 'date' } });
    el.value = new Date(2025, 5, 12, 10, 30);
    await settle(el);
    expect(el.value).toBeInstanceOf(Date);
    expect((el.value as Date).getHours()).toBe(10);
  });

  it('should keep a same-day range when the mode is single by range', async () => {
    const { el } = await renderField({ timeMode: 'range', attrs: { 'value-mode': 'date' } });
    el.value = { from: new Date(2025, 5, 12, 9, 0), to: new Date(2025, 5, 12, 17, 0) };
    await settle(el);
    const value = el.value as IDateTimePickerRange;
    expect(value.from.getDate()).toBe(value.to.getDate());
    expect(value.from.getHours()).toBe(9);
    expect(value.to.getHours()).toBe(17);
  });

  it('should keep a two-day range when the mode is range by single', async () => {
    const { el } = await renderField({ dateMode: 'range', attrs: { 'value-mode': 'date' } });
    el.value = { from: new Date(2025, 5, 9, 9, 0), to: new Date(2025, 5, 12, 9, 0) };
    await settle(el);
    const value = el.value as IDateTimePickerRange;
    expect(value.from.getDate()).toBe(9);
    expect(value.to.getDate()).toBe(12);
    expect(el.checkValidity()).toBe(true);
  });

  it('should keep a two-day, two-time range when the mode is range by range', async () => {
    const { el } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { 'value-mode': 'date' } });
    el.value = { from: new Date(2025, 5, 9, 9, 0), to: new Date(2025, 5, 12, 17, 0) };
    await settle(el);
    const value = el.value as IDateTimePickerRange;
    expect([value.from.getDate(), value.from.getHours(), value.to.getDate(), value.to.getHours()]).toEqual([9, 9, 12, 17]);
  });
});

describe('DateTimeField / min and max', () => {
  it('should flag rangeUnderflow when the value is before min', async () => {
    const { el } = await renderField({ attrs: { 'value-mode': 'date', min: '2025-06-12T09:00' } });
    el.value = new Date(2025, 5, 12, 8, 0);
    await settle(el);
    expect(el.validity.rangeUnderflow).toBe(true);
    expect(el.validationMessage).toBe('Selected date and time is before the earliest allowed.');
    expect(el.checkValidity()).toBe(false);
  });

  it('should flag rangeOverflow when the value is after max', async () => {
    const { el } = await renderField({ attrs: { 'value-mode': 'date', max: '2025-06-12T17:00' } });
    el.value = new Date(2025, 5, 12, 18, 0);
    await settle(el);
    expect(el.validity.rangeOverflow).toBe(true);
    expect(el.validationMessage).toBe('Selected date and time is after the latest allowed.');
  });

  it('should be valid when the value is within min and max', async () => {
    const { el } = await renderField({ attrs: { 'value-mode': 'date', min: '2025-06-12T09:00', max: '2025-06-12T17:00' } });
    el.value = new Date(2025, 5, 12, 10, 0);
    await settle(el);
    expect(el.checkValidity()).toBe(true);
  });

  it('should treat a date-only min as local midnight', async () => {
    const { el } = await renderField({ attrs: { 'value-mode': 'date', min: '2025-06-12' } });
    el.value = new Date(2025, 5, 12, 0, 0);
    await settle(el);
    expect(el.validity.rangeUnderflow).toBe(false);
    el.value = new Date(2025, 5, 11, 23, 59);
    await settle(el);
    expect(el.validity.rangeUnderflow).toBe(true);
  });

  it('should flag rangeOverflow when a range end is after max', async () => {
    const { el } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { 'value-mode': 'date', max: '2025-06-13T00:00' } });
    el.value = RANGE();
    await settle(el);
    expect(el.validity.rangeOverflow).toBe(true);
  });

  it('should revalidate when min changes', async () => {
    const { el } = await renderField({ attrs: { 'value-mode': 'date' } });
    el.value = new Date(2025, 5, 12, 8, 0);
    await settle(el);
    expect(el.checkValidity()).toBe(true);
    el.min = new Date(2025, 5, 12, 9, 0);
    await settle(el);
    expect(el.validity.rangeUnderflow).toBe(true);
  });
});

describe('DateTimeField / end after start', () => {
  it('should flag customError when the end is before the start', async () => {
    const { el } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { 'value-mode': 'date' } });
    el.value = { from: new Date(2024, 5, 12, 17, 0), to: new Date(2024, 5, 9, 9, 0) };
    await settle(el);
    expect(el.validity.customError).toBe(true);
    expect(el.validationMessage).toBe('End must be after start.');
    expect(el.checkValidity()).toBe(false);
  });

  it('should flag customError when a same-day end time is before the start time', async () => {
    const { el } = await renderField({ timeMode: 'range', attrs: { 'value-mode': 'date' } });
    el.value = { from: new Date(2024, 5, 12, 17, 0), to: new Date(2024, 5, 12, 9, 0) };
    await settle(el);
    expect(el.validity.customError).toBe(true);
  });

  it('should be valid when the end is after or equal to the start', async () => {
    const { el } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { 'value-mode': 'date' } });
    el.value = { from: new Date(2024, 5, 9, 9, 0), to: new Date(2024, 5, 12, 17, 0) };
    await settle(el);
    expect(el.checkValidity()).toBe(true);
    el.value = { from: new Date(2024, 5, 12, 9, 0), to: new Date(2024, 5, 12, 9, 0) };
    await settle(el);
    expect(el.checkValidity()).toBe(true);
  });
});

describe('DateTimeField / required', () => {
  it('should update validity synchronously when the value is set', async () => {
    const { el } = await renderField({ attrs: { required: '', 'value-mode': 'date' } });
    el.value = new Date(2025, 5, 12, 10, 30);
    expect(el.checkValidity()).toBe(true);
    el.value = null;
    expect(el.validity.valueMissing).toBe(true);
  });

  it('should be invalid when required and empty, and valid once a value is set', async () => {
    const { el } = await renderField({ attrs: { required: '', 'value-mode': 'date' } });
    expect(el.validity.valueMissing).toBe(true);
    expect(el.validity.customError).toBe(false);
    expect(el.validationMessage).toBe('Please select a date and time.');
    el.value = new Date(2025, 5, 12, 10, 30);
    await settle(el);
    expect(el.checkValidity()).toBe(true);
  });

  it('should be invalid when required and no range is set', async () => {
    const { el } = await renderField({ timeMode: 'range', attrs: { required: '' } });
    expect(el.validity.valueMissing).toBe(true);
  });

  it('should be satisfied by a date alone when required-parts is date', async () => {
    const { el, picker } = await renderField({ picker: true, attrs: { required: '', 'required-parts': 'date' } });
    firePickerChange(picker!, { date: new Date(2025, 5, 12) });
    await settle(el);
    expect(el.checkValidity()).toBe(true);
  });

  it('should report time is required when required-parts is time and only a date is set', async () => {
    const { el, picker } = await renderField({ picker: true, attrs: { required: '', 'required-parts': 'time' } });
    firePickerChange(picker!, { date: new Date(2025, 5, 12) });
    await settle(el);
    expect(el.validity.valueMissing).toBe(true);
    expect(el.validationMessage).toBe('Time is required.');
  });

  it('should report date is required when only a time is set', async () => {
    const { el, picker } = await renderField({ picker: true, attrs: { required: '' } });
    firePickerChange(picker!, { time: '09:30', source: 'time' });
    await settle(el);
    expect(el.validationMessage).toBe('Date is required.');
  });

  it('should report time is required when a picker reports both range dates but no time', async () => {
    const { el, picker } = await renderField({ dateMode: 'range', picker: true, attrs: { required: '', 'value-mode': 'date' } });
    firePickerChange(picker!, { date: new Date(2026, 5, 9), dateTo: new Date(2026, 5, 12) });
    await settle(el);
    expect(el.validity.valueMissing).toBe(true);
    expect(el.validationMessage).toBe('Time is required.');
  });

  it('should report valueMissing rather than customError when only the start of a required range is filled', async () => {
    const { el, inputs } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { required: '', 'value-mode': 'date' } });
    await typeKeys(inputs[0], 't');
    await settle(el);
    expect(el.validity.valueMissing).toBe(true);
    expect(el.validity.customError).toBe(false);
  });

  it('should be valid when the start and end are filled with quick keys in a required range by single field', async () => {
    const { el, inputs } = await renderField({ dateMode: 'range', attrs: { required: '', 'value-mode': 'date' } });
    await typeKeys(inputs[0], 'n');
    await typeKeys(inputs[1], 't');
    await settle(el);
    expect(el.value).not.toBeNull();
    expect(el.checkValidity()).toBe(true);
  });
});

describe('DateTimeField / slots validity', () => {
  const SLOTS: ITimeSlot[] = [{ value: '09:00' }, { value: '10:00', disabled: true }, { value: '11:00' }];

  async function renderSlotsField(): Promise<IFieldHarness> {
    return renderField({ timeMode: 'slots', picker: true, attrs: { 'value-mode': 'date' }, configurePicker: picker => (picker.slots = SLOTS) });
  }

  it('should be valid when the value is an available slot', async () => {
    const { el } = await renderSlotsField();
    el.value = new Date(2025, 5, 12, 9, 0);
    await settle(el);
    expect(el.checkValidity()).toBe(true);
  });

  it('should flag customError when the time is not a slot', async () => {
    const { el } = await renderSlotsField();
    el.value = new Date(2025, 5, 12, 9, 30);
    await settle(el);
    expect(el.validity.customError).toBe(true);
    expect(el.validationMessage).toBe('Choose an available time.');
  });

  it('should flag customError when the slot is disabled', async () => {
    const { el } = await renderSlotsField();
    el.value = new Date(2025, 5, 12, 10, 0);
    await settle(el);
    expect(el.validity.customError).toBe(true);
  });

  it('should flag customError when the picker disables the slot for that day', async () => {
    const { el, picker } = await renderSlotsField();
    picker!.disableSlotCallback = (date, slot) => date.getDate() === 12 && slot.value === '11:00';
    el.value = new Date(2025, 5, 12, 11, 0);
    await settle(el);
    expect(el.validity.customError).toBe(true);
  });

  it('should not check slots when no picker is linked', async () => {
    const { el } = await renderField({ timeMode: 'slots', attrs: { 'value-mode': 'date' } });
    el.value = new Date(2025, 5, 12, 9, 30);
    await settle(el);
    expect(el.checkValidity()).toBe(true);
  });

  it('should use a single input and warn when date-mode is range', async () => {
    const warn = silenceWarnings();
    const { inputs } = await renderField({ dateMode: 'range', timeMode: 'slots', inputs: 2 });
    expect(warnedWith(warn, 'time-mode="slots" captures a single date')).toBe(true);
    expect(inputs[1].hasAttribute('autocomplete')).toBe(false);
  });
});

describe('DateTimeField / form association', () => {
  it('should expose its form', async () => {
    const { el, wrapper } = await renderField({ form: true });
    expect(el.form).toBe(wrapper);
  });

  it('should submit an ISO string for a single value', async () => {
    const { el, wrapper } = await renderField({ form: true, attrs: { name: 'appt', 'value-mode': 'date' } });
    const value = new Date(2025, 5, 12, 10, 30);
    el.value = value;
    await settle(el);
    const formValue = new FormData(wrapper as HTMLFormElement).get('appt');
    expect(formValue).toBe(value.toISOString());
  });

  it('should submit the value when name is set as a property', async () => {
    const { el, wrapper } = await renderField({ form: true, attrs: { 'value-mode': 'date' } });
    el.name = 'appt';
    const value = new Date(2025, 5, 12, 10, 30);
    el.value = value;
    await settle(el);
    expect(new FormData(wrapper as HTMLFormElement).get('appt')).toBe(value.toISOString());
  });

  it('should be valid when disabled even if required and empty', async () => {
    const { el } = await renderField({ attrs: { required: '' } });
    expect(el.checkValidity()).toBe(false);
    el.disabled = true;
    await settle(el);
    expect(el.checkValidity()).toBe(true);
  });

  it('should submit nothing when empty', async () => {
    const { wrapper } = await renderField({ form: true, attrs: { name: 'appt' } });
    expect(new FormData(wrapper as HTMLFormElement).has('appt')).toBe(false);
  });

  it('should submit .from and .to entries for a range', async () => {
    const { el, wrapper } = await renderField({ form: true, dateMode: 'range', timeMode: 'range', attrs: { name: 'appt', 'value-mode': 'date' } });
    const range = RANGE();
    el.value = range;
    await settle(el);
    const data = new FormData(wrapper as HTMLFormElement);
    expect(data.get('appt.from')).toBe(range.from.toISOString());
    expect(data.get('appt.to')).toBe(range.to.toISOString());
  });

  it('should not submit the slotted inputs', async () => {
    const { el, wrapper } = await renderField({ form: true, attrs: { name: 'appt', 'value-mode': 'date' } });
    el.value = new Date(2025, 5, 12, 10, 30);
    await settle(el);
    expect(Array.from(new FormData(wrapper as HTMLFormElement).keys())).toEqual(['appt']);
  });

  it('should clear the value and inputs when the form is reset', async () => {
    const { el, inputs, wrapper } = await renderField({ form: true, timeMode: 'range', attrs: { name: 'appt', 'value-mode': 'date' } });
    el.value = { from: new Date(2025, 5, 12, 9, 0), to: new Date(2025, 5, 12, 17, 0) };
    await settle(el);
    (wrapper as HTMLFormElement).reset();
    await settle(el);
    expect(el.value).toBeNull();
    expect(inputs.map(input => input.value)).toEqual(['', '']);
    expect(new FormData(wrapper as HTMLFormElement).has('appt.from')).toBe(false);
  });

  it('should clear the linked picker when the form is reset', async () => {
    const { el, picker, wrapper } = await renderField({ form: true, picker: true, attrs: { name: 'appt', 'value-mode': 'date' } });
    el.value = new Date(2025, 5, 12, 10, 30);
    await settle(el, picker);
    (wrapper as HTMLFormElement).reset();
    await settle(el, picker);
    expect(picker!.value).toBeNull();
  });

  it('should restore a single value from a string state', async () => {
    const { el, inputs } = await renderField({ attrs: { 'value-mode': 'iso' } });
    el.formStateRestoreCallback('2025-06-12T10:30');
    await settle(el);
    expect(el.value).toBe('2025-06-12T10:30');
    expect(inputs[0].value).toBe('06/12/2025 10:30 AM');
  });

  it('should restore a range from form data state', async () => {
    const { el } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { name: 'appt', 'value-mode': 'date' } });
    const state = new FormData();
    state.append('appt.from', new Date(2025, 5, 9, 9, 0).toISOString());
    state.append('appt.to', new Date(2025, 5, 12, 17, 0).toISOString());
    el.formStateRestoreCallback(state);
    await settle(el);
    const value = el.value as IDateTimePickerRange;
    expect(value.from.getDate()).toBe(9);
    expect(value.to.getDate()).toBe(12);
  });

  it('should ignore a null restore state', async () => {
    const { el } = await renderField({ attrs: { 'value-mode': 'date' } });
    el.value = new Date(2025, 5, 12, 10, 30);
    el.formStateRestoreCallback(null);
    await settle(el);
    expect(el.value).not.toBeNull();
  });
});

describe('DateTimeField / quick keys', () => {
  it('should set the current date and time when n is pressed', async () => {
    const { el, inputs } = await renderField({ attrs: { 'value-mode': 'date' } });
    await typeKeys(inputs[0], 'n');
    const value = el.value as Date;
    const now = new Date();
    expect(value).toBeInstanceOf(Date);
    expect([value.getFullYear(), value.getMonth(), value.getDate()]).toEqual([now.getFullYear(), now.getMonth(), now.getDate()]);
  });

  it('should keep a typed date and fill the time when n is pressed', async () => {
    const { el, inputs } = await renderField({ attrs: { 'value-mode': 'date' } });
    el.value = new Date(2020, 0, 2, 3, 4);
    await settle(el);
    await typeKeys(inputs[0], 'n');
    const value = el.value as Date;
    expect([value.getFullYear(), value.getMonth(), value.getDate()]).toEqual([2020, 0, 2]);
  });

  it('should fill only the date with today when t is pressed', async () => {
    const { el, inputs } = await renderField({ attrs: { 'value-mode': 'date' } });
    await typeKeys(inputs[0], 't');
    const today = new Date();
    const expected = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;
    expect(inputs[0].value.startsWith(expected)).toBe(true);
    expect(el.value).toBeNull();
  });

  it('should fill a time-only end input with the current time when n is pressed', async () => {
    const { inputs } = await renderField({ timeMode: 'range' });
    await typeKeys(inputs[1], 'n');
    expect(inputs[1].value).toMatch(/^\d{2}:\d{2} (AM|PM)$/);
  });

  it('should ignore t in a time-only end input', async () => {
    const { inputs } = await renderField({ timeMode: 'range' });
    await typeKeys(inputs[1], 't');
    expect(inputs[1].value).not.toMatch(/\d/);
  });

  it('should fill a date-only end input with today when t is pressed', async () => {
    const { inputs } = await renderField({ dateMode: 'range' });
    await typeKeys(inputs[1], 't');
    expect(inputs[1].value).toContain(String(new Date().getFullYear()));
  });

  it('should ignore quick keys when readonly', async () => {
    const { el, inputs } = await renderField({ attrs: { readonly: '' } });
    await typeKeys(inputs[0], 'n');
    expect(el.value).toBeNull();
  });
});

describe('DateTimeField / keyboard navigation', () => {
  it('should move to the end of the start input when Backspace is pressed at the start of the end input', async () => {
    const { el, inputs } = await renderField({ timeMode: 'range', attrs: { 'value-mode': 'date' } });
    el.value = { from: new Date(2025, 5, 12, 9, 0), to: new Date(2025, 5, 12, 17, 0) };
    await settle(el);
    await focusInput(inputs[1]);
    inputs[1].setSelectionRange(0, 0);
    await press('{Backspace}');
    expect(document.activeElement).toBe(inputs[0]);
    expect(inputs[0].selectionStart).toBe(inputs[0].value.length);
    expect(inputs[1].value).toBe('05:00 PM');
  });

  it('should move to the start input when ArrowLeft is pressed at the start of the end input', async () => {
    const { inputs } = await renderField({ dateMode: 'range', timeMode: 'range' });
    await focusInput(inputs[1]);
    inputs[1].setSelectionRange(0, 0);
    await press('{ArrowLeft}');
    expect(document.activeElement).toBe(inputs[0]);
  });

  it('should not move focus when ArrowLeft is pressed mid-input', async () => {
    const { inputs } = await renderField({ dateMode: 'range', timeMode: 'range' });
    await focusInput(inputs[1]);
    inputs[1].setSelectionRange(2, 2);
    await press('{ArrowLeft}');
    expect(document.activeElement).toBe(inputs[1]);
  });

  it('should not move focus when Shift+ArrowLeft is pressed at the start of the end input', async () => {
    const { inputs } = await renderField({ dateMode: 'range', timeMode: 'range' });
    await focusInput(inputs[1]);
    inputs[1].setSelectionRange(0, 0);
    await press('{Shift>}{ArrowLeft}{/Shift}');
    expect(document.activeElement).toBe(inputs[1]);
  });

  it('should move to the start of the end input when ArrowRight is pressed at the end of the start input', async () => {
    const { el, inputs } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { 'value-mode': 'date' } });
    el.value = RANGE();
    await settle(el);
    await focusInput(inputs[0]);
    const end = inputs[0].value.length;
    inputs[0].setSelectionRange(end, end);
    await press('{ArrowRight}');
    expect(document.activeElement).toBe(inputs[1]);
    expect(inputs[1].selectionStart).toBe(0);
  });

  it('should not move focus when ArrowLeft is pressed at the start of the only input', async () => {
    const { inputs } = await renderField();
    await focusInput(inputs[0]);
    inputs[0].setSelectionRange(0, 0);
    await press('{ArrowLeft}');
    expect(document.activeElement).toBe(inputs[0]);
  });

  it('should advance to the end input when a quick key completes the start input', async () => {
    const { inputs } = await renderField({ dateMode: 'range', timeMode: 'range' });
    await typeKeys(inputs[0], 'n');
    expect(document.activeElement).toBe(inputs[1]);
  });
});

describe('DateTimeField / typing', () => {
  it('should commit a value when a complete date and time is typed', async () => {
    const { el, inputs } = await renderField({ attrs: { 'value-mode': 'date' } });
    const events = collectChanges(el);
    await typeKeys(inputs[0], '01022025930am');
    expect(inputs[0].value).toBe('01/02/2025 09:30 AM');
    expect((el.value as Date).getTime()).toBe(new Date(2025, 0, 2, 9, 30).getTime());
    expect(events.at(-1)!.complete).toBe(true);
  });

  it('should flag badInput when a date is typed but the time is left blank', async () => {
    const { el, inputs } = await renderField();
    await typeKeys(inputs[0], '01022025');
    expect(el.validity.badInput).toBe(true);
    expect(el.validationMessage).toBe('Please enter a complete date and time.');
    expect(el.checkValidity()).toBe(false);
  });

  it('should flag badInput for a partial year', async () => {
    const { el, inputs } = await renderField();
    await typeKeys(inputs[0], '0102');
    expect(el.validity.badInput).toBe(true);
  });

  it('should not flag badInput when untouched and not required', async () => {
    const { el } = await renderField();
    expect(el.validity.badInput).toBe(false);
    expect(el.checkValidity()).toBe(true);
  });

  it('should clear badInput once n completes the value', async () => {
    const { el, inputs } = await renderField();
    await typeKeys(inputs[0], '01022025');
    expect(el.validity.badInput).toBe(true);
    await typeKeys(inputs[0], 'n');
    expect(el.validity.badInput).toBe(false);
    expect(el.checkValidity()).toBe(true);
  });

  it('should not coerce a partial date while typing', async () => {
    const { inputs } = await renderField();
    await typeKeys(inputs[0], '0102');
    expect(inputs[0].value.startsWith('01/02/')).toBe(true);
    expect(inputs[0].value).not.toContain('20');
  });

  it('should complete a two-digit year on blur', async () => {
    const { el, inputs } = await renderField();
    await typeKeys(inputs[0], '010225');
    await blurInput(inputs[0], el);
    expect(inputs[0].value.startsWith('01/02/2025')).toBe(true);
  });

  it('should commit on Enter', async () => {
    const { el, inputs } = await renderField({ attrs: { 'value-mode': 'date' } });
    await typeKeys(inputs[0], '010225');
    await press('{Enter}');
    await settle(el);
    expect(inputs[0].value.startsWith('01/02/2025')).toBe(true);
  });

  it('should advance to the end input once the start datetime is typed in full', async () => {
    const { inputs } = await renderField({ dateMode: 'range', timeMode: 'range' });
    await typeKeys(inputs[0], '01022025930am');
    expect(document.activeElement).toBe(inputs[1]);
  });

  it('should commit a range typed across both datetime inputs', async () => {
    const { el, textField, inputs } = await renderField({ dateMode: 'range', timeMode: 'range', attrs: { 'value-mode': 'date' } });
    await typeKeys(inputs[0], '01022025930am');
    await typeKeys(inputs[1], '01052025500pm');
    await blurInput(inputs[1], el);
    const value = el.value as IDateTimePickerRange;
    expect(value.from.getTime()).toBe(new Date(2025, 0, 2, 9, 30).getTime());
    expect(value.to.getTime()).toBe(new Date(2025, 0, 5, 17, 0).getTime());
    expect(getSupportText(textField, 'support-text-end').length).toBe(1);
  });

  it('should share the start time when an end date is typed in range by single mode', async () => {
    const { el, inputs } = await renderField({ dateMode: 'range', attrs: { 'value-mode': 'date' } });
    el.value = { from: new Date(2025, 0, 2, 9, 30), to: new Date(2025, 0, 2, 9, 30) };
    await settle(el);
    await focusInput(inputs[1]);
    inputs[1].select();
    await typeKeys(inputs[1], '01052025');
    await blurInput(inputs[1], el);
    const value = el.value as IDateTimePickerRange;
    expect(value.to.getTime()).toBe(new Date(2025, 0, 5, 9, 30).getTime());
  });

  it('should complete a two-digit year in a date-only input on blur', async () => {
    const { el, inputs } = await renderField({ dateMode: 'range' });
    await typeKeys(inputs[1], '010225');
    await blurInput(inputs[1], el);
    expect(inputs[1].value).toBe('01/02/2025');
  });

  it('should clamp an out-of-range day in a date-only input on blur', async () => {
    const { el, inputs } = await renderField({ dateMode: 'range' });
    await typeKeys(inputs[1], '02302025');
    await blurInput(inputs[1], el);
    expect(inputs[1].value).toBe('02/28/2025');
  });

  it('should complete an hour-only time in a time-only input on blur', async () => {
    const { el, inputs } = await renderField({ timeMode: 'range' });
    await typeKeys(inputs[1], '5');
    await blurInput(inputs[1], el);
    expect(inputs[1].value).toBe('05:00 AM');
  });

  it('should share the start date when an end time is typed in single by range mode', async () => {
    const { el, inputs } = await renderField({ timeMode: 'range', attrs: { 'value-mode': 'date' } });
    el.value = { from: new Date(2025, 0, 2, 9, 30), to: new Date(2025, 0, 2, 10, 0) };
    await settle(el);
    await focusInput(inputs[1]);
    inputs[1].select();
    await typeKeys(inputs[1], '500pm');
    await blurInput(inputs[1], el);
    const value = el.value as IDateTimePickerRange;
    expect(value.to.getTime()).toBe(new Date(2025, 0, 2, 17, 0).getTime());
  });
});

describe('DateTimeField / picker link', () => {
  it('should anchor the picker to the text field popover target', async () => {
    const { el, textField, picker } = await renderField({ picker: true });
    expect(el.pickerElement).toBe(picker);
    expect(picker!.anchorElement).toBe(textField.popoverTargetElement);
    expect(getPopover(picker!)).not.toBeNull();
  });

  it('should link to a picker that connects after the field', async () => {
    const { el, textField, wrapper } = await renderField();
    el.picker = 'late-picker';
    expect(el.pickerElement).toBeNull();
    const picker = document.createElement('forge-date-time-picker');
    picker.id = 'late-picker';
    wrapper.append(picker);
    await settle(el, picker);
    expect(el.pickerElement).toBe(picker);
    expect(picker.anchorElement).toBe(textField.popoverTargetElement);
    expect(getToggle(textField)).not.toBeNull();
  });

  it('should warn and stay unlinked when the picker id does not resolve', async () => {
    const warn = silenceWarnings();
    const { el, textField } = await renderField();
    el.picker = 'nonexistent';
    await settle(el);
    expect(el.pickerElement).toBeNull();
    expect(getToggle(textField)).toBeNull();
    expect(warnedWith(warn, 'picker "nonexistent" not found')).toBe(true);
  });

  it('should relink when the picker id changes', async () => {
    const { el, wrapper, picker: first } = await renderField({ picker: true });
    const second = document.createElement('forge-date-time-picker');
    second.id = 'second-picker';
    wrapper.append(second);
    await settle(second);
    el.picker = 'second-picker';
    await settle(el, first, second);
    expect(el.pickerElement).toBe(second);
    expect(first!.anchorElement).toBeNull();
    expect(second.anchorElement).not.toBeNull();
  });

  it('should close the old picker when it is unlinked while open', async () => {
    const { el, wrapper, picker: first } = await renderField({ picker: true });
    const second = document.createElement('forge-date-time-picker');
    wrapper.append(second);
    el.open = true;
    await settle(el, first);
    expect(first!.open).toBe(true);
    el.pickerElement = second;
    await settle(el, first, second);
    expect(first!.open).toBe(false);
    expect(el.open).toBe(false);
  });

  it('should relink to a fresh picker that replaced a stale one with the same id', async () => {
    const { el, textField, picker: stale } = await renderField({ picker: true });
    const fresh = document.createElement('forge-date-time-picker');
    fresh.id = stale!.id;
    stale!.replaceWith(fresh);
    el.persistent = true;
    await settle(el, fresh);
    expect(el.pickerElement).toBe(fresh);
    expect(fresh.anchorElement).toBe(textField.popoverTargetElement);
  });

  it('should start closed and stay usable after being reconnected while open', async () => {
    const { el, textField, wrapper, picker } = await renderField({ picker: true });
    getToggle(textField)!.click();
    await settle(el, picker);
    expect(el.open).toBe(true);
    el.remove();
    wrapper.prepend(el);
    await settle(el, picker);
    expect(el.open).toBe(false);
    expect(picker!.open).toBe(false);
    expect(picker!.anchorElement).toBe(textField.popoverTargetElement);
    getToggle(textField)!.click();
    await settle(el, picker);
    expect(el.open).toBe(true);
  });

  it('should release the picker anchor when the field is disconnected', async () => {
    const { el, picker } = await renderField({ picker: true });
    el.remove();
    await settle(picker);
    expect(picker!.anchorElement).toBeNull();
  });

  it('should forward its configuration to the picker', async () => {
    const { el, picker } = await renderField({
      picker: true,
      pickerAttrs: { 'time-mode': 'single' },
      attrs: { 'value-mode': 'iso', 'use-24-hour-time': '', persistent: '', 'popover-placement': 'top-end' }
    });
    silenceWarnings();
    el.timeMode = 'range';
    await settle(el, picker);
    expect(picker!.valueMode).toBe('iso');
    expect(picker!.use24HourTime).toBe(true);
    expect(picker!.persistent).toBe(true);
    expect(picker!.placement).toBe('top-end');
    el.readonly = true;
    await settle(el, picker);
    expect(picker!.readonly).toBe(true);
  });

  it('should forward min and max to the picker', async () => {
    const { picker } = await renderField({ picker: true, attrs: { min: '2025-06-01T00:00', max: '2025-06-30T00:00' } });
    expect(picker!.min).toBeTruthy();
    expect(picker!.max).toBeTruthy();
  });

  it('should warn when the time modes disagree', async () => {
    const warn = silenceWarnings();
    await renderField({ timeMode: 'single', picker: true, pickerAttrs: { 'time-mode': 'range' } });
    expect(warnedWith(warn, 'time-mode mismatch')).toBe(true);
  });

  it('should warn when the date modes disagree', async () => {
    const warn = silenceWarnings();
    await renderField({ dateMode: 'range', picker: true, pickerAttrs: { 'date-mode': 'single' } });
    expect(warnedWith(warn, 'date-mode mismatch')).toBe(true);
  });

  it('should warn when 24-hour time or seconds disagree', async () => {
    const warn = silenceWarnings();
    await renderField({ picker: true, attrs: { 'use-24-hour-time': '', 'allow-seconds': '' } });
    expect(warnedWith(warn, 'use-24-hour-time mismatch')).toBe(true);
    expect(warnedWith(warn, 'allow-seconds mismatch')).toBe(true);
  });

  it('should not warn when the modes match', async () => {
    const warn = silenceWarnings();
    await renderField({ dateMode: 'range', timeMode: 'range', picker: true });
    expect(warnedWith(warn, 'mismatch')).toBe(false);
  });
});

describe('DateTimeField / picker value sync', () => {
  it('should push a programmatic value to the picker', async () => {
    const { el, picker } = await renderField({ picker: true, attrs: { 'value-mode': 'date' }, pickerAttrs: { 'value-mode': 'date' } });
    el.value = new Date(2025, 5, 12, 10, 30);
    await settle(el, picker);
    expect((picker!.value as Date).getHours()).toBe(10);
  });

  it('should push an existing value to a picker linked by element reference', async () => {
    const { el, wrapper } = await renderField({ attrs: { 'value-mode': 'date' } });
    el.value = new Date(2025, 5, 12, 10, 30);
    await settle(el);
    const picker = document.createElement('forge-date-time-picker');
    wrapper.append(picker);
    el.pickerElement = picker;
    await settle(el, picker);
    await settle(el, picker);
    expect((picker.value as Date).getHours()).toBe(10);
  });

  it('should forward a range value to a picker whose modes differed', async () => {
    silenceWarnings();
    const { el, picker } = await renderField({ dateMode: 'range', picker: true, pickerAttrs: { 'date-mode': 'single' }, attrs: { 'value-mode': 'date' } });
    el.value = { from: new Date(2026, 5, 9, 9, 0), to: new Date(2026, 5, 12, 9, 0) };
    await settle(el, picker);
    const value = picker!.value as IDateTimePickerRange | null;
    expect(value).not.toBeNull();
    expect(value!.from.getDate()).toBe(9);
    expect(value!.to.getDate()).toBe(12);
  });

  it('should push a quick-key value to the picker while closed', async () => {
    const { el, inputs, picker } = await renderField({ picker: true, attrs: { 'value-mode': 'date' } });
    await typeKeys(inputs[0], 'n');
    await settle(el, picker);
    expect(picker!.value).not.toBeNull();
  });

  it('should take the value from a complete picker change and dispatch one change event', async () => {
    const { el, inputs, picker } = await renderField({ picker: true, attrs: { 'value-mode': 'date' } });
    const events = collectChanges(el);
    firePickerChange(picker!, { value: new Date(2025, 5, 12, 9, 30), date: new Date(2025, 5, 12), time: '09:30', source: 'time', complete: true });
    await settle(el);
    expect(events.length).toBe(1);
    expect(events[0].complete).toBe(true);
    expect((el.value as Date).getHours()).toBe(9);
    expect(inputs[0].value).toBe('06/12/2025 09:30 AM');
  });

  it('should display a complete range change across both inputs', async () => {
    const { el, inputs, picker } = await renderField({ dateMode: 'range', timeMode: 'range', picker: true, attrs: { 'value-mode': 'date' } });
    const events = collectChanges(el);
    firePickerChange(picker!, { value: { from: new Date(2026, 5, 9, 9, 0), to: new Date(2026, 5, 12, 17, 0) }, source: 'date', complete: true });
    await settle(el);
    expect(events.length).toBe(1);
    expect(inputs.map(input => input.value)).toEqual(['06/09/2026 09:00 AM', '06/12/2026 05:00 PM']);
  });

  it('should show the range start date when only the first date is picked', async () => {
    const { el, inputs, picker } = await renderField({ dateMode: 'range', timeMode: 'single', picker: true, attrs: { 'value-mode': 'date' } });
    firePickerChange(picker!, { date: new Date(2026, 5, 9), time: '09:00', source: 'date' });
    await settle(el);
    expect(el.value).toBeNull();
    expect(inputs[0].value).toBe('06/09/2026 09:00 AM');
    expect(inputs[1].value).toBe(DATE_HINT);
  });

  it('should show a picked date before a time is chosen', async () => {
    const { el, inputs, picker } = await renderField({ picker: true, attrs: { 'value-mode': 'date' } });
    firePickerChange(picker!, { date: new Date(2026, 5, 9), source: 'date' });
    await settle(el);
    expect(el.value).toBeNull();
    expect(inputs[0].value.startsWith('06/09/2026')).toBe(true);
  });

  it('should replace the previous range with a new start date when one is picked', async () => {
    const { el, inputs, picker } = await renderField({ dateMode: 'range', timeMode: 'range', picker: true, attrs: { 'value-mode': 'date' } });
    el.value = { from: new Date(2026, 5, 1, 9, 0), to: new Date(2026, 5, 3, 17, 0) };
    await settle(el, picker);
    firePickerChange(picker!, { date: new Date(2026, 5, 20), from: '09:00', to: '17:00', source: 'date' });
    await settle(el);
    expect(inputs[0].value).toBe('06/20/2026 09:00 AM');
    expect(inputs[1].value.startsWith('06/03')).toBe(false);
  });

  it('should ignore a mode-change picker event', async () => {
    const { el, picker } = await renderField({ picker: true, attrs: { 'value-mode': 'date' } });
    el.value = new Date(2025, 5, 12, 10, 30);
    await settle(el, picker);
    const events = collectChanges(el);
    firePickerChange(picker!, { source: 'mode-change' });
    await settle(el);
    expect(events.length).toBe(0);
    expect(el.value).not.toBeNull();
  });

  it('should ignore picker changes while readonly', async () => {
    const { el, picker } = await renderField({ picker: true, attrs: { readonly: '' } });
    firePickerChange(picker!, { value: new Date(2025, 5, 12, 9, 30), source: 'time', complete: true });
    await settle(el);
    expect(el.value).toBeNull();
  });

  it('should clear the inputs when the picker is cleared', async () => {
    const { el, inputs, picker } = await renderField({ picker: true, attrs: { 'value-mode': 'date' } });
    el.value = new Date(2025, 5, 12, 10, 30);
    await settle(el, picker);
    firePickerChange(picker!, { source: 'clear' });
    await settle(el);
    expect(el.value).toBeNull();
    expect(inputs[0].value).toBe('');
  });
});

describe('DateTimeField / popover', () => {
  it('should open the picker popover when the toggle is clicked and close it on a second click', async () => {
    const { el, textField, picker } = await renderField({ picker: true });
    const opens = countEvents(el, 'forge-date-time-field-open');
    const closes = countEvents(el, 'forge-date-time-field-close');
    getToggle(textField)!.click();
    await settle(el, picker);
    expect(el.open).toBe(true);
    expect(picker!.open).toBe(true);
    expect(getPopover(picker!)!.open).toBe(true);
    expect(opens.length).toBe(1);
    getToggle(textField)!.click();
    await settle(el, picker);
    expect(el.open).toBe(false);
    expect(picker!.open).toBe(false);
    expect(closes.length).toBe(1);
  });

  it('should keep focus in the input when the toggle is clicked', async () => {
    const { el, textField, inputs, picker } = await renderField({ picker: true });
    await focusInput(inputs[0]);
    await userEvent.click(getToggle(textField)!);
    await settle(el, picker);
    expect(picker!.open).toBe(true);
    expect(document.activeElement).toBe(inputs[0]);
  });

  it('should open the picker when ArrowDown is pressed in an input', async () => {
    const { el, inputs, picker } = await renderField({ timeMode: 'range', picker: true });
    await focusInput(inputs[1]);
    await press('{ArrowDown}');
    await settle(el, picker);
    expect(el.open).toBe(true);
    expect(picker!.open).toBe(true);
  });

  it('should move focus into the picker when ArrowDown opens it', async () => {
    const { el, inputs, picker } = await renderField({ picker: true });
    await focusInput(inputs[0]);
    await press('{ArrowDown}');
    await settle(el, picker);
    expect(picker!.open).toBe(true);
    await vi.waitFor(() => expect(picker!.matches(':focus-within')).toBe(true));
  });

  it('should return focus to the first input when a complete selection closes the picker', async () => {
    const { el, inputs, picker } = await renderField({ picker: true, attrs: { 'value-mode': 'date' } });
    await focusInput(inputs[0]);
    await press('{ArrowDown}');
    await settle(el, picker);
    await vi.waitFor(() => expect(picker!.matches(':focus-within')).toBe(true));
    firePickerChange(picker!, { value: new Date(2025, 5, 12, 9, 0), date: new Date(2025, 5, 12), time: '09:00', complete: true });
    await settle(el, picker);
    expect(picker!.open).toBe(false);
    expect(document.activeElement).toBe(inputs[0]);
  });

  it('should not open on ArrowDown when no picker is linked', async () => {
    const { el, inputs } = await renderField();
    await focusInput(inputs[0]);
    await press('{ArrowDown}');
    await settle(el);
    expect(el.open).toBe(false);
  });

  it('should open and close the picker through the open property', async () => {
    const { el, picker } = await renderField({ picker: true });
    const opens = countEvents(el, 'forge-date-time-field-open');
    el.open = true;
    await settle(el, picker);
    expect(picker!.open).toBe(true);
    expect(el.matches(':state(open)')).toBe(true);
    expect(opens.length).toBe(1);
    el.open = false;
    await settle(el, picker);
    expect(picker!.open).toBe(false);
  });

  it('should close with one close event when a complete picker change arrives', async () => {
    const { el, picker } = await renderField({ picker: true, attrs: { 'value-mode': 'date' } });
    el.open = true;
    await settle(el, picker);
    const closes = countEvents(el, 'forge-date-time-field-close');
    firePickerChange(picker!, { value: new Date(2025, 5, 12, 9, 30), date: new Date(2025, 5, 12), time: '09:30', source: 'time', complete: true });
    await settle(el, picker);
    expect(picker!.open).toBe(false);
    expect(el.open).toBe(false);
    expect(closes.length).toBe(1);
  });

  it('should stay open when an incomplete picker change arrives', async () => {
    const { el, picker } = await renderField({ picker: true });
    el.open = true;
    await settle(el, picker);
    firePickerChange(picker!, { date: new Date(2025, 5, 12) });
    await settle(el, picker);
    expect(el.open).toBe(true);
  });

  it('should push a typed value to the picker while it is open', async () => {
    const { el, inputs, picker } = await renderField({ picker: true, attrs: { 'value-mode': 'date' } });
    el.open = true;
    await settle(el, picker);
    await typeKeys(inputs[0], '022020221050pm');
    await settle(el, picker);
    expect(el.open).toBe(true);
    expect((picker!.value as Date).getTime()).toBe(new Date(2022, 1, 20, 22, 50).getTime());
  });

  it('should show a picker selection in the input while the input keeps focus', async () => {
    const { el, inputs, picker } = await renderField({ picker: true, attrs: { 'value-mode': 'date' } });
    el.open = true;
    await settle(el, picker);
    await focusInput(inputs[0]);
    firePickerChange(picker!, { value: new Date(2026, 5, 9, 9, 0), date: new Date(2026, 5, 9), time: '09:00', source: 'time', complete: true });
    expect(inputs[0].value).toBe('06/09/2026 09:00 AM');
    await settle(el, picker);
    inputs[0].blur();
    await settle(el, picker);
    expect((el.value as Date).getTime()).toBe(new Date(2026, 5, 9, 9, 0).getTime());
  });

  it('should stay open after a complete change in range modes', async () => {
    const { el, picker } = await renderField({ dateMode: 'range', timeMode: 'range', picker: true, attrs: { 'value-mode': 'date' } });
    el.open = true;
    await settle(el, picker);
    firePickerChange(picker!, { value: { from: new Date(2026, 5, 9, 9, 0), to: new Date(2026, 5, 12, 17, 0) }, source: 'date', complete: true });
    await settle(el, picker);
    expect(el.open).toBe(true);
  });

  it('should report bad input for an unfinished picker range after the picker closes', async () => {
    const { el, picker } = await renderField({ dateMode: 'range', picker: true, attrs: { 'value-mode': 'date' } });
    el.open = true;
    await settle(el, picker);
    firePickerChange(picker!, { date: new Date(2026, 5, 9), time: '09:00', source: 'date' });
    await settle(el, picker);
    expect(el.validity.badInput).toBe(false);
    picker!.open = false;
    await settle(el, picker);
    expect(el.validity.badInput).toBe(true);
  });

  it('should close when the picker closes itself', async () => {
    const { el, picker } = await renderField({ picker: true });
    el.open = true;
    await settle(el, picker);
    const closes = countEvents(el, 'forge-date-time-field-close');
    picker!.open = false;
    await settle(el, picker);
    expect(el.open).toBe(false);
    expect(closes.length).toBe(1);
  });

  it('should close when the popover is dismissed with Escape', async () => {
    const { el, inputs, picker } = await renderField({ picker: true });
    await focusInput(inputs[0]);
    el.open = true;
    await settle(el, picker);
    await press('{Escape}');
    await expect.poll(() => picker!.open).toBe(false);
    await settle(el, picker);
    expect(el.open).toBe(false);
  });

  it('should not open when disabled', async () => {
    const { el, textField, picker } = await renderField({ picker: true, attrs: { disabled: '' } });
    el.open = true;
    await settle(el, picker);
    expect(picker!.open).toBe(false);
    getToggle(textField)!.click();
    await settle(el, picker);
    expect(picker!.open).toBe(false);
  });

  it('should not open when readonly', async () => {
    const { el, textField, picker } = await renderField({ picker: true, attrs: { readonly: '' } });
    getToggle(textField)!.click();
    await settle(el, picker);
    expect(picker!.open).toBe(false);
  });

  it('should disable and close the picker when the field becomes disabled', async () => {
    const { el, picker } = await renderField({ picker: true });
    el.open = true;
    await settle(el, picker);
    el.disabled = true;
    await settle(el, picker);
    expect(picker!.disabled).toBe(true);
    expect(picker!.open).toBe(false);
    expect(el.open).toBe(false);
  });
});

describe('DateTimeField / review fixes', () => {
  it('should mark picker-linked inputs as comboboxes so aria-expanded is valid', async () => {
    const { el, inputs } = await renderField({ timeMode: 'range', picker: true });
    inputs.forEach(input => {
      expect(input.getAttribute('role')).toBe('combobox');
      expect(input.getAttribute('aria-expanded')).toBe('false');
    });
    el.picker = '';
    await settle(el);
    inputs.forEach(input => {
      expect(input.hasAttribute('role')).toBe(false);
      expect(input.hasAttribute('aria-expanded')).toBe(false);
    });
  });

  it('should describe the inputs with the injected validation message', async () => {
    const { el, textField, inputs } = await renderField({ timeMode: 'range', attrs: { required: '' } });
    el.reportValidity();
    await settle(el);
    const [message] = getSupportText(textField, 'support-text');
    expect(message.id).toBeTruthy();
    inputs.forEach(input => expect(input.getAttribute('aria-describedby')?.split(' ')).toContain(message.id));
  });

  it('should keep an authored aria-describedby alongside the validation message', async () => {
    const { el, textField, inputs } = await renderField({ attrs: { required: '' }, inputAttrs: [{ 'aria-describedby': 'hint' }] });
    el.reportValidity();
    await settle(el);
    const [message] = getSupportText(textField, 'support-text');
    expect(inputs[0].getAttribute('aria-describedby')).toBe(`hint ${message.id}`);
    el.required = false;
    el.value = null;
    await settle(el);
    expect(inputs[0].getAttribute('aria-describedby')).toBe('hint');
  });

  it('should keep the picker open when the input is clicked', async () => {
    const { el, textField, inputs, picker } = await renderField({ picker: true });
    getToggle(textField)!.click();
    await settle(el, picker);
    await userEvent.click(inputs[0]);
    await wait(100);
    await settle(el, picker);
    expect(picker!.open).toBe(true);
    expect(el.open).toBe(true);
  });

  it('should close the picker when clicking outside the text field', async () => {
    const { el, textField, picker, wrapper } = await renderField({ picker: true });
    const outside = document.createElement('button');
    outside.textContent = 'Outside';
    outside.style.cssText = 'position: fixed; right: 0; bottom: 0;';
    wrapper.append(outside);
    getToggle(textField)!.click();
    await settle(el, picker);
    await userEvent.click(outside);
    await vi.waitFor(() => expect(picker!.open).toBe(false));
    expect(el.open).toBe(false);
  });

  it('should respect a placeholder the consumer changes after attach', async () => {
    const { el, inputs } = await renderField({ labelPosition: 'block-start' });
    inputs[0].setAttribute('placeholder', 'Pick a time');
    el.requestUpdate();
    await settle(el);
    await focusInput(inputs[0]);
    await settle(el);
    expect(inputs[0].getAttribute('placeholder')).toBe('Pick a time');
  });

  it('should not reset an invalid state the consumer set on the text field', async () => {
    const { el, textField } = await renderField();
    textField.invalid = true;
    el.requestUpdate();
    await settle(el);
    expect(textField.invalid).toBe(true);
  });

  it('should leave quick keys alone in an input the current mode does not use', async () => {
    const { el, inputs } = await renderField({ timeMode: 'range' });
    el.timeMode = 'single';
    await settle(el);
    await focusInput(inputs[1]);
    await typeKeys(inputs[1], 'n');
    expect(inputs[1].value).toBe('n');
    expect(el.value).toBeNull();
  });

  it('should validate a typed slot when date-mode is range in slots mode', async () => {
    const { el, picker } = await renderField({
      dateMode: 'range',
      timeMode: 'slots',
      inputs: 1,
      picker: true,
      pickerAttrs: { 'min-time': '09:00', 'max-time': '10:00', step: '30' },
      attrs: { 'value-mode': 'date' }
    });
    await settle(el, picker);
    el.value = new Date(2026, 5, 1, 9, 15);
    await settle(el, picker);
    expect(el.validity.customError).toBe(true);
    expect(el.validationMessage).toBe('Choose an available time.');
  });
});

describe('DateTimeField / custom states', () => {
  it('should not reflect state properties to attributes', async () => {
    const { el } = await renderField();
    el.disabled = true;
    el.readonly = true;
    el.required = true;
    el.dateMode = 'range';
    await settle(el);
    ['disabled', 'readonly', 'required', 'date-mode'].forEach(name => expect(el.hasAttribute(name)).toBe(false));
  });

  it('should reflect name so form submission includes the field', async () => {
    const { el } = await renderField();
    el.name = 'when';
    await settle(el);
    expect(el.getAttribute('name')).toBe('when');
  });

  it('should set the disabled, readonly, and required states when those properties are set', async () => {
    const { el } = await renderField();
    expect(el.matches(':state(disabled)')).toBe(false);
    expect(el.matches(':state(readonly)')).toBe(false);
    expect(el.matches(':state(required)')).toBe(false);
    el.disabled = true;
    el.readonly = true;
    el.required = true;
    await settle(el);
    expect(el.matches(':state(disabled)')).toBe(true);
    expect(el.matches(':state(readonly)')).toBe(true);
    expect(el.matches(':state(required)')).toBe(true);
    el.disabled = false;
    await settle(el);
    expect(el.matches(':state(disabled)')).toBe(false);
  });

  it('should set the states when configured through attributes', async () => {
    const { el } = await renderField({ attrs: { disabled: '', readonly: '', required: '' } });
    expect(el.matches(':state(disabled)')).toBe(true);
    expect(el.matches(':state(readonly)')).toBe(true);
    expect(el.matches(':state(required)')).toBe(true);
  });

  it('should set the invalid state when validation is reported and clear it when a value is set', async () => {
    const { el } = await renderField({ attrs: { required: '', 'value-mode': 'date' } });
    expect(el.matches(':state(invalid)')).toBe(false);
    el.reportValidity();
    await settle(el);
    expect(el.matches(':state(invalid)')).toBe(true);
    el.value = new Date(2025, 5, 12, 9, 0);
    await settle(el);
    expect(el.matches(':state(invalid)')).toBe(false);
  });

  it('should set the open state while the linked picker is open', async () => {
    const { el, textField, picker } = await renderField({ picker: true });
    expect(el.matches(':state(open)')).toBe(false);
    getToggle(textField)!.click();
    await settle(el, picker);
    expect(el.matches(':state(open)')).toBe(true);
    getToggle(textField)!.click();
    await settle(el, picker);
    expect(el.matches(':state(open)')).toBe(false);
  });

  it('should set the range state when the field captures a range', async () => {
    silenceWarnings();
    const { el } = await renderField();
    expect(el.matches(':state(range)')).toBe(false);
    el.dateMode = 'range';
    await settle(el);
    expect(el.matches(':state(range)')).toBe(true);
    el.dateMode = 'single';
    el.timeMode = 'range';
    await settle(el);
    expect(el.matches(':state(range)')).toBe(true);
    el.timeMode = 'slots';
    await settle(el);
    expect(el.matches(':state(range)')).toBe(false);
  });
});
