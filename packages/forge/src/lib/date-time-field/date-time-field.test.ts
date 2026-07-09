import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, LitElement } from 'lit';
import 'temporal-polyfill/global';
import { Temporal } from 'temporal-polyfill';
import './index.js';
import '../date-time-picker/index.js';
import type { IDateTimeFieldComponent, IDateTimeFieldChangeEventData } from './index.js';
import type { IDateTimePickerComponent, IDateTimePickerChangeEventData } from '../date-time-picker/index.js';

function getField(container: ParentNode): IDateTimeFieldComponent {
  return container.querySelector('forge-date-time-field') as IDateTimeFieldComponent;
}

function getPicker(container: ParentNode): IDateTimePickerComponent {
  return container.querySelector('forge-date-time-picker') as IDateTimePickerComponent;
}

async function ready(el: Element): Promise<void> {
  await (el as LitElement).updateComplete;
  await new Promise(resolve => setTimeout(resolve, 0));
}

function getDateInput(el: IDateTimeFieldComponent): HTMLInputElement {
  return el.shadowRoot!.querySelector('[part="date-input"]') as HTMLInputElement;
}

function getTimeInput(el: IDateTimeFieldComponent): HTMLInputElement {
  return el.shadowRoot!.querySelector('[part="time-input"]') as HTMLInputElement;
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

// ─── Rendering (standalone field) ───────────────────────────────────────────

describe('DateTimeField / rendering (standalone)', () => {
  it('should render a field when no picker is linked', async () => {
    const screen = render(html`<forge-date-time-field></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelector('forge-field')).not.toBeNull();
  });

  it('should not render a toggle button when no picker is linked', async () => {
    const screen = render(html`<forge-date-time-field></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelector('[part="toggle"]')).toBeNull();
  });

  it('should not embed a forge-date-time-picker internally', async () => {
    const screen = render(html`<forge-date-time-field></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelector('forge-date-time-picker')).toBeNull();
  });

  it('should render masked date and time inputs in single mode', async () => {
    const screen = render(html`<forge-date-time-field time-mode="single"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelector('[part="date-input"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('[part="time-input"]')).not.toBeNull();
  });

  it('should render date + from + to masked inputs in range mode', async () => {
    const screen = render(html`<forge-date-time-field time-mode="range"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelector('[part="date-input"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('[part="from-input"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('[part="to-input"]')).not.toBeNull();
  });

  it('should render a masked date input and readonly slot display in slots mode', async () => {
    const screen = render(html`<forge-date-time-field time-mode="slots"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelector('[part="date-input"]')).not.toBeNull();
    const slot = el.shadowRoot!.querySelector('[part="slot-display"]') as HTMLInputElement;
    expect(slot).not.toBeNull();
    expect(slot.hasAttribute('readonly')).toBe(true);
    expect(el.shadowRoot!.querySelector('[part="time-input"]')).toBeNull();
  });

  it('should reflect the selected value in the masked date + time inputs', async () => {
    const screen = render(html`<forge-date-time-field value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    expect(getDateInput(el).value).toContain('2025');
    expect(getTimeInput(el).value).toContain('10:30');
  });

  it('should focus the nearest input when clicking empty field space to the right of the inputs', async () => {
    const screen = render(html`<forge-date-time-field time-mode="single"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    const timeInput = getTimeInput(el);
    const field = el.shadowRoot!.querySelector('forge-field') as HTMLElement;
    const rect = timeInput.getBoundingClientRect();
    // Click in the trailing dead zone: to the right of the last input, on the input row.
    field.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, composed: true, cancelable: true, clientX: rect.right + 80, clientY: (rect.top + rect.bottom) / 2 })
    );
    expect(el.shadowRoot!.activeElement).toBe(timeInput);
  });

  it('should focus the date input when clicking empty field space to the left of the inputs', async () => {
    const screen = render(html`<forge-date-time-field time-mode="single"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    const dateInput = getDateInput(el);
    const field = el.shadowRoot!.querySelector('forge-field') as HTMLElement;
    const rect = dateInput.getBoundingClientRect();
    field.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, composed: true, cancelable: true, clientX: rect.left + 4, clientY: (rect.top + rect.bottom) / 2 })
    );
    expect(el.shadowRoot!.activeElement).toBe(dateInput);
  });
});

// ─── Mask guide & placeholder ────────────────────────────────────────────────

describe('DateTimeField / mask guide and placeholder', () => {
  it('should rest without a guide when empty and unfocused', async () => {
    const screen = render(html`<forge-date-time-field label="When"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    expect(getDateInput(el).value).toBe('');
  });

  it('should reveal the format guide on focus', async () => {
    const screen = render(html`<forge-date-time-field label="When"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    getDateInput(el).focus();
    await ready(el);
    expect(getDateInput(el).value).toContain('/');
  });

  it('should show the guide when a value is present', async () => {
    const screen = render(html`<forge-date-time-field></forge-date-time-field>`);
    const el = getField(screen.container);
    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    expect(getDateInput(el).value).toContain('/');
  });

  it('should suppress the placeholder attribute for an inset label', async () => {
    const screen = render(html`<forge-date-time-field label="When" placeholder="Pick a date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    expect(getDateInput(el).placeholder).toBe('');
  });

  it('should show the placeholder for a non-inset label at rest', async () => {
    const screen = render(html`<forge-date-time-field label="When" label-position="block-start" placeholder="Pick a date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    expect(getDateInput(el).value).toBe('');
    expect(getDateInput(el).placeholder).toBe('Pick a date');
  });

  it('should pin the guide on at rest when persist-mask is set', async () => {
    const screen = render(
      html`<forge-date-time-field label="When" label-position="block-start" placeholder="Pick a date" persist-mask></forge-date-time-field>`
    );
    const el = getField(screen.container);
    await ready(el);
    expect(getDateInput(el).value).toContain('/');
  });

  it('should fall back to per-segment format hints when no placeholder is set', async () => {
    const screen = render(html`<forge-date-time-field label="When" label-position="block-start"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    expect(getDateInput(el).placeholder).toBe('MM/DD/YYYY');
    expect(getTimeInput(el).placeholder).toContain('hh:mm');
  });
});

// ─── Linked pair ─────────────────────────────────────────────────────────────

describe('DateTimeField / linked pair (IDREF)', () => {
  it('should show the toggle button when linked to a picker in overlay mode', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1"></forge-date-time-field>
        <forge-date-time-picker id="p1"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    // Picker transitions to overlay mode when anchorElement is set by the field
    expect(picker.anchorElement).not.toBeNull();
    expect(el.shadowRoot!.querySelector('[part="toggle"]')).not.toBeNull();
  });

  it('should open the linked picker when the toggle button is clicked', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1"></forge-date-time-field>
        <forge-date-time-picker id="p1"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    (el.shadowRoot!.querySelector('[part="toggle"]') as HTMLElement).click();
    await ready(el);
    expect(picker.open).toBe(true);
    expect(el.open).toBe(true);
  });

  it('should update field value when picker emits a complete change', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1" value-mode="date"></forge-date-time-field>
        <forge-date-time-picker id="p1"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    const events: IDateTimeFieldChangeEventData[] = [];
    el.addEventListener('forge-date-time-field-change', e => events.push((e as CustomEvent<IDateTimeFieldChangeEventData>).detail));
    firePickerChange(picker, {
      value: new Date(2025, 5, 12, 9, 30),
      date: new Date(2025, 5, 12),
      time: '09:30',
      source: 'time',
      complete: true
    });
    await ready(el);
    expect(events.length).toBe(1);
    expect(events[0].complete).toBe(true);
    expect((el.value as Date).getHours()).toBe(9);
  });

  it('should close the picker when a complete selection is made via time source', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1" value-mode="date"></forge-date-time-field>
        <forge-date-time-picker id="p1"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    (el.shadowRoot!.querySelector('[part="toggle"]') as HTMLElement).click();
    await ready(el);
    expect(picker.open).toBe(true);
    firePickerChange(picker, {
      value: new Date(2025, 5, 12, 9, 30),
      date: new Date(2025, 5, 12),
      time: '09:30',
      source: 'time',
      complete: true
    });
    await ready(el);
    expect(picker.open).toBe(false);
    expect(el.open).toBe(false);
  });

  it('should sync field value to picker when value is set programmatically', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1" value-mode="date"></forge-date-time-field>
        <forge-date-time-picker id="p1" value-mode="date"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    expect((picker.value as Date)?.getHours()).toBe(10);
  });

  it('should resolve picker by element-ref property (framework path)', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field></forge-date-time-field>
        <forge-date-time-picker></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelector('[part="toggle"]')).toBeNull();
    el.pickerElement = picker;
    await ready(el);
    expect(el.shadowRoot!.querySelector('[part="toggle"]')).not.toBeNull();
  });

  it('should sync an already-set field value to the picker when linked via pickerElement', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field value-mode="date"></forge-date-time-field>
        <forge-date-time-picker value-mode="date"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    el.pickerElement = picker;
    await ready(el);
    expect((picker.value as Date).getHours()).toBe(10);
  });

  it('should warn when field time-mode and picker time-mode disagree', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1" time-mode="single"></forge-date-time-field>
        <forge-date-time-picker id="p1" time-mode="range"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    await ready(el);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('time-mode'));
    warnSpy.mockRestore();
  });

  it('should behave as unlinked and not render toggle when picker ID does not resolve', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const screen = render(html`<forge-date-time-field picker="nonexistent"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelector('[part="toggle"]')).toBeNull();
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('nonexistent'));
    warnSpy.mockRestore();
  });

  it('should not open picker when field is disabled', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1" disabled></forge-date-time-field>
        <forge-date-time-picker id="p1"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    el.open = true;
    await ready(el);
    expect(picker.open).toBe(false);
  });

  it('should dispatch forge-date-time-field-open when the toggle opens the picker', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1"></forge-date-time-field>
        <forge-date-time-picker id="p1"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    await ready(el);
    const opens: string[] = [];
    el.addEventListener('forge-date-time-field-open', () => opens.push('open'));
    (el.shadowRoot!.querySelector('[part="toggle"]') as HTMLElement).click();
    await ready(el);
    expect(opens).toEqual(['open']);
  });

  it('should dispatch exactly one forge-date-time-field-close when a complete selection auto-closes the picker', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1" value-mode="date"></forge-date-time-field>
        <forge-date-time-picker id="p1"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    (el.shadowRoot!.querySelector('[part="toggle"]') as HTMLElement).click();
    await ready(el);
    expect(picker.open).toBe(true);
    const closes: string[] = [];
    el.addEventListener('forge-date-time-field-close', () => closes.push('close'));
    firePickerChange(picker, {
      value: new Date(2025, 5, 12, 9, 30),
      date: new Date(2025, 5, 12),
      time: '09:30',
      source: 'time',
      complete: true
    });
    await ready(el);
    expect(picker.open).toBe(false);
    expect(closes).toEqual(['close']);
  });
});

// ─── Value + events ──────────────────────────────────────────────────────────

describe('DateTimeField / value + events (standalone)', () => {
  it('should fire forge-date-time-field-change when typed entry produces a complete value', async () => {
    const screen = render(html`<forge-date-time-field value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    const events: IDateTimeFieldChangeEventData[] = [];
    el.addEventListener('forge-date-time-field-change', e => events.push((e as CustomEvent<IDateTimeFieldChangeEventData>).detail));
    // Simulate typing via quick key to set a date+time
    const dateInput = getDateInput(el);
    dateInput.focus();
    dateInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'n', bubbles: true }));
    await ready(el);
    expect(events.length).toBeGreaterThan(0);
    expect(events[events.length - 1].complete).toBe(true);
  });
});

