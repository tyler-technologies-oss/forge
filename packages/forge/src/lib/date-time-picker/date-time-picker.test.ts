import { describe, it, expect, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import 'temporal-polyfill/global';
import { Temporal } from 'temporal-polyfill';
import { LiveAnnouncer } from '@tylertech/forge-core';
import './index.js';
import {
  buildAnnouncement,
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
import type { ICalendarComponent } from '../calendar/calendar.js';
import type { DayOfWeek } from '../calendar/calendar-constants.js';

function getEl(container: ParentNode): IDateTimePickerComponent {
  return container.querySelector('forge-date-time-picker') as IDateTimePickerComponent;
}

async function ready(el: IDateTimePickerComponent): Promise<void> {
  await el.updateComplete;
  // One more tick so child custom elements upgrade.
  await new Promise(resolve => setTimeout(resolve, 0));
}

function getSlotButton(el: IDateTimePickerComponent, label: string): HTMLElement {
  return Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('[role="option"]')).find(option => option.textContent?.trim() === label)!;
}

function getPresetButton(el: IDateTimePickerComponent, label: string): HTMLElement {
  return Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('[part="preset"]')).find(preset => preset.textContent?.trim() === label)!;
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

  it('should parse a date-only ISO string as local midnight, not UTC midnight', () => {
    const result = coerceValue('2026-06-29', 'single', false) as Date;
    expect(result).toBeInstanceOf(Date);
    expect(result.getTime()).toBe(new Date(2026, 5, 29).getTime());
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(5);
    expect(result.getDate()).toBe(29);
    expect(result.getHours()).toBe(0);
  });

  it('should parse a timezone-less datetime-local string as local wall-clock time', () => {
    const result = coerceValue('2026-06-29T08:30', 'single', false) as Date;
    expect(result.getTime()).toBe(new Date(2026, 5, 29, 8, 30).getTime());
  });

  it('should keep the minutes component in formatDuration when days and hours are both present', () => {
    const result = formatDuration(new Date(2026, 5, 15, 9, 0), new Date(2026, 5, 16, 11, 30));
    expect(result).toMatch(/1\s*day/i);
    expect(result).toMatch(/2\s*hour/i);
    expect(result).toMatch(/30\s*minute/i);
  });

  it('should decompose a multi-day duration into days, hours, and minutes', () => {
    const result = formatDuration(new Date(2026, 5, 15, 9, 0), new Date(2026, 5, 18, 11, 45));
    expect(result).toMatch(/3\s*day/i);
    expect(result).toMatch(/2\s*hour/i);
    expect(result).toMatch(/45\s*minute/i);
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
    const options = listbox!.querySelectorAll('forge-button[role="option"]');
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
    expect(slotEl.matches(':state(horizontal)')).toBe(true);
    expect(rangeEl.matches(':state(vertical)')).toBe(true);
  });

  it('explicit orientation overrides auto', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="slots" orientation="vertical"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.matches(':state(vertical)')).toBe(true);
    expect(el.matches(':state(horizontal)')).toBe(false);
  });

  it('should reflect the time mode as a custom state', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="single"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.matches(':state(time-single)')).toBe(true);

    el.timeMode = 'slots';
    await ready(el);
    expect(el.matches(':state(time-slots)')).toBe(true);
    expect(el.matches(':state(time-single)')).toBe(false);
  });

  it('should match the slot list height to the calendar as the calendar width changes', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="slots"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const calendarSection = el.shadowRoot!.querySelector('[part="calendar-section"]') as HTMLElement;
    const slotList = el.shadowRoot!.querySelector('[part="slot-list"]') as HTMLElement;

    for (const width of ['260px', '400px']) {
      el.style.setProperty('--forge-date-time-picker-calendar-max-width', width);
      await vi.waitFor(() => {
        const calendarRect = calendarSection.getBoundingClientRect();
        const listRect = slotList.getBoundingClientRect();
        expect(Math.abs(listRect.height - calendarRect.height)).toBeLessThanOrEqual(1);
      });
    }
  });

  it('should render Today and Clear below the calendar and time controls without resizing the calendar', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="slots"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const calendarSection = el.shadowRoot!.querySelector('[part="calendar-section"]') as HTMLElement;
    const initialHeight = calendarSection.getBoundingClientRect().height;

    el.todayButton = true;
    el.clearButton = true;
    await ready(el);

    const body = el.shadowRoot!.querySelector('[part="body"]') as HTMLElement;
    const actions = el.shadowRoot!.querySelector('[part="date-actions"]') as HTMLElement;
    expect(actions.querySelector('[part="today-button"]')).not.toBeNull();
    expect(actions.querySelector('[part="clear-button"]')).not.toBeNull();
    expect(actions.getBoundingClientRect().top).toBeGreaterThanOrEqual(body.getBoundingClientRect().bottom);
    expect(calendarSection.getBoundingClientRect().height).toBe(initialHeight);
  });

  it('should clear the value and emit a clear change when Clear is clicked', async () => {
    const screen = render(
      html`<forge-date-time-picker time-mode="single" clear-button .value=${new Date(2025, 5, 12, 9, 30) as any}></forge-date-time-picker>`
    );
    const el = getEl(screen.container);
    await ready(el);
    const events = captureChanges(el);

    (el.shadowRoot!.querySelector('[part="clear-button"]') as HTMLElement).click();
    await ready(el);

    expect(el.value).toBeNull();
    expect(events.at(-1)?.source).toBe('clear');
  });

  it('should not emit a change when Clear is clicked with nothing selected', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="single" clear-button></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const events = captureChanges(el);

    (el.shadowRoot!.querySelector('[part="clear-button"]') as HTMLElement).click();
    await ready(el);

    expect(events.length).toBe(0);
  });

  it('should select a slot once when Space is pressed on it', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="slots" min-time="09:00" max-time="10:00" step="30"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const events = captureChanges(el);

    getSlotButton(el, '09:30 AM').focus();
    await userEvent.keyboard(' ');
    await ready(el);

    expect(events.filter(e => e.source === 'slot').length).toBe(1);
  });

  it('should let an explicit slot list max height exceed the calendar height when side-by-side', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="slots" orientation="horizontal" step="5"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    el.style.setProperty('--forge-date-time-picker-slot-list-max-height', '600px');
    const calendarSection = el.shadowRoot!.querySelector('[part="calendar-section"]') as HTMLElement;
    const slotList = el.shadowRoot!.querySelector('[part="slot-list"]') as HTMLElement;
    await vi.waitFor(() => expect(slotList.getBoundingClientRect().height).toBeGreaterThan(calendarSection.getBoundingClientRect().height + 50));
  });

  it('should keep the slot list max height when orientation is vertical', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="slots" orientation="vertical"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    el.style.setProperty('--forge-date-time-picker-slot-list-max-height', '150px');
    const slotList = el.shadowRoot!.querySelector('[part="slot-list"]') as HTMLElement;
    await vi.waitFor(() => expect(slotList.getBoundingClientRect().height).toBeLessThanOrEqual(150));
  });

  it('should honor an explicit slot list max height when side-by-side', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="slots" orientation="horizontal"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    el.style.setProperty('--forge-date-time-picker-slot-list-max-height', '150px');
    const slotList = el.shadowRoot!.querySelector('[part="slot-list"]') as HTMLElement;
    await vi.waitFor(() => expect(slotList.getBoundingClientRect().height).toBeLessThanOrEqual(150));
  });

  it('should fit a short slot list to its content when side-by-side', async () => {
    const screen = render(
      html`<forge-date-time-picker time-mode="slots" orientation="horizontal" .slots=${[{ value: '09:00' }, { value: '09:30' }]}></forge-date-time-picker>`
    );
    const el = getEl(screen.container);
    await ready(el);
    const calendarSection = el.shadowRoot!.querySelector('[part="calendar-section"]') as HTMLElement;
    const slotList = el.shadowRoot!.querySelector('[part="slot-list"]') as HTMLElement;
    await vi.waitFor(() => expect(slotList.getBoundingClientRect().height).toBeLessThan(calendarSection.getBoundingClientRect().height / 2));
  });

  it('should match the slot list width to the calendar when orientation is vertical', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="slots" orientation="vertical"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const calendarSection = el.shadowRoot!.querySelector('[part="calendar-section"]') as HTMLElement;
    const slotList = el.shadowRoot!.querySelector('[part="slot-list"]') as HTMLElement;
    expect(Math.abs(slotList.getBoundingClientRect().width - calendarSection.getBoundingClientRect().width)).toBeLessThanOrEqual(1);
  });

  for (const timeMode of ['single', 'range']) {
    it(`should not draw dividers in ${timeMode} time mode`, async () => {
      const screen = render(html`<forge-date-time-picker time-mode=${timeMode}></forge-date-time-picker>`);
      const el = getEl(screen.container);
      await ready(el);
      const timeSection = el.shadowRoot!.querySelector('[part="time-section"]') as HTMLElement;
      expect(getComputedStyle(timeSection).borderTopStyle).toBe('none');
      const footer = el.shadowRoot!.querySelector('[part="footer"]') as HTMLElement | null;
      if (footer) {
        expect(getComputedStyle(footer).borderTopStyle).toBe('none');
      }
    });
  }

  it('hides the header slot when empty and shows it when assigned content', async () => {
    const screen = render(html`
      <forge-date-time-picker></forge-date-time-picker>
      <forge-date-time-picker><div slot="header">My header</div></forge-date-time-picker>
    `);
    const [emptyEl, populatedEl] = Array.from(screen.container.querySelectorAll('forge-date-time-picker')) as IDateTimePickerComponent[];
    await Promise.all([ready(emptyEl), ready(populatedEl)]);

    const emptyHeader = emptyEl.shadowRoot!.querySelector('slot[name="header"]') as HTMLSlotElement;
    const populatedHeader = populatedEl.shadowRoot!.querySelector('slot[name="header"]') as HTMLSlotElement;
    expect(emptyHeader.style.display).toBe('none');
    expect(populatedHeader.style.display).toBe('');
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
    const footerEnd = footer.querySelector('[part="footer-end"]') as HTMLSlotElement;
    expect(footer).not.toBeNull();
    expect(footer.style.display).toBe('');
    expect(footerEnd.localName).toBe('slot');
    expect(getComputedStyle(footerEnd).gridColumnStart).toBe('3');
  });

  it('hides the footer wrapper when show-footer is set without slotted content', async () => {
    const screen = render(html`<forge-date-time-picker show-footer></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const footer = el.shadowRoot!.querySelector('[part="footer"]') as HTMLElement;
    expect(footer.style.display).toBe('none');
  });

  it('omits the footer wrapper entirely when show-footer is not set', async () => {
    const screen = render(html`<forge-date-time-picker></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelector('[part="footer"]')).toBeNull();
  });

  it('applies mode, orientation, and presentation classes to the root element', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="single" orientation="vertical"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const root = el.shadowRoot!.querySelector('[part="root"]') as HTMLElement;
    expect(root.classList.contains('forge-date-time-picker')).toBe(true);
    expect(root.classList.contains('single')).toBe(true);
    expect(root.classList.contains('vertical')).toBe(true);
    expect(root.classList.contains('popover')).toBe(true);
    expect(root.classList.contains('sheet')).toBe(false);
  });
});

