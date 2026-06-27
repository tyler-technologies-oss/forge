import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import 'temporal-polyfill/global';
import { Temporal } from 'temporal-polyfill';
import './index.js';
import {
  buildSlotsFromRange,
  coerceValue,
  computePreset,
  formatDuration,
  formatSlotLabel,
  mergeDateAndTime,
  parseTimeString,
  timeFromDate,
  toLocalIsoString
} from './date-time-picker-utils.js';
import type { IDateTimePickerComponent } from './date-time-picker.js';
import type { IDateTimePickerChangeEventData, IDateTimePickerRange, ITimeSlot } from './date-time-picker-constants.js';
import type { ICalendarDateSelectEventData } from '../calendar/calendar-constants.js';

function getEl(container: ParentNode): IDateTimePickerComponent {
  return container.querySelector('forge-date-time-picker') as IDateTimePickerComponent;
}

async function ready(el: IDateTimePickerComponent): Promise<void> {
  await el.updateComplete;
  // One more tick so child custom elements upgrade.
  await new Promise(resolve => setTimeout(resolve, 0));
}

function captureChanges(el: IDateTimePickerComponent): IDateTimePickerChangeEventData[] {
  const events: IDateTimePickerChangeEventData[] = [];
  el.addEventListener('forge-date-time-picker-change', e => events.push((e as CustomEvent<IDateTimePickerChangeEventData>).detail));
  return events;
}

describe('DateTimePicker / utils', () => {
  it('parseTimeString accepts 24h, 12h, and rejects garbage', () => {
    expect(parseTimeString('09:00')).toEqual({ hours: 9, minutes: 0, seconds: 0 });
    expect(parseTimeString('17:45:30')).toEqual({ hours: 17, minutes: 45, seconds: 30 });
    expect(parseTimeString('12:00 AM')).toEqual({ hours: 0, minutes: 0, seconds: 0 });
    expect(parseTimeString('12:00 PM')).toEqual({ hours: 12, minutes: 0, seconds: 0 });
    expect(parseTimeString('1:30 PM')).toEqual({ hours: 13, minutes: 30, seconds: 0 });
    expect(parseTimeString('not-a-time')).toBeNull();
    expect(parseTimeString('25:00')).toBeNull();
    expect(parseTimeString(null)).toBeNull();
  });

  it('buildSlotsFromRange generates inclusive 15-min steps from 09:00 to 10:00', () => {
    const slots = buildSlotsFromRange('09:00', '10:00', 15, false);
    expect(slots.map(s => s.value)).toEqual(['09:00', '09:15', '09:30', '09:45', '10:00']);
  });

  it('buildSlotsFromRange returns [] for an inverted range', () => {
    expect(buildSlotsFromRange('10:00', '09:00', 15, false)).toEqual([]);
  });

  it('formatSlotLabel formats 24h and 12h labels', () => {
    expect(formatSlotLabel('14:30', 'en-US', true, false)).toMatch(/14:30/);
    expect(formatSlotLabel('14:30', 'en-US', false, false)).toMatch(/02:30\s*PM/i);
  });

  it('mergeDateAndTime returns a Date with merged H:M:S', () => {
    const date = new Date(2025, 5, 12);
    const merged = mergeDateAndTime(date, '10:30');
    expect(merged?.getHours()).toBe(10);
    expect(merged?.getMinutes()).toBe(30);
  });

  it('timeFromDate extracts canonical strings', () => {
    expect(timeFromDate(new Date(2025, 0, 1, 7, 5), false)).toBe('07:05');
    expect(timeFromDate(new Date(2025, 0, 1, 7, 5, 9), true)).toBe('07:05:09');
  });

  it('coerceValue accepts ISO strings in single mode', () => {
    const result = coerceValue('2025-06-12T10:30:00', 'single', false);
    expect(result).toBeInstanceOf(Date);
    expect((result as Date).getFullYear()).toBe(2025);
  });

  it('coerceValue accepts {from,to} in range mode', () => {
    const result = coerceValue({ from: new Date(2025, 5, 12, 10, 30), to: new Date(2025, 5, 12, 12, 30) } as IDateTimePickerRange, 'range', false);
    expect(result).not.toBeNull();
    expect((result as IDateTimePickerRange).to.getHours()).toBe(12);
  });

  it('coerceValue strips seconds/ms on a range when allowSeconds is false', () => {
    const result = coerceValue(
      { from: new Date(2025, 5, 12, 10, 30, 45, 123), to: new Date(2025, 5, 12, 12, 30, 59, 999) } as IDateTimePickerRange,
      'range',
      false
    );
    const range = result as IDateTimePickerRange;
    expect(range.from.getSeconds()).toBe(0);
    expect(range.from.getMilliseconds()).toBe(0);
    expect(range.to.getSeconds()).toBe(0);
    expect(range.to.getMilliseconds()).toBe(0);
  });

  it('toLocalIsoString formats a local datetime-local string', () => {
    expect(toLocalIsoString(new Date(2025, 5, 12, 9, 5), false)).toBe('2025-06-12T09:05');
    expect(toLocalIsoString(new Date(2025, 5, 12, 9, 5, 7), true)).toBe('2025-06-12T09:05:07');
  });

  it('coerceValue accepts a Temporal.PlainDateTime in single mode', () => {
    const result = coerceValue(Temporal.PlainDateTime.from('2025-06-12T10:30'), 'single', false);
    expect(result).toBeInstanceOf(Date);
    expect((result as Date).getHours()).toBe(10);
    expect((result as Date).getMinutes()).toBe(30);
  });
});

