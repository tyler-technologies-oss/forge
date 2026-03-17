import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { getShadowElement } from '@tylertech/forge-core';
import { task, frame } from '../core/utils/utils.js';
import { DEFAULT_DATE_MASK, parseDateString, formatDate } from '../core/index.js';
import { CALENDAR_CONSTANTS, DateRange } from '../calendar/index.js';
import type { ICalendarComponent, IDateRange } from '../calendar/index.js';
import { POPOVER_CONSTANTS } from '../popover/index.js';
import type { IPopoverComponent } from '../popover/index.js';
import { DatePickerRange, DATE_RANGE_PICKER_CONSTANTS, defineDateRangePickerComponent } from './index.js';
import type { IDateRangePickerComponent, IDateRangePickerCore, IDateRangePickerAdapter } from './index.js';
import { defineTextFieldComponent, TEXT_FIELD_CONSTANTS } from '../text-field/index.js';
import type { ITextFieldComponent } from '../text-field/index.js';
import { ICON_BUTTON_CONSTANTS } from '../icon-button/index.js';
import { BASE_DATE_PICKER_CONSTANTS } from '../date-picker/base/base-date-picker-constants.js';
import type { IButtonComponent } from '../button/index.js';

// Popover animation duration (200ms) + buffer
const POPOVER_ANIMATION_DURATION = 200;

type DateRangePickerAdapterInternal = IDateRangePickerAdapter & { _identifier: string };
type DateRangePickerCoreWithAdapter = IDateRangePickerCore & { _adapter: DateRangePickerAdapterInternal; _isInitialized: boolean };
type DateRangePickerWithCore = IDateRangePickerComponent & { _core: DateRangePickerCoreWithAdapter };

interface IDateRangePickerHarness {
  component: DateRangePickerWithCore;
  append(): void;
  destroy(): void;
}

let harness: IDateRangePickerHarness | null = null;