describe('DateTimePicker / selection + events', () => {
  it('slots mode: clicking a slot fires complete=true when date is preset', async () => {
    const initial = new Date(2025, 5, 12);
    const screen = render(
      html`<forge-date-time-picker
        time-mode="slots"
        value-mode="date"
        min-time="09:00"
        max-time="10:00"
        step="15"
        .value=${initial as any}></forge-date-time-picker>`
    );
    const el = getEl(screen.container);
    await ready(el);
    const events = captureChanges(el);

    const slot = getSlotButton(el, '09:30 AM');
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
    const buttons = el.shadowRoot!.querySelectorAll('forge-button[role="option"]');
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
    const disabledBtn = getSlotButton(el, '09:30 AM');
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
    const slot0900 = getSlotButton(el, '09:00 AM');
    const slot0930 = getSlotButton(el, '09:30 AM');
    expect(slot0900.getAttribute('aria-disabled')).toBe('true');
    expect(slot0930.getAttribute('aria-disabled')).toBe('false');
  });

  it('should keep unavailable slots aria-disabled when re-enabled after being disabled', async () => {
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
    el.disabled = true;
    await ready(el);
    el.disabled = false;
    await ready(el);
    const slot0900 = getSlotButton(el, '09:00 AM');
    const slot0930 = getSlotButton(el, '09:30 AM');
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
    const first = el.shadowRoot!.querySelector('forge-button[role="option"]') as HTMLElement;
    first.focus();
    listbox.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await ready(el);
    const buttons = Array.from(el.shadowRoot!.querySelectorAll('forge-button[role="option"]')) as HTMLElement[];
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
    const second = el.shadowRoot!.querySelectorAll('forge-button[role="option"]')[1] as HTMLElement;
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

  it('should label calendar navigation buttons with default text when none is slotted', async () => {
    render(html`<forge-date-time-picker></forge-date-time-picker>`);
    await expect.element(page.getByRole('button', { name: 'Previous month' })).toBeInTheDocument();
    await expect.element(page.getByRole('button', { name: 'Next month' })).toBeInTheDocument();
  });

  it('should label calendar navigation buttons with slotted text when provided', async () => {
    render(
      html`<forge-date-time-picker>
        <span slot="previous-month-button-text">Mes anterior</span>
        <span slot="next-month-button-text">Mes siguiente</span>
      </forge-date-time-picker>`
    );
    await expect.element(page.getByRole('button', { name: 'Mes anterior' })).toBeInTheDocument();
    await expect.element(page.getByRole('button', { name: 'Mes siguiente' })).toBeInTheDocument();
  });

  it('slots mode listbox renders with role and aria-orientation', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="slots" min-time="09:00" max-time="10:00" step="15"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const listbox = el.shadowRoot!.querySelector('[role="listbox"]') as HTMLElement;
    expect(listbox.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('announces complete value changes', async () => {
    const announceSpy = vi.spyOn(LiveAnnouncer.instance, 'announce');
    const screen = render(
      html`<forge-date-time-picker
        time-mode="slots"
        value-mode="date"
        min-time="09:00"
        max-time="10:00"
        step="15"
        .value=${new Date(2026, 5, 12)}></forge-date-time-picker>`
    );
    const el = getEl(screen.container);
    await ready(el);

    announceSpy.mockClear();
    const slot = getSlotButton(el, '09:30 AM');
    slot.click();
    await ready(el);

    expect(announceSpy).toHaveBeenCalledWith(expect.stringMatching(/june.*12.*2026.*9:30.*am/i), 'polite');
    announceSpy.mockRestore();
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
    expect(el.shadowRoot!.querySelector('forge-popover')).toBeNull();
    expect(el.shadowRoot!.querySelector('[part="root"]')).not.toBeNull();
  });

  it('should render card inside forge-popover when anchorElement is set', async () => {
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
    expect(el.shadowRoot!.querySelector('forge-popover')).not.toBeNull();
  });

  it('should open and close the popover via the open property', async () => {
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
    const overlay = el.shadowRoot!.querySelector('forge-popover') as HTMLElement & { open: boolean };
    expect(overlay.open).toBe(true);
    el.open = false;
    await el.updateComplete;
    await vi.waitFor(() => expect(overlay.open).toBe(false));
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
        <div id="outside" style="position: fixed; right: 0; bottom: 0; width: 20px; height: 20px;"></div>
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
    await userEvent.click(screen.container.querySelector('#outside')!);
    await vi.waitFor(() => expect(el.open).toBe(false));
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

  it('should clamp the from-time to the min time-of-day but leave the to-time unclamped when to-date is after the min date', async () => {
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
    // The time-picker clamp derives from the `min` datetime only; `min-time` governs slot generation.
    expect(fromTimePicker.getAttribute('min')).toBe('14:00');
    expect(toTimePicker.getAttribute('min')).toBeNull();
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
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="single"></forge-date-time-picker>`);
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
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="range" value-mode="date"></forge-date-time-picker>`);
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

describe('DateTimePicker / range commit (T-P5)', () => {
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

  it('should emit a change for each range date selection when date-mode is range', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="single" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    el.value = { from: new Date(2026, 5, 1, 9, 0), to: new Date(2026, 5, 3, 9, 0) } as IDateTimePickerRange;
    await ready(el);
    const events = captureChanges(el);

    await selectRangeDates(el, new Date(2026, 5, 9), new Date(2026, 5, 12));

    expect(events.map(e => e.source)).toEqual(['date', 'date']);
    expect(events[0].date?.getDate()).toBe(9);
    expect(events[0].complete).toBe(false);
    expect(events[1].complete).toBe(true);
    const value = el.value as IDateTimePickerRange;
    expect(value.from.getDate()).toBe(9);
    expect(value.to.getDate()).toBe(12);
  });

  it('should update the value immediately when a complete range is selected in range time mode', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="range" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    el.value = { from: new Date(2026, 5, 1, 9, 0), to: new Date(2026, 5, 3, 17, 0) } as IDateTimePickerRange;
    await ready(el);

    await selectRangeDates(el, new Date(2026, 5, 9), new Date(2026, 5, 12));

    const value = el.value as IDateTimePickerRange;
    expect(value.from.getDate()).toBe(9);
    expect(value.from.getHours()).toBe(9);
    expect(value.to.getDate()).toBe(12);
    expect(value.to.getHours()).toBe(17);
  });

  it('should set the value when a date range is selected before any time is chosen', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="single" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const events = captureChanges(el);

    await selectRangeDates(el, new Date(2026, 5, 9), new Date(2026, 5, 12));

    const value = el.value as IDateTimePickerRange;
    expect(value.from).toEqual(new Date(2026, 5, 9, 9, 0));
    expect(value.to).toEqual(new Date(2026, 5, 12, 9, 0));
    expect(events.at(-1)?.complete).toBe(true);
  });

  it('should default to min and max time when a date range is selected in range time mode', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="range" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    await selectRangeDates(el, new Date(2026, 5, 9), new Date(2026, 5, 12));

    const value = el.value as IDateTimePickerRange;
    expect(value.from).toEqual(new Date(2026, 5, 9, 9, 0));
    expect(value.to).toEqual(new Date(2026, 5, 12, 17, 0));
  });

  it('should navigate the calendar to the month of an externally set value', async () => {
    const screen = render(html`<forge-date-time-picker value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    el.value = new Date(2022, 1, 20, 22, 50);
    await ready(el);

    const calendar = el.shadowRoot!.querySelector('forge-calendar') as ICalendarComponent;
    expect(calendar.month).toBe(1);
    expect(calendar.year).toBe(2022);
  });

  it('should match consumer slots without seconds when allow-seconds is set', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="slots" allow-seconds></forge-date-time-picker>`);
    const el = getEl(screen.container);
    el.slots = [{ value: '09:00' }];
    await ready(el);

    expect(el.isTimeSlotAvailable(new Date(2026, 5, 9, 9, 0, 0))).toBe(true);
    expect(el.isTimeSlotAvailable(new Date(2026, 5, 9, 9, 30, 0))).toBe(false);
  });

  it('should clear a range immediately when Clear is clicked', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="range" value-mode="date" clear-button></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    el.value = { from: new Date(2026, 5, 1, 9, 0), to: new Date(2026, 5, 3, 17, 0) } as IDateTimePickerRange;
    await ready(el);
    const events = captureChanges(el);

    (el.shadowRoot!.querySelector('[part="clear-button"]') as HTMLElement).click();
    await ready(el);

    expect(el.value).toBeNull();
    expect(events.map(e => e.source)).toEqual(['clear']);
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

  it('should render slotted footer actions in range mode when show-footer is set', async () => {
    const screen = render(html`
      <forge-date-time-picker date-mode="range" time-mode="range" value-mode="date" show-footer>
        <forge-button slot="footer-end">Continue</forge-button>
      </forge-date-time-picker>
    `);
    const el = getEl(screen.container);
    await ready(el);

    expect(el.shadowRoot!.querySelector('slot[name="footer-end"]')).not.toBeNull();
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
    const screen = render(html`<forge-date-time-picker date-mode="range"></forge-date-time-picker>`);
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
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="range" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    el.value = {
      from: new Date(2026, 5, 1, 9, 0),
      to: new Date(2026, 5, 1, 17, 0)
    } as IDateTimePickerRange;
    await ready(el);

    const todayBtn = getPresetButton(el, 'Next 7 days');
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
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="single" value-mode="date"></forge-date-time-picker>`);
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

  it('should commit a preset range immediately on a fresh picker with no prior time', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="single"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const events = captureChanges(el);

    const presetBtn = getPresetButton(el, 'Today');
    expect(presetBtn).not.toBeNull();

    presetBtn.click();
    await ready(el);

    expect(events.map(e => e.source)).toEqual(['preset']);
    expect(el.value).not.toBeNull();
  });

  it('should render the preset range in the calendar, time inputs, and duration when a preset is clicked', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="range" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    getPresetButton(el, 'Next 7 days').click();
    await ready(el);

    const calendar = el.shadowRoot!.querySelector('forge-calendar') as ICalendarComponent;
    const calendarRange = calendar.value as { from?: Date; to?: Date };
    const value = el.value as IDateTimePickerRange;
    expect(calendarRange.from?.getDate()).toBe(value.from.getDate());
    expect(calendarRange.to?.getDate()).toBe(value.to.getDate());
    const times = Array.from(el.shadowRoot!.querySelectorAll('forge-time-picker')).map(picker => picker.value);
    expect(times).toEqual(['09:00', '17:00']);
    const duration = el.shadowRoot!.querySelector('[part="duration"]') as HTMLElement;
    expect(duration.textContent).toMatch(/day/i);
    expect(duration.closest('[part="time-section"]')).not.toBeNull();
  });

  it('should show only the selected preset as a pressed filled button', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(getPresetButton(el, 'This week').getAttribute('aria-pressed')).toBe('false');

    getPresetButton(el, 'This week').click();
    await ready(el);

    const thisWeek = getPresetButton(el, 'This week');
    const today = getPresetButton(el, 'Today');
    expect(thisWeek.getAttribute('variant')).toBe('filled');
    expect(thisWeek.getAttribute('aria-pressed')).toBe('true');
    expect(today.getAttribute('variant')).toBe('text');
    expect(today.getAttribute('aria-pressed')).toBe('false');
  });

  it('should press the clicked preset when two presets cover the same range', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    el.firstDayOfWeek = new Date().getDay() as DayOfWeek;
    await ready(el);

    getPresetButton(el, 'Next 7 days').click();
    await ready(el);

    expect(getPresetButton(el, 'Next 7 days').getAttribute('aria-pressed')).toBe('true');
    expect(getPresetButton(el, 'This week').getAttribute('aria-pressed')).toBe('false');
  });

  it('should not apply a preset when readonly', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" readonly></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const events = captureChanges(el);

    const preset = getPresetButton(el, 'Today');
    expect(preset.hasAttribute('disabled')).toBe(true);
    preset.click();
    await ready(el);

    expect(events.length).toBe(0);
    expect(el.value).toBeNull();
  });

  it('should deselect the preset when the calendar range no longer matches it', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    getPresetButton(el, 'This week').click();
    await ready(el);

    el.value = { from: new Date(2020, 0, 1, 9, 0), to: new Date(2020, 0, 3, 9, 0) } as IDateTimePickerRange;
    await ready(el);

    expect(getPresetButton(el, 'This week').getAttribute('aria-pressed')).toBe('false');
  });

  it('should expose the presets container as a labeled group', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    const presetsDiv = el.shadowRoot!.querySelector('[part~="presets"]') as HTMLElement;
    expect(presetsDiv).not.toBeNull();
    expect(presetsDiv.getAttribute('role')).toBe('group');
    expect(presetsDiv.getAttribute('aria-label')).toBe('Quick date ranges');
  });

  it('should display the duration for a complete range', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="single" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    el.value = {
      from: new Date(2026, 5, 9, 9, 0),
      to: new Date(2026, 5, 12, 9, 0)
    } as IDateTimePickerRange;
    await ready(el);

    const durationEl = el.shadowRoot!.querySelector('[part~="duration"]') as HTMLElement;
    expect(durationEl).not.toBeNull();
    expect(durationEl.textContent).toMatch(/3\s*days?/i);
  });
});

describe('DateTimePicker / review fixes', () => {
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

  it('should expose boolean properties as custom states without reflecting attributes', async () => {
    const screen = render(html`<forge-date-time-picker></forge-date-time-picker>`);
    const el = getEl(screen.container);
    el.summary = true;
    el.disabled = true;
    el.readonly = true;
    await ready(el);

    expect(el.matches(':state(summary)')).toBe(true);
    expect(el.matches(':state(disabled)')).toBe(true);
    expect(el.matches(':state(readonly)')).toBe(true);
    expect(el.hasAttribute('summary')).toBe(false);
    expect(el.hasAttribute('disabled')).toBe(false);
    expect(el.hasAttribute('readonly')).toBe(false);
  });

  it('should keep the summary width static when a date is selected', async () => {
    const screen = render(html`<forge-date-time-picker summary></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    const summary = el.shadowRoot!.querySelector('[part="summary"]') as HTMLElement;
    const initialWidth = summary.getBoundingClientRect().width;

    dispatchCalendarSelect(el, { date: new Date(2026, 8, 30) });
    await ready(el);

    expect(initialWidth).toBeGreaterThan(0);
    const selectedSummary = el.shadowRoot!.querySelector('[part="summary"]') as HTMLElement;
    expect(selectedSummary.getBoundingClientRect().width).toBe(initialWidth);
  });

  it('should not announce "cleared" when a calendar date is selected before a time', async () => {
    const announceSpy = vi.spyOn(LiveAnnouncer.instance, 'announce');
    const screen = render(html`<forge-date-time-picker time-mode="single" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    announceSpy.mockClear();
    dispatchCalendarSelect(el, { date: new Date(2026, 5, 12), selected: false } as Partial<ICalendarDateSelectEventData>);
    await ready(el);

    expect(announceSpy).not.toHaveBeenCalled();
    announceSpy.mockRestore();
  });

  it('should not leave the embedded time-picker clamped to the slot-generation defaults', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="single"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const timePicker = el.shadowRoot!.querySelector('forge-time-picker') as HTMLElement;
    expect(timePicker.getAttribute('min')).toBeNull();
    expect(timePicker.getAttribute('max')).toBeNull();
  });

  it('should collapse an asymmetric range to a single shared time when date-mode=range and time-mode=single', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="single" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    el.value = { from: new Date(2026, 5, 9, 9, 0), to: new Date(2026, 5, 12, 17, 0) } as IDateTimePickerRange;
    await ready(el);
    const v = el.value as IDateTimePickerRange;
    expect(v.from.getDate()).toBe(9);
    expect(v.to.getDate()).toBe(12);
    expect(v.from.getHours()).toBe(9);
    expect(v.to.getHours()).toBe(9);
  });

  it('should report a date-oriented message when a reversed date range is set in date-mode=range, time-mode=single', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="single" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    el.value = { from: new Date(2026, 5, 12, 9, 0), to: new Date(2026, 5, 9, 9, 0) } as IDateTimePickerRange;
    await ready(el);
    expect(el.validity.customError).toBe(true);
    expect(el.validationMessage).toMatch(/date/i);
    expect(el.validationMessage).not.toMatch(/time/i);
  });

  it('should keep disabled slots focusable and perceivable via keyboard navigation', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="slots" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    el.slots = [{ value: '09:00' }, { value: '09:30', disabled: true }, { value: '10:00' }];
    el.value = new Date(2026, 5, 12);
    await ready(el);
    const listbox = el.shadowRoot!.querySelector('[role="listbox"]') as HTMLElement;
    const first = el.shadowRoot!.querySelector('forge-button[role="option"]') as HTMLElement;
    first.focus();
    listbox.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await ready(el);
    const disabledSlot = getSlotButton(el, '09:30 AM');
    expect(el.shadowRoot!.activeElement).toBe(disabledSlot);
    expect(disabledSlot.getAttribute('aria-disabled')).toBe('true');
    expect(disabledSlot.hasAttribute('disabled')).toBe(false);
  });

  it('should present the mobile bottom sheet as inline-modal (not native modal) so nested time dropdowns stay interactive', async () => {
    await page.viewport(390, 800);
    const screen = render(html`
      <div>
        <button id="anchor">Open</button>
        <forge-date-time-picker></forge-date-time-picker>
      </div>
    `);
    const el = screen.container.querySelector('forge-date-time-picker') as IDateTimePickerComponent;
    const btn = screen.container.querySelector('button')!;
    await el.updateComplete;
    el.anchorElement = btn;
    el.open = true;
    await ready(el);
    const sheet = el.shadowRoot!.querySelector('forge-bottom-sheet');
    expect(sheet).not.toBeNull();
    // A native `modal` dialog would make the time-picker's dropdown popover (rendered at body level)
    // inert; `inline-modal` keeps the scrim while leaving the dropdown interactive.
    expect(sheet!.getAttribute('mode')).toBe('inline-modal');
  });

  it('should expose dialog semantics on the picker card when used as an anchored overlay', async () => {
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
    const root = el.shadowRoot!.querySelector('[part="root"]') as HTMLElement;
    expect(root.getAttribute('role')).toBe('dialog');
    expect(root.getAttribute('aria-label')).toBeTruthy();
  });
});

describe('DateTimePicker / review round 2', () => {
  function dispatchCalendarSelect(el: IDateTimePickerComponent, detail: Partial<ICalendarDateSelectEventData>): void {
    el.shadowRoot!.querySelector('forge-calendar')!.dispatchEvent(
      new CustomEvent('forge-calendar-date-select', {
        detail: { selected: false, type: 'date', ...detail },
        bubbles: true,
        composed: true
      })
    );
  }

  function getPopover(el: IDateTimePickerComponent): HTMLElement & { open: boolean; anchorElement: HTMLElement | null } {
    return el.shadowRoot!.querySelector('forge-popover') as HTMLElement & { open: boolean; anchorElement: HTMLElement | null };
  }

  it('should announce both dates and times when a range spans multiple days', () => {
    const text = buildAnnouncement({ from: new Date(2026, 5, 1, 9, 0), to: new Date(2026, 5, 7, 17, 0) }, 'en-US', false, false);
    expect(text).toMatch(/^Selected Monday, June 1, 2026 at 0?9:00\sAM to Sunday, June 7, 2026 at 0?5:00\sPM\.$/);
  });

  it('should announce one date with a time range when a range falls on the same day', () => {
    const text = buildAnnouncement({ from: new Date(2026, 5, 1, 9, 0), to: new Date(2026, 5, 1, 17, 0) }, 'en-US', false, false);
    expect(text).toMatch(/^Selected Monday, June 1, 2026 from 0?9:00\sAM to 0?5:00\sPM\.$/);
  });

  it('should anchor the popover to the element referenced by the anchor attribute', async () => {
    const screen = render(html`
      <div>
        <button id="dtp-anchor">Open</button>
        <forge-date-time-picker anchor="dtp-anchor"></forge-date-time-picker>
      </div>
    `);
    const el = getEl(screen.container);
    await ready(el);

    const popover = getPopover(el);
    expect(popover).not.toBeNull();
    expect(popover.anchorElement).toBe(screen.container.querySelector('#dtp-anchor'));
    expect(el.shadowRoot!.querySelector('[part="root"]')!.getAttribute('role')).toBe('dialog');
  });

  it('should render as a popover and anchor once a late anchor element is added', async () => {
    const screen = render(html`<div><forge-date-time-picker anchor="dtp-late-anchor"></forge-date-time-picker></div>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(getPopover(el)).not.toBeNull();

    const button = document.createElement('button');
    button.id = 'dtp-late-anchor';
    screen.container.firstElementChild!.append(button);
    el.open = true;
    await ready(el);

    expect(getPopover(el).anchorElement).toBe(button);
  });

  it('should keep the calendar from taking focus when focus is called while an anchored picker is closed', async () => {
    const screen = render(html`
      <div>
        <button id="dtp-anchor">Open</button>
        <forge-date-time-picker anchor="dtp-anchor"></forge-date-time-picker>
      </div>
    `);
    const el = getEl(screen.container);
    await ready(el);

    el.focus();
    await ready(el);
    el.open = true;
    await ready(el);

    const calendar = el.shadowRoot!.querySelector('forge-calendar') as ICalendarComponent;
    expect(calendar.preventFocus).toBe(true);
  });

  it('should reflect name to an attribute when set as a property', async () => {
    const screen = render(html`<forge-date-time-picker></forge-date-time-picker>`);
    const el = getEl(screen.container);
    el.name = 'appointment';
    await ready(el);

    expect(el.getAttribute('name')).toBe('appointment');
  });

  it('should be valid when disabled even if required and empty', async () => {
    const screen = render(html`<forge-date-time-picker required></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    expect(el.checkValidity()).toBe(false);

    el.disabled = true;
    await ready(el);

    expect(el.checkValidity()).toBe(true);
  });

  it('should run a side-by-side slot list to the popover top and bottom edges while the calendar stays inset', async () => {
    const screen = render(html`
      <div>
        <button id="dtp-slots-anchor">Open</button>
        <forge-date-time-picker anchor="dtp-slots-anchor" time-mode="slots" orientation="horizontal" open></forge-date-time-picker>
      </div>
    `);
    const el = getEl(screen.container);
    await ready(el);
    const part = (name: string): DOMRect => el.shadowRoot!.querySelector(`[part~="${name}"]`)!.getBoundingClientRect();

    await vi.waitFor(() => expect(Math.round(part('slot-list').bottom)).toBe(Math.round(part('root').bottom)));
    expect(Math.round(part('slot-list').top)).toBe(Math.round(part('root').top));
    expect(part('calendar-section').top).toBeGreaterThan(part('root').top);
  });

  it('should keep the slot list inset below a header in the popover', async () => {
    const screen = render(html`
      <div>
        <button id="dtp-slots-anchor">Open</button>
        <forge-date-time-picker anchor="dtp-slots-anchor" time-mode="slots" orientation="horizontal" open>
          <span slot="header">Pick a time</span>
        </forge-date-time-picker>
      </div>
    `);
    const el = getEl(screen.container);
    await ready(el);
    const part = (name: string): DOMRect => el.shadowRoot!.querySelector(`[part~="${name}"]`)!.getBoundingClientRect();

    await vi.waitFor(() => expect(part('slot-list').top).toBeGreaterThan(part('header').bottom));
  });

  it('should prefer an explicit anchorElement over the anchor attribute', async () => {
    const screen = render(html`
      <div>
        <button id="dtp-anchor-a">A</button>
        <button id="dtp-anchor-b">B</button>
        <forge-date-time-picker anchor="dtp-anchor-a"></forge-date-time-picker>
      </div>
    `);
    const el = getEl(screen.container);
    const explicit = screen.container.querySelector('#dtp-anchor-b') as HTMLElement;
    el.anchorElement = explicit;
    await ready(el);

    expect(getPopover(el).anchorElement).toBe(explicit);
  });

  it('should light dismiss on outside clicks but not anchor clicks when anchored by id', async () => {
    const screen = render(html`
      <div>
        <button id="dtp-anchor">Open</button>
        <forge-date-time-picker anchor="dtp-anchor"></forge-date-time-picker>
        <div id="outside" style="position: fixed; right: 0; bottom: 0; width: 20px; height: 20px;"></div>
      </div>
    `);
    const el = getEl(screen.container);
    el.open = true;
    await ready(el);
    const events: string[] = [];
    el.addEventListener('forge-date-time-picker-close', () => events.push('close'));

    await userEvent.click(screen.container.querySelector('#dtp-anchor')!);
    await ready(el);
    expect(el.open).toBe(true);

    await userEvent.click(screen.container.querySelector('#outside')!);
    await vi.waitFor(() => expect(el.open).toBe(false));
    expect(events).toEqual(['close']);
  });

  it('should emit the shared time before the range is complete when date-mode is range and time-mode is single', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="single" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    const events = captureChanges(el);

    el.shadowRoot!.querySelector('forge-time-picker')!.dispatchEvent(new CustomEvent('forge-time-picker-change', { detail: '10:30', bubbles: true }));
    await ready(el);
    const fromDate = new Date(2026, 5, 9);
    dispatchCalendarSelect(el, { date: fromDate, range: { from: fromDate }, rangeSelectionState: 'from' } as Partial<ICalendarDateSelectEventData>);
    await ready(el);

    const last = events.at(-1)!;
    expect(last.complete).toBe(false);
    expect(last.time).toBe('10:30');
    expect(last.from).toBeNull();
    expect(last.to).toBeNull();
  });

  it('should move focus to the selected calendar date when focus is called', async () => {
    const screen = render(html`<forge-date-time-picker value-mode="date" .value=${new Date(2026, 5, 12, 9, 0)}></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    el.focus();

    const calendar = el.shadowRoot!.querySelector('forge-calendar') as ICalendarComponent;
    expect(el.shadowRoot!.activeElement).toBe(calendar);
    const focusedDay = calendar.shadowRoot!.activeElement as HTMLElement;
    expect(focusedDay).not.toBeNull();
    expect(focusedDay.textContent?.trim()).toBe('12');
  });

  it('should move focus into the calendar when focus is called right after opening the popover', async () => {
    const screen = render(html`
      <div>
        <button id="dtp-anchor">Open</button>
        <forge-date-time-picker anchor="dtp-anchor"></forge-date-time-picker>
      </div>
    `);
    const el = getEl(screen.container);
    await ready(el);

    el.open = true;
    el.focus();

    const calendar = el.shadowRoot!.querySelector('forge-calendar') as ICalendarComponent;
    await vi.waitFor(() => expect(calendar.shadowRoot!.activeElement).not.toBeNull());
    expect(el.shadowRoot!.activeElement).toBe(calendar);
  });

  it('should not move the calendar back to the start month when only the end date changes', async () => {
    const screen = render(html`<forge-date-time-picker date-mode="range" time-mode="range" value-mode="date"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);
    el.value = { from: new Date(2026, 0, 5, 9, 0), to: new Date(2026, 2, 10, 17, 0) } as IDateTimePickerRange;
    await ready(el);
    const calendar = el.shadowRoot!.querySelector('forge-calendar') as ICalendarComponent;
    expect(calendar.month).toBe(0);

    calendar.goToDate(new Date(2026, 2, 10));
    el.value = { from: new Date(2026, 0, 5, 9, 0), to: new Date(2026, 2, 12, 17, 0) } as IDateTimePickerRange;
    await ready(el);
    expect(calendar.month).toBe(2);

    el.value = { from: new Date(2026, 1, 2, 9, 0), to: new Date(2026, 2, 12, 17, 0) } as IDateTimePickerRange;
    await ready(el);
    expect(calendar.month).toBe(1);
  });

  it('should expose slots as options of the listbox without a presentational wrapper', async () => {
    const screen = render(html`<forge-date-time-picker time-mode="slots" min-time="09:00" max-time="10:00" step="30"></forge-date-time-picker>`);
    const el = getEl(screen.container);
    await ready(el);

    expect(el.shadowRoot!.querySelector('[role="presentation"]')).toBeNull();
    await expect.element(page.getByRole('listbox', { name: 'Available times' }).getByRole('option')).toHaveLength(3);
    await expect(el).toBeAccessible();
  });

  it('should select a slot through the delegated list click handler', async () => {
    const screen = render(
      html`<forge-date-time-picker
        time-mode="slots"
        value-mode="date"
        min-time="09:00"
        max-time="10:00"
        step="30"
        .value=${new Date(2026, 5, 12)}></forge-date-time-picker>`
    );
    const el = getEl(screen.container);
    await ready(el);
    const events = captureChanges(el);

    await userEvent.click(getSlotButton(el, '10:00 AM'));
    await ready(el);

    expect(events.at(-1)?.source).toBe('slot');
    expect((el.value as Date).getHours()).toBe(10);
  });
});