describe('DateTimePicker / rendering', () => {
  it('instantiates with shadow DOM', async () => {
    const screen = render(html`<forge-date-time-picker></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.shadowRoot).not.toBeNull();
    expect(el.shadowRoot!.querySelector('forge-calendar')).not.toBeNull();
  });

  it('renders one forge-time-picker in single mode', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="single"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelectorAll('forge-time-picker').length).toBe(1);
    expect(el.shadowRoot!.querySelector('[part~="slot-list"]')).toBeNull();
  });

  it('renders two forge-time-pickers in a range input wrapper in range mode', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="range"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelectorAll('forge-time-picker').length).toBe(2);
    expect(el.shadowRoot!.querySelector('[part="time-inputs"]')).not.toBeNull();
  });

  it('renders a listbox of slot buttons in slots mode', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="slots" min-time="09:00" max-time="10:00" step="15"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const listbox = el.shadowRoot!.querySelector('[role="listbox"]');
    expect(listbox).not.toBeNull();
    const options = listbox!.querySelectorAll('[role="option"]');
    expect(options.length).toBe(5);
  });

  it('auto orientation resolves to horizontal for slots and vertical for range', async () => {
    const screen = render(
      html`<forge-date-time-picker time-mode="slots"></forge-date-time-picker> <forge-date-time-picker time-mode="range"></forge-date-time-picker>`
    );
    const slotEl = screen.container.querySelectorAll('forge-date-time-picker')[0] as IDateTimePickerComponent;
    const rangeEl = screen.container.querySelectorAll('forge-date-time-picker')[1] as IDateTimePickerComponent;
    await ready(slotEl);
    await ready(rangeEl);
    const slotBody = slotEl.shadowRoot!.querySelector('[part="body"]') as HTMLElement;
    const rangeBody = rangeEl.shadowRoot!.querySelector('[part="body"]') as HTMLElement;
    expect(slotBody.dataset.orientation).toBe('horizontal');
    expect(rangeBody.dataset.orientation).toBe('vertical');
  });

  it('explicit orientation overrides auto', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="slots" orientation="vertical"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const body = el.shadowRoot!.querySelector('[part="body"]') as HTMLElement;
    expect(body.dataset.orientation).toBe('vertical');
  });

  it('exposes the footer wrapper when show-footer is set and content fills a sub-slot', async () => {
    const screen = render(
      html`<forge-date-time-picker show-footer>
        <div slot="footer-end">My footer end</div>
      </forge-date-time-picker>`
    );
    const el = getEl(screen.container);
    await ready(el);
    const footer = el.shadowRoot!.querySelector('[part="footer"]') as HTMLElement;
    expect(footer).not.toBeNull();
    expect(footer.dataset.empty).toBe('false');
  });

  it('omits the footer wrapper entirely when show-footer is not set', async () => {
    const screen = render(html`<forge-date-time-picker></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelector('[part="footer"]')).toBeNull();
  });
});

