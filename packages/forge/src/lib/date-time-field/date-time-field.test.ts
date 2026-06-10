import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import 'temporal-polyfill/global';
import { Temporal } from 'temporal-polyfill';
import './index.js';
import type { IDateTimeFieldComponent, IDateTimeFieldChangeEventData } from './index.js';
import type { IDateTimePickerChangeEventData } from '../date-time-picker/index.js';

function getEl(container: ParentNode): IDateTimeFieldComponent {
  return container.querySelector('forge-date-time-field') as IDateTimeFieldComponent;
}

async function ready(el: IDateTimeFieldComponent): Promise<void> {
  await el.updateComplete;
  await new Promise(resolve => setTimeout(resolve, 0));
}

function getDateInput(el: IDateTimeFieldComponent): HTMLInputElement {
  return el.shadowRoot!.querySelector('[part="date-input"]') as HTMLInputElement;
}

function getTimeInput(el: IDateTimeFieldComponent): HTMLInputElement {
  return el.shadowRoot!.querySelector('[part="time-input"]') as HTMLInputElement;
}

describe('DateTimeField / rendering', () => {
  it('renders a text-field with a toggle button', async () => {
    const screen = render(html`<forge-date-time-field></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelector('forge-text-field')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('[part="toggle"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('forge-date-time-picker')).toBeNull();
  });

  it('opens the popover and renders the picker when toggled', async () => {
    const screen = render(html`<forge-date-time-field></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    (el.shadowRoot!.querySelector('[part="toggle"]') as HTMLElement).click();
    await ready(el);
    expect(el.open).toBe(true);
    expect(el.shadowRoot!.querySelector('forge-date-time-picker')).not.toBeNull();
  });

  it('does not make the popover persistent by default, so it light-dismisses on outside click', async () => {
    const screen = render(html`<forge-date-time-field></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    (el.shadowRoot!.querySelector('[part="toggle"]') as HTMLElement).click();
    await ready(el);
    const popover = el.shadowRoot!.querySelector('forge-popover') as HTMLElement & { persistent: boolean };
    expect(popover.persistent).toBe(false);
  });

  it('makes the popover persistent when the persistent property is set', async () => {
    const screen = render(html`<forge-date-time-field persistent></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.persistent).toBe(true);
    (el.shadowRoot!.querySelector('[part="toggle"]') as HTMLElement).click();
    await ready(el);
    const popover = el.shadowRoot!.querySelector('forge-popover') as HTMLElement & { persistent: boolean };
    expect(popover.persistent).toBe(true);
  });

  it('does not open when disabled', async () => {
    const screen = render(html`<forge-date-time-field disabled></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    (el.shadowRoot!.querySelector('[part="toggle"]') as HTMLElement).click();
    await ready(el);
    expect(el.open).toBe(false);
  });

  it('renders masked date and time inputs in single mode', async () => {
    const screen = render(html`<forge-date-time-field time-mode="single"></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelector('[part="date-input"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('[part="time-input"]')).not.toBeNull();
  });

  it('reflects the selected value in the masked date + time inputs', async () => {
    const screen = render(html`<forge-date-time-field value-mode="date"></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    expect(getDateInput(el).value).toContain('2025');
    expect(getTimeInput(el).value).toContain('10:30');
  });
});

describe('DateTimeField / value + events', () => {
  it('updates value and fires change when the embedded picker reports a complete selection', async () => {
    const screen = render(html`<forge-date-time-field value-mode="date"></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    const events: IDateTimeFieldChangeEventData[] = [];
    el.addEventListener('forge-date-time-field-change', e => events.push((e as CustomEvent<IDateTimeFieldChangeEventData>).detail));

    (el.shadowRoot!.querySelector('[part="toggle"]') as HTMLElement).click();
    await ready(el);
    const picker = el.shadowRoot!.querySelector('forge-date-time-picker')!;
    const detail: IDateTimePickerChangeEventData = {
      value: new Date(2025, 5, 12, 9, 30),
      date: new Date(2025, 5, 12),
      time: '09:30',
      from: null,
      to: null,
      source: 'time',
      complete: true
    };
    picker.dispatchEvent(new CustomEvent('forge-date-time-picker-change', { detail, bubbles: true, composed: true }));
    await ready(el);

    expect(events.length).toBe(1);
    expect(events[0].complete).toBe(true);
    expect((el.value as Date).getHours()).toBe(9);
    expect(el.open).toBe(false);
  });
});

describe('DateTimeField / value modes', () => {
  it('temporal mode exposes value as a Temporal.PlainDateTime', async () => {
    const screen = render(html`<forge-date-time-field value-mode="temporal"></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    const value = el.value as unknown as Temporal.PlainDateTime;
    expect(value.year).toBe(2025);
    expect(value.hour).toBe(10);
  });

  it('iso mode round-trips a datetime-local string', async () => {
    const screen = render(html`<forge-date-time-field value-mode="iso"></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    el.value = '2025-06-12T10:30';
    await ready(el);
    expect(el.value).toBe('2025-06-12T10:30');
  });
});

describe('DateTimeField / range + slots modes', () => {
  it('range mode renders date + from + to masked inputs and round-trips a {from,to} value', async () => {
    const screen = render(html`<forge-date-time-field time-mode="range" value-mode="date"></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelector('[part="date-input"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('[part="from-input"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('[part="to-input"]')).not.toBeNull();

    el.value = { from: new Date(2025, 5, 12, 9, 0), to: new Date(2025, 5, 12, 17, 0) };
    await ready(el);
    const v = el.value as { from: Date; to: Date };
    expect(v.from.getHours()).toBe(9);
    expect(v.to.getHours()).toBe(17);
  });

  it('range mode marks both from and to required when required-parts is the default', async () => {
    const screen = render(html`<forge-date-time-field time-mode="range" required></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.checkValidity()).toBe(false);
    expect(el.validity.valueMissing).toBe(true);
  });

  it('slots mode renders a masked date input and a readonly slot display', async () => {
    const screen = render(html`<forge-date-time-field time-mode="slots"></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelector('[part="date-input"]')).not.toBeNull();
    const slot = el.shadowRoot!.querySelector('[part="slot-display"]') as HTMLInputElement;
    expect(slot).not.toBeNull();
    expect(slot.hasAttribute('readonly')).toBe(true);
    expect(el.shadowRoot!.querySelector('[part="time-input"]')).toBeNull();
  });
});

describe('DateTimeField / min-max validity', () => {
  it('flags rangeUnderflow when the value is before min', async () => {
    const screen = render(html`<forge-date-time-field value-mode="date" min="2025-06-12T09:00"></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    el.value = new Date(2025, 5, 12, 8, 0);
    await ready(el);
    expect(el.validity.rangeUnderflow).toBe(true);
    expect(el.checkValidity()).toBe(false);
  });

  it('flags rangeOverflow when the value is after max', async () => {
    const screen = render(html`<forge-date-time-field value-mode="date" max="2025-06-12T17:00"></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    el.value = new Date(2025, 5, 12, 18, 0);
    await ready(el);
    expect(el.validity.rangeOverflow).toBe(true);
  });

  it('is valid when the value is within min/max', async () => {
    const screen = render(html`<forge-date-time-field value-mode="date" min="2025-06-12T09:00" max="2025-06-12T17:00"></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    el.value = new Date(2025, 5, 12, 10, 0);
    await ready(el);
    expect(el.checkValidity()).toBe(true);
  });
});

describe('DateTimeField / quick keys', () => {
  it('"n" sets the value to the current date and time', async () => {
    const screen = render(html`<forge-date-time-field value-mode="date"></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    const dateInput = getDateInput(el);
    dateInput.focus();
    dateInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'n', bubbles: true }));
    await ready(el);
    const value = el.value as Date;
    const now = new Date();
    expect(value).toBeInstanceOf(Date);
    expect(value.getFullYear()).toBe(now.getFullYear());
    expect(value.getMonth()).toBe(now.getMonth());
    expect(value.getDate()).toBe(now.getDate());
  });

  it('"d" fills the date segment with today', async () => {
    const screen = render(html`<forge-date-time-field value-mode="date"></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    const dateInput = getDateInput(el);
    dateInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'd', bubbles: true }));
    await ready(el);
    const now = new Date();
    expect(getDateInput(el).value).toContain(String(now.getFullYear()));
  });

  it('"t" sets the time segment to the current time without filling the date', async () => {
    const screen = render(html`<forge-date-time-field></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    const timeInput = getTimeInput(el);
    timeInput.focus();
    timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: 't', bubbles: true }));
    await ready(el);
    expect(getTimeInput(el).value).toMatch(/\d/);
    expect(getDateInput(el).value).not.toMatch(/\d/);
    expect(el.value).toBeNull();
  });

  it('"n" does not overwrite a date that was already entered', async () => {
    const screen = render(html`<forge-date-time-field value-mode="date"></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    el.value = new Date(2020, 2, 15, 10, 0);
    await ready(el);
    const timeInput = getTimeInput(el);
    timeInput.focus();
    timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'n', bubbles: true }));
    await ready(el);
    const value = el.value as Date;
    expect(value).toBeInstanceOf(Date);
    expect(value.getFullYear()).toBe(2020);
    expect(value.getMonth()).toBe(2);
    expect(value.getDate()).toBe(15);
  });

  it('does not trigger quick keys when readonly', async () => {
    const screen = render(html`<forge-date-time-field readonly></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    const dateInput = getDateInput(el);
    dateInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'n', bubbles: true }));
    await ready(el);
    expect(el.value).toBeNull();
  });
});

describe('DateTimeField / form association', () => {
  it('contributes an ISO string to FormData', async () => {
    const screen = render(
      html`<form>
        <forge-date-time-field name="appt" value-mode="date"></forge-date-time-field>
      </form>`
    );
    const form = screen.container.querySelector('form') as HTMLFormElement;
    const el = form.querySelector('forge-date-time-field') as IDateTimeFieldComponent;
    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    const fd = new FormData(form);
    expect(typeof fd.get('appt')).toBe('string');
    expect(fd.get('appt') as string).toContain('2025');
  });

  it('required + empty is invalid; with a value it is valid', async () => {
    const screen = render(html`<forge-date-time-field name="appt" required></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.checkValidity()).toBe(false);
    expect(el.validity.valueMissing).toBe(true);

    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    expect(el.checkValidity()).toBe(true);
  });

  function firePickerSegment(el: IDateTimeFieldComponent, parts: { date?: boolean; time?: boolean }): void {
    const picker = el.shadowRoot!.querySelector('forge-date-time-picker')!;
    const date = parts.date ? new Date(2025, 5, 12) : null;
    const time = parts.time ? '09:30' : null;
    const detail: IDateTimePickerChangeEventData = {
      value: date && time ? new Date(2025, 5, 12, 9, 30) : null,
      date,
      time,
      from: null,
      to: null,
      source: 'date',
      complete: !!(date && time)
    };
    picker.dispatchEvent(new CustomEvent('forge-date-time-picker-change', { detail, bubbles: true, composed: true }));
  }

  async function openPicker(el: IDateTimeFieldComponent): Promise<void> {
    (el.shadowRoot!.querySelector('[part="toggle"]') as HTMLElement).click();
    await ready(el);
  }

  it('required (both) + empty is invalid', async () => {
    const screen = render(html`<forge-date-time-field required></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.checkValidity()).toBe(false);
    expect(el.validity.valueMissing).toBe(true);
  });

  it('required-parts="date" is satisfied by a date alone', async () => {
    const screen = render(html`<forge-date-time-field required required-parts="date"></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.checkValidity()).toBe(false);
    await openPicker(el);
    firePickerSegment(el, { date: true, time: false });
    await ready(el);
    expect(el.checkValidity()).toBe(true);
  });

  it('required-parts="time" is invalid when only a date is set, with a time-specific message', async () => {
    const screen = render(html`<forge-date-time-field required required-parts="time"></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    await openPicker(el);
    firePickerSegment(el, { date: true, time: false });
    await ready(el);
    expect(el.validity.valueMissing).toBe(true);
    expect(el.validationMessage).toBe('Time is required.');
  });

  it('required (both) with only a date reports the missing time', async () => {
    const screen = render(html`<forge-date-time-field required></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    await openPicker(el);
    firePickerSegment(el, { date: true, time: false });
    await ready(el);
    expect(el.validity.valueMissing).toBe(true);
    expect(el.validationMessage).toBe('Time is required.');
  });

  it('renders the required asterisk via the inner text-field', async () => {
    const screen = render(html`<forge-date-time-field required label="Appt"></forge-date-time-field>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelector('forge-text-field')!.hasAttribute('required')).toBe(true);
  });

  it('formResetCallback clears the value', async () => {
    const screen = render(
      html`<form>
        <forge-date-time-field name="appt"></forge-date-time-field>
        <button type="reset">Reset</button>
      </form>`
    );
    const form = screen.container.querySelector('form') as HTMLFormElement;
    const el = form.querySelector('forge-date-time-field') as IDateTimeFieldComponent;
    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    form.reset();
    await ready(el);
    expect(el.value).toBeNull();
  });
});