// ─── Value modes ──────────────────────────────────────────────────────────────

describe('DateTimeField / value modes', () => {
  it('should expose value as a Temporal.PlainDateTime in temporal mode', async () => {
    const screen = render(html`<forge-date-time-field value-mode="temporal"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    const value = el.value as unknown as Temporal.PlainDateTime;
    expect(value.year).toBe(2025);
    expect(value.hour).toBe(10);
  });

  it('should round-trip a datetime-local string in iso mode', async () => {
    const screen = render(html`<forge-date-time-field value-mode="iso"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = '2025-06-12T10:30';
    await ready(el);
    expect(el.value).toBe('2025-06-12T10:30');
  });
});

// ─── Range + slots ────────────────────────────────────────────────────────────

describe('DateTimeField / range + slots modes', () => {
  it('should round-trip a {from,to} value in range mode', async () => {
    const screen = render(html`<forge-date-time-field time-mode="range" value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = { from: new Date(2025, 5, 12, 9, 0), to: new Date(2025, 5, 12, 17, 0) };
    await ready(el);
    const v = el.value as { from: Date; to: Date };
    expect(v.from.getHours()).toBe(9);
    expect(v.to.getHours()).toBe(17);
  });

  it('should be invalid when required and no range value is set', async () => {
    const screen = render(html`<forge-date-time-field time-mode="range" required></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    expect(el.checkValidity()).toBe(false);
    expect(el.validity.valueMissing).toBe(true);
  });
});

// ─── Min / max validity ───────────────────────────────────────────────────────

describe('DateTimeField / min-max validity', () => {
  it('should flag rangeUnderflow when the value is before min', async () => {
    const screen = render(html`<forge-date-time-field value-mode="date" min="2025-06-12T09:00"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = new Date(2025, 5, 12, 8, 0);
    await ready(el);
    expect(el.validity.rangeUnderflow).toBe(true);
    expect(el.checkValidity()).toBe(false);
  });

  it('should flag rangeOverflow when the value is after max', async () => {
    const screen = render(html`<forge-date-time-field value-mode="date" max="2025-06-12T17:00"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = new Date(2025, 5, 12, 18, 0);
    await ready(el);
    expect(el.validity.rangeOverflow).toBe(true);
  });

  it('should be valid when the value is within min/max', async () => {
    const screen = render(html`<forge-date-time-field value-mode="date" min="2025-06-12T09:00" max="2025-06-12T17:00"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = new Date(2025, 5, 12, 10, 0);
    await ready(el);
    expect(el.checkValidity()).toBe(true);
  });
});

// ─── Quick keys ───────────────────────────────────────────────────────────────

describe('DateTimeField / quick keys', () => {
  it('should set value to the current date and time when "n" is pressed', async () => {
    const screen = render(html`<forge-date-time-field value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
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

  it('should fill the date segment with today when "t" is pressed', async () => {
    const screen = render(html`<forge-date-time-field value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    getDateInput(el).dispatchEvent(new KeyboardEvent('keydown', { key: 't', bubbles: true }));
    await ready(el);
    expect(getDateInput(el).value).toContain(String(new Date().getFullYear()));
  });

  it('should not trigger quick keys when readonly', async () => {
    const screen = render(html`<forge-date-time-field readonly></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    getDateInput(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'n', bubbles: true }));
    await ready(el);
    expect(el.value).toBeNull();
  });
});

// ─── Keyboard interaction ───────────────────────────────────────────────────

describe('DateTimeField / keyboard interaction', () => {
  it('should never place the calendar toggle in the tab order', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1"></forge-date-time-field>
        <forge-date-time-picker id="p1"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    await ready(el);
    const toggle = el.shadowRoot!.querySelector('[part="toggle"]') as HTMLElement;
    expect(toggle.getAttribute('tabindex')).toBe('-1');
  });

  it('should open the linked picker when ArrowDown is pressed in a masked input', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1"></forge-date-time-field>
        <forge-date-time-picker id="p1"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    getDateInput(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await ready(el);
    expect(picker.open).toBe(true);
    expect(el.open).toBe(true);
  });

  it('should move focus back to the date input when Backspace is pressed at the start of the time input', async () => {
    const screen = render(html`<forge-date-time-field></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    const dateInput = getDateInput(el);
    const timeInput = getTimeInput(el);
    timeInput.focus();
    timeInput.setSelectionRange(0, 0);
    timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true }));
    await ready(el);
    expect(el.shadowRoot!.activeElement).toBe(dateInput);
  });

  it('should move focus back to the date input when ArrowLeft is pressed at the start of the time input', async () => {
    const screen = render(html`<forge-date-time-field></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    const dateInput = getDateInput(el);
    const timeInput = getTimeInput(el);
    timeInput.focus();
    timeInput.setSelectionRange(0, 0);
    timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }));
    await ready(el);
    expect(el.shadowRoot!.activeElement).toBe(dateInput);
  });

  it('should not move focus when ArrowLeft is pressed elsewhere in the time input', async () => {
    // show-mask keeps the guide text present so the caret can sit mid-segment (position 2).
    const screen = render(html`<forge-date-time-field show-mask></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    const timeInput = getTimeInput(el);
    timeInput.focus();
    timeInput.setSelectionRange(2, 2);
    timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }));
    await ready(el);
    expect(el.shadowRoot!.activeElement).toBe(timeInput);
  });

  it('should move focus to the time input when ArrowRight is pressed at the end of a complete date input', async () => {
    const screen = render(html`<forge-date-time-field value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    const dateInput = getDateInput(el);
    const timeInput = getTimeInput(el);
    dateInput.focus();
    const end = dateInput.value.length;
    dateInput.setSelectionRange(end, end);
    dateInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }));
    await ready(el);
    expect(el.shadowRoot!.activeElement).toBe(timeInput);
  });

  it('should advance focus to the time input once the date segment is completed while focused', async () => {
    const screen = render(html`<forge-date-time-field value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    const dateInput = getDateInput(el);
    dateInput.focus();
    dateInput.dispatchEvent(new KeyboardEvent('keydown', { key: 't', bubbles: true }));
    await ready(el);
    expect(el.shadowRoot!.activeElement).toBe(getTimeInput(el));
  });
});

// ─── Form association ─────────────────────────────────────────────────────────

describe('DateTimeField / form association', () => {
  it('should contribute an ISO string to FormData when a value is set', async () => {
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

  it('should be invalid when required and empty, valid when a value is set', async () => {
    const screen = render(html`<forge-date-time-field name="appt" required></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    expect(el.checkValidity()).toBe(false);
    expect(el.validity.valueMissing).toBe(true);
    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    expect(el.checkValidity()).toBe(true);
  });

  it('should be satisfied by a date alone when required-parts is "date"', async () => {
    const screen = render(
      html`<forge-date-time-field picker="p1" required required-parts="date"></forge-date-time-field><forge-date-time-picker id="p1"></forge-date-time-picker>`
    );
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    firePickerChange(picker, { date: new Date(2025, 5, 12), time: null, complete: false });
    await ready(el);
    expect(el.checkValidity()).toBe(true);
  });

  it('should report "Time is required." when required-parts is "time" and only a date is set', async () => {
    const screen = render(
      html`<forge-date-time-field picker="p1" required required-parts="time"></forge-date-time-field><forge-date-time-picker id="p1"></forge-date-time-picker>`
    );
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    firePickerChange(picker, { date: new Date(2025, 5, 12), time: null, complete: false });
    await ready(el);
    expect(el.validity.valueMissing).toBe(true);
    expect(el.validationMessage).toBe('Time is required.');
  });

  it('should clear the value on form reset', async () => {
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

// ─── Date-mode range ──────────────────────────────────────────────────────────

describe('DateTimeField / date-mode range', () => {
  it('should render two date inputs when date-mode is range', async () => {
    const screen = render(html`<forge-date-time-field date-mode="range" time-mode="range"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelector('[part="date-input"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('[part="to-date-input"]')).not.toBeNull();
  });

  it('should render one date input when date-mode is single', async () => {
    const screen = render(html`<forge-date-time-field date-mode="single" time-mode="range"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelector('[part="date-input"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('[part="to-date-input"]')).toBeNull();
  });

  it('should reflect a two-date range value into both date masks when set programmatically', async () => {
    const screen = render(html`<forge-date-time-field date-mode="range" time-mode="range" value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = { from: new Date(2025, 5, 9, 9, 0), to: new Date(2025, 5, 12, 17, 0) };
    await ready(el);
    const dateInput = el.shadowRoot!.querySelector('[part="date-input"]') as HTMLInputElement;
    const toDateInput = el.shadowRoot!.querySelector('[part="to-date-input"]') as HTMLInputElement;
    expect(dateInput.value).toContain('06/09/2025');
    expect(toDateInput.value).toContain('06/12/2025');
  });

  it('should produce a {from,to} with distinct dates from typed entry', async () => {
    const screen = render(html`<forge-date-time-field date-mode="range" time-mode="range" value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    const events: IDateTimeFieldChangeEventData[] = [];
    el.addEventListener('forge-date-time-field-change', e => events.push((e as CustomEvent<IDateTimeFieldChangeEventData>).detail));
    el.value = { from: new Date(2025, 5, 9, 9, 0), to: new Date(2025, 5, 12, 17, 0) };
    await ready(el);
    const v = el.value as { from: Date; to: Date };
    expect(v.from.getDate()).toBe(9);
    expect(v.to.getDate()).toBe(12);
    expect(v.from.getMonth()).toBe(5);
    expect(v.to.getMonth()).toBe(5);
  });

  it('should keep same-day time-range working when date-mode=single, time-mode=range', async () => {
    const screen = render(html`<forge-date-time-field date-mode="single" time-mode="range" value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = { from: new Date(2025, 5, 12, 9, 0), to: new Date(2025, 5, 12, 17, 0) };
    await ready(el);
    const v = el.value as { from: Date; to: Date };
    expect(v.from.getDate()).toBe(12);
    expect(v.to.getDate()).toBe(12);
    expect(v.from.getHours()).toBe(9);
    expect(v.to.getHours()).toBe(17);
    expect(el.shadowRoot!.querySelector('[part="to-date-input"]')).toBeNull();
  });
});

// ─── End-after-start validation ───────────────────────────────────────────────

describe('DateTimeField / end-after-start validation', () => {
  it('should flag customError with message "End must be after start." when end is before start', async () => {
    const screen = render(html`<forge-date-time-field date-mode="range" time-mode="range" value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = { from: new Date('2024-06-12T17:00:00'), to: new Date('2024-06-09T09:00:00') };
    await ready(el);
    expect(el.validity.customError).toBe(true);
    expect(el.validationMessage).toBe('End must be after start.');
    expect(el.checkValidity()).toBe(false);
  });

  it('should be valid when end is after start or equal', async () => {
    const screen = render(html`<forge-date-time-field date-mode="range" time-mode="range" value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = { from: new Date('2024-06-09T09:00:00'), to: new Date('2024-06-12T17:00:00') };
    await ready(el);
    expect(el.validity.customError).toBe(false);
    expect(el.checkValidity()).toBe(true);
    el.value = { from: new Date('2024-06-12T09:00:00'), to: new Date('2024-06-12T09:00:00') };
    await ready(el);
    expect(el.validity.customError).toBe(false);
    expect(el.checkValidity()).toBe(true);
  });

  it('should report valueMissing (not customError) when one range end date is empty and required', async () => {
    const screen = render(html`<forge-date-time-field date-mode="range" time-mode="range" required value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    const dateInput = el.shadowRoot!.querySelector('[part="date-input"]') as HTMLInputElement;
    dateInput.focus();
    dateInput.dispatchEvent(new KeyboardEvent('keydown', { key: 't', bubbles: true }));
    await ready(el);
    expect(el.validity.valueMissing).toBe(true);
    expect(el.validity.customError).toBe(false);
    expect(el.checkValidity()).toBe(false);
  });

  it('should keep single-mode validity unchanged when required and empty (regression)', async () => {
    const screen = render(html`<forge-date-time-field required value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    expect(el.validity.valueMissing).toBe(true);
    expect(el.validity.customError).toBe(false);
  });
});

// ─── T-F5: Duration chip ──────────────────────────────────────────────────────

describe('DateTimeField / duration chip (T-F5)', () => {
  it('should display a duration summary on the closed field when a multi-day range is committed', async () => {
    const screen = render(html`<forge-date-time-field date-mode="range" time-mode="range" value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = { from: new Date(2025, 5, 12, 9, 0), to: new Date(2025, 5, 15, 17, 0) };
    await ready(el);
    const chip = el.shadowRoot!.querySelector('[part="duration"]');
    expect(chip).not.toBeNull();
    expect(chip!.textContent).toMatch(/3\s*day/);
    expect(chip!.textContent).toMatch(/8\s*hour/);
  });

  it('should NOT display a duration chip for a single (scalar) value', async () => {
    const screen = render(html`<forge-date-time-field value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = new Date(2025, 5, 12, 9, 0);
    await ready(el);
    expect(el.shadowRoot!.querySelector('[part="duration"]')).toBeNull();
  });

  it('should update the duration text when the range value changes', async () => {
    const screen = render(html`<forge-date-time-field date-mode="range" time-mode="range" value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = { from: new Date(2025, 5, 12, 9, 0), to: new Date(2025, 5, 15, 17, 0) };
    await ready(el);
    const firstText = el.shadowRoot!.querySelector('[part="duration"]')!.textContent;
    el.value = { from: new Date(2025, 5, 12, 9, 0), to: new Date(2025, 5, 13, 9, 0) };
    await ready(el);
    const secondText = el.shadowRoot!.querySelector('[part="duration"]')!.textContent;
    expect(secondText).not.toBe(firstText);
    expect(secondText).toMatch(/1\s*day/);
  });

  it('should not display the duration chip when end is before start (invalid range)', async () => {
    const screen = render(html`<forge-date-time-field date-mode="range" time-mode="range" value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = { from: new Date(2025, 5, 15, 17, 0), to: new Date(2025, 5, 12, 9, 0) };
    await ready(el);
    expect(el.shadowRoot!.querySelector('[part="duration"]')).toBeNull();
  });
});

// ─── T-F4: Link contract under deferred commit ────────────────────────────────

describe('DateTimeField / link contract (T-F4)', () => {
  it('should update field value and reflect both date masks and time masks when picker fires a complete two-date range change', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1" date-mode="range" time-mode="range" value-mode="date"></forge-date-time-field>
        <forge-date-time-picker id="p1" date-mode="range" time-mode="range"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    const from = new Date(2026, 5, 9, 9, 0);
    const to = new Date(2026, 5, 12, 17, 0);
    firePickerChange(picker, { value: { from, to }, source: 'apply', complete: true });
    await ready(el);
    const v = el.value as { from: Date; to: Date };
    expect(v.from.getDate()).toBe(9);
    expect(v.to.getDate()).toBe(12);
    const dateInput = el.shadowRoot!.querySelector('[part="date-input"]') as HTMLInputElement;
    const toDateInput = el.shadowRoot!.querySelector('[part="to-date-input"]') as HTMLInputElement;
    expect(dateInput.value).toContain('06/09/2026');
    expect(toDateInput.value).toContain('06/12/2026');
    const fromInput = el.shadowRoot!.querySelector('[part="from-input"]') as HTMLInputElement;
    const toInput = el.shadowRoot!.querySelector('[part="to-input"]') as HTMLInputElement;
    expect(fromInput.value).toMatch(/\d/);
    expect(toInput.value).toMatch(/\d/);
  });

  it('should close the linked picker when an Apply (complete) change arrives', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1" date-mode="range" time-mode="range" value-mode="date"></forge-date-time-field>
        <forge-date-time-picker id="p1" date-mode="range" time-mode="range"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    (el.shadowRoot!.querySelector('[part="toggle"]') as HTMLElement).click();
    await ready(el);
    expect(picker.open).toBe(true);
    firePickerChange(picker, {
      value: { from: new Date(2026, 5, 9, 9, 0), to: new Date(2026, 5, 12, 17, 0) },
      source: 'apply',
      complete: true
    });
    await ready(el);
    expect(picker.open).toBe(false);
    expect(el.open).toBe(false);
  });

  it('should not push field value into the picker while the picker is open', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1" value-mode="date"></forge-date-time-field>
        <forge-date-time-picker id="p1" value-mode="date"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    const initial = new Date(2026, 5, 1, 10, 0);
    picker.value = initial;
    await ready(el);
    (el.shadowRoot!.querySelector('[part="toggle"]') as HTMLElement).click();
    await ready(el);
    expect(el.open).toBe(true);
    const dateInput = el.shadowRoot!.querySelector('[part="date-input"]') as HTMLInputElement;
    dateInput.dispatchEvent(new KeyboardEvent('keydown', { key: 't', bubbles: true }));
    await ready(el);
    expect((picker.value as Date)?.getTime()).toBe(initial.getTime());
  });

  it('should warn when field date-mode and picker date-mode disagree', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1" date-mode="range"></forge-date-time-field>
        <forge-date-time-picker id="p1" date-mode="single"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    await ready(el);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('date-mode'));
    warnSpy.mockRestore();
  });

  it('should fire exactly one field change per picker change', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1" date-mode="range" time-mode="range" value-mode="date"></forge-date-time-field>
        <forge-date-time-picker id="p1" date-mode="range" time-mode="range"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    const events: IDateTimeFieldChangeEventData[] = [];
    el.addEventListener('forge-date-time-field-change', e => events.push((e as CustomEvent<IDateTimeFieldChangeEventData>).detail));
    firePickerChange(picker, {
      value: { from: new Date(2026, 5, 9, 9, 0), to: new Date(2026, 5, 12, 17, 0) },
      source: 'apply',
      complete: true
    });
    await ready(el);
    expect(events.length).toBe(1);
  });
});

// ─── Form value + restore round-trip ────────────────────────────────────────

describe('DateTimeField / form value + restore round-trip', () => {
  it('should contribute distinct .from and .to ISO datetimes to FormData for a multi-day range', async () => {
    const screen = render(
      html`<form>
        <forge-date-time-field name="appt" date-mode="range" time-mode="range" value-mode="date"></forge-date-time-field>
      </form>`
    );
    const form = screen.container.querySelector('form') as HTMLFormElement;
    const el = form.querySelector('forge-date-time-field') as IDateTimeFieldComponent;
    await ready(el);
    el.value = { from: new Date(2025, 5, 9, 9, 0), to: new Date(2025, 5, 12, 17, 0) };
    await ready(el);
    const fd = new FormData(form);
    const fromStr = fd.get('appt.from') as string;
    const toStr = fd.get('appt.to') as string;
    expect(typeof fromStr).toBe('string');
    expect(typeof toStr).toBe('string');
    expect(fromStr).toContain('2025');
    expect(toStr).toContain('2025');
    const fromDate = new Date(fromStr);
    const toDate = new Date(toStr);
    expect(fromDate.getDate()).not.toBe(toDate.getDate());
    expect(fromDate.getDate()).toBe(9);
    expect(toDate.getDate()).toBe(12);
  });

  it('should restore a two-date range from form state via formStateRestoreCallback', async () => {
    const screen = render(
      html`<form>
        <forge-date-time-field name="appt" date-mode="range" time-mode="range" value-mode="date"></forge-date-time-field>
      </form>`
    );
    const form = screen.container.querySelector('form') as HTMLFormElement;
    const el = form.querySelector('forge-date-time-field') as IDateTimeFieldComponent;
    await ready(el);
    const state = new FormData();
    state.append('appt.from', new Date(2025, 5, 9, 9, 0).toISOString());
    state.append('appt.to', new Date(2025, 5, 12, 17, 0).toISOString());
    el.formStateRestoreCallback(state);
    await ready(el);
    const v = el.value as { from: Date; to: Date };
    expect(v).not.toBeNull();
    expect(v.from).toBeInstanceOf(Date);
    expect(v.to).toBeInstanceOf(Date);
    expect(v.from.getDate()).toBe(9);
    expect(v.to.getDate()).toBe(12);
    expect(v.from.getDate()).not.toBe(v.to.getDate());
  });
});

// ─── Orthogonal modes ────────────────────────────────────────────────────────

describe('DateTimeField / orthogonal modes', () => {
  it('should be a scalar Date when date-mode=single and time-mode=single', async () => {
    const screen = render(html`<forge-date-time-field date-mode="single" time-mode="single" value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = new Date(2025, 5, 12, 10, 30);
    await ready(el);
    expect(el.value).toBeInstanceOf(Date);
    expect((el.value as Date).getFullYear()).toBe(2025);
  });

  it('should be a {from,to} with same day and two times when date-mode=single, time-mode=range', async () => {
    const screen = render(html`<forge-date-time-field date-mode="single" time-mode="range" value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = { from: new Date(2025, 5, 12, 9, 0), to: new Date(2025, 5, 12, 17, 0) };
    await ready(el);
    const v = el.value as { from: Date; to: Date };
    expect(v.from).toBeInstanceOf(Date);
    expect(v.to).toBeInstanceOf(Date);
    expect(v.from.getDate()).toBe(v.to.getDate());
    expect(v.from.getHours()).toBe(9);
    expect(v.to.getHours()).toBe(17);
  });

  it('should be a {from,to} with two days and one shared time when date-mode=range, time-mode=single', async () => {
    const screen = render(html`<forge-date-time-field date-mode="range" time-mode="single" value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = { from: new Date(2025, 5, 9, 9, 0), to: new Date(2025, 5, 12, 9, 0) };
    await ready(el);
    const v = el.value as { from: Date; to: Date };
    expect(v.from).toBeInstanceOf(Date);
    expect(v.to).toBeInstanceOf(Date);
    expect(v.from.getDate()).not.toBe(v.to.getDate());
    expect(v.from.getDate()).toBe(9);
    expect(v.to.getDate()).toBe(12);
    expect(v.from.getHours()).toBe(v.to.getHours());
    expect(el.shadowRoot!.querySelector('[part="to-date-input"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('[part="time-input"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('[part="from-input"]')).toBeNull();
  });

  it('should be a {from,to} with two days and two times when date-mode=range, time-mode=range', async () => {
    const screen = render(html`<forge-date-time-field date-mode="range" time-mode="range" value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    el.value = { from: new Date(2025, 5, 9, 9, 0), to: new Date(2025, 5, 12, 17, 0) };
    await ready(el);
    const v = el.value as { from: Date; to: Date };
    expect(v.from.getDate()).toBe(9);
    expect(v.to.getDate()).toBe(12);
    expect(v.from.getHours()).toBe(9);
    expect(v.to.getHours()).toBe(17);
    expect(el.shadowRoot!.querySelector('[part="to-date-input"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('[part="from-input"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('[part="to-input"]')).not.toBeNull();
  });

  it('should remain usable standalone (unlinked) in date-mode=range', async () => {
    const screen = render(html`<forge-date-time-field date-mode="range" time-mode="single" value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    expect(el.shadowRoot!.querySelector('[part="toggle"]')).toBeNull();
    el.value = { from: new Date(2025, 5, 9, 10, 0), to: new Date(2025, 5, 12, 10, 0) };
    await ready(el);
    expect(el.checkValidity()).toBe(true);
    const v = el.value as { from: Date; to: Date };
    expect(v.from.getDate()).toBe(9);
    expect(v.to.getDate()).toBe(12);
  });
});

// ─── Review fixes ────────────────────────────────────────────────────────────

describe('DateTimeField / review fixes', () => {
  it('should be valid when a complete date-range + single time is typed (date-mode=range, time-mode=single, required)', async () => {
    const screen = render(html`<forge-date-time-field date-mode="range" time-mode="single" required value-mode="date"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    const dateInput = el.shadowRoot!.querySelector('[part="date-input"]') as HTMLInputElement;
    const toDateInput = el.shadowRoot!.querySelector('[part="to-date-input"]') as HTMLInputElement;
    const timeInput = getTimeInput(el);
    dateInput.focus();
    dateInput.dispatchEvent(new KeyboardEvent('keydown', { key: 't', bubbles: true }));
    await ready(el);
    toDateInput.focus();
    toDateInput.dispatchEvent(new KeyboardEvent('keydown', { key: 't', bubbles: true }));
    await ready(el);
    timeInput.focus();
    timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'n', bubbles: true }));
    await ready(el);
    expect(el.value).not.toBeNull();
    expect(el.validity.valueMissing).toBe(false);
    expect(el.checkValidity()).toBe(true);
  });

  it('should report "Time is required." (not a missing date) when a linked picker reports both range dates but no time', async () => {
    const screen = render(
      html`<div>
        <forge-date-time-field picker="p1" date-mode="range" time-mode="single" required value-mode="date"></forge-date-time-field>
        <forge-date-time-picker id="p1" date-mode="range" time-mode="single"></forge-date-time-picker>
      </div>`
    );
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    firePickerChange(picker, {
      date: new Date(2026, 5, 9),
      dateTo: new Date(2026, 5, 12),
      time: null,
      complete: false
    });
    await ready(el);
    expect(el.validity.valueMissing).toBe(true);
    expect(el.validationMessage).toBe('Time is required.');
  });

  it('should expose aria-expanded on the toggle reflecting the picker open state', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1"></forge-date-time-field>
        <forge-date-time-picker id="p1"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    await ready(el);
    const toggle = el.shadowRoot!.querySelector('[part="toggle"]') as HTMLElement;
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    toggle.click();
    await ready(el);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });

  it('should forward a range value to a mode-mismatched picker instead of coercing it to null', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1" date-mode="range" time-mode="single" value-mode="date"></forge-date-time-field>
        <forge-date-time-picker id="p1"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    el.value = { from: new Date(2026, 5, 9, 9, 0), to: new Date(2026, 5, 12, 9, 0) };
    await ready(el);
    const pickerValue = picker.value as { from: Date; to: Date } | null;
    expect(pickerValue).not.toBeNull();
    expect(pickerValue!.from.getDate()).toBe(9);
    expect(pickerValue!.to.getDate()).toBe(12);
    warnSpy.mockRestore();
  });

  it('should close a linked picker when it is unlinked while open', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1"></forge-date-time-field>
        <forge-date-time-picker id="p1"></forge-date-time-picker>
        <forge-date-time-picker id="p2"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    const p1 = screen.container.querySelector('#p1') as IDateTimePickerComponent;
    const p2 = screen.container.querySelector('#p2') as IDateTimePickerComponent;
    await ready(el);
    (el.shadowRoot!.querySelector('[part="toggle"]') as HTMLElement).click();
    await ready(el);
    expect(p1.open).toBe(true);
    el.pickerElement = p2;
    await ready(el);
    expect(p1.open).toBe(false);
  });

  it('should disable and close the linked picker when the field becomes disabled', async () => {
    const screen = render(html`
      <div>
        <forge-date-time-field picker="p1"></forge-date-time-field>
        <forge-date-time-picker id="p1"></forge-date-time-picker>
      </div>
    `);
    const el = getField(screen.container);
    const picker = getPicker(screen.container);
    await ready(el);
    (el.shadowRoot!.querySelector('[part="toggle"]') as HTMLElement).click();
    await ready(el);
    expect(picker.open).toBe(true);
    el.disabled = true;
    await ready(el);
    expect(picker.disabled).toBe(true);
    expect(picker.open).toBe(false);
  });

  it('should give the role=group host an accessible name from the label', async () => {
    const screen = render(html`<forge-date-time-field label="Appointment"></forge-date-time-field>`);
    const el = getField(screen.container);
    await ready(el);
    expect(el.getAttribute('role')).toBe('group');
    expect(el.getAttribute('aria-label')).toBe('Appointment');
  });
});