describe('DateTimePicker / selection + events', () => {
  it('slots mode: clicking a slot fires complete=true when date is preset', async () => {
    const initial = new Date(2025, 5, 12);
    const screen = render(
      html`<forge-date-time-picker time-mode="slots" min-time="09:00" max-time="10:00" step="15" .value=${initial as any}></forge-date-time-picker>`
    );
    const el = getEl(screen.container);
    await ready(el);
    const events = captureChanges(el);

    const slot = el.shadowRoot!.querySelector('[role="option"][data-value="09:30"]') as HTMLButtonElement;
    slot.click();
    await ready(el);

    expect(events.length).toBeGreaterThan(0);
    const last = events[events.length - 1];
    expect(last.source).toBe('slot');
    expect(last.complete).toBe(true);
    expect((last.value as Date).getHours()).toBe(9);
    expect((last.value as Date).getMinutes()).toBe(30);
  });

  it('consumer-provided slots prop overrides generation', async () => {
    const customSlots: ITimeSlot[] = [
      { value: '11:00', label: 'Eleven' },
      { value: '13:00', label: 'One PM', disabled: true }
    ];
    const screen = render(html`<forge-date-time-picker time-mode="slots"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    el.slots = customSlots;
    await ready(el);
    const buttons = el.shadowRoot!.querySelectorAll('[role="option"]');
    expect(buttons.length).toBe(2);
    expect(buttons[1].getAttribute('aria-disabled')).toBe('true');
  });

  it('disabled slot cannot be selected via click', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="slots"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    el.slots = [{ value: '09:00' }, { value: '09:30', disabled: true }];
    el.value = new Date(2025, 5, 12);
    await ready(el);
    const events = captureChanges(el);
    const disabledBtn = el.shadowRoot!.querySelector('[data-value="09:30"]') as HTMLButtonElement;
    disabledBtn.click();
    await ready(el);
    const slotEvents = events.filter(e => e.source === 'slot');
    expect(slotEvents.length).toBe(0);
  });

  it('switching time-mode clears the value and emits mode-change', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="single"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    const events = captureChanges(el);

    el.timeMode = 'range';
    await ready(el);
    await new Promise(r => queueMicrotask(r as any));

    const modeChange = events.find(e => e.source === 'mode-change');
    expect(modeChange).toBeDefined();
    expect(modeChange?.value).toBeNull();
    expect(el.value).toBeNull();
  });
});

describe('DateTimePicker / min-max enforcement', () => {
  it('disables slots earlier than min on the min calendar day', async () => {
    const min = new Date(2025, 5, 12, 9, 30);
    const screen = render(
      html`<forge-date-time-picker
        time-mode="slots"
        min-time="09:00"
        max-time="10:00"
        step="15"
        .value=${new Date(2025, 5, 12) as any}
        .min=${min as any}></forge-date-time-picker>`
    );
    const el = getEl(screen.container);
    await ready(el);
    const slot0900 = el.shadowRoot!.querySelector('[data-value="09:00"]') as HTMLElement;
    const slot0930 = el.shadowRoot!.querySelector('[data-value="09:30"]') as HTMLElement;
    expect(slot0900.getAttribute('aria-disabled')).toBe('true');
    expect(slot0930.getAttribute('aria-disabled')).toBe('false');
  });

  it('clamps the single time-picker min to the min time-of-day on the boundary day', async () => {
    const min = new Date(2025, 5, 12, 14, 0);
    const screen = render(
      html`<forge-date-time-picker
        time-mode="single"
        min-time="09:00"
        max-time="20:00"
        .value=${new Date(2025, 5, 12) as any}
        .min=${min as any}></forge-date-time-picker>`
    );
    const el = getEl(screen.container);
    await ready(el);
    const timePicker = el.shadowRoot!.querySelector('forge-time-picker') as HTMLElement;
    expect(timePicker.getAttribute('min')).toBe('14:00');
  });
});

describe('DateTimePicker / slot list keyboard nav', () => {
  it('ArrowDown moves focus to the next slot', async () => {
    const screen = render(
      html`<forge-date-time-picker
        time-mode="slots"
        min-time="09:00"
        max-time="09:45"
        step="15"
        .value=${new Date(2025, 5, 12) as any}></forge-date-time-picker>`
    );
    const el = getEl(screen.container);
    await ready(el);
    const listbox = el.shadowRoot!.querySelector('[role="listbox"]') as HTMLElement;
    const first = el.shadowRoot!.querySelector('[role="option"]') as HTMLButtonElement;
    first.focus();
    listbox.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await ready(el);
    const buttons = Array.from(el.shadowRoot!.querySelectorAll('[role="option"]')) as HTMLButtonElement[];
    expect(document.activeElement === el).toBe(true);
    // Inside the shadow root, the focused descendant should be the second slot.
    expect(el.shadowRoot!.activeElement).toBe(buttons[1]);
  });

  it('Enter selects the focused slot', async () => {
    const screen = render(
      html`<forge-date-time-picker
        time-mode="slots"
        min-time="09:00"
        max-time="09:30"
        step="15"
        .value=${new Date(2025, 5, 12) as any}></forge-date-time-picker>`
    );
    const el = getEl(screen.container);
    await ready(el);
    const events = captureChanges(el);
    const second = el.shadowRoot!.querySelectorAll('[role="option"]')[1] as HTMLButtonElement;
    second.focus();
    second.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await ready(el);
    expect(events.some(e => e.source === 'slot')).toBe(true);
  });
});

describe('DateTimePicker / form association', () => {
  it('contributes ISO string to FormData in single mode', async () => {
    const screen = render(
      html`<form>
        <forge-date-time-picker name="meeting"></forge-date-time-picker>
      </form>`
    );
    const form = screen.container.querySelector('form') as HTMLFormElement;
    const el = form.querySelector('forge-date-time-picker') as IDateTimePickerComponent;
    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    const fd = new FormData(form);
    const value = fd.get('meeting');
    expect(typeof value).toBe('string');
    expect(value as string).toContain('2025');
  });

  it('contributes name.from and name.to in range mode', async () => {
    const screen = render(
      html`<form>
        <forge-date-time-picker name="window" time-mode="range"></forge-date-time-picker>
      </form>`
    );
    const form = screen.container.querySelector('form') as HTMLFormElement;
    const el = form.querySelector('forge-date-time-picker') as IDateTimePickerComponent;
    el.value = {
      from: new Date(2025, 5, 12, 10, 30),
      to: new Date(2025, 5, 12, 12, 30)
    } as IDateTimePickerRange;
    await ready(el);
    const fd = new FormData(form);
    expect(typeof fd.get('window.from')).toBe('string');
    expect(typeof fd.get('window.to')).toBe('string');
  });

  it('required + empty fails validity; with value it passes', async () => {
    const screen = render(
      html`<form>
        <forge-date-time-picker name="meeting" required></forge-date-time-picker>
      </form>`
    );
    const el = screen.container.querySelector('forge-date-time-picker') as IDateTimePickerComponent;
    await ready(el);
    expect(el.checkValidity()).toBe(false);
    expect(el.validity.valueMissing).toBe(true);

    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    expect(el.checkValidity()).toBe(true);
  });

  it('range with from > to is invalid (customError)', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="range" required></forge-date-time-picker>`);
    const el = getEl(screen.container);
    el.value = {
      from: new Date(2025, 5, 12, 12, 30),
      to: new Date(2025, 5, 12, 10, 30)
    } as IDateTimePickerRange;
    await ready(el);
    expect(el.validity.customError).toBe(true);
  });

  it('formResetCallback clears value', async () => {
    const screen = render(
      html`<form>
        <forge-date-time-picker name="meeting"></forge-date-time-picker>
        <button type="reset">Reset</button>
      </form>`
    );
    const form = screen.container.querySelector('form') as HTMLFormElement;
    const el = form.querySelector('forge-date-time-picker') as IDateTimePickerComponent;
    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    form.reset();
    await ready(el);
    expect(el.value).toBeNull();
  });
});

