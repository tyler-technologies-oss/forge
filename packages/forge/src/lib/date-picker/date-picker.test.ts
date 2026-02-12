import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { getShadowElement } from '@tylertech/forge-core';
import { task, frame } from '../core/utils/utils.js';
import { DEFAULT_DATE_MASK, parseDateString, formatDate, isSameDate } from '../core/index.js';
import { defineDatePickerComponent, DATE_PICKER_CONSTANTS } from './index.js';
import type { IDatePickerComponent, IDatePickerCore } from './index.js';
import { defineTextFieldComponent, TEXT_FIELD_CONSTANTS } from '../text-field/index.js';
import type { ITextFieldComponent } from '../text-field/index.js';
import { CALENDAR_CONSTANTS, CALENDAR_MENU_CONSTANTS } from '../calendar/index.js';
import type { ICalendarComponent } from '../calendar/index.js';
import { ICON_BUTTON_CONSTANTS } from '../icon-button/index.js';
import { BASE_DATE_PICKER_CONSTANTS } from './base/base-date-picker-constants.js';
import type { IButtonComponent } from '../button/index.js';
import { FIELD_CONSTANTS, POPOVER_CONSTANTS } from '../index.js';
import type { IDialogAdapter, IFieldComponent, IPopoverComponent } from '../index.js';

// Popover animation duration (200ms) + buffer
const POPOVER_ANIMATION_DURATION = 200;

type DatePickerComponentTest = IDatePickerComponent & {
  _core: IDatePickerCore & {
    _onInputValueChanged: () => void;
    initialize: () => void;
    _isInitialized: boolean;
    _adapter: IDialogAdapter & {
      setCalendarDisabledDaysOfWeek: () => void;
      _identifier: string;
    };
  };
};

interface IDatePickerHarness {
  component: DatePickerComponentTest;
  append(): void;
  destroy(): void;
}

let harness: IDatePickerHarness | null = null;