describe('DateRangePickerComponent', () => {
  beforeAll(() => {
    defineDateRangePickerComponent();
    defineTextFieldComponent();
  });

  afterEach(() => {
    if (harness) {
      const popup = getPopup(harness.component);
      if (popup) {
        popup.remove();
      }
      harness.destroy();
      harness = null;
    }
  });

  describe('with imperative creation', () => {
    it('should initialize with default values', () => {
      harness = setupTestContext(true);
      expectDefaultValues(harness.component);
    });

    it('should wait for input element to initialize', async () => {
      harness = setupTestContext(true, false, false);

      await frame();

      expect(harness.component['_core']['_isInitialized']).toBe(false);

      await task(100);
      harness.component.appendChild(createFromElement());
      harness.component.appendChild(createToElement());
      await frame();

      expect(harness.component['_core']['_isInitialized']).toBe(true);
    });

    it('should render with initial date', () => {
      harness = setupTestContext();
      const date = new Date();
      const formattedDate = formatDate(date);
      harness.component.from = date;
      harness.append();

      expect(harness.component.from).toEqual(date);
      expect(getFromElement(harness.component).value).toBe(formattedDate);

      openPopup(harness.component);
      const calendar = getCalendar(harness.component);

      expect((calendar.value as IDateRange).from).toEqual(date);
    });

    it('should preserve timestamp from date value after initialization', async () => {
      harness = setupTestContext();
      const fromStr = '2024-01-01T10:17:23.000Z';
      const from = new Date(fromStr);
      const toStr = '2024-01-05T07:15:43.000Z';
      const to = new Date(toStr);
      harness.component.value = { from, to };
      harness.append();
      await frame();

      expect((harness.component.value.from as Date).toISOString()).toBe(fromStr);
      expect((harness.component.value.to as Date).toISOString()).toBe(toStr);
    });

    it('should automatically render a toggle button with a Forge text-field component', () => {
      harness = setupTestContext(false, false, false, false);

      const textField = document.createElement(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
      textField.appendChild(createFromElement());
      textField.appendChild(createToElement());
      harness.component.appendChild(textField);
      harness.append();

      const toggleButton = harness.component.querySelector(ICON_BUTTON_CONSTANTS.elementName) as HTMLElement;

      expect(toggleButton).not.toBeNull();
      expect(toggleButton.slot).toBe('end');
    });

    it('should allow for setting all property values before being placed in DOM', () => {
      harness = setupTestContext();

      const value = new Date('01/01/2020');
      const minDate = new Date('01/01/1990');
      const maxDate = new Date('12/31/2030');
      const disabledDates = [new Date('01/05/2020')];
      harness.component.from = value;
      harness.component.min = minDate;
      harness.component.max = maxDate;
      harness.component.disabledDates = disabledDates;
      harness.component.open = true;
      harness.component.popupClasses = 'test-class';
      harness.component.disabled = true;
      harness.component.masked = true;
      harness.component.maskFormat = 'YYYY-MM-DD';
      harness.component.showMaskFormat = true;
      harness.component.valueMode = 'iso-string';

      harness.append();

      expect(harness.component.from as unknown).toBe(value.toISOString());
      expect(harness.component.min).toEqual(minDate);
      expect(harness.component.max).toEqual(maxDate);
      expect(harness.component.disabledDates).toEqual(disabledDates);
      expect(harness.component.open).toBe(false);
      expect(harness.component.popupClasses).toBe('test-class');
      expect(harness.component.disabled).toBe(true);
      expect(harness.component.masked).toBe(true);
      expect(harness.component.maskFormat).toBe('YYYY-MM-DD');
      expect(harness.component.showMaskFormat).toBe(true);
      expect(harness.component.valueMode).toBe('iso-string');
    });

    it('should allow for setting of input element value before being placed in DOM', () => {
      harness = setupTestContext();

      const date = '05/04/2020';
      const expectedDate = new Date(date);
      getFromElement(harness.component).value = date;

      harness.append();

      expect(harness.component.from).toEqual(expectedDate);
    });
  });

  describe('with static HTML', () => {
    it('should initialize with default values', () => {
      harness = setupTestContext(true);
      expectDefaultValues(harness.component);
    });

    it('should initialize ARIA attributes', () => {
      harness = setupTestContext(true);
      const fromElement = getFromElement(harness.component);
      expect(fromElement.getAttribute('autocomplete')).toBe('off');
      expect(fromElement.getAttribute('autocorrect')).toBe('off');
      expect(fromElement.getAttribute('autocapitalize')).toBe('off');
      expect(fromElement.getAttribute('spellcheck')).toBe('false');
      expect(fromElement.getAttribute('role')).toBe('combobox');
      expect(fromElement.getAttribute('aria-live')).toBe('assertive');
      expect(fromElement.getAttribute('aria-atomic')).toBe('true');
      expect(fromElement.getAttribute('aria-haspopup')).toBe('true');
      expect(fromElement.getAttribute('aria-expanded')).toBe('false');
      expect(fromElement.getAttribute('aria-owns')).toBe(getIdentifier(harness.component));
      expect(fromElement.getAttribute('aria-disabled')).toBe('false');
      expect(fromElement.hasAttribute('aria-ariactivedescendant')).toBe(false);

      const toElement = getToElement(harness.component);
      expect(toElement.getAttribute('autocomplete')).toBe('off');
      expect(toElement.getAttribute('autocorrect')).toBe('off');
      expect(toElement.getAttribute('autocapitalize')).toBe('off');
      expect(toElement.getAttribute('spellcheck')).toBe('false');
      expect(toElement.getAttribute('role')).toBe('combobox');
      expect(toElement.getAttribute('aria-live')).toBe('assertive');
      expect(toElement.getAttribute('aria-atomic')).toBe('true');
      expect(toElement.getAttribute('aria-haspopup')).toBe('true');
      expect(toElement.getAttribute('aria-expanded')).toBe('false');
      expect(toElement.getAttribute('aria-owns')).toBe(getIdentifier(harness.component));
      expect(toElement.getAttribute('aria-disabled')).toBe('false');
      expect(toElement.hasAttribute('aria-ariactivedescendant')).toBe(false);
    });

    it('should provide an aria-label on the To input if none is provided', () => {
      harness = setupTestContext(true);
      harness.component.open = true;
      expect(getToElement(harness.component).hasAttribute('aria-label')).toBe(true);
    });

    it('should open popup programmatically', () => {
      harness = setupTestContext(true);
      harness.component.open = true;
      expectPopupOpen(harness.component, true);
    });

    it('should emit open event when popup opened by user pressing arrow down key on from input', async () => {
      harness = setupTestContext(true);
      await frame();
      const openSpy = vi.fn();
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.OPEN, openSpy);
      getFromElement(harness.component).focus();
      getFromElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await frame();
      expect(openSpy).toHaveBeenCalledOnce();
    });

    it('should emit open event when popup opened by user pressing arrow down key on to input', async () => {
      harness = setupTestContext(true);
      await frame();
      const openSpy = vi.fn();
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.OPEN, openSpy);
      getToElement(harness.component).focus();
      getToElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await frame();
      expect(openSpy).toHaveBeenCalledOnce();
    });

    it('should emit open event when popup opened by user clicking toggle button', async () => {
      harness = setupTestContext(true);
      const openSpy = vi.fn();
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.OPEN, openSpy);
      getToggleElement(harness.component).dispatchEvent(new PointerEvent('mousedown'));
      await frame();
      expect(openSpy).toHaveBeenCalledOnce();
    });

    it('should not emit open event when popup opened programmatically', () => {
      harness = setupTestContext(true);
      const openSpy = vi.fn();
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.OPEN, openSpy);
      openPopup(harness.component);

      expect(openSpy).not.toHaveBeenCalled();
    });

    it('should emit close event when popup closed via escape key from input', () => {
      harness = setupTestContext(true);
      const closeSpy = vi.fn();
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(harness.component);
      getFromElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('should emit close event when popup closed via escape key to input', () => {
      harness = setupTestContext(true);
      const closeSpy = vi.fn();
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(harness.component);
      getToElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('should emit close event when popup closed via toggle click', () => {
      harness = setupTestContext(true);
      const closeSpy = vi.fn();
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(harness.component);
      getToggleElement(harness.component).dispatchEvent(new PointerEvent('mousedown'));

      expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('should emit close event when selecting date from calendar via enter key', async () => {
      harness = setupTestContext(true);
      const closeSpy = vi.fn();
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(harness.component);
      const fromElement = getFromElement(harness.component);
      fromElement.focus();
      await frame();
      fromElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fromElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      fromElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await frame();

      expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('should emit close event when selecting date from calendar with mouse', async () => {
      harness = setupTestContext(true);
      const closeSpy = vi.fn();
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(harness.component);
      const fromElement = getFromElement(harness.component);
      fromElement.focus();
      await frame();

      clickActiveDay(harness.component);
      fromElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      fromElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await frame();

      expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('should not emit close event when popup closed programmatically', () => {
      harness = setupTestContext(true);
      const closeSpy = vi.fn();
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(harness.component);
      harness.component.open = false;

      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should open when pressing down arrow key', async () => {
      harness = setupTestContext(true);
      const fromElement = getFromElement(harness.component);
      fromElement.focus();
      fromElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await frame();
      expectPopupOpen(harness.component, true);
    });

    it('should open when clicking toggle element', async () => {
      harness = setupTestContext(true);
      getToggleElement(harness.component).dispatchEvent(new PointerEvent('mousedown'));
      await frame();
      expectPopupOpen(harness.component, true);
    });

    it('should set focus to input when clicking toggle element', () => {
      harness = setupTestContext(true);
      getToggleElement(harness.component).dispatchEvent(new PointerEvent('mousedown'));
      expect(document.activeElement).toBe(getFromElement(harness.component));
    });

    it('should close popup when pressing escape key', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);
      expectPopupOpen(harness.component, true);
      getFromElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await popupCloseAnimation();
      await frame();
      expectPopupOpen(harness.component, false);
    });

    it('should set aria-activedescendant when pressing arrow key', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);

      const inputElement = getFromElement(harness.component);
      const originalValue = inputElement.getAttribute('aria-activedescendant');
      expect(inputElement.hasAttribute('aria-activedescendant')).toBe(true);
      expect(originalValue).toBeTruthy();

      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      const newValue = inputElement.getAttribute('aria-activedescendant');
      expect(inputElement.hasAttribute('aria-activedescendant')).toBe(true);
      expect(originalValue).not.toBe(newValue);
    });

    it('should change aria-activedescendant when pressing multiple arrow keys', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);
      const announcer = getAnnouncerElement(harness.component);

      getFromElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      const leftValue = getFromElement(harness.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).toBe(leftValue);

      getFromElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      const upValue = getFromElement(harness.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).toBe(upValue);

      getFromElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      const rightValue = getFromElement(harness.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).toBe(rightValue);

      getFromElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      const downValue = getFromElement(harness.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).toBe(downValue);

      expect(downValue).toBeTruthy();
      expect([leftValue, upValue, rightValue].includes(downValue)).toBe(false);
    });

    it('should emit change event when selecting date via enter key', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);
      let theEvent: CustomEvent;
      const changeSpy = vi.fn(evt => (theEvent = evt));
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      getFromElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(changeSpy).toHaveBeenCalledOnce();
      expect(harness.component.from).toEqual(theEvent!.detail.from);
    });

    it('should emit change event when selecting date via mouse', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);
      let theEvent: CustomEvent;
      const changeSpy = vi.fn(evt => (theEvent = evt));
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      await frame();
      clickActiveDay(harness.component);
      clickActiveDay(harness.component);

      await popupCloseAnimation();
      await frame();
      expectPopupOpen(harness.component, false);
      expect(changeSpy).toHaveBeenCalledTimes(2);
      expect(harness.component.from).toEqual(theEvent!.detail.from);
    });

    it('should not set date if default prevented in change event', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);
      const changeSpy = vi.fn(evt => evt.preventDefault());
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      await frame();
      clickActiveDay(harness.component);

      expect(changeSpy).toHaveBeenCalledOnce();
      expect(harness.component.from).toBeNull();
    });

    it('should emit date as string', async () => {
      harness = setupTestContext(true);
      const todayDate = new Date();
      const formattedDate = formatDate(todayDate);
      harness.component.valueMode = 'string';
      openPopup(harness.component);
      let eventDetail: DatePickerRange = new DatePickerRange();

      const changeSpy = vi.fn(evt => (eventDetail = new DatePickerRange(evt.detail)));
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      await frame();
      clickActiveDay(harness.component);

      expect(typeof eventDetail.from).toBe('string');
      expect(eventDetail.from).toBe(formattedDate);
      expect(harness.component.from).toBe(eventDetail.from as string);
    });

    it('should emit date as ISO string', async () => {
      harness = setupTestContext(true);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      harness.component.valueMode = 'iso-string';
      openPopup(harness.component);
      let eventDetail: DatePickerRange | undefined;
      const changeSpy = vi.fn(evt => (eventDetail = evt.detail));
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      await frame();
      clickActiveDay(harness.component);

      expect(typeof eventDetail).toBe('object');
      expect(eventDetail instanceof DatePickerRange).toBe(true);
      expect(eventDetail!.from).toBe(todayDate.toISOString());
      expect(harness.component.from).toBe(eventDetail!.from as string);
    });

    it('should emit change event when setting value mode', () => {
      harness = setupTestContext(true);
      const changeSpy = vi.fn();
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      harness.component.valueMode = 'string';
      harness.component.valueMode = 'iso-string';
      harness.component.valueMode = 'object';
      harness.component.valueMode = 'asdf' as unknown as 'object';

      expect(changeSpy).toHaveBeenCalledTimes(3);
    });

    it('should set value on from input', () => {
      harness = setupTestContext(true);
      const expectedDate = '05/04/2020';
      const date = new Date(expectedDate);
      harness.component.from = date;

      expect(getFromElement(harness.component).value).toBe(expectedDate);
    });

    it('should set value from input element value on "from" input', () => {
      harness = setupTestContext(true);
      const date = '05/04/2020';
      const expectedDate = new Date(date);

      const inputElement = getFromElement(harness.component);
      inputElement.value = date;
      inputElement.dispatchEvent(new Event('input'));

      expect(harness.component.from).toEqual(expectedDate);
    });

    it('should set value on "to" input', () => {
      harness = setupTestContext(true);
      const expectedDate = '05/04/2020';
      const date = new Date(expectedDate);
      harness.component.to = date;

      expect(getToElement(harness.component).value).toBe(expectedDate);
    });

    it('should set input element value on "to" input', () => {
      harness = setupTestContext(true);
      const date = '05/04/2020';
      const expectedDate = new Date(date);
      const inputElement = getToElement(harness.component);
      inputElement.value = date;
      inputElement.dispatchEvent(new Event('input'));
      inputElement.dispatchEvent(new Event('blur'));

      expect(harness.component.to).toEqual(expectedDate);
    });

    it('should format the date then the input element value is set on from input', () => {
      harness = setupTestContext(true);
      const inputElement = getFromElement(harness.component);
      inputElement.value = '01012020';
      inputElement.dispatchEvent(new Event('blur'));

      expect(getFromElement(harness.component).value).toBe('01/01/2020');
    });

    it('should format the date then the input element value is set on to input', () => {
      harness = setupTestContext(true);
      const inputElement = getToElement(harness.component);
      inputElement.value = '01012020';
      inputElement.dispatchEvent(new Event('blur'));

      expect(getToElement(harness.component).value).toBe('01/01/2020');
    });

    it('should set value in calendar', () => {
      harness = setupTestContext(true);
      const expectedDate = '01/01/2000';
      const date = new Date(expectedDate);
      harness.component.from = date;
      openPopup(harness.component);
      const calendar = getCalendar(harness.component);
      const calendarValue = calendar.value as DateRange;

      expect(getFromElement(harness.component).value).toBe(expectedDate);
      expect(calendarValue.from).toEqual(date);
    });

    it('should set min date', () => {
      harness = setupTestContext(true);
      const minDate = new Date(new Date().setHours(0, 0, 0, 0));
      harness.component.min = minDate;
      openPopup(harness.component);
      const calendar = getCalendar(harness.component);

      expect(calendar.min).toEqual(minDate);
    });

    it('should set max date via attribute', () => {
      harness = setupTestContext(true);
      const minDate = '01/01/2020';
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MIN, minDate);

      expect(harness.component.min).toEqual(new Date(minDate));
    });

    it('should set max date', () => {
      harness = setupTestContext(true);
      const maxDate = new Date(new Date().setHours(0, 0, 0, 0));
      harness.component.max = maxDate;
      openPopup(harness.component);

      const calendar = getCalendar(harness.component);
      expect(calendar.max).toEqual(maxDate);
    });

    it('should set max date via attribute', () => {
      harness = setupTestContext(true);
      const maxDate = '01/01/2020';
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MAX, maxDate);

      expect(harness.component.max).toEqual(new Date(maxDate));
    });

    it('should reject value if below min date on from input', () => {
      harness = setupTestContext(true);
      const minDate = new Date('01/01/2020');
      harness.component.min = minDate;
      harness.component.from = new Date('06/01/2000');
      expect(harness.component.from).toBeNull();
      expect(getFromElement(harness.component).value).toBe('');
    });

    it('should reject value if below min date on to input', () => {
      harness = setupTestContext(true);
      const minDate = new Date('01/01/2020');
      harness.component.min = minDate;
      harness.component.to = new Date('06/01/2000');
      expect(harness.component.to).toBeNull();
      expect(getToElement(harness.component).value).toBe('');
    });

    it('should clear value when set to null', () => {
      harness = setupTestContext(true);
      harness.component.valueMode = 'string';

      const from = '01/01/2000';
      const to = '01/10/2000';
      harness.component.value = { from: new Date(from), to: new Date(to) };

      expect(harness.component.from).toBe(from);
      expect(harness.component.to).toBe(to);

      harness.component.value = null;

      expect(harness.component.value).toEqual({ from: null, to: null } as unknown);
    });

    it('should clear value when min date is set if current value is not valid on from input', () => {
      harness = setupTestContext(true);
      const minDate = new Date('01/01/2020');
      harness.component.from = new Date('01/01/2000');

      expect(harness.component.from).not.toBeNull();
      harness.component.min = minDate;
      expect(harness.component.from).toBeNull();
      expect(getFromElement(harness.component).value).toBe('');
    });

    it('should clear value when min date is set if current value is not valid on to input', () => {
      harness = setupTestContext(true);
      const minDate = new Date('01/01/2020');
      harness.component.to = new Date('01/01/2000');

      expect(harness.component.to).not.toBeNull();
      harness.component.min = minDate;
      expect(harness.component.to).toBeNull();
      expect(getToElement(harness.component).value).toBe('');
    });

    it('should reject value if above max date from input', () => {
      harness = setupTestContext(true);
      const maxDate = new Date('01/01/2020');
      harness.component.max = maxDate;
      harness.component.from = new Date('06/01/2030');
      expect(harness.component.from).toBeNull();
      expect(getFromElement(harness.component).value).toBe('');
    });

    it('should reject value if above max date to input', () => {
      harness = setupTestContext(true);
      const maxDate = new Date('01/01/2020');
      harness.component.max = maxDate;
      harness.component.to = new Date('06/01/2030');
      expect(harness.component.to).toBeNull();
      expect(getToElement(harness.component).value).toBe('');
    });

    it('should clear value when max date is set if current value is not valid on from input', () => {
      harness = setupTestContext(true);
      const maxDate = new Date('01/01/2020');
      harness.component.from = new Date('01/01/2030');

      expect(harness.component.from).not.toBeNull();
      harness.component.max = maxDate;
      expect(harness.component.from).toBeNull();
      expect(getFromElement(harness.component).value).toBe('');
    });

    it('should clear value when max date is set if current value is not valid on to input', () => {
      harness = setupTestContext(true);
      const maxDate = new Date('01/01/2020');
      harness.component.to = new Date('01/01/2030');

      expect(harness.component.to).not.toBeNull();
      harness.component.max = maxDate;
      expect(harness.component.to).toBeNull();
      expect(getToElement(harness.component).value).toBe('');
    });

    it('should set disabled dates', () => {
      harness = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      harness.component.disabledDates = disabledDates;
      openPopup(harness.component);
      const calendar = getCalendar(harness.component);

      expect(calendar.disabledDates).toEqual(disabledDates);
    });

    it('should set disabled dates in calendar if open', () => {
      harness = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      openPopup(harness.component);
      const calendar = getCalendar(harness.component);
      harness.component.disabledDates = disabledDates;

      expect(calendar.disabledDates).toEqual(disabledDates);
    });

    it('should restrict date if matching date is disabled in from input', () => {
      harness = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      harness.component.disabledDates = disabledDates;
      harness.component.from = '01/01/2020';

      expect(harness.component.from).toBeNull();
      expect(getFromElement(harness.component).value).toBe('');
    });

    it('should restrict date if matching date is disabled in to input', () => {
      harness = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      harness.component.disabledDates = disabledDates;
      harness.component.to = '01/01/2020';

      expect(harness.component.to).toBeNull();
      expect(getToElement(harness.component).value).toBe('');
    });

    it('should clear value when disabled dates is set if current value is disabled in from input', () => {
      harness = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      harness.component.from = '01/01/2020';

      expect(harness.component.from).not.toBeNull();
      harness.component.disabledDates = disabledDates;
      expect(harness.component.from).toBeNull();
      expect(getFromElement(harness.component).value).toBe('');
    });

    it('should clear value when disabled dates is set if current value is disabled in to input', () => {
      harness = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      harness.component.to = '01/01/2020';

      expect(harness.component.to).not.toBeNull();
      harness.component.disabledDates = disabledDates;
      expect(harness.component.to).toBeNull();
      expect(getToElement(harness.component).value).toBe('');
    });

    it('should accept valid date if min, max, and disabled dates are set in from input', () => {
      harness = setupTestContext(true);
      const date = new Date('04/30/2020');
      harness.component.disabledDates = [new Date('04/25/2020')];
      harness.component.min = new Date('04/01/2020');
      harness.component.max = new Date('05/31/2020');
      harness.component.from = date;

      expect(harness.component.from).toEqual(date);
    });

    it('should accept valid date if min, max, and disabled dates are set in to input', () => {
      harness = setupTestContext(true);
      const date = new Date('04/30/2020');
      harness.component.disabledDates = [new Date('04/25/2020')];
      harness.component.min = new Date('04/01/2020');
      harness.component.max = new Date('05/31/2020');
      harness.component.to = date;

      expect(harness.component.to).toEqual(date);
    });

    it('should set value in calendar if open in from input', () => {
      harness = setupTestContext(true);
      const date = new Date();
      openPopup(harness.component);
      const calendar = getCalendar(harness.component);
      harness.component.from = date;
      const calendarValue = calendar.value as DateRange;
      expect(harness.component.from).toEqual(date);
      expect(calendarValue.from).toEqual(date);
    });

    it('should set value in calendar if open in to input', () => {
      harness = setupTestContext(true);
      const date = new Date();
      openPopup(harness.component);
      const calendar = getCalendar(harness.component);
      harness.component.to = date;

      const calendarValue = calendar.value as DateRange;
      expect(harness.component.to).toEqual(date);
      expect(calendarValue.to).toEqual(date);
    });

    it('should set from date via attribute', () => {
      harness = setupTestContext(true);
      const date = '05/04/2020';
      harness.component.setAttribute(DATE_RANGE_PICKER_CONSTANTS.observedAttributes.FROM, date);

      expect(harness.component.from).toEqual(new Date(date));
    });

    it('should set to date via attribute', () => {
      harness = setupTestContext(true);
      const date = '05/04/2020';
      harness.component.setAttribute(DATE_RANGE_PICKER_CONSTANTS.observedAttributes.TO, date);

      expect(harness.component.to).toEqual(new Date(date));
    });

    it('should set disabled', () => {
      harness = setupTestContext(true);
      harness.component.disabled = true;
      expectDisabled(harness.component, true);
    });

    it('should set disabled via attribute', () => {
      harness = setupTestContext(true);
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.DISABLED, 'true');
      expectDisabled(harness.component, true);
    });

    it('should set custom popup class', () => {
      harness = setupTestContext(true);
      const className = 'test-class';
      harness.component.popupClasses = className;
      openPopup(harness.component);
      const popup = getPopup(harness.component);

      expect(popup.classList.contains(className)).toBe(true);
    });

    it('should set multiple custom popup classes', () => {
      harness = setupTestContext(true);
      const classNames = ['test-class-1', 'test-class-2'];
      harness.component.popupClasses = classNames;
      openPopup(harness.component);
      const popup = getPopup(harness.component);

      expect(classNames.every(cn => popup.classList.contains(cn))).toBe(true);
    });

    it('should set popup class via attribute', () => {
      harness = setupTestContext(true);
      const className = 'test-class';
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.POPUP_CLASSES, className);
      openPopup(harness.component);
      const popup = getPopup(harness.component);

      expect(popup.classList.contains(className)).toBe(true);
    });

    it('should format and set value on from input blur', () => {
      harness = setupTestContext(true);
      const dateStr = '01012020';
      const formattedDateStr = formatDate(parseDateString(dateStr) as Date);
      getFromElement(harness.component).focus();
      getFromElement(harness.component).value = '01012020';
      getFromElement(harness.component).blur();
      getFromElement(harness.component).dispatchEvent(new Event('blur'));

      expect(getFromElement(harness.component).value).toBe(formattedDateStr);
    });

    it('should format and set value on to input blur', () => {
      harness = setupTestContext(true);
      const dateStr = '01012020';
      const formattedDateStr = formatDate(parseDateString(dateStr) as Date);
      getToElement(harness.component).focus();
      getToElement(harness.component).value = '01012020';
      getToElement(harness.component).blur();
      getToElement(harness.component).dispatchEvent(new Event('blur'));

      expect(getToElement(harness.component).value).toBe(formattedDateStr);
    });

    it('should close popup on blur', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);

      await frame();
      expectPopupOpen(harness.component, true);
      getFromElement(harness.component).blur();
      getFromElement(harness.component).dispatchEvent(new Event('blur'));
      await popupCloseAnimation();
      await frame();

      expectPopupOpen(harness.component, false);
    });

    it('should not open via toggle if disabled', () => {
      harness = setupTestContext(true);
      harness.component.disabled = true;
      getToggleElement(harness.component).dispatchEvent(new PointerEvent('mousedown'));

      expectPopupOpen(harness.component, false);
    });

    it('should use "from" input mask', () => {
      harness = setupTestContext(true);
      harness.component.masked = true;

      expect(harness.component.masked).toBe(true);

      const inputElement = getFromElement(harness.component);
      inputElement.value = '01012020';
      inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(inputElement.value).toBe('01/01/2020');
    });

    it('should use "to" input mask', () => {
      harness = setupTestContext(true);
      harness.component.masked = true;

      expect(harness.component.masked).toBe(true);

      const inputElement = getToElement(harness.component);
      inputElement.value = '01012020';
      inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(inputElement.value).toBe('01/01/2020');
    });

    it('should select mask in "from" input when shown on focus', () => {
      harness = setupTestContext(true);
      const fromElement = getFromElement(harness.component);
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(harness.component.showMaskFormat).toBe(true);
      fromElement.focus();
      fromElement.dispatchEvent(new FocusEvent('focus'));

      expect(fromElement.selectionStart).toBe(0);
      expect(fromElement.selectionEnd).toBe('__/__/____'.length);
    });

    it('should select mask in "to" input when shown on focus', () => {
      harness = setupTestContext(true);
      const toElement = getToElement(harness.component);
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(harness.component.showMaskFormat).toBe(true);
      toElement.focus();
      toElement.dispatchEvent(new FocusEvent('focus'));

      expect(toElement.selectionStart).toBe(0);
      expect(toElement.selectionEnd).toBe('__/__/____'.length);
    });

    it('should only show mask format in "from" input on focus', () => {
      harness = setupTestContext(true);
      const fromElement = getFromElement(harness.component);
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(harness.component.showMaskFormat).toBe(true);
      fromElement.focus();
      fromElement.dispatchEvent(new FocusEvent('focus'));

      expect(fromElement.value).toBe('__/__/____');
    });

    it('should only show mask format in "to" input on focus', () => {
      harness = setupTestContext(true);
      const toElement = getToElement(harness.component);
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(harness.component.showMaskFormat).toBe(true);
      toElement.focus();
      toElement.dispatchEvent(new FocusEvent('focus'));

      expect(toElement.value).toBe('__/__/____');
    });

    it('should clear mask format in "from" input on blur', () => {
      harness = setupTestContext(true);
      const fromElement = getFromElement(harness.component);
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(harness.component.showMaskFormat).toBe(true);
      fromElement.focus();
      fromElement.dispatchEvent(new FocusEvent('focus'));

      expect(fromElement.value).toBe('__/__/____');

      fromElement.dispatchEvent(new KeyboardEvent('input'));
      fromElement.blur();
      fromElement.dispatchEvent(new FocusEvent('blur'));
      expect(fromElement.value).toBe('');
    });

    it('should clear mask format in "to" input on blur', () => {
      harness = setupTestContext(true);
      const toElement = getToElement(harness.component);
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(harness.component.showMaskFormat).toBe(true);

      toElement.focus();
      toElement.dispatchEvent(new FocusEvent('focus'));
      expect(toElement.value).toBe('__/__/____');

      toElement.dispatchEvent(new KeyboardEvent('input'));
      toElement.blur();
      toElement.dispatchEvent(new FocusEvent('blur'));

      expect(toElement.value).toBe('');
    });

    it('should use custom parse callback, format callback, and mask format on from input', () => {
      harness = setupTestContext(true);
      harness.component.masked = true;
      harness.component.showMaskFormat = true;
      harness.component.maskFormat = 'YYYY-MM-DD';
      harness.component.parseCallback = (str: string) => (str ? new Date(`${str}T00:00:00.000Z`) : null);
      harness.component.formatCallback = (date: Date) => (date ? date.toISOString().split('T')[0] : '');

      const fromInput = getFromElement(harness.component);
      fromInput.focus();
      fromInput.dispatchEvent(new FocusEvent('focus'));
      expect(fromInput.value).toBe('____-__-__');

      fromInput.value = '20200101';
      fromInput.dispatchEvent(new Event('input'));

      expect(fromInput.value).toBe('2020-01-01');
    });

    it('should allow for setting mask format via attribute in from input', () => {
      harness = setupTestContext(true);
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASK_FORMAT, 'YYYY-MM-DD');

      const inputEl = getFromElement(harness.component);
      inputEl.focus();
      inputEl.dispatchEvent(new FocusEvent('focus'));

      expect(harness.component.maskFormat).toBe('YYYY-MM-DD');
      expect(getFromElement(harness.component).value).toBe('____-__-__');
    });

    it('should allow for setting mask format via attribute in to input', () => {
      harness = setupTestContext(true);
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASK_FORMAT, 'YYYY-MM-DD');

      const inputEl = getFromElement(harness.component);
      inputEl.focus();
      inputEl.dispatchEvent(new FocusEvent('focus'));

      expect(harness.component.maskFormat).toBe('YYYY-MM-DD');
      expect(getToElement(harness.component).value).toBe('____-__-__');
    });

    it("should remove characters that aren't valid when formatting in from input", () => {
      harness = setupTestContext(true);
      getFromElement(harness.component).focus();
      getFromElement(harness.component).value = 'abcd';
      harness.component.open = true;

      expect(getFromElement(harness.component).value).toBe('');
    });

    it("should remove characters that aren't valid when formatting in to input", async () => {
      harness = setupTestContext(true);
      getToElement(harness.component).focus();
      getToElement(harness.component).value = 'abcd';
      harness.component.open = true;
      expect(getToElement(harness.component).value).toBe('');
    });

    it('should set value to null and emit change event when setting min date', () => {
      harness = setupTestContext(true);
      const date = new Date('01/01/2020');
      harness.component.from = date;

      const changeSpy = vi.fn();
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      harness.component.min = new Date('01/02/2020');

      expect(harness.component.from).toBeNull();
      expect(getFromElement(harness.component).value).toBe('');
      expect(changeSpy).toHaveBeenCalledOnce();
    });

    it('should set value to null and emit change event when setting max date on from input', () => {
      harness = setupTestContext(true);
      const date = new Date('01/02/2020');
      harness.component.from = date;

      const changeSpy = vi.fn();
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      harness.component.max = new Date('01/01/2020');

      expect(harness.component.from).toBeNull();
      expect(getFromElement(harness.component).value).toBe('');
      expect(changeSpy).toHaveBeenCalledOnce();
    });

    it('should set value to null and emit change event when setting max date on to input', () => {
      harness = setupTestContext(true);
      const date = new Date('01/02/2020');
      harness.component.to = date;

      const changeSpy = vi.fn();
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      harness.component.max = new Date('01/01/2020');

      expect(harness.component.to).toBeNull();
      expect(getToElement(harness.component).value).toBe('');
      expect(changeSpy).toHaveBeenCalledOnce();
    });

    it('should set value to null and emit change event when setting disabled dates on from input', () => {
      harness = setupTestContext(true);
      const date = new Date('01/01/2020');
      harness.component.from = date;

      const changeSpy = vi.fn();
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      harness.component.disabledDates = [new Date('01/01/2020')];

      expect(harness.component.from).toBeNull();
      expect(getFromElement(harness.component).value).toBe('');
      expect(changeSpy).toHaveBeenCalledOnce();
    });

    it('should set value to null and emit change event when setting disabled dates on to input', () => {
      harness = setupTestContext(true);
      const date = new Date('01/01/2020');
      harness.component.to = date;

      const changeSpy = vi.fn();
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      harness.component.disabledDates = [new Date('01/01/2020')];

      expect(harness.component.to).toBeNull();
      expect(getToElement(harness.component).value).toBe('');
      expect(changeSpy).toHaveBeenCalledOnce();
    });

    it('should not propagate keydown event on input when masked and left or right arrow key is pressed when open in from input', () => {
      harness = setupTestContext(true);
      harness.component.masked = true;
      openPopup(harness.component);

      const keydownSpy = vi.fn();
      getFromElement(harness.component).addEventListener('keydown', keydownSpy);

      getFromElement(harness.component).focus();
      getFromElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      getFromElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      expect(keydownSpy).not.toHaveBeenCalled();
    });

    it('should set min date when open', () => {
      harness = setupTestContext(true);
      openPopup(harness.component);
      const minDate = new Date(new Date().setHours(0, 0, 0, 0));
      harness.component.min = minDate;
      const calendar = getCalendar(harness.component);
      expect(calendar.min).toEqual(minDate);
    });

    it('should set max date when open', () => {
      harness = setupTestContext(true);
      openPopup(harness.component);
      const maxDate = new Date(new Date().setHours(0, 0, 0, 0));
      harness.component.max = maxDate;

      const calendar = getCalendar(harness.component);
      expect(calendar.max).toEqual(maxDate);
    });

    it('should emit input and change events when the date is set to from input', () => {
      harness = setupTestContext(true);
      const inputSpy = vi.fn();
      getFromElement(harness.component).addEventListener('change', inputSpy);

      const changeSpy = vi.fn();
      getFromElement(harness.component).addEventListener('change', changeSpy);

      harness.component.from = new Date('06/01/2020');

      expect(inputSpy).toHaveBeenCalledOnce();
      expect(changeSpy).toHaveBeenCalledOnce();
    });

    it('should emit input and change events when the date is set to to input', () => {
      harness = setupTestContext(true);
      const inputSpy = vi.fn();
      getToElement(harness.component).addEventListener('change', inputSpy);

      const changeSpy = vi.fn();
      getToElement(harness.component).addEventListener('change', changeSpy);

      harness.component.to = new Date('06/01/2020');

      expect(inputSpy).toHaveBeenCalledOnce();
      expect(changeSpy).toHaveBeenCalledOnce();
    });

    it('should not emit input and change events when the date is set if notify input value changes is false in from input', () => {
      harness = setupTestContext(true);
      harness.component.notifyInputValueChanges = false;

      const inputSpy = vi.fn();
      getFromElement(harness.component).addEventListener('change', inputSpy);

      const changeSpy = vi.fn();
      getFromElement(harness.component).addEventListener('change', changeSpy);

      harness.component.from = new Date('06/01/2020');

      expect(harness.component.notifyInputValueChanges).toBe(false);
      expect(inputSpy).not.toHaveBeenCalled();
      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should not emit input and change events when the date is set if notify input value changes is false in to input', () => {
      harness = setupTestContext(true);
      harness.component.notifyInputValueChanges = false;

      const inputSpy = vi.fn();
      getToElement(harness.component).addEventListener('change', inputSpy);

      const changeSpy = vi.fn();
      getToElement(harness.component).addEventListener('change', changeSpy);

      harness.component.to = new Date('06/01/2020');

      expect(inputSpy).not.toHaveBeenCalled();
      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should set the to and from properties when the value property is set', () => {
      harness = setupTestContext(true);
      const fromDate = getDateWithDayOffset(-5);
      const toDate = getDateWithDayOffset(5);

      harness.component.value = {
        from: fromDate,
        to: toDate
      };

      expect(harness.component.from).toEqual(fromDate);
      expect(harness.component.to).toEqual(toDate);
    });

    it('should set value property when the to and from properties are set', () => {
      harness = setupTestContext(true);
      const fromDate = getDateWithDayOffset(-5);
      const toDate = getDateWithDayOffset(5);

      harness.component.from = fromDate;
      harness.component.to = toDate;

      expect(harness.component.value?.from).toEqual(fromDate);
      expect(harness.component.value?.to).toEqual(toDate);
    });

    it('should set allow invalid date via attribute', () => {
      harness = setupTestContext(true);
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.ALLOW_INVALID_DATE, '');

      expect(harness.component.allowInvalidDate).toBe(true);
    });

    it('should not clear the from input value if allow invalid is set', () => {
      harness = setupTestContext(true);
      const invalidDate = '>01/01/2020';
      const disabledDate = '04/25/2020';
      const outsideMinDate = '03/01/2020';
      const outsideMaxDate = '07/01/2020';
      harness.component.allowInvalidDate = true;

      getFromElement(harness.component).value = invalidDate;
      expect(getFromElement(harness.component).value).toBe(invalidDate);

      getFromElement(harness.component).value = disabledDate;
      harness.component.disabledDates = [new Date(disabledDate)];
      expect(getFromElement(harness.component).value).toBe(disabledDate);

      getFromElement(harness.component).value = outsideMinDate;
      harness.component.min = new Date('04/01/2020');
      expect(getFromElement(harness.component).value).toBe(outsideMinDate);

      getFromElement(harness.component).value = outsideMaxDate;
      harness.component.max = new Date('05/31/2020');
      expect(getFromElement(harness.component).value).toBe(outsideMaxDate);
    });

    it('should not clear the to input value if allow invalid is set', () => {
      harness = setupTestContext(true);
      const invalidDate = '>01/01/2020';
      const disabledDate = '04/25/2020';
      const outsideMinDate = '03/01/2020';
      const outsideMaxDate = '07/01/2020';
      harness.component.allowInvalidDate = true;

      getToElement(harness.component).value = invalidDate;
      expect(getToElement(harness.component).value).toBe(invalidDate);

      getToElement(harness.component).value = disabledDate;
      harness.component.disabledDates = [new Date(disabledDate)];
      expect(getToElement(harness.component).value).toBe(disabledDate);

      getToElement(harness.component).value = outsideMinDate;
      harness.component.min = new Date('04/01/2020');
      expect(getToElement(harness.component).value).toBe(outsideMinDate);

      getToElement(harness.component).value = outsideMaxDate;
      harness.component.max = new Date('05/31/2020');
      expect(getToElement(harness.component).value).toBe(outsideMaxDate);
    });

    it('should not show today button by default', () => {
      harness = setupTestContext(true);
      openPopup(harness.component);

      const todayButton = getTodayButton(harness.component);

      expect(todayButton).toBeNull();
    });

    it('should not show clear button by default', () => {
      harness = setupTestContext(true);
      openPopup(harness.component);

      const clearButton = getClearButton(harness.component);

      expect(clearButton).toBeNull();
    });

    it('should show today button', () => {
      harness = setupTestContext(true);
      harness.component.showToday = true;
      openPopup(harness.component);

      const todayButton = getTodayButton(harness.component);

      expect(harness.component.showToday).toBe(true);
      expect(todayButton).not.toBeNull();
    });

    it('should show today button via attribute', () => {
      harness = setupTestContext(true);
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_TODAY, '');
      openPopup(harness.component);

      const todayButton = getTodayButton(harness.component);

      expect(harness.component.showToday).toBe(true);
      expect(todayButton).not.toBeNull();
    });

    it('should show clear button', () => {
      harness = setupTestContext(true);
      harness.component.showClear = true;
      openPopup(harness.component);

      const clearButton = getClearButton(harness.component);

      expect(harness.component.showClear).toBe(true);
      expect(clearButton).not.toBeNull();
    });

    it('should show clear button via attribute', () => {
      harness = setupTestContext(true);
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_CLEAR, '');
      openPopup(harness.component);

      const clearButton = getClearButton(harness.component);

      expect(harness.component.showClear).toBe(true);
      expect(clearButton).not.toBeNull();
    });

    it('should show both today and clear button', () => {
      harness = setupTestContext(true);
      harness.component.showToday = true;
      harness.component.showClear = true;
      openPopup(harness.component);

      const todayButton = getTodayButton(harness.component);
      const clearButton = getClearButton(harness.component);

      expect(todayButton).not.toBeNull();
      expect(clearButton).not.toBeNull();
    });

    it('should set date to todays date when clicking today button', async () => {
      harness = setupTestContext(true);
      harness.component.showToday = true;
      const changeSpy = vi.fn();
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      openPopup(harness.component);

      clickTodayButton(harness.component);
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      const popup = getPopup(harness.component);

      expect(changeSpy).toHaveBeenCalledOnce();
      expect(harness.component.open).toBe(true);
      expect(popup).not.toBeNull();
      expect(harness.component.value?.from).not.toBeNull();
      expect(harness.component.value?.to).toBeNull();
      expect((harness.component.value?.from as Date).getDate()).toBe(new Date().getDate());
    });

    it('should remove value when clicking clear button', async () => {
      harness = setupTestContext(true);
      harness.component.showClear = true;
      harness.component.value = { from: new Date('01/01/2021'), to: new Date('01/05/2021') };
      const changeSpy = vi.fn();
      harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      openPopup(harness.component);

      clickClearButton(harness.component);
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      const popup = getPopup(harness.component);

      expect(changeSpy).toHaveBeenCalledOnce();
      expect(harness.component.open).toBe(false);
      expect(popup).toBeNull();
      expect(harness.component.value).toEqual({ from: null, to: null });
    });

    it('should coerce no square bracket string correctly into an array of DayOfWeek', async () => {
      harness = setupTestContext(true);
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.DISABLED_DAYS_OF_WEEK, '1,2,3,4,5');
      await frame();
      expect(harness.component.disabledDaysOfWeek).toEqual([1, 2, 3, 4, 5]);
    });

    it('should coerce string correctly into an array of DayOfWeek', async () => {
      harness = setupTestContext(true);
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.DISABLED_DAYS_OF_WEEK, '[1,2,3,4,5]');
      await frame();
      expect(harness.component.disabledDaysOfWeek).toEqual([1, 2, 3, 4, 5]);
    });

    it('should not allow date being set from input if disabled', () => {
      harness = setupTestContext(true);
      const date = new Date();
      harness.component.disabledDaysOfWeek = [date.getDay()];
      harness.component.from = date;

      expect(harness.component.from).toBeNull();
    });

    it('should remove from value if set and is disabled', async () => {
      harness = setupTestContext(true);
      const date = new Date();
      harness.component.from = date;
      await frame();
      harness.component.disabledDaysOfWeek = [date.getDay()];

      expect(harness.component.from).toBeNull();
    });

    it('should remove to value if set and is disabled', async () => {
      harness = setupTestContext(true);
      const date = new Date();
      harness.component.to = date;
      await frame();
      harness.component.disabledDaysOfWeek = [date.getDay()];

      expect(harness.component.to).toBeNull();
    });

    it('should set disabled days to an open calendar', async () => {
      harness = setupTestContext(true);
      const adapterSpy = vi.spyOn(harness.component['_core']['_adapter'], 'setCalendarDisabledDaysOfWeek');

      openPopup(harness.component);
      await frame();
      harness.component.disabledDaysOfWeek = [1];
      expect(adapterSpy).toHaveBeenCalled();
    });

    it('should set sundays disabled in calendar popup already open', async () => {
      harness = setupTestContext(true);
      harness.component.disabledDaysOfWeek = [0];
      openPopup(harness.component);
      await frame();

      const allSundays = getAllTdElementsForSundays(harness.component);
      const thatAllSundaysAreDisabled = allSundays.every(td => td!.getAttribute('aria-disabled') === 'true');
      expect(thatAllSundaysAreDisabled).toBe(true);
    });

    it('should set sundays disabled in calendar popup', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);
      await frame();
      harness.component.disabledDaysOfWeek = [0];
      await frame();

      const allSundays = getAllTdElementsForSundays(harness.component);
      const thatAllSundaysAreDisabled = allSundays.every(td => td!.getAttribute('aria-disabled') === 'true');
      expect(thatAllSundaysAreDisabled).toBe(true);
    });

    it('should disable today with the disable day callback', async () => {
      harness = setupTestContext(true);
      const today = new Date();
      harness.component.disableDayCallback = (date: Date) => date.toLocaleDateString() === today.toLocaleDateString();
      openPopup(harness.component);

      const todayElement = getCalendarShadow(harness.component).querySelector(CALENDAR_CONSTANTS.selectors.DATE_TODAY);
      expect(todayElement?.hasAttribute('disabled')).toBe(true);
    });

    it('should disable today with the disable day callback when popup is open', async () => {
      harness = setupTestContext(true);
      const today = new Date();
      openPopup(harness.component);
      await frame();
      harness.component.disableDayCallback = (date: Date) => date.toLocaleDateString() === today.toLocaleDateString();

      const todayElement = getCalendarShadow(harness.component).querySelector(CALENDAR_CONSTANTS.selectors.DATE_TODAY);
      expect(todayElement?.hasAttribute('disabled')).toBe(true);
    });
  });

  function getDateWithDayOffset(dayOffset: number): Date {
    const date = new Date();
    return new Date(date.setDate(date.getDate() + dayOffset));
  }

  function setupTestContext(append = false, hasFromInput = true, hasToInput = true, hasToggle = true): IDateRangePickerHarness {
    const fixtureElement = document.createElement('div');
    fixtureElement.id = 'date-range-picker-test-fixture';
    const component = document.createElement(DATE_RANGE_PICKER_CONSTANTS.elementName) as DateRangePickerWithCore;
    if (hasFromInput) {
      component.appendChild(createFromElement());
    }
    if (hasToInput) {
      component.appendChild(createToElement());
    }
    if (hasToggle) {
      const toggleElement = document.createElement('button');
      toggleElement.setAttribute(BASE_DATE_PICKER_CONSTANTS.attributes.TOGGLE, '');
      toggleElement.id = 'date-range-toggle';
      component.appendChild(toggleElement);
    }
    fixtureElement.appendChild(component);
    if (append) {
      document.body.appendChild(fixtureElement);
    }
    return {
      component,
      append: () => document.body.appendChild(fixtureElement),
      destroy: () => {
        fixtureElement.remove();
      }
    };
  }

  function createFromElement(): HTMLInputElement {
    const input = document.createElement('input');
    input.id = 'date-range-from-input';
    return input;
  }

  function createToElement(): HTMLInputElement {
    const input = document.createElement('input');
    input.id = 'date-range-to-input';
    return input;
  }

  function getFromElement(component: IDateRangePickerComponent): HTMLInputElement {
    return component.querySelector('#date-range-from-input') as HTMLInputElement;
  }

  function getToElement(component: IDateRangePickerComponent): HTMLInputElement {
    return component.querySelector('#date-range-to-input') as HTMLInputElement;
  }

  function getToggleElement(component: IDateRangePickerComponent): HTMLButtonElement {
    return component.querySelector('#date-range-toggle') as HTMLButtonElement;
  }

  function getIdentifier(component: DateRangePickerWithCore): string {
    return 'forge-date-range-picker-' + component['_core']['_adapter']['_identifier'];
  }

  function openPopup(component: IDateRangePickerComponent): void {
    getFromElement(component).focus();
    component.open = true;
  }

  function getPopup(component: DateRangePickerWithCore): IPopoverComponent {
    return document.querySelector(`${POPOVER_CONSTANTS.elementName}[id=${getIdentifier(component)}]`) as IPopoverComponent;
  }

  function getCalendar(component: DateRangePickerWithCore): ICalendarComponent {
    const popup = getPopup(component);
    return popup.querySelector('forge-calendar') as ICalendarComponent;
  }

  function clickActiveDay(component: DateRangePickerWithCore): void {
    const calendar = getCalendar(component);
    const calendarShadow = calendar.shadowRoot as ShadowRoot;
    const activeCell = calendarShadow.querySelector('.forge-calendar__date:has(forge-focus-indicator[active])') as HTMLTableCellElement;
    activeCell.click();
  }

  function getAnnouncerElement(component: DateRangePickerWithCore): HTMLElement {
    const popup = getPopup(component);
    return popup.querySelector('[data-forge-live-announcer]') as HTMLElement;
  }

  function getTodayButton(component: DateRangePickerWithCore): IButtonComponent | null {
    const popup = getPopup(component);
    const calendar = popup.querySelector('forge-calendar') as ICalendarComponent;
    return (getShadowElement(calendar, '#today-button') as IButtonComponent) ?? null;
  }

  function getClearButton(component: DateRangePickerWithCore): IButtonComponent | null {
    const popup = getPopup(component);
    const calendar = popup.querySelector('forge-calendar') as ICalendarComponent;
    return (getShadowElement(calendar, '#clear-button') as IButtonComponent) ?? null;
  }

  function clickTodayButton(component: DateRangePickerWithCore): void {
    const todayButton = getTodayButton(component);
    todayButton?.click();
  }

  function clickClearButton(component: DateRangePickerWithCore): void {
    const clearButton = getClearButton(component);
    clearButton?.click();
  }

  async function popupCloseAnimation(): Promise<void> {
    return task(POPOVER_ANIMATION_DURATION);
  }

  function expectPopupOpen(component: DateRangePickerWithCore, isOpen: boolean): void {
    const popup = getPopup(component);
    expect(component.hasAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.OPEN)).toBe(isOpen);
    if (isOpen) {
      expect(popup).not.toBeNull();
      expect(popup.isConnected).toBe(isOpen);
      expect(popup.classList.contains('forge-calendar-dropdown__popup')).toBe(isOpen);
      expect(getFromElement(component).getAttribute('aria-expanded')).toBe('true');
    } else {
      expect(popup).toBeNull();
      expect(getFromElement(component).getAttribute('aria-expanded')).toBe('false');
    }
  }

  function expectDefaultValues(component: IDateRangePickerComponent): void {
    expect(component.isConnected).toBe(true);
    expect(component.from).toBeNull();
    expect(component.to).toBeNull();
    expect(component.min).toBeNull();
    expect(component.max).toBeNull();
    expect(component.disabledDates).toBeNull();
    expect(component.open).toBe(false);
    expect(component.parseCallback).toBeUndefined();
    expect(component.formatCallback).toBeUndefined();
    expect(component.popupClasses).toBeUndefined();
    expect(component.disabled).toBe(false);
    expect(component.masked).toBe(true);
    expect(component.maskFormat).toBe(DEFAULT_DATE_MASK);
    expect(component.showMaskFormat).toBe(false);
    expect(component.valueMode).toBe('object');
    expect(component.allowInvalidDate).toBe(false);
    expect(component.hasAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.OPEN)).toBe(false);
  }

  function expectDisabled(component: IDateRangePickerComponent, isDisabled: boolean): void {
    expect(component.disabled).toBe(isDisabled);
    expect(getFromElement(component).disabled).toBe(isDisabled);
    expect(getToElement(component).disabled).toBe(isDisabled);
    if (getToggleElement(component)) {
      expect(getToggleElement(component).getAttribute('aria-disabled')).toBe(isDisabled.toString());
    }
  }

  function getAllTdElementsForSundays(component: DateRangePickerWithCore): (HTMLTableCellElement | null)[] {
    return Array.from(getCalendarShadow(component).querySelectorAll('tbody tr'))
      .map(tr => tr.querySelector('td'))
      .filter(td => td!.hasAttribute('data-date'));
  }

  function getCalendarShadow(component: DateRangePickerWithCore): ShadowRoot {
    const calendar = getCalendar(component);
    return calendar.shadowRoot as ShadowRoot;
  }
});