describe('DateTimePicker / value modes', () => {
  it('date mode exposes value as a Date', async () => {
    const screen = render(html`<forge-date-time-picker value-mode="date" time-mode="single"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    expect(el.value).toBeInstanceOf(Date);
    expect((el.value as Date).getHours()).toBe(10);
  });

  it('iso mode round-trips a local datetime-local string', async () => {
    const screen = render(html`<forge-date-time-picker value-mode="iso" time-mode="single"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    el.value = '2025-06-12T10:30';
    await ready(el);
    expect(el.value).toBe('2025-06-12T10:30');
  });

  it('temporal mode exposes value as a Temporal.PlainDateTime', async () => {
    const screen = render(html`<forge-date-time-picker value-mode="temporal" time-mode="single"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    const value = el.value as unknown as Temporal.PlainDateTime;
    expect(value.year).toBe(2025);
    expect(value.month).toBe(6);
    expect(value.day).toBe(12);
    expect(value.hour).toBe(10);
    expect(value.minute).toBe(30);
  });

  it('temporal mode accepts a Temporal.PlainDateTime as input', async () => {
    const screen = render(html`<forge-date-time-picker value-mode="temporal" time-mode="single"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    el.value = Temporal.PlainDateTime.from('2025-06-12T14:45');
    await ready(el);
    const value = el.value as unknown as Temporal.PlainDateTime;
    expect(value.hour).toBe(14);
    expect(value.minute).toBe(45);
  });
});

describe('DateTimePicker / accessibility', () => {
  it('default render is accessible', async () => {
    const screen = render(html`<forge-date-time-picker></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    await expect(el).toBeAccessible();
  });

  it('slots mode listbox renders with role and aria-orientation', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="slots" min-time="09:00" max-time="10:00" step="15"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const listbox = el.shadowRoot!.querySelector('[role="listbox"]') as HTMLElement;
    expect(listbox.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('live region exists and is offscreen', async () => {
    const screen = render(html`<forge-date-time-picker></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const live = el.shadowRoot!.querySelector('[part="live-region"]') as HTMLElement;
    expect(live.getAttribute('aria-live')).toBe('polite');
    expect(live.getAttribute('role')).toBe('status');
  });

  it('disabled attribute is reflected', async () => {
    const screen = render(html`<forge-date-time-picker disabled></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.disabled).toBe(true);
    expect(el.hasAttribute('disabled')).toBe(true);
  });
});

describe('DateTimePicker / overlay mode', () => {
  it('should render inline card when anchorElement is not set', async () => {
    const screen = render(html`<forge-date-time-picker></forge-date-time-picker>`);
    const el = screen.container.querySelector('forge-date-time-picker')!;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('forge-overlay')).toBeNull();
    expect(el.shadowRoot!.querySelector('[part="root"]')).not.toBeNull();
  });

  it('should render card inside forge-overlay when anchorElement is set', async () => {
    const screen = render(html`
      <div>
        <button id="anchor">Open</button>
        <forge-date-time-picker></forge-date-time-picker>
      </div>
    `);
    const btn = screen.container.querySelector('button')!;
    const el = screen.container.querySelector('forge-date-time-picker')!;
    await el.updateComplete;
    el.anchorElement = btn;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('forge-overlay')).not.toBeNull();
  });

  it('should open and close the overlay via the open property', async () => {
    const screen = render(html`
      <div>
        <button id="anchor">Open</button>
        <forge-date-time-picker></forge-date-time-picker>
      </div>
    `);
    const btn = screen.container.querySelector('button')!;
    const el = screen.container.querySelector('forge-date-time-picker')!;
    await el.updateComplete;
    el.anchorElement = btn;
    await el.updateComplete;
    el.open = true;
    await el.updateComplete;
    const overlay = el.shadowRoot!.querySelector('forge-overlay') as HTMLElement & { open: boolean };
    expect(overlay.open).toBe(true);
    el.open = false;
    await el.updateComplete;
    expect(overlay.open).toBe(false);
  });

  it('should emit forge-date-time-picker-open when opened', async () => {
    const screen = render(html`
      <div>
        <button id="anchor">Open</button>
        <forge-date-time-picker></forge-date-time-picker>
      </div>
    `);
    const btn = screen.container.querySelector('button')!;
    const el = screen.container.querySelector('forge-date-time-picker')!;
    await el.updateComplete;
    el.anchorElement = btn;
    await el.updateComplete;
    const events: string[] = [];
    el.addEventListener('forge-date-time-picker-open', () => events.push('open'));
    el.open = true;
    await el.updateComplete;
    expect(events).toContain('open');
  });

  it('should emit forge-date-time-picker-close and set open=false on light dismiss', async () => {
    const screen = render(html`
      <div>
        <button id="anchor">Open</button>
        <forge-date-time-picker></forge-date-time-picker>
      </div>
    `);
    const btn = screen.container.querySelector('button')!;
    const el = screen.container.querySelector('forge-date-time-picker')!;
    await el.updateComplete;
    el.anchorElement = btn;
    await el.updateComplete;
    el.open = true;
    await el.updateComplete;
    const events: string[] = [];
    el.addEventListener('forge-date-time-picker-close', () => events.push('close'));
    const overlay = el.shadowRoot!.querySelector('forge-overlay')!;
    overlay.dispatchEvent(new CustomEvent('forge-overlay-light-dismiss', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.open).toBe(false);
    expect(events).toEqual(['close']);
  });
});

describe('DateTimePicker / axis-aware value model', () => {
  it('should round-trip a scalar Date when date-mode and time-mode are single', async () => {
    const screen = render(html`<forge-date-time-picker value-mode="date" time-mode="single" date-mode="single"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const input = new Date(2026, 5, 9, 9, 0, 0);
    el.value = input;
    await ready(el);
    const result = el.value;
    expect(result).toBeInstanceOf(Date);
    expect((result as Date).getFullYear()).toBe(2026);
    expect((result as Date).getMonth()).toBe(5);
    expect((result as Date).getDate()).toBe(9);
    expect((result as Date).getHours()).toBe(9);
    expect((result as Date).getMinutes()).toBe(0);
  });

  it('should round-trip a same-day {from,to} when time-mode=range, date-mode=single', async () => {
    const screen = render(html`<forge-date-time-picker value-mode="date" time-mode="range" date-mode="single"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const from = new Date(2026, 5, 9, 9, 0, 0);
    const to = new Date(2026, 5, 9, 17, 0, 0);
    el.value = { from, to } as IDateTimePickerRange;
    await ready(el);
    const result = el.value as IDateTimePickerRange;
    expect(result).not.toBeNull();
    expect(result.from).toBeInstanceOf(Date);
    expect(result.to).toBeInstanceOf(Date);
    expect(result.from.getDate()).toBe(9);
    expect(result.to.getDate()).toBe(9);
    expect(result.from.getHours()).toBe(9);
    expect(result.to.getHours()).toBe(17);
  });

  it('should round-trip a multi-day {from,to} when date-mode=range, time-mode=range', async () => {
    const screen = render(html`<forge-date-time-picker value-mode="date" time-mode="range" date-mode="range"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const from = new Date(2026, 5, 9, 9, 0, 0);
    const to = new Date(2026, 5, 12, 17, 0, 0);
    el.value = { from, to } as IDateTimePickerRange;
    await ready(el);
    const result = el.value as IDateTimePickerRange;
    expect(result).not.toBeNull();
    expect(result.from).toBeInstanceOf(Date);
    expect(result.to).toBeInstanceOf(Date);
    expect(result.from.getDate()).toBe(9);
    expect(result.to.getDate()).toBe(12);
    expect(result.from.getHours()).toBe(9);
    expect(result.to.getHours()).toBe(17);
  });

  it('should round-trip a date-range with a single shared time when date-mode=range, time-mode=single', async () => {
    const screen = render(html`<forge-date-time-picker value-mode="date" time-mode="single" date-mode="range"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const from = new Date(2026, 5, 9, 9, 0, 0);
    const to = new Date(2026, 5, 12, 9, 0, 0);
    el.value = { from, to } as IDateTimePickerRange;
    await ready(el);
    const result = el.value as IDateTimePickerRange;
    expect(result).not.toBeNull();
    expect(result.from).toBeInstanceOf(Date);
    expect(result.to).toBeInstanceOf(Date);
    expect(result.from.getDate()).toBe(9);
    expect(result.to.getDate()).toBe(12);
    expect(result.from.getHours()).toBe(9);
    expect(result.to.getHours()).toBe(9);
  });
});

describe('DateTimePicker / per-endpoint time clamping', () => {
  it('should clamp the from-time but not the to-time against min time-of-day when the range spans multiple days', async () => {
    const min = new Date(2026, 5, 9, 9, 0);
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="range" value-mode="date" .min=${min as any}></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    el.value = {
      from: new Date(2026, 5, 9, 9, 0),
      to: new Date(2026, 5, 12, 8, 0)
    } as IDateTimePickerRange;
    await ready(el);

    expect(el.checkValidity()).toBe(true);

    el.value = {
      from: new Date(2026, 5, 9, 8, 0),
      to: new Date(2026, 5, 12, 8, 0)
    } as IDateTimePickerRange;
    await ready(el);

    expect(el.validity.rangeUnderflow).toBe(true);
  });

  it('should not raise the to-time min beyond the base minTime when to-date is after the min date', async () => {
    const min = new Date(2026, 5, 9, 14, 0);
    const screen = render(
      html`<forge-date-time-picker
        date-mode="range"
        time-mode="range"
        value-mode="date"
        min-time="06:00"
        max-time="22:00"
        .min=${min as any}></forge-date-time-picker>`
    );
    const el = getEl(screen.container);
    await ready(el);

    el.value = {
      from: new Date(2026, 5, 9, 14, 0),
      to: new Date(2026, 5, 12, 8, 0)
    } as IDateTimePickerRange;
    await ready(el);

    const timePickers = el.shadowRoot!.querySelectorAll('forge-time-picker');
    expect(timePickers.length).toBe(2);
    const fromTimePicker = timePickers[0] as HTMLElement;
    const toTimePicker = timePickers[1] as HTMLElement;
    expect(fromTimePicker.getAttribute('min')).toBe('14:00');
    expect(toTimePicker.getAttribute('min')).toBe('06:00');
  });

  it('should clamp the from-time field min to min time-of-day when from-date equals the min date', async () => {
    const min = new Date(2026, 5, 9, 9, 0);
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="range" value-mode="date" .min=${min as any}></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    el.value = {
      from: new Date(2026, 5, 9, 9, 0),
      to: new Date(2026, 5, 12, 17, 0)
    } as IDateTimePickerRange;
    await ready(el);

    const timePickers = el.shadowRoot!.querySelectorAll('forge-time-picker');
    expect(timePickers.length).toBe(2);
    const fromTimePicker = timePickers[0] as HTMLElement;
    expect(fromTimePicker.getAttribute('min')).toBe('09:00');
  });
});

describe('DateTimePicker / range-select calendar', () => {
  function dispatchCalendarSelect(el: IDateTimePickerComponent, detail: Partial<ICalendarDateSelectEventData>): void {
    const calendar = el.shadowRoot!.querySelector('forge-calendar')!;
    calendar.dispatchEvent(
      new CustomEvent<Partial<ICalendarDateSelectEventData>>('forge-calendar-date-select', {
        detail: { selected: false, type: 'date', ...detail } as ICalendarDateSelectEventData,
        bubbles: true,
        composed: true
      })
    );
  }

  it('should render the calendar in range mode when date-mode is range', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const calendar = el.shadowRoot!.querySelector('forge-calendar') as HTMLElement;
    expect(calendar.getAttribute('mode')).toBe('range');
    expect(calendar.hasAttribute('allow-single-date-range')).toBe(true);
  });

  it('should set only the from-date after the first range click when date-mode is range', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="single" auto-commit></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const events = captureChanges(el);

    const fromDate = new Date(2026, 5, 9);
    dispatchCalendarSelect(el, {
      date: fromDate,
      range: { from: fromDate },
      rangeSelectionState: 'from',
      selected: false
    } as Partial<ICalendarDateSelectEventData>);
    await ready(el);

    expect(events.length).toBeGreaterThan(0);
    const last = events[events.length - 1];
    expect(last.source).toBe('date');
    expect(last.value).toBeNull();
    expect(last.complete).toBe(false);
  });

  it('should produce a {from,to} with distinct dates after the second range click when date-mode is range and time-mode is range', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="range" value-mode="date" auto-commit></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    const fromDate = new Date(2026, 5, 9);
    const toDate = new Date(2026, 5, 12);

    el.value = {
      from: new Date(2026, 5, 9, 9, 0),
      to: new Date(2026, 5, 12, 17, 0)
    } as IDateTimePickerRange;
    await ready(el);

    const events = captureChanges(el);
    dispatchCalendarSelect(el, {
      date: fromDate,
      range: { from: fromDate },
      rangeSelectionState: 'from',
      selected: false
    } as Partial<ICalendarDateSelectEventData>);
    await ready(el);

    dispatchCalendarSelect(el, {
      date: toDate,
      range: { from: fromDate, to: toDate },
      rangeSelectionState: 'to',
      selected: false
    } as Partial<ICalendarDateSelectEventData>);
    await ready(el);

    const last = events[events.length - 1];
    expect(last.source).toBe('date');
    const value = last.value as IDateTimePickerRange;
    expect(value).not.toBeNull();
    expect(value.from).toBeInstanceOf(Date);
    expect(value.to).toBeInstanceOf(Date);
    expect(value.from.getDate()).not.toBe(value.to.getDate());
  });

  it('should keep single-date selection working when date-mode is single', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="single" time-mode="single" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const calendar = el.shadowRoot!.querySelector('forge-calendar') as HTMLElement;
    expect(calendar.getAttribute('mode')).toBe('single');

    const events = captureChanges(el);
    const selectedDate = new Date(2026, 5, 9);
    dispatchCalendarSelect(el, {
      date: selectedDate,
      selected: false
    } as Partial<ICalendarDateSelectEventData>);
    await ready(el);

    expect(events.length).toBeGreaterThan(0);
    const last = events[events.length - 1];
    expect(last.source).toBe('date');
    expect(last.date).not.toBeNull();
    expect(last.date!.getDate()).toBe(9);
  });
});

describe('DateTimePicker / deferred Apply/Cancel (T-P5)', () => {
  function dispatchCalendarSelect(el: IDateTimePickerComponent, detail: Partial<ICalendarDateSelectEventData>): void {
    const calendar = el.shadowRoot!.querySelector('forge-calendar')!;
    calendar.dispatchEvent(
      new CustomEvent<Partial<ICalendarDateSelectEventData>>('forge-calendar-date-select', {
        detail: { selected: false, type: 'date', ...detail } as ICalendarDateSelectEventData,
        bubbles: true,
        composed: true
      })
    );
  }

  async function selectRangeDates(el: IDateTimePickerComponent, fromDate: Date, toDate: Date): Promise<void> {
    dispatchCalendarSelect(el, {
      date: fromDate,
      range: { from: fromDate },
      rangeSelectionState: 'from',
      selected: false
    } as Partial<ICalendarDateSelectEventData>);
    await ready(el);
    dispatchCalendarSelect(el, {
      date: toDate,
      range: { from: fromDate, to: toDate },
      rangeSelectionState: 'to',
      selected: false
    } as Partial<ICalendarDateSelectEventData>);
    await ready(el);
  }

  it('should NOT emit forge-date-time-picker-change on calendar edits when deferred (range, default autoCommit)', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="range" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const events = captureChanges(el);

    const fromDate = new Date(2026, 5, 9);
    const toDate = new Date(2026, 5, 12);
    await selectRangeDates(el, fromDate, toDate);

    expect(events.length).toBe(0);
  });

  it('should commit and emit exactly one change with the staged range when Apply is clicked', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="range" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    el.value = {
      from: new Date(2026, 5, 1, 9, 0),
      to: new Date(2026, 5, 3, 17, 0)
    } as IDateTimePickerRange;
    await ready(el);

    const fromDate = new Date(2026, 5, 9);
    const toDate = new Date(2026, 5, 12);
    await selectRangeDates(el, fromDate, toDate);

    const events = captureChanges(el);

    const applyBtn = el.shadowRoot!.querySelector('[part~="commit-apply"]') as HTMLButtonElement;
    expect(applyBtn).not.toBeNull();
    expect(applyBtn.disabled).toBe(false);
    applyBtn.click();
    await ready(el);

    expect(events.length).toBe(1);
    expect(events[0].source).toBe('apply');
    expect(events[0].complete).toBe(true);
    const value = events[0].value as IDateTimePickerRange;
    expect(value).not.toBeNull();
    expect(value.from).toBeInstanceOf(Date);
    expect(value.to).toBeInstanceOf(Date);
    expect(value.from.getDate()).toBe(9);
    expect(value.to.getDate()).toBe(12);
  });

  it('should revert the draft to the last committed value when Cancel is clicked', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="range" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    const committed: IDateTimePickerRange = {
      from: new Date(2026, 5, 1, 9, 0),
      to: new Date(2026, 5, 3, 17, 0)
    };
    el.value = committed;
    await ready(el);

    const newFrom = new Date(2026, 5, 10);
    const newTo = new Date(2026, 5, 15);
    await selectRangeDates(el, newFrom, newTo);

    const events = captureChanges(el);

    const cancelBtn = el.shadowRoot!.querySelector('[part~="commit-cancel"]') as HTMLButtonElement;
    expect(cancelBtn).not.toBeNull();
    cancelBtn.click();
    await ready(el);

    expect(events.length).toBe(0);

    const current = el.value as IDateTimePickerRange;
    expect(current).not.toBeNull();
    expect(current.from.getDate()).toBe(1);
    expect(current.to.getDate()).toBe(3);
  });

  it('should commit live (per-edit change events) when auto-commit is set even in range mode', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="range" value-mode="date" auto-commit></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const events = captureChanges(el);

    const fromDate = new Date(2026, 5, 9);
    const toDate = new Date(2026, 5, 12);
    await selectRangeDates(el, fromDate, toDate);

    expect(events.length).toBeGreaterThan(0);
    const dateEvents = events.filter(e => e.source === 'date');
    expect(dateEvents.length).toBeGreaterThan(0);
  });

  it('should keep single+single mode emitting live (regression)', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="single" time-mode="single" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const events = captureChanges(el);

    const selectedDate = new Date(2026, 5, 9);
    dispatchCalendarSelect(el, {
      date: selectedDate,
      selected: false
    } as Partial<ICalendarDateSelectEventData>);
    await ready(el);

    expect(events.length).toBeGreaterThan(0);
    expect(events[0].source).toBe('date');
  });

  it('should render Apply and Cancel buttons in deferred mode', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="range" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    const applyBtn = el.shadowRoot!.querySelector('[part~="commit-apply"]');
    const cancelBtn = el.shadowRoot!.querySelector('[part~="commit-cancel"]');
    expect(applyBtn).not.toBeNull();
    expect(cancelBtn).not.toBeNull();
  });

  it('should disable the Apply button when the draft range is incomplete', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="range" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    const applyBtn = el.shadowRoot!.querySelector('[part~="commit-apply"]') as HTMLButtonElement;
    expect(applyBtn.disabled).toBe(true);
  });

  it('should NOT render Apply and Cancel buttons when autoCommit is true', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="range" value-mode="date" auto-commit></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    const applyBtn = el.shadowRoot!.querySelector('[part~="commit-apply"]');
    const cancelBtn = el.shadowRoot!.querySelector('[part~="commit-cancel"]');
    expect(applyBtn).toBeNull();
    expect(cancelBtn).toBeNull();
  });

  it('should NOT render Apply and Cancel buttons in single+single mode', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="single" time-mode="single" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    const applyBtn = el.shadowRoot!.querySelector('[part~="commit-apply"]');
    const cancelBtn = el.shadowRoot!.querySelector('[part~="commit-cancel"]');
    expect(applyBtn).toBeNull();
    expect(cancelBtn).toBeNull();
  });
});

describe('DateTimePicker / presets utils (T-P6)', () => {
  it("should return today's date at midnight when preset id is 'today'", () => {
    const now = new Date(2026, 5, 15, 14, 30);
    const { from, to } = computePreset('today', now, 0);
    expect(from.getHours()).toBe(0);
    expect(from.getMinutes()).toBe(0);
    expect(from.getDate()).toBe(15);
    expect(from.getMonth()).toBe(5);
    expect(to.getDate()).toBe(15);
    expect(to.getHours()).toBe(0);
  });

  it("should return start-of-week to end-of-week when preset id is 'this-week' (respecting firstDayOfWeek)", () => {
    // June 15, 2026 is a Monday
    const now = new Date(2026, 5, 15);
    // firstDayOfWeek = 1 (Monday): week starts on Monday Jun 15, ends Sunday Jun 21
    const { from, to } = computePreset('this-week', now, 1);
    expect(from.getDate()).toBe(15);
    expect(to.getDate()).toBe(21);
    expect(from.getHours()).toBe(0);
    expect(to.getHours()).toBe(0);
    // firstDayOfWeek = 0 (Sunday): week starts on Sunday Jun 14, ends Saturday Jun 20
    const { from: from0, to: to0 } = computePreset('this-week', now, 0);
    expect(from0.getDate()).toBe(14);
    expect(to0.getDate()).toBe(20);
  });

  it("should return today to today+6 when preset id is 'next-7-days'", () => {
    const now = new Date(2026, 5, 15, 10, 0);
    const { from, to } = computePreset('next-7-days', now, 0);
    expect(from.getDate()).toBe(15);
    expect(to.getDate()).toBe(21);
    expect(from.getHours()).toBe(0);
    expect(to.getHours()).toBe(0);
  });

  it("should return first-to-last day of month when preset id is 'this-month'", () => {
    const now = new Date(2026, 5, 15);
    const { from, to } = computePreset('this-month', now, 0);
    expect(from.getDate()).toBe(1);
    expect(from.getMonth()).toBe(5);
    expect(to.getDate()).toBe(30);
    expect(to.getMonth()).toBe(5);
    expect(from.getHours()).toBe(0);
    expect(to.getHours()).toBe(0);
  });

  it('should return empty string when to is before from in formatDuration', () => {
    const from = new Date(2026, 5, 15, 12, 0);
    const to = new Date(2026, 5, 15, 10, 0);
    expect(formatDuration(from, to)).toBe('');
  });

  it('should return singular form for 1 day in formatDuration', () => {
    const from = new Date(2026, 5, 15, 0, 0);
    const to = new Date(2026, 5, 16, 0, 0);
    const result = formatDuration(from, to);
    expect(result).toMatch(/1\s*day/i);
  });

  it('should return days and hours in formatDuration for multi-day range', () => {
    const from = new Date(2026, 5, 15, 0, 0);
    const to = new Date(2026, 5, 18, 8, 0);
    const result = formatDuration(from, to);
    expect(result).toMatch(/3\s*days?/i);
    expect(result).toMatch(/8\s*hours?/i);
  });
});

describe('DateTimePicker / presets sidebar (T-P6)', () => {
  it('should render the presets sidebar when date-mode is range', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" auto-commit></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const presetsDiv = el.shadowRoot!.querySelector('[part~="presets"]');
    expect(presetsDiv).not.toBeNull();
    const presetBtns = el.shadowRoot!.querySelectorAll('[part~="preset"]');
    expect(presetBtns.length).toBe(4);
  });

  it('should not render the presets sidebar when presets attribute is false', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" .presets=${false}></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const presetsDiv = el.shadowRoot!.querySelector('[part~="presets"]');
    expect(presetsDiv).toBeNull();
  });

  it('should fill both date endpoints when a preset is clicked', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="range" value-mode="date" auto-commit></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    el.value = {
      from: new Date(2026, 5, 1, 9, 0),
      to: new Date(2026, 5, 1, 17, 0)
    } as IDateTimePickerRange;
    await ready(el);

    const todayBtn = el.shadowRoot!.querySelector('[data-preset-id="next-7-days"]') as HTMLButtonElement;
    expect(todayBtn).not.toBeNull();

    const events = captureChanges(el);
    todayBtn.click();
    await ready(el);

    expect(events.length).toBeGreaterThan(0);
    const last = events[events.length - 1];
    expect(last.source).toBe('preset');
    const value = last.value as IDateTimePickerRange;
    expect(value).not.toBeNull();
    expect(value.from).toBeInstanceOf(Date);
    expect(value.to).toBeInstanceOf(Date);
    const today = new Date();
    expect(value.from.getDate()).toBe(today.getDate());
  });

  it('should render a duration summary when a complete range is staged', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="single" value-mode="date" auto-commit></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    el.value = {
      from: new Date(2026, 5, 9, 9, 0),
      to: new Date(2026, 5, 12, 9, 0)
    } as IDateTimePickerRange;
    await ready(el);

    const durationEl = el.shadowRoot!.querySelector('[part~="duration"]') as HTMLElement;
    expect(durationEl).not.toBeNull();
    expect(durationEl.textContent).toMatch(/day/i);
  });
});