describe('DatePickerComponent', () => {
  beforeAll(() => {
    defineDatePickerComponent();
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
      harness = setupTestContext(true, false);

      expect(harness.component['_core']['_isInitialized']).toBe(false);

      await task(100);
      harness.component.appendChild(createInputElement());
      await frame();

      expect(harness.component['_core']['_isInitialized']).toBe(true);
    });

    it('should render with initial date', () => {
      harness = setupTestContext(false);
      const date = new Date();
      const formattedDate = formatDate(date);
      harness.component.value = date;
      harness.append();

      expect(harness.component.value).toEqual(date);
      expect(getInputElement(harness.component).value).toBe(formattedDate);

      openPopup(harness.component);
      const calendar = getCalendar(harness.component);

      expect((calendar.value as Date).toDateString()).toBe(date.toDateString());
    });

    it('should preserve timestamp from date value after initialization', async () => {
      harness = setupTestContext(true);
      const dateStr = '2024-01-01T10:17:23.000Z';
      const date = new Date(dateStr);
      harness.component.value = date;
      harness.append();
      await frame();

      expect(harness.component.value.toISOString()).toBe(dateStr);
    });

    it('should open calendar in month of min date if min is after current month', () => {
      harness = setupTestContext(false);
      const date = new Date();
      harness.component.min = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      harness.append();

      openPopup(harness.component);
      const calendar = getCalendar(harness.component);

      const expectedMonth = date.getMonth() >= 11 ? 0 : date.getMonth() + 1;
      expect(calendar.month).toBe(expectedMonth);
    });

    it('should open calendar in month of max date if max is before current month', () => {
      harness = setupTestContext(false);
      const date = new Date();
      harness.component.max = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      harness.append();

      openPopup(harness.component);
      const calendar = getCalendar(harness.component);
      const expectedMonth = date.getMonth() <= 0 ? 11 : date.getMonth() - 1;

      expect(calendar.month).toBe(expectedMonth);
    });

    it('should open calendar in month of min date if max is before current month and min is set', () => {
      harness = setupTestContext(false);
      const date = new Date();
      const minDate = new Date(date.getFullYear() - 1, date.getMonth() - 1, 1);
      harness.component.min = minDate;
      harness.component.max = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      harness.append();

      openPopup(harness.component);
      const calendar = getCalendar(harness.component);
      const expectedMonth = minDate.getMonth();

      expect(calendar.month).toBe(expectedMonth);
    });

    it('should automatically render a toggle button with a Forge text-field component', () => {
      harness = setupTestContext(false, true, false);

      const textField = document.createElement(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
      textField.appendChild(createInputElement());
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
      harness.component.value = value;
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
      harness.component.allowInvalidDate = true;

      harness.append();

      expect(harness.component.value as unknown).toBe(value.toISOString());
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
      expect(harness.component.allowInvalidDate).toBe(true);
    });

    it('should allow for setting of input element value before being placed in DOM', () => {
      harness = setupTestContext();

      const date = '05/04/2020';
      const expectedDate = new Date(date);
      getInputElement(harness.component).value = date;

      harness.append();

      expect(harness.component.value).toEqual(expectedDate);
    });

    it('should float text-field label when value is set', async () => {
      harness = setupTestContext(false, false);

      const textField = document.createElement(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
      textField.appendChild(createInputElement());

      const labelElement = document.createElement('label');
      labelElement.textContent = 'Label';
      textField.appendChild(labelElement);

      harness.component.appendChild(textField);
      harness.append();

      await frame();
      harness.component.value = '1/1/2021';
      await frame();

      const field = getFieldComponent(textField);

      expect(field.hasAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL)).toBe(true);
    });

    it('should notify date picker of input value changes when text-field is used', async () => {
      harness = setupTestContext(false, false);
      const textField = document.createElement(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
      textField.appendChild(createInputElement());
      harness.component.appendChild(textField);
      harness.append();

      await frame();

      const valueChangeSpy = vi.spyOn(harness.component['_core'], '_onInputValueChanged');
      getInputElement(harness.component).value = '1/1/2021';

      expect(valueChangeSpy).toHaveBeenCalled();
    });

    it('should accept custom calendar text', async () => {
      harness = setupTestContext(false, true, true);
      harness.component.calendarText = {
        previousMonth: '1',
        nextMonth: '2',
        today: '3',
        clear: '4'
      };
      harness.append();
      openPopup(harness.component);

      const calendar = getCalendar(harness.component);
      const previousButtonTextSpan = calendar.querySelector(`span[slot=${CALENDAR_CONSTANTS.slots.PREVIOUS_MONTH_BUTTON_TEXT}]`);
      const nextButtonTextSpan = calendar.querySelector(`span[slot=${CALENDAR_CONSTANTS.slots.NEXT_MONTH_BUTTON_TEXT}]`);
      const todayButtonTextSpan = calendar.querySelector(`span[slot=${CALENDAR_CONSTANTS.slots.TODAY_BUTTON_TEXT}]`);
      const clearButtonTextSpan = calendar.querySelector(`span[slot=${CALENDAR_CONSTANTS.slots.CLEAR_BUTTON_TEXT}]`);

      expect(previousButtonTextSpan?.textContent).toBe('1');
      expect(nextButtonTextSpan?.textContent).toBe('2');
      expect(todayButtonTextSpan?.textContent).toBe('3');
      expect(clearButtonTextSpan?.textContent).toBe('4');
    });
  });

  describe('with static HTML', () => {
    it('should initialize with default values', () => {
      harness = setupTestContext(true);
      expectDefaultValues(harness.component);
    });

    it('should initialize ARIA attributes', () => {
      harness = setupTestContext(true);
      const inputElement = getInputElement(harness.component);
      expect(inputElement.getAttribute('autocomplete')).toBe('off');
      expect(inputElement.getAttribute('autocorrect')).toBe('off');
      expect(inputElement.getAttribute('autocapitalize')).toBe('off');
      expect(inputElement.getAttribute('spellcheck')).toBe('false');
      expect(inputElement.getAttribute('role')).toBe('combobox');
      expect(inputElement.getAttribute('aria-live')).toBe('assertive');
      expect(inputElement.getAttribute('aria-atomic')).toBe('true');
      expect(inputElement.getAttribute('aria-haspopup')).toBe('true');
      expect(inputElement.getAttribute('aria-expanded')).toBe('false');
      expect(inputElement.getAttribute('aria-owns')).toBe(getIdentifier(harness.component['_core']));
      expect(inputElement.getAttribute('aria-disabled')).toBe('false');
      expect(inputElement.hasAttribute('aria-activedescendant')).toBe(false);
    });

    it('should open popup programmatically', () => {
      harness = setupTestContext(true);
      harness.component.open = true;
      expectPopupOpen(harness.component, true);
    });

    it('should emit open event when popup opened by user pressing arrow down key', () => {
      harness = setupTestContext(true);
      const openSpy = vi.fn();
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.OPEN, openSpy);
      getInputElement(harness.component).focus();
      getInputElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      expect(openSpy).toHaveBeenCalledOnce();
    });

    it('should emit open event when popup opened by user clicking toggle button', () => {
      harness = setupTestContext(true);
      const openSpy = vi.fn();
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.OPEN, openSpy);
      getToggleElement(harness.component).dispatchEvent(new PointerEvent('mousedown'));

      expect(openSpy).toHaveBeenCalledOnce();
    });

    it('should not emit open event when popup opened programmatically', () => {
      harness = setupTestContext(true);
      const openSpy = vi.fn();
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.OPEN, openSpy);
      openPopup(harness.component);

      expect(openSpy).not.toHaveBeenCalled();
    });

    it('should emit close event when popup closed via escape key', () => {
      harness = setupTestContext(true);
      const closeSpy = vi.fn();
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(harness.component);
      getInputElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('should emit close event when popup closed via toggle click', () => {
      harness = setupTestContext(true);
      const closeSpy = vi.fn();
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(harness.component);
      getToggleElement(harness.component).dispatchEvent(new PointerEvent('mousedown'));

      expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('should emit close event when selecting date from calendar via enter key', async () => {
      harness = setupTestContext(true);
      const closeSpy = vi.fn();
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CLOSE, closeSpy);

      openPopup(harness.component);
      await frame();
      getInputElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await frame();

      expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('should emit close event when selecting date from calendar with mouse', async () => {
      harness = setupTestContext(true);
      const closeSpy = vi.fn();
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(harness.component);
      await frame();
      clickActiveDay(harness.component);

      expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('should not emit close event when popup closed programmatically', () => {
      harness = setupTestContext(true);
      const closeSpy = vi.fn();
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(harness.component);
      harness.component.open = false;

      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should open when pressing down arrow key', () => {
      harness = setupTestContext(true);
      getInputElement(harness.component).focus();
      getInputElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      expectPopupOpen(harness.component, true);
    });

    it('should open when clicking toggle element', () => {
      harness = setupTestContext(true);
      getToggleElement(harness.component).dispatchEvent(new PointerEvent('mousedown'));

      expectPopupOpen(harness.component, true);
    });

    it('should set focus to input when clicking toggle element', () => {
      harness = setupTestContext(true);
      getToggleElement(harness.component).dispatchEvent(new PointerEvent('mousedown'));
      expect(document.activeElement).toBe(getInputElement(harness.component));
    });

    it('should close popup when pressing escape key', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);
      expectPopupOpen(harness.component, true);
      getInputElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await popupCloseAnimation();
      expectPopupOpen(harness.component, false);
    });

    it('should set aria-activedescendant when pressing arrow key', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);

      const inputElement = getInputElement(harness.component);
      const originalValue = inputElement.getAttribute('aria-activedescendant');
      expect(inputElement.hasAttribute('aria-activedescendant')).toBe(true);
      expect(originalValue).toBeTruthy();

      getInputElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      const newValue = inputElement.getAttribute('aria-activedescendant');
      expect(inputElement.hasAttribute('aria-activedescendant')).toBe(true);
      expect(originalValue).not.toBe(newValue);
    });

    it('should change aria-activedescendant when pressing multiple arrow keys', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);
      const announcer = getAnnouncerElement(harness.component);

      getInputElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      const leftValue = getInputElement(harness.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).toBe(leftValue);

      getInputElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      const upValue = getInputElement(harness.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).toBe(upValue);

      getInputElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      const rightValue = getInputElement(harness.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).toBe(rightValue);

      getInputElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      const downValue = getInputElement(harness.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).toBe(downValue);

      expect(downValue).toBeTruthy();
      expect([leftValue, upValue, rightValue].includes(downValue)).toBe(false);
    });

    it('should select today when pressing enter key', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);
      getInputElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      const formattedDate = formatDate(new Date());

      await popupCloseAnimation();
      expectPopupOpen(harness.component, false);
      expect(getInputElement(harness.component).value).toBe(formattedDate);
    });

    it('should emit change event when selecting date via enter key', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);
      let theEvent: CustomEvent;
      const changeSpy = vi.fn(evt => (theEvent = evt));
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      getInputElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(changeSpy).toHaveBeenCalledOnce();
      expect(changeSpy).toHaveBeenCalledWith(theEvent!);
      expect(harness.component.value).toEqual(theEvent!.detail);
    });

    it('should emit forge-calendar-month-change event when next month button is clicked', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);
      let theEvent: CustomEvent;
      const monthChangeSpy = vi.fn(evt => (theEvent = evt));
      harness.component.addEventListener(CALENDAR_CONSTANTS.events.MONTH_CHANGE, monthChangeSpy);

      const calendar = getCalendar(harness.component);
      const nextButton = getNextMonthButton(calendar);
      const currentMonth = calendar.month;
      nextButton.click();
      const month = (currentMonth + 1) % 12;
      expect(monthChangeSpy).toHaveBeenCalledOnce();
      expect(theEvent!.detail.month).toBe(month);
    });

    it('should emit change event when previous month button is clicked', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);
      let theEvent: CustomEvent;
      const monthChangeSpy = vi.fn(evt => (theEvent = evt));
      harness.component.addEventListener(CALENDAR_CONSTANTS.events.MONTH_CHANGE, monthChangeSpy);

      const calendar = getCalendar(harness.component);
      const nextButton = getPreviousMonthButton(calendar);
      const currentMonth = calendar.month;
      nextButton.click();
      const month = (currentMonth + 12 - 1) % 12;
      expect(monthChangeSpy).toHaveBeenCalledOnce();
      expect(theEvent!.detail.month).toBe(month);
    });

    it('should emit change event when month is selected', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);
      let theEvent: CustomEvent;
      const monthChangeSpy = vi.fn(evt => (theEvent = evt));
      harness.component.addEventListener(CALENDAR_CONSTANTS.events.MONTH_CHANGE, monthChangeSpy);

      const calendar = getCalendar(harness.component);
      const calendarShadowElement = getCalendarShadowElement(calendar);
      getMonthButton(calendar)?.click();
      const menuShadowRoot = (calendarShadowElement.querySelector(CALENDAR_MENU_CONSTANTS.elementName) as HTMLElement)?.shadowRoot as ShadowRoot;
      (menuShadowRoot.querySelector(CALENDAR_MENU_CONSTANTS.selectors.ITEM) as HTMLElement)?.click();
      expect(monthChangeSpy).toHaveBeenCalledOnce();
      expect(theEvent!.detail.month).toBe(0);
    });

    it('should not blur input when clicking element in calendar', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);
      await frame();
      clickActiveDay(harness.component);

      await popupCloseAnimation();
      expect(document.activeElement).toBe(getInputElement(harness.component));
    });

    it('should emit change event when selecting date via mouse', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);
      let theEvent: CustomEvent;
      const changeSpy = vi.fn(evt => (theEvent = evt));
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      await frame();
      clickActiveDay(harness.component);

      await popupCloseAnimation();
      expectPopupOpen(harness.component, false);
      expect(changeSpy).toHaveBeenCalledOnce();
      expect(harness.component.value).toEqual(theEvent!.detail);
    });

    it('should not set date if default prevented in change event', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);
      const changeSpy = vi.fn(evt => evt.preventDefault());
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      await frame();
      clickActiveDay(harness.component);

      expect(changeSpy).toHaveBeenCalledOnce();
      expect(harness.component.value).toBeNull();
    });

    it('should emit date as string', async () => {
      harness = setupTestContext(true);
      const todayDate = new Date();
      const formattedDate = formatDate(todayDate);
      harness.component.valueMode = 'string';
      openPopup(harness.component);
      let eventDetail = '';
      const changeSpy = vi.fn(evt => (eventDetail = evt.detail));
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      await frame();
      clickActiveDay(harness.component);

      expect(typeof eventDetail).toBe('string');
      expect(eventDetail).toBe(formattedDate);
      expect(harness.component.value).toBe(eventDetail);
    });

    it('should emit date as ISO string', async () => {
      harness = setupTestContext(true);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      harness.component.valueMode = 'iso-string';
      openPopup(harness.component);
      let eventDetail = '';
      const changeSpy = vi.fn(evt => (eventDetail = evt.detail));
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      await frame();
      clickActiveDay(harness.component);

      expect(typeof eventDetail).toBe('string');
      expect(eventDetail).toBe(todayDate.toISOString());
      expect(harness.component.value).toBe(eventDetail);
    });

    it('should emit change event when setting value mode', () => {
      harness = setupTestContext(true);
      const changeSpy = vi.fn();
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      harness.component.valueMode = 'string';
      harness.component.valueMode = 'iso-string';
      harness.component.valueMode = 'object';
      harness.component.valueMode = 'asdf' as unknown as 'object';

      expect(changeSpy).toHaveBeenCalledTimes(3);
    });

    it('should set value', () => {
      harness = setupTestContext(true);
      const expectedDate = '05/04/2020';
      const date = new Date(expectedDate);
      harness.component.value = date;

      expect(getInputElement(harness.component).value).toBe(expectedDate);
    });

    it('should set value from input element value on blur', () => {
      harness = setupTestContext(true);
      const date = '05/04/2020';
      const expectedDate = new Date(date);
      const inputElement = getInputElement(harness.component);
      inputElement.value = date;
      inputElement.dispatchEvent(new Event('input'));
      inputElement.dispatchEvent(new Event('blur'));

      expect(harness.component.value).toEqual(expectedDate);
    });

    it('should format the date when blurred after the input element value is set', () => {
      harness = setupTestContext(true);
      const inputElement = getInputElement(harness.component);
      inputElement.value = '01012020';
      inputElement.dispatchEvent(new Event('input'));
      inputElement.dispatchEvent(new Event('blur'));

      expect(getInputElement(harness.component).value).toBe('01/01/2020');
    });

    it('should set value in calendar', () => {
      harness = setupTestContext(true);
      const expectedDate = '01/01/2000';
      const date = new Date(expectedDate);
      harness.component.value = date;
      openPopup(harness.component);
      const calendar = getCalendar(harness.component);

      expect(getInputElement(harness.component).value).toBe(expectedDate);
      expect(calendar.value).toEqual(date);
    });

    it('should coerce the value when the input value is invalid', () => {
      harness = setupTestContext(true);

      const inputElement = getInputElement(harness.component);
      inputElement.value = '>01/01/2020';
      inputElement.blur();
      inputElement.dispatchEvent(new Event('blur'));

      expect(inputElement.value).toBe('01/01/2020');
    });

    it('should set allow invalid date via attribute', () => {
      harness = setupTestContext(true);
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.ALLOW_INVALID_DATE, '');

      expect(harness.component.allowInvalidDate).toBe(true);
    });

    it('should not clear the input value if allow invalid is set', () => {
      harness = setupTestContext(true);
      const invalidDate = '>01/01/2020';
      const disabledDate = '04/25/2020';
      const outsideMinDate = '03/01/2020';
      const outsideMaxDate = '07/01/2020';
      harness.component.allowInvalidDate = true;

      getInputElement(harness.component).value = invalidDate;
      expect(getInputElement(harness.component).value).toBe(invalidDate);

      getInputElement(harness.component).value = disabledDate;
      harness.component.disabledDates = [new Date(disabledDate)];
      expect(getInputElement(harness.component).value).toBe(disabledDate);

      getInputElement(harness.component).value = outsideMinDate;
      harness.component.min = new Date('04/01/2020');
      expect(getInputElement(harness.component).value).toBe(outsideMinDate);

      getInputElement(harness.component).value = outsideMaxDate;
      harness.component.max = new Date('05/31/2020');
      expect(getInputElement(harness.component).value).toBe(outsideMaxDate);
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

    it('should reject value if below min date', () => {
      harness = setupTestContext(true);
      const minDate = new Date('01/01/2020');
      harness.component.min = minDate;
      harness.component.value = new Date('06/01/2000');
      expect(harness.component.value).toBeNull();
      expect(getInputElement(harness.component).value).toBe('');
    });

    it('should allow value if below min date and allow invalid is set', () => {
      harness = setupTestContext(true);
      harness.component.allowInvalidDate = true;
      const minDate = new Date('01/01/2020');
      const date = '06/01/2000';
      const expectedDate = new Date(date);
      harness.component.min = minDate;
      harness.component.value = expectedDate;
      expect(harness.component.value).toEqual(expectedDate);
      expect(getInputElement(harness.component).value).toBe(date);
    });

    it('should allow value if matches disabled day of week date if allow invalid is set', () => {
      harness = setupTestContext(true);
      harness.component.allowInvalidDate = true;
      harness.component.disabledDaysOfWeek = [6];

      const disabledDate = '01/01/2000';
      const expectedDate = new Date(disabledDate);
      harness.component.value = expectedDate;

      expect(harness.component.value).toEqual(expectedDate);
      expect(getInputElement(harness.component).value).toBe(disabledDate);
    });

    it('should clear value when min date is set if current value is not valid', () => {
      harness = setupTestContext(true);
      const minDate = new Date('01/01/2020');
      harness.component.value = new Date('01/01/2000');

      expect(harness.component.value).not.toBeNull();
      harness.component.min = minDate;
      expect(harness.component.value).toBeNull();
      expect(getInputElement(harness.component).value).toBe('');
    });

    it('should reject value if above max date', () => {
      harness = setupTestContext(true);
      const maxDate = new Date('01/01/2020');
      harness.component.max = maxDate;
      harness.component.value = new Date('06/01/2030');
      expect(harness.component.value).toBeNull();
      expect(getInputElement(harness.component).value).toBe('');
    });

    it('should allow value if above max date and allow invalid is set', () => {
      harness = setupTestContext(true);
      harness.component.allowInvalidDate = true;
      const maxDate = new Date('01/01/2020');
      const date = '06/01/2030';
      const expectedDate = new Date(date);
      harness.component.max = maxDate;
      harness.component.value = expectedDate;
      expect(harness.component.value).toEqual(expectedDate);
      expect(getInputElement(harness.component).value).toBe(date);
    });

    it('should clear value when max date is set if current value is not valid', () => {
      harness = setupTestContext(true);
      const maxDate = new Date('01/01/2020');
      harness.component.value = new Date('01/01/2030');

      expect(harness.component.value).not.toBeNull();
      harness.component.max = maxDate;
      expect(harness.component.value).toBeNull();
      expect(getInputElement(harness.component).value).toBe('');
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

    it('should restrict date if matching date is disabled', () => {
      harness = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      harness.component.disabledDates = disabledDates;
      harness.component.value = '01/01/2020';

      expect(harness.component.value).toBeNull();
      expect(getInputElement(harness.component).value).toBe('');
    });

    it('should clear value when disabled dates is set if current value is disabled', () => {
      harness = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      harness.component.value = '01/01/2020';

      expect(harness.component.value).not.toBeNull();
      harness.component.disabledDates = disabledDates;
      expect(harness.component.value).toBeNull();
      expect(getInputElement(harness.component).value).toBe('');
    });

    it('should accept valid date if min, max, and disabled dates are set', () => {
      harness = setupTestContext(true);
      const date = new Date('04/30/2020');
      harness.component.disabledDates = [new Date('04/25/2020')];
      harness.component.min = new Date('04/01/2020');
      harness.component.max = new Date('05/31/2020');
      harness.component.value = date;

      expect(harness.component.value).toEqual(date);
    });

    it('should set value in calendar if open', () => {
      harness = setupTestContext(true);
      const date = new Date();
      openPopup(harness.component);
      const calendar = getCalendar(harness.component);

      harness.component.value = date;
      expect(harness.component.value).toEqual(date);
      expect(calendar.value).toEqual(date);
    });

    it('should set value via attribute', () => {
      harness = setupTestContext(true);
      const date = '05/04/2020';
      harness.component.setAttribute(DATE_PICKER_CONSTANTS.observedAttributes.VALUE, date);

      expect(harness.component.value).toEqual(new Date(date));
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

    it('should format and set value on input blur', () => {
      harness = setupTestContext(true);
      const dateStr = '01012020';
      const formattedDateStr = formatDate(parseDateString(dateStr) as Date);
      getInputElement(harness.component).focus();
      getInputElement(harness.component).value = '01012020';
      getInputElement(harness.component).blur();
      getInputElement(harness.component).dispatchEvent(new Event('blur'));

      expect(getInputElement(harness.component).value).toBe(formattedDateStr);
    });

    it('should close popup on blur', async () => {
      harness = setupTestContext(true);
      openPopup(harness.component);

      expectPopupOpen(harness.component, true);
      getInputElement(harness.component).blur();
      getInputElement(harness.component).dispatchEvent(new Event('blur'));
      await popupCloseAnimation();

      expectPopupOpen(harness.component, false);
    });

    it('should not open via toggle if disabled', () => {
      harness = setupTestContext(true);
      harness.component.disabled = true;
      getToggleElement(harness.component).dispatchEvent(new PointerEvent('mousedown'));

      expectPopupOpen(harness.component, false);
    });

    it('should use input mask', () => {
      harness = setupTestContext(true);
      harness.component.masked = true;

      expect(harness.component.masked).toBe(true);

      const inputElement = getInputElement(harness.component);
      inputElement.value = '01012020';
      inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(inputElement.value).toBe('01/01/2020');
    });

    it('should only show mask format on focus', () => {
      harness = setupTestContext(true);
      const inputElement = getInputElement(harness.component);
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(harness.component.showMaskFormat).toBe(true);
      expect(getInputElement(harness.component).value).toBe('');
      inputElement.focus();
      inputElement.dispatchEvent(new FocusEvent('focus'));
      expect(getInputElement(harness.component).value).toBe('__/__/____');
    });

    it('should select mask when shown on focus', () => {
      harness = setupTestContext(true);
      const inputElement = getInputElement(harness.component);
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(harness.component.showMaskFormat).toBe(true);
      inputElement.focus();
      inputElement.dispatchEvent(new FocusEvent('focus'));

      expect(inputElement.selectionStart).toBe(0);
      expect(inputElement.selectionEnd).toBe('__/__/____'.length);
    });

    it('should clear mask format on blur', () => {
      harness = setupTestContext(true);
      const inputElement = getInputElement(harness.component);
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(harness.component.showMaskFormat).toBe(true);
      expect(getInputElement(harness.component).value).toBe('');

      inputElement.focus();
      inputElement.dispatchEvent(new FocusEvent('focus'));
      expect(getInputElement(harness.component).value).toBe('__/__/____');

      inputElement.dispatchEvent(new KeyboardEvent('input'));
      inputElement.blur();
      inputElement.dispatchEvent(new FocusEvent('blur'));

      expect(inputElement.value).toBe('');
    });

    it('should use custom parse callback, format callback, and mask format', () => {
      harness = setupTestContext(true);
      harness.component.masked = true;
      harness.component.showMaskFormat = true;
      harness.component.maskFormat = '0000-00-00';
      harness.component.parseCallback = (str: string) => (str ? new Date(`${str}T00:00:00.000Z`) : null);
      harness.component.formatCallback = (date: Date) => (date ? date.toISOString().split('T')[0] : '');

      const inputEl = getInputElement(harness.component);
      inputEl.focus();
      inputEl.dispatchEvent(new FocusEvent('focus'));

      expect(inputEl.value).toBe('____-__-__');

      inputEl.value = '20200101';
      inputEl.dispatchEvent(new Event('input'));

      expect(getInputElement(harness.component).value).toBe('2020-01-01');
    });

    it('should allow for setting mask format via attribute', () => {
      harness = setupTestContext(true);
      const format = '0`0`0`0-`0`0-`0`0';
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASK_FORMAT, format);

      const inputEl = getInputElement(harness.component);
      inputEl.focus();
      inputEl.dispatchEvent(new FocusEvent('focus'));

      expect(harness.component.maskFormat).toBe(format);
      expect(getInputElement(harness.component).value).toBe('____-__-__');
    });

    it("should remove characters that aren't valid when formatting value on blur", () => {
      harness = setupTestContext(true);

      const inputElement = getInputElement(harness.component);
      inputElement.focus();
      inputElement.value = 'abcd';
      inputElement.dispatchEvent(new Event('blur'));

      expect(inputElement.value).toBe('');
    });

    it('should set value to null and emit change event when setting min date', () => {
      harness = setupTestContext(true);
      const date = new Date('01/01/2020');
      harness.component.value = date;

      const changeSpy = vi.fn();
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      harness.component.min = new Date('01/02/2020');

      expect(harness.component.value).toBeNull();
      expect(getInputElement(harness.component).value).toBe('');
      expect(changeSpy).toHaveBeenCalledOnce();
    });

    it('should set value to null and emit change event when setting max date', () => {
      harness = setupTestContext(true);
      const date = new Date('01/02/2020');
      harness.component.value = date;

      const changeSpy = vi.fn();
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      harness.component.max = new Date('01/01/2020');

      expect(harness.component.value).toBeNull();
      expect(getInputElement(harness.component).value).toBe('');
      expect(changeSpy).toHaveBeenCalledOnce();
    });

    it('should set value to null and emit change event when setting disabled dates', () => {
      harness = setupTestContext(true);
      const date = new Date('01/01/2020');
      harness.component.value = date;

      const changeSpy = vi.fn();
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      harness.component.disabledDates = [new Date('01/01/2020')];

      expect(harness.component.value).toBeNull();
      expect(getInputElement(harness.component).value).toBe('');
      expect(changeSpy).toHaveBeenCalledOnce();
    });

    it('should not propagate keydown event on input when masked and left or right arrow key is pressed when open', () => {
      harness = setupTestContext(true);
      harness.component.masked = true;
      openPopup(harness.component);

      const keydownSpy = vi.fn();
      getInputElement(harness.component).addEventListener('keydown', keydownSpy);

      getInputElement(harness.component).focus();
      getInputElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      getInputElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      expect(keydownSpy).not.toHaveBeenCalled();
    });

    it('should select the active date when tab key is pressed when open', () => {
      harness = setupTestContext(true);
      harness.component.valueMode = 'object';
      openPopup(harness.component);

      getInputElement(harness.component).focus();
      getInputElement(harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      const value = harness.component.value as Date;
      expect(isSameDate(value, new Date())).toBe(true);
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

    it('should emit input and change events when the date is set', () => {
      harness = setupTestContext(true);
      const inputSpy = vi.fn();
      getInputElement(harness.component).addEventListener('change', inputSpy);

      const changeSpy = vi.fn();
      getInputElement(harness.component).addEventListener('change', changeSpy);

      harness.component.value = new Date('06/01/2020');

      expect(inputSpy).toHaveBeenCalledOnce();
      expect(changeSpy).toHaveBeenCalledOnce();
    });

    it('should not emit input and change events when the date is set if notify input value changes is false', () => {
      harness = setupTestContext(true);
      harness.component.notifyInputValueChanges = false;

      const inputSpy = vi.fn();
      getInputElement(harness.component).addEventListener('change', inputSpy);

      const changeSpy = vi.fn();
      getInputElement(harness.component).addEventListener('change', changeSpy);

      harness.component.value = new Date('06/01/2020');

      expect(harness.component.notifyInputValueChanges).toBe(false);
      expect(inputSpy).not.toHaveBeenCalled();
      expect(changeSpy).not.toHaveBeenCalled();
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

    it('should set date to todays date without time when clicking today button', async () => {
      harness = setupTestContext(true);
      harness.component.showToday = true;
      const changeSpy = vi.fn();
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      openPopup(harness.component);

      clickTodayButton(harness.component);
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      const popup = getPopup(harness.component);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      expect(changeSpy).toHaveBeenCalledOnce();
      expect(harness.component.open).toBe(false);
      expect(popup).toBeNull();
      expect(harness.component.value).toBeInstanceOf(Date);
      expect((harness.component.value as Date).toISOString()).toBe(today.toISOString());
    });

    it('should set date to todays date with time when clicking today button if value with time is already set', async () => {
      harness = setupTestContext(true);
      harness.component.showToday = true;
      const dateWithTime = new Date('01/01/2021 12:00:00');
      harness.component.value = dateWithTime;
      openPopup(harness.component);

      clickTodayButton(harness.component);
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      const todayWithTime = new Date();
      todayWithTime.setHours(dateWithTime.getHours(), dateWithTime.getMinutes(), dateWithTime.getSeconds(), dateWithTime.getMilliseconds());

      expect(harness.component.value.toISOString()).toBe(todayWithTime.toISOString());
    });

    it('should set date to todays date when clicking today button a second time', async () => {
      harness = setupTestContext(true);
      harness.component.showToday = true;
      const changeSpy = vi.fn();
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      openPopup(harness.component);

      clickTodayButton(harness.component);
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      let popup = getPopup(harness.component);
      const today = new Date();

      expect(changeSpy).toHaveBeenCalledOnce();
      expect(harness.component.open).toBe(false);
      expect(popup).toBeNull();
      expect(harness.component.value).toBeInstanceOf(Date);
      expect((harness.component.value as Date).toDateString()).toBe(today.toDateString());

      openPopup(harness.component);

      clickTodayButton(harness.component);
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      popup = getPopup(harness.component);

      expect(changeSpy).toHaveBeenCalledTimes(2);
      expect(harness.component.open).toBe(false);
      expect(popup).toBeNull();
      expect(harness.component.value).toBeInstanceOf(Date);
      expect((harness.component.value as Date).toDateString()).toBe(today.toDateString());
    });

    it('should remove value when clicking clear button', async () => {
      harness = setupTestContext(true);
      harness.component.showClear = true;
      harness.component.value = new Date('01/01/2021');
      const changeSpy = vi.fn();
      harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      openPopup(harness.component);

      clickClearButton(harness.component);
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      const popup = getPopup(harness.component);

      expect(changeSpy).toHaveBeenCalledOnce();
      expect(harness.component.open).toBe(false);
      expect(popup).toBeNull();
      expect(harness.component.value).toBeNull();
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
      harness.component.value = date;

      expect(harness.component.value).toBeNull();
    });

    it('should remove value if set and is disabled', async () => {
      harness = setupTestContext(true);
      const date = new Date();
      harness.component.value = date;
      await frame();
      harness.component.disabledDaysOfWeek = [date.getDay()];

      expect(harness.component.value).toBeNull();
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

    it('should not emit change event when initialized', async () => {
      harness = setupTestContext(true);
      const inputSpy = vi.fn();
      getInputElement(harness.component).addEventListener('input', inputSpy);

      if (!harness.component['_core'].initialize) {
        throw new Error('Expected initialize method to exist');
      }
      harness.component['_core'].initialize();

      expect(inputSpy).not.toHaveBeenCalled();
    });

    it('should update date picker when a new month is selected', async () => {
      harness = setupTestContext(true);
      harness.component.showClear = true;
      harness.component.value = new Date(new Date().getFullYear(), 2);

      const inputElement = getInputElement(harness.component);
      inputElement.focus();

      openPopup(harness.component);
      await frame();
      await frame();
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { shiftKey: true, key: 'm' }));
      await frame();
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await frame();

      expect((harness.component.value as Date).getMonth()).toBe(0);
    });

    it('should update date picker when a new year is selected', async () => {
      harness = setupTestContext(true);
      harness.component.showClear = true;
      harness.component.value = new Date();

      const inputElement = getInputElement(harness.component);
      inputElement.focus();

      openPopup(harness.component);
      await frame();
      await frame();
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { shiftKey: true, key: 'y' }));
      await frame();
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await frame();

      expect((harness.component.value as Date).getFullYear()).toBe(new Date().getFullYear() + 1);
    });

    it('should mask leading zero on month in initial entry', () => {
      harness = setupTestContext(true);
      harness.component.masked = true;

      const inputElement = getInputElement(harness.component);
      inputElement.value = '2';
      inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(inputElement.value).toBe('02/');
    });

    it('should mask leading zero on day in initial entry', () => {
      harness = setupTestContext(true);
      harness.component.masked = true;

      const inputElement = getInputElement(harness.component);
      inputElement.value = '01/';
      inputElement.dispatchEvent(new KeyboardEvent('input'));
      inputElement.value = '01/5';
      inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(inputElement.value).toBe('01/05/');
    });

    it('should mask two char year to four char year in current century if 10 or less years in future', () => {
      harness = setupTestContext(true);
      harness.component.masked = true;

      const currentCentury = +String(new Date().getFullYear()).slice(0, 2);
      const year = currentCentury + 5;
      const inputElement = getInputElement(harness.component);
      inputElement.value = `01/01/${year}`;
      inputElement.dispatchEvent(new KeyboardEvent('input'));
      inputElement.dispatchEvent(new Event('blur'));

      expect(inputElement.value).toBe(`01/01/${currentCentury}${year}`);
    });

    it('should mask two char year to four char year in previous century if more than 10 years in future', () => {
      harness = setupTestContext(true);
      harness.component.masked = true;

      const currentCentury = +String(new Date().getFullYear()).slice(0, 2);
      const year = currentCentury + 20;
      const inputElement = getInputElement(harness.component);
      inputElement.value = `01/01/${year}`;
      inputElement.dispatchEvent(new KeyboardEvent('input'));
      inputElement.dispatchEvent(new Event('blur'));

      expect(inputElement.value).toBe(`01/01/${currentCentury - 1}${year}`);
    });

    it('should clear the value when the input is cleared programmatically', () => {
      harness = setupTestContext(true);
      harness.component.value = new Date();

      const input = getInputElement(harness.component);
      input.value = '';
      input.dispatchEvent(new Event('input'));

      expect(harness.component.value).toBeNull();
    });

    it('should update value and mask properly when backspacing then blurred', () => {
      harness = setupTestContext(true);
      harness.component.value = new Date('01/01/2021');
      harness.component.masked = true;
      harness.component.showMaskFormat = true;

      const inputElement = getInputElement(harness.component);
      inputElement.focus();
      inputElement.value = inputElement.value.slice(0, -1);
      inputElement.dispatchEvent(new KeyboardEvent('input'));
      inputElement.blur();
      inputElement.dispatchEvent(new Event('blur'));

      expect(inputElement.value).toBe('01/01/202');
    });

    it('should clear mask format if the input is cleared programmatically', () => {
      harness = setupTestContext(true);
      harness.component.value = new Date();
      harness.component.masked = true;
      harness.component.showMaskFormat = true;

      const inputEl = getInputElement(harness.component);
      inputEl.value = '';
      inputEl.dispatchEvent(new Event('input'));

      expect(harness.component.value).toBeNull();
    });

    it('should set year range via attribute', () => {
      harness = setupTestContext(true);
      const yearRange = '-5:+5';
      harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.YEAR_RANGE, yearRange);

      expect(harness.component.yearRange).toBe(yearRange);
    });

    it('should set year range', () => {
      harness = setupTestContext(true);
      const yearRange = '-5:+5';
      harness.component.yearRange = yearRange;
      openPopup(harness.component);
      const calendar = getCalendar(harness.component);

      expect(calendar.yearRange).toBe(yearRange);
    });
  });

  function setupTestContext(append = false, hasInput = true, hasToggle = true): IDatePickerHarness {
    const fixtureElement = document.createElement('div');
    fixtureElement.id = 'date-picker-test-fixture';
    const component = document.createElement('forge-date-picker') as DatePickerComponentTest;
    if (hasInput) {
      component.appendChild(createInputElement());
    }
    if (hasToggle) {
      component.appendChild(createToggleElement());
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

  function createInputElement(): HTMLInputElement {
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.id = 'date-picker-input';
    return inputElement;
  }

  function createToggleElement(): HTMLButtonElement {
    const toggleElement = document.createElement('button');
    toggleElement.id = 'date-picker-toggle-button';
    toggleElement.setAttribute(BASE_DATE_PICKER_CONSTANTS.attributes.TOGGLE, '');
    return toggleElement;
  }

  function getIdentifier(core: DatePickerComponentTest['_core']): string {
    return 'forge-date-picker-' + core['_adapter']['_identifier'];
  }

  function getInputElement(component: IDatePickerComponent): HTMLInputElement {
    return component.querySelector('#date-picker-input') as HTMLInputElement;
  }

  function getToggleElement(component: IDatePickerComponent): HTMLInputElement {
    return component.querySelector('#date-picker-toggle-button') as HTMLInputElement;
  }

  function openPopup(component: IDatePickerComponent): void {
    getInputElement(component).focus();
    component.open = true;
  }

  function getPopup(component: DatePickerComponentTest): IPopoverComponent {
    return document.querySelector(`${POPOVER_CONSTANTS.elementName}[id=${getIdentifier(component['_core'])}]`) as IPopoverComponent;
  }

  function getCalendar(component: DatePickerComponentTest): ICalendarComponent {
    const popup = getPopup(component);
    return popup.querySelector('forge-calendar') as ICalendarComponent;
  }

  function getCalendarShadow(component: DatePickerComponentTest): ShadowRoot {
    const calendar = getCalendar(component);
    return calendar.shadowRoot as ShadowRoot;
  }

  function getCalendarShadowElement(component: ICalendarComponent): HTMLElement {
    return getShadowElement(component, CALENDAR_CONSTANTS.selectors.CALENDAR);
  }

  function getNextMonthButton(component: ICalendarComponent): HTMLButtonElement {
    return (getShadowElement(component, '#next-button')?.firstElementChild as HTMLButtonElement) ?? null;
  }

  function getPreviousMonthButton(component: ICalendarComponent): HTMLButtonElement {
    return (getShadowElement(component, '#previous-button')?.firstElementChild as HTMLButtonElement) ?? null;
  }

  function getMonthButton(component: ICalendarComponent): HTMLButtonElement {
    return (getShadowElement(component, '#month-button')?.firstElementChild as HTMLButtonElement) ?? null;
  }

  function clickActiveDay(component: DatePickerComponentTest): void {
    const calendarShadow = getCalendarShadow(component);
    const activeCell = calendarShadow.querySelector('.forge-calendar__date:has(forge-focus-indicator[active])') as HTMLTableCellElement;
    activeCell.click();
  }

  function getTodayButton(component: DatePickerComponentTest): IButtonComponent | null {
    const popup = getPopup(component);
    const calendar = popup.querySelector('forge-calendar') as ICalendarComponent;
    return (getShadowElement(calendar, '#today-button') as IButtonComponent) ?? null;
  }

  function getClearButton(component: DatePickerComponentTest): IButtonComponent | null {
    const popup = getPopup(component);
    const calendar = popup.querySelector('forge-calendar') as ICalendarComponent;
    return (getShadowElement(calendar, '#clear-button') as IButtonComponent) ?? null;
  }

  function clickTodayButton(component: DatePickerComponentTest): void {
    const todayButton = getTodayButton(component);
    todayButton?.click();
  }

  function clickClearButton(component: DatePickerComponentTest): void {
    const clearButton = getClearButton(component);
    clearButton?.click();
  }

  function getAnnouncerElement(component: DatePickerComponentTest): HTMLElement {
    const popup = getPopup(component);
    return popup.querySelector('[data-forge-live-announcer]') as HTMLElement;
  }

  async function popupCloseAnimation(): Promise<void> {
    return task(POPOVER_ANIMATION_DURATION);
  }

  function expectPopupOpen(component: DatePickerComponentTest, isOpen: boolean): void {
    const popup = getPopup(component);
    expect(component.hasAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.OPEN)).toBe(isOpen);
    if (isOpen) {
      expect(popup).not.toBeNull();
      expect(popup.isConnected).toBe(isOpen);
      expect(popup.classList.contains('forge-calendar-dropdown__popup')).toBe(isOpen);
      expect(getInputElement(component).getAttribute('aria-expanded')).toBe('true');
    } else {
      expect(popup).toBeNull();
      expect(getInputElement(component).getAttribute('aria-expanded')).toBe('false');
    }
  }

  function expectDefaultValues(component: IDatePickerComponent): void {
    expect(component.isConnected).toBe(true);
    expect(component.value).toBeNull();
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
    expect(component.hasAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.OPEN)).toBe(false);
    expect(component.calendarText).toEqual({});
  }

  function expectDisabled(component: IDatePickerComponent, isDisabled: boolean): void {
    expect(component.disabled).toBe(isDisabled);
    expect(getInputElement(component).disabled).toBe(isDisabled);
    if (getToggleElement(component)) {
      expect(getToggleElement(component).getAttribute('aria-disabled')).toBe(isDisabled.toString());
    }
  }

  function getAllTdElementsForSundays(component: DatePickerComponentTest): (HTMLTableCellElement | null)[] {
    return Array.from(getCalendarShadow(component).querySelectorAll('tbody tr'))
      .map(tr => tr.querySelector('td'))
      .filter(td => td!.hasAttribute('data-date'));
  }

  function getFieldComponent(component: ITextFieldComponent): IFieldComponent {
    return getShadowElement(component, FIELD_CONSTANTS.elementName) as IFieldComponent;
  }
});
