import { getShadowElement, removeElement } from '@tylertech/forge-core';
import { dispatchNativeEvent, tick, timer } from '@tylertech/forge-testing';
import {
  CALENDAR_CONSTANTS,
  DatePickerRange,
  DateRange,
  DATE_RANGE_PICKER_CONSTANTS,
  DEFAULT_DATE_MASK,
  defineDateRangePickerComponent,
  defineTextFieldComponent,
  formatDate,
  ICalendarComponent,
  ICON_BUTTON_CONSTANTS,
  IDateRange,
  IDateRangePickerComponent,
  IPopupComponent,
  ITextFieldComponent,
  parseDateString,
  POPUP_CONSTANTS,
  TEXT_FIELD_CONSTANTS
} from '@tylertech/forge';
import { BASE_DATE_PICKER_CONSTANTS } from '@tylertech/forge/date-picker/base/base-date-picker-constants';
import { tryCleanupPopups } from '../../utils';

interface ITestContext {
  context: ITestDateRangePickerContext;
}

interface ITestDateRangePickerContext {
  component: IDateRangePickerComponent;
  append(): void;
  destroy(): void;
}

describe('DateRangePickerComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineDateRangePickerComponent();
    defineTextFieldComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('with imperative creation', function(this: ITestContext) {
    afterEach(function(this: ITestContext) {
      const popup = getPopup(this.context.component);
      if (popup) {
        removeElement(popup);
      }
    });

    it('should initialize with default values', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expectDefaultValues(this.context.component);
    });

    it('should wait for input element to initialize', async function(this: ITestContext) {
      this.context = setupTestContext(true, false, false);

      await tick();

      expect(this.context.component['_foundation']['_isInitialized']).toBe(false);

      await timer(100);
      this.context.component.appendChild(createFromElement());
      this.context.component.appendChild(createToElement());
      await tick();

      expect(this.context.component['_foundation']['_isInitialized']).toBe(true);
    });

    it('should render with initial date', function(this: ITestContext) {
      this.context = setupTestContext();
      const date = new Date();
      const formattedDate = formatDate(date);
      this.context.component.from = date;
      this.context.append();

      expect(this.context.component.from).toEqual(date);
      expect(getFromElement(this.context.component).value).toBe(formattedDate);

      openPopup(this.context.component);
      const calendar = getCalendar(this.context.component);

      expect((calendar.value as IDateRange).from).toEqual(date);
    });

    it('should automatically render a toggle button with a Forge text-field component', function(this: ITestContext) {
      this.context = setupTestContext(false, false, false, false);

      const textField = document.createElement(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
      textField.appendChild(createFromElement());
      textField.appendChild(createToElement());
      this.context.component.appendChild(textField);
      this.context.append();

      const toggleButton = this.context.component.querySelector(ICON_BUTTON_CONSTANTS.elementName) as HTMLElement;

      expect(toggleButton).not.toBeNull();
      expect(toggleButton.slot).toBe('trailing');
    });

    it('should allow for setting all property values before being placed in DOM', function(this: ITestContext) {
      this.context = setupTestContext();

      const value = new Date('01/01/2020');
      const minDate = new Date('01/01/1990');
      const maxDate = new Date('12/31/2030');
      const disabledDates = [new Date('01/05/2020')];
      this.context.component.from = value;
      this.context.component.min = minDate;
      this.context.component.max = maxDate;
      this.context.component.disabledDates = disabledDates;
      this.context.component.open = true;
      this.context.component.popupClasses = 'test-class';
      this.context.component.disabled = true;
      this.context.component.masked = true;
      this.context.component.maskFormat = 'YYYY-MM-DD';
      this.context.component.showMaskFormat = true;
      this.context.component.valueMode = 'iso-string';

      this.context.append();

      expect(this.context.component.from as any).toBe(value.toISOString());
      expect(this.context.component.min).toEqual(minDate);
      expect(this.context.component.max).toEqual(maxDate);
      expect(this.context.component.disabledDates).toEqual(disabledDates);
      expect(this.context.component.open).toBe(false);
      expect(this.context.component.popupClasses).toBe('test-class');
      expect(this.context.component.disabled).toBe(true);
      expect(this.context.component.masked).toBe(true);
      expect(this.context.component.maskFormat).toBe('YYYY-MM-DD');
      expect(this.context.component.showMaskFormat).toBe(true);
      expect(this.context.component.valueMode).toBe('iso-string');
    });

    it('should allow for setting of input element value before being placed in DOM', function(this: ITestContext) {
      this.context = setupTestContext();

      const date = '05/04/2020';
      const expectedDate = new Date(date);
      getFromElement(this.context.component).value = date;

      this.context.append();

      expect(this.context.component.from).toEqual(expectedDate);
    });
  });

  describe('with static HTML', function(this: ITestContext) {
    afterEach(function(this: ITestContext) {
      const popup = getPopup(this.context.component);
      if (popup) {
        removeElement(popup);
      }
    });

    it('should initialize with default values', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expectDefaultValues(this.context.component);
    });

    it('should initialize ARIA attributes', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const fromElement = getFromElement(this.context.component);
      expect(fromElement.getAttribute('autocomplete')).toBe('off');
      expect(fromElement.getAttribute('autocorrect')).toBe('off');
      expect(fromElement.getAttribute('autocapitalize')).toBe('off');
      expect(fromElement.getAttribute('spellcheck')).toBe('false');
      expect(fromElement.getAttribute('role')).toBe('combobox');
      expect(fromElement.getAttribute('aria-live')).toBe('assertive');
      expect(fromElement.getAttribute('aria-atomic')).toBe('true');
      expect(fromElement.getAttribute('aria-haspopup')).toBe('true');
      expect(fromElement.getAttribute('aria-expanded')).toBe('false');
      expect(fromElement.getAttribute('aria-owns')).toBe(getIdentifier(this.context.component));
      expect(fromElement.getAttribute('aria-disabled')).toBe('false');
      expect(fromElement.hasAttribute('aria-ariactivedescendant')).toBe(false);

      const toElement = getToElement(this.context.component);
      expect(toElement.getAttribute('autocomplete')).toBe('off');
      expect(toElement.getAttribute('autocorrect')).toBe('off');
      expect(toElement.getAttribute('autocapitalize')).toBe('off');
      expect(toElement.getAttribute('spellcheck')).toBe('false');
      expect(toElement.getAttribute('role')).toBe('combobox');
      expect(toElement.getAttribute('aria-live')).toBe('assertive');
      expect(toElement.getAttribute('aria-atomic')).toBe('true');
      expect(toElement.getAttribute('aria-haspopup')).toBe('true');
      expect(toElement.getAttribute('aria-expanded')).toBe('false');
      expect(toElement.getAttribute('aria-owns')).toBe(getIdentifier(this.context.component));
      expect(toElement.getAttribute('aria-disabled')).toBe('false');
      expect(toElement.hasAttribute('aria-ariactivedescendant')).toBe(false);
    });

    it('should open popup programmatically', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.open = true;
      expectPopupOpen(this.context.component, true);
    });

    it('should emit open event when popup opened by user pressing arrow down key on from input', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      const openSpy = jasmine.createSpy('open');
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.OPEN, openSpy);
      getFromElement(this.context.component).focus();
      getFromElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await tick();
      expect(openSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit open event when popup opened by user pressing arrow down key on to input', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      const openSpy = jasmine.createSpy('open');
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.OPEN, openSpy);
      getToElement(this.context.component).focus();
      getToElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await tick();
      expect(openSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit open event when popup opened by user clicking toggle button', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const openSpy = jasmine.createSpy('open spy');
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.OPEN, openSpy);
      dispatchNativeEvent(getToggleElement(this.context.component), 'mousedown');
      await tick();
      expect(openSpy).toHaveBeenCalledTimes(1);
    });

    it('should not emit open event when popup opened programmatically', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const openSpy = jasmine.createSpy('open spy');
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.OPEN, openSpy);
      openPopup(this.context.component);

      expect(openSpy).not.toHaveBeenCalled();
    });

    it('should emit close event when popup closed via escape key from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const closeSpy = jasmine.createSpy('close spy');
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.context.component);
      getFromElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit close event when popup closed via escape key to input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const closeSpy = jasmine.createSpy('close spy');
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.context.component);
      getToElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit close event when popup closed via toggle click', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const closeSpy = jasmine.createSpy('close spy');
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.context.component);
      dispatchNativeEvent(getToggleElement(this.context.component), 'mousedown');

      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit close event when selecting date from calendar via enter key', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const closeSpy = jasmine.createSpy('close spy');
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.context.component);
      const fromElement = getFromElement(this.context.component);
      fromElement.focus();
      await tick();
      fromElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fromElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      fromElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await tick();

      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit close event when selecting date from calendar with mouse', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const closeSpy = jasmine.createSpy('close spy');
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.context.component);
      const fromElement = getFromElement(this.context.component);
      fromElement.focus();
      await tick();

      clickActiveDay(this.context.component);
      fromElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      fromElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await tick();

      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should not emit close event when popup closed programmatically', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const closeSpy = jasmine.createSpy('close spy');
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.context.component);
      this.context.component.open = false;

      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should open when pressing down arrow key', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const fromElement = getFromElement(this.context.component);
      fromElement.focus();
      fromElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await tick();
      expectPopupOpen(this.context.component, true);
    });

    it('should open when clicking toggle element', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      dispatchNativeEvent(getToggleElement(this.context.component), 'mousedown');
      await tick();
      expectPopupOpen(this.context.component, true);
    });

    it('should set focus to input when clicking toggle element', function(this: ITestContext) {
      this.context = setupTestContext(true);
      dispatchNativeEvent(getToggleElement(this.context.component), 'mousedown');
      expect(document.activeElement).toBe(getFromElement(this.context.component));
    });

    it('should close popup when pressing escape key', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);
      expectPopupOpen(this.context.component, true);
      getFromElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await popupCloseAnimation();
      expectPopupOpen(this.context.component, false);
    });

    it('should set aria-activedescendant when pressing arrow key', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);

      const inputElement = getFromElement(this.context.component)
      const originalValue = inputElement.getAttribute('aria-activedescendant');
      expect(inputElement.hasAttribute('aria-activedescendant')).toBeTrue();
      expect(originalValue).toBeTruthy();

      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      const newValue = inputElement.getAttribute('aria-activedescendant');
      expect(inputElement.hasAttribute('aria-activedescendant')).toBeTrue();
      expect(originalValue).not.toBe(newValue);
    });

    it('should change aria-activedescendant when pressing multiple arrow keys', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);
      const announcer = getAnnouncerElement(this.context.component);

      getFromElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      const leftValue = getFromElement(this.context.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).toBe(leftValue);

      getFromElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      const upValue = getFromElement(this.context.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).toBe(upValue);

      getFromElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      const rightValue = getFromElement(this.context.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).toBe(rightValue);

      getFromElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      const downValue = getFromElement(this.context.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).toBe(downValue);

      expect(downValue).toBeTruthy();
      expect([leftValue, upValue, rightValue].includes(downValue)).toBe(false);
    });

    it('should emit change event when selecting date via enter key', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);
      let theEvent: CustomEvent;
      const changeSpy = jasmine.createSpy('change spy', evt => (theEvent = evt)).and.callThrough();
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      getFromElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.any(CustomEvent));
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: theEvent!.detail }));
      expect(this.context.component.from).toEqual(theEvent!.detail.from);
    });

    it('should emit change event when selecting date via mouse', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);
      let theEvent: CustomEvent;
      const changeSpy = jasmine.createSpy('change spy', evt => (theEvent = evt)).and.callThrough();
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      clickActiveDay(this.context.component);
      clickActiveDay(this.context.component);

      await popupCloseAnimation();
      await tick();
      expectPopupOpen(this.context.component, false);
      expect(changeSpy).toHaveBeenCalledTimes(2);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.any(CustomEvent));
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: theEvent!.detail }));
      expect(this.context.component.from).toEqual(theEvent!.detail.from);
    });

    it('should not set date if default prevented in change event', function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);
      const changeSpy = jasmine.createSpy('change spy', evt => evt.preventDefault()).and.callThrough();
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      clickActiveDay(this.context.component);

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(this.context.component.from).toBeNull();
    });

    it('should emit date as string', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const todayDate = new Date();
      const formattedDate = formatDate(todayDate);
      this.context.component.valueMode = 'string';
      openPopup(this.context.component);
      let eventDetail: DatePickerRange = new DatePickerRange();

      const changeSpy = jasmine.createSpy('change spy', evt => (eventDetail = new DatePickerRange(evt.detail))).and.callThrough();
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      clickActiveDay(this.context.component);

      expect(typeof eventDetail.from).toBe('string');
      expect(eventDetail.from).toBe(formattedDate);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: eventDetail }));
      expect(this.context.component.from).toBe(eventDetail.from as string);
    });

    it('should emit date as ISO string', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      this.context.component.valueMode = 'iso-string';
      openPopup(this.context.component);
      let eventDetail: DatePickerRange | undefined;
      const changeSpy = jasmine.createSpy('change spy', evt => (eventDetail = evt.detail)).and.callThrough();
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      clickActiveDay(this.context.component);

      expect(typeof eventDetail).toBe('object');
      expect(eventDetail instanceof DatePickerRange).toBe(true, 'Should emit an instance of DatePickerRange');
      expect(eventDetail!.from).toBe(todayDate.toISOString());
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: eventDetail }));
      expect(this.context.component.from).toBe(eventDetail!.from as string);
    });

    it('should emit change event when setting value mode', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const changeSpy = jasmine.createSpy('change spy');
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      this.context.component.valueMode = 'string';
      this.context.component.valueMode = 'iso-string';
      this.context.component.valueMode = 'object';
      this.context.component.valueMode = 'asdf' as any; // This should emit the value because it is an invalid type

      expect(changeSpy).toHaveBeenCalledTimes(3);
    });

    it('should set value on from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const expectedDate = '05/04/2020';
      const date = new Date(expectedDate);
      this.context.component.from = date;

      expect(getFromElement(this.context.component).value).toBe(expectedDate);
    });

    it('should set value from input element value on from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = '05/04/2020';
      const expectedDate = new Date(date);
      const inputElement = getFromElement(this.context.component);
      inputElement.value = date;
      inputElement.dispatchEvent(new Event('blur'));

      expect(this.context.component.from).toEqual(expectedDate);
    });

    it('should set value on to input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const expectedDate = '05/04/2020';
      const date = new Date(expectedDate);
      this.context.component.to = date;

      expect(getToElement(this.context.component).value).toBe(expectedDate);
    });

    it('should set input element value on to input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = '05/04/2020';
      const expectedDate = new Date(date);
      const inputElement = getToElement(this.context.component);
      inputElement.value = date;
      inputElement.dispatchEvent(new Event('blur'));

      expect(this.context.component.to).toEqual(expectedDate);
    });

    it('should format the date then the input element value is set on from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const inputElement = getFromElement(this.context.component);
      inputElement.value = '01012020';
      inputElement.dispatchEvent(new Event('blur'));

      expect(getFromElement(this.context.component).value).toBe('01/01/2020');
    });

    it('should format the date then the input element value is set on to input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const inputElement = getToElement(this.context.component);
      inputElement.value = '01012020';
      inputElement.dispatchEvent(new Event('blur'));

      expect(getToElement(this.context.component).value).toBe('01/01/2020');
    });

    it('should set value in calendar', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const expectedDate = '01/01/2000';
      const date = new Date(expectedDate);
      this.context.component.from = date;
      openPopup(this.context.component);
      const calendar = getCalendar(this.context.component);
      const calendarValue = calendar.value as DateRange;

      expect(getFromElement(this.context.component).value).toBe(expectedDate);
      expect(calendarValue.from).toEqual(date);
    });

    it('should set min date', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const minDate = new Date(new Date().setHours(0, 0, 0, 0));
      this.context.component.min = minDate;
      openPopup(this.context.component);
      const calendar = getCalendar(this.context.component);

      expect(calendar.min).toEqual(minDate);
    });

    it('should set max date via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const minDate = '01/01/2020';
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MIN, minDate);

      expect(this.context.component.min).toEqual(new Date(minDate));
    });

    it('should set max date', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const maxDate = new Date(new Date().setHours(0, 0, 0, 0));
      this.context.component.max = maxDate;
      openPopup(this.context.component);
      
      const calendar = getCalendar(this.context.component);
      expect(calendar.max).toEqual(maxDate);
    });

    it('should set max date via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const maxDate = '01/01/2020';
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MAX, maxDate);

      expect(this.context.component.max).toEqual(new Date(maxDate));
    });

    it('should reject value if below min date on from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const minDate = new Date('01/01/2020');
      this.context.component.min = minDate;
      this.context.component.from = new Date('06/01/2000');
      expect(this.context.component.from).toBeNull();
      expect(getFromElement(this.context.component).value).toBe('');
    });

    it('should reject value if below min date on to input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const minDate = new Date('01/01/2020');
      this.context.component.min = minDate;
      this.context.component.to = new Date('06/01/2000');
      expect(this.context.component.to).toBeNull();
      expect(getToElement(this.context.component).value).toBe('');
    });

    it('should clear value when set to null', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.valueMode = 'string';
      
      const from = '01/01/2000';
      const to = '01/10/2000';
      this.context.component.value = { from: new Date(from), to: new Date(to) };

      expect(this.context.component.from).toBe(from);
      expect(this.context.component.to).toBe(to);
      
      this.context.component.value = null;

      expect(this.context.component.value).toEqual({ from: null, to: null } as any);
    });

    it('should clear value when min date is set if current value is not valid on from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const minDate = new Date('01/01/2020');
      this.context.component.from = new Date('01/01/2000');

      expect(this.context.component.from).not.toBeNull();
      this.context.component.min = minDate;
      expect(this.context.component.from).toBeNull();
      expect(getFromElement(this.context.component).value).toBe('');
    });

    it('should clear value when min date is set if current value is not valid on to input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const minDate = new Date('01/01/2020');
      this.context.component.to = new Date('01/01/2000');

      expect(this.context.component.to).not.toBeNull();
      this.context.component.min = minDate;
      expect(this.context.component.to).toBeNull();
      expect(getToElement(this.context.component).value).toBe('');
    });

    it('should reject value if above max date from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const maxDate = new Date('01/01/2020');
      this.context.component.max = maxDate;
      this.context.component.from = new Date('06/01/2030');
      expect(this.context.component.from).toBeNull();
      expect(getFromElement(this.context.component).value).toBe('');
    });

    it('should reject value if above max date to input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const maxDate = new Date('01/01/2020');
      this.context.component.max = maxDate;
      this.context.component.to = new Date('06/01/2030');
      expect(this.context.component.to).toBeNull();
      expect(getToElement(this.context.component).value).toBe('');
    });

    it('should clear value when max date is set if current value is not valid on from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const maxDate = new Date('01/01/2020');
      this.context.component.from = new Date('01/01/2030');

      expect(this.context.component.from).not.toBeNull();
      this.context.component.max = maxDate;
      expect(this.context.component.from).toBeNull();
      expect(getFromElement(this.context.component).value).toBe('');
    });

    it('should clear value when max date is set if current value is not valid on to input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const maxDate = new Date('01/01/2020');
      this.context.component.to = new Date('01/01/2030');

      expect(this.context.component.to).not.toBeNull();
      this.context.component.max = maxDate;
      expect(this.context.component.to).toBeNull();
      expect(getToElement(this.context.component).value).toBe('');
    });

    it('should set disabled dates', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      this.context.component.disabledDates = disabledDates;
      openPopup(this.context.component);
      const calendar = getCalendar(this.context.component);

      expect(calendar.disabledDates).toEqual(disabledDates);
    });

    it('should set disabled dates in calendar if open', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      openPopup(this.context.component);
      const calendar = getCalendar(this.context.component);
      this.context.component.disabledDates = disabledDates;

      expect(calendar.disabledDates).toEqual(disabledDates);
    });

    it('should restrict date if matching date is disabled in from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      this.context.component.disabledDates = disabledDates;
      this.context.component.from = '01/01/2020';

      expect(this.context.component.from).toBeNull();
      expect(getFromElement(this.context.component).value).toBe('');
    });

    it('should restrict date if matching date is disabled in to input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      this.context.component.disabledDates = disabledDates;
      this.context.component.to = '01/01/2020';

      expect(this.context.component.to).toBeNull();
      expect(getToElement(this.context.component).value).toBe('');
    });

    it('should clear value when disabled dates is set if current value is disabled in from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      this.context.component.from = '01/01/2020';

      expect(this.context.component.from).not.toBeNull();
      this.context.component.disabledDates = disabledDates;
      expect(this.context.component.from).toBeNull();
      expect(getFromElement(this.context.component).value).toBe('');
    });

    it('should clear value when disabled dates is set if current value is disabled in to input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      this.context.component.to = '01/01/2020';

      expect(this.context.component.to).not.toBeNull();
      this.context.component.disabledDates = disabledDates;
      expect(this.context.component.to).toBeNull();
      expect(getToElement(this.context.component).value).toBe('');
    });

    it('should accept valid date if min, max, and disabled dates are set in from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = new Date('04/30/2020');
      this.context.component.disabledDates = [new Date('04/25/2020')];
      this.context.component.min = new Date('04/01/2020');
      this.context.component.max = new Date('05/31/2020');
      this.context.component.from = date;

      expect(this.context.component.from).toEqual(date);
    });

    it('should accept valid date if min, max, and disabled dates are set in to input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = new Date('04/30/2020');
      this.context.component.disabledDates = [new Date('04/25/2020')];
      this.context.component.min = new Date('04/01/2020');
      this.context.component.max = new Date('05/31/2020');
      this.context.component.to = date;

      expect(this.context.component.to).toEqual(date);
    });

    it('should set value in calendar if open in from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = new Date();
      openPopup(this.context.component);
      const calendar = getCalendar(this.context.component);
      this.context.component.from = date;
      const calendarValue = calendar.value as DateRange;
      expect(this.context.component.from).toEqual(date);
      expect(calendarValue.from).toEqual(date);
    });

    it('should set value in calendar if open in to input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = new Date();
      openPopup(this.context.component);
      const calendar = getCalendar(this.context.component);
      this.context.component.to = date;

      const calendarValue = calendar.value as DateRange;
      expect(this.context.component.to).toEqual(date);
      expect(calendarValue.to).toEqual(date);
    });

    it('should set from date via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = '05/04/2020';
      this.context.component.setAttribute(DATE_RANGE_PICKER_CONSTANTS.observedAttributes.FROM, date);

      expect(this.context.component.from).toEqual(new Date(date));
    });

    it('should set to date via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = '05/04/2020';
      this.context.component.setAttribute(DATE_RANGE_PICKER_CONSTANTS.observedAttributes.TO, date);

      expect(this.context.component.to).toEqual(new Date(date));
    });

    it('should set disabled', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.disabled = true;
      expectDisabled(this.context.component, true);
    });

    it('should set disabled via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.DISABLED, 'true');
      expectDisabled(this.context.component, true);
    });

    it('should set custom popup class', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const className = 'test-class';
      this.context.component.popupClasses = className;
      openPopup(this.context.component);
      const popup = getPopup(this.context.component);

      expect(popup.classList.contains(className)).toBe(true);
    });

    it('should set multiple custom popup classes', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const classNames = ['test-class-1', 'test-class-2'];
      this.context.component.popupClasses = classNames;
      openPopup(this.context.component);
      const popup = getPopup(this.context.component);

      expect(classNames.every(cn => popup.classList.contains(cn))).toBe(true);
    });

    it('should set popup class via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const className = 'test-class';
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.POPUP_CLASSES, className);
      openPopup(this.context.component);
      const popup = getPopup(this.context.component);

      expect(popup.classList.contains(className)).toBe(true);
    });

    it('should format and set value on from input blur', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const dateStr = '01012020';
      const formattedDateStr = formatDate(parseDateString(dateStr) as Date);
      getFromElement(this.context.component).focus();
      getFromElement(this.context.component).value = '01012020';
      getFromElement(this.context.component).blur();
      getFromElement(this.context.component).dispatchEvent(new Event('blur'));

      expect(getFromElement(this.context.component).value).toBe(formattedDateStr);
    });

    it('should format and set value on to input blur', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const dateStr = '01012020';
      const formattedDateStr = formatDate(parseDateString(dateStr) as Date);
      getToElement(this.context.component).focus();
      getToElement(this.context.component).value = '01012020';
      getToElement(this.context.component).blur();
      getToElement(this.context.component).dispatchEvent(new Event('blur'));

      expect(getToElement(this.context.component).value).toBe(formattedDateStr);
    });

    it('should close popup on blur', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);

      await tick();
      expectPopupOpen(this.context.component, true);
      getFromElement(this.context.component).blur();
      getFromElement(this.context.component).dispatchEvent(new Event('blur'));
      await popupCloseAnimation();
      await tick();

      expectPopupOpen(this.context.component, false);
    });

    it('should not open via toggle if disabled', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.disabled = true;
      dispatchNativeEvent(getToggleElement(this.context.component), 'mousedown');

      expectPopupOpen(this.context.component, false);
    });

    it('should use from input mask', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.masked = true;

      expect(this.context.component.masked).toBe(true);

      const inputElement = getFromElement(this.context.component);
      inputElement.value = '01012020';
      inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(inputElement.value).toBe('01/01/2020');
    });

    it('should use to input mask', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.masked = true;

      expect(this.context.component.masked).toBe(true);

      const inputElement = getToElement(this.context.component);
      inputElement.value = '01012020';
      inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(inputElement.value).toBe('01/01/2020');
    });

    it('should only show mask format in "from" input on focus', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const fromElement = getFromElement(this.context.component);
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(this.context.component.showMaskFormat).toBe(true);
      fromElement.focus();
      expect(fromElement.value).toBe('__/__/____');
    });

    it('should only show mask format in "to" input on focus', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const toElement = getToElement(this.context.component);
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(this.context.component.showMaskFormat).toBe(true);
      toElement.focus();
      expect(toElement.value).toBe('__/__/____');
    });

    it('should clear mask format in "from" input on blur', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const fromElement = getFromElement(this.context.component);
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(this.context.component.showMaskFormat).toBe(true);
      fromElement.focus();
      expect(fromElement.value).toBe('__/__/____');
      fromElement.dispatchEvent(new KeyboardEvent('input'));
      fromElement.blur();

      expect(fromElement.value).toBeFalsy();
    });

    it('should clear mask format in "to" input on blur', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const toElement = getToElement(this.context.component);
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(this.context.component.showMaskFormat).toBe(true);
      toElement.focus();
      expect(toElement.value).toBe('__/__/____');
      toElement.dispatchEvent(new KeyboardEvent('input'));
      toElement.blur();

      expect(toElement.value).toBeFalsy();
    });

    it('should use custom parse callback, format callback, and mask format on from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.masked = true;
      this.context.component.showMaskFormat = true;
      this.context.component.maskFormat = 'YYYY-MM-DD';
      this.context.component.parseCallback = str => (str ? new Date(`${str}T00:00:00.000Z`) : null);
      this.context.component.formatCallback = date => (date ? date.toISOString().split('T')[0] : '');

      expect(getFromElement(this.context.component).value).toBe('____-__-__');

      getFromElement(this.context.component).value = '20200101';
      // note: the setting of the input element value does emit the input event, but in this case parseCallback gets called with 20200101 which results in a date of new Date(`20200101T00:00:00.000Z`), which isn't valid so it gets nulled and the input event never gets fired (because the input value and the component value are the same value of null). it's almost like the mask needs to occur before that call and then re-emitting another input wouldn't be necessary
      dispatchNativeEvent(getFromElement(this.context.component), 'input');

      expect(getFromElement(this.context.component).value).toBe('2020-01-01');
    });

    it('should use custom parse callback, format callback, and mask format on from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.masked = true;
      this.context.component.showMaskFormat = true;
      this.context.component.maskFormat = 'YYYY-MM-DD';
      this.context.component.parseCallback = str => (str ? new Date(`${str}T00:00:00.000Z`) : null);
      this.context.component.formatCallback = date => (date ? date.toISOString().split('T')[0] : '');

      expect(getToElement(this.context.component).value).toBe('____-__-__');

      getToElement(this.context.component).value = '20200101';
      // note: the setting of the input element value does emit the input event, but in this case parseCallback gets called with 20200101 which results in a date of new Date(`20200101T00:00:00.000Z`), which isn't valid so it gets nulled and the input event never gets fired (because the input value and the component value are the same value of null). it's almost like the mask needs to occur before that call and then re-emitting another input wouldn't be necessary
      dispatchNativeEvent(getToElement(this.context.component), 'input');

      expect(getToElement(this.context.component).value).toBe('2020-01-01');
    });

    it('should allow for setting mask format via attribute in from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASK_FORMAT, 'YYYY-MM-DD');

      expect(this.context.component.maskFormat).toBe('YYYY-MM-DD');
      expect(getFromElement(this.context.component).value).toBe('____-__-__');
    });

    it('should allow for setting mask format via attribute in to input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASK_FORMAT, 'YYYY-MM-DD');

      expect(this.context.component.maskFormat).toBe('YYYY-MM-DD');
      expect(getToElement(this.context.component).value).toBe('____-__-__');
    });

    it("should remove characters that aren't valid when formatting in from input", function(this: ITestContext) {
      this.context = setupTestContext(true);
      getFromElement(this.context.component).focus();
      getFromElement(this.context.component).value = 'abcd';
      this.context.component.open = true;

      expect(getFromElement(this.context.component).value).toBe('');
    });

    it("should remove characters that aren't valid when formatting in to input", async function(this: ITestContext) {
      this.context = setupTestContext(true);
      getToElement(this.context.component).focus();
      getToElement(this.context.component).value = 'abcd';
      this.context.component.open = true;
      expect(getToElement(this.context.component).value).toBe('');
    });

    it('should set value to null and emit change event when setting min date', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = new Date('01/01/2020');
      this.context.component.from = date;

      const changeSpy = jasmine.createSpy('change spy');
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      this.context.component.min = new Date('01/02/2020');

      expect(this.context.component.from).toBeNull();
      expect(getFromElement(this.context.component).value).toBe('');
      expect(changeSpy).toHaveBeenCalledTimes(1);
    });

    it('should set value to null and emit change event when setting max date on from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = new Date('01/02/2020');
      this.context.component.from = date;

      const changeSpy = jasmine.createSpy('change spy');
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      this.context.component.max = new Date('01/01/2020');

      expect(this.context.component.from).toBeNull();
      expect(getFromElement(this.context.component).value).toBe('');
      expect(changeSpy).toHaveBeenCalledTimes(1);
    });

    it('should set value to null and emit change event when setting max date on to input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = new Date('01/02/2020');
      this.context.component.to = date;

      const changeSpy = jasmine.createSpy('change spy');
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      this.context.component.max = new Date('01/01/2020');

      expect(this.context.component.to).toBeNull();
      expect(getToElement(this.context.component).value).toBe('');
      expect(changeSpy).toHaveBeenCalledTimes(1);
    });

    it('should set value to null and emit change event when setting disabled dates on from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = new Date('01/01/2020');
      this.context.component.from = date;

      const changeSpy = jasmine.createSpy('change spy');
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      this.context.component.disabledDates = [new Date('01/01/2020')];

      expect(this.context.component.from).toBeNull();
      expect(getFromElement(this.context.component).value).toBe('');
      expect(changeSpy).toHaveBeenCalledTimes(1);
    });

    it('should set value to null and emit change event when setting disabled dates on to input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = new Date('01/01/2020');
      this.context.component.to = date;

      const changeSpy = jasmine.createSpy('change spy');
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      this.context.component.disabledDates = [new Date('01/01/2020')];

      expect(this.context.component.to).toBeNull();
      expect(getToElement(this.context.component).value).toBe('');
      expect(changeSpy).toHaveBeenCalledTimes(1);
    });

    it('should not propagate keydown event on input when masked and left or right arrow key is pressed when open in from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.masked = true;
      openPopup(this.context.component);

      const keydownSpy = jasmine.createSpy('keydown spy');
      getFromElement(this.context.component).addEventListener('keydown', keydownSpy);

      getFromElement(this.context.component).focus();
      getFromElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      getFromElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      expect(keydownSpy).not.toHaveBeenCalled();
    });

    it('should set min date when open', function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);
      const minDate = new Date(new Date().setHours(0, 0, 0, 0));
      this.context.component.min = minDate;
      const calendar = getCalendar(this.context.component);
      expect(calendar.min).toEqual(minDate);
    });

    it('should set max date when open', function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);
      const maxDate = new Date(new Date().setHours(0, 0, 0, 0));
      this.context.component.max = maxDate;

      const calendar = getCalendar(this.context.component);
      expect(calendar.max).toEqual(maxDate);
    });

    it('should emit input and change events when the date is set to from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const inputSpy = jasmine.createSpy('input spy');
      getFromElement(this.context.component).addEventListener('change', inputSpy);

      const changeSpy = jasmine.createSpy('change spy');
      getFromElement(this.context.component).addEventListener('change', changeSpy);

      this.context.component.from = new Date('06/01/2020');

      expect(inputSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit input and change events when the date is set to to input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const inputSpy = jasmine.createSpy('input spy');
      getToElement(this.context.component).addEventListener('change', inputSpy);

      const changeSpy = jasmine.createSpy('change spy');
      getToElement(this.context.component).addEventListener('change', changeSpy);

      this.context.component.to = new Date('06/01/2020');

      expect(inputSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledTimes(1);
    });

    it('should not emit input and change events when the date is set if notify input value changes is false in from input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.notifyInputValueChanges = false;

      const inputSpy = jasmine.createSpy('input spy');
      getFromElement(this.context.component).addEventListener('change', inputSpy);

      const changeSpy = jasmine.createSpy('change spy');
      getFromElement(this.context.component).addEventListener('change', changeSpy);

      this.context.component.from = new Date('06/01/2020');

      expect(this.context.component.notifyInputValueChanges).toBeFalse();
      expect(inputSpy).not.toHaveBeenCalled();
      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should not emit input and change events when the date is set if notify input value changes is false in to input', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.notifyInputValueChanges = false;

      const inputSpy = jasmine.createSpy('input spy');
      getToElement(this.context.component).addEventListener('change', inputSpy);

      const changeSpy = jasmine.createSpy('change spy');
      getToElement(this.context.component).addEventListener('change', changeSpy);

      this.context.component.to = new Date('06/01/2020');

      expect(inputSpy).not.toHaveBeenCalled();
      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should set the to and from properties when the value property is set', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const fromDate = getDateWithDayOffset(-5);
      const toDate = getDateWithDayOffset(5);

      this.context.component.value = {
        from: fromDate,
        to: toDate
      };

      expect(this.context.component.from).toEqual(fromDate, 'from property should be set to the value passed to the value property');
      expect(this.context.component.to).toEqual(toDate, 'to property should be set to the value passed to the value property');
    });

    it('should set value property when the to and from properties are set', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const fromDate = getDateWithDayOffset(-5);
      const toDate = getDateWithDayOffset(5);

      this.context.component.from = fromDate;
      this.context.component.to = toDate;

      expect(this.context.component.value?.from).toEqual(fromDate, 'the value\'s from property should be set to the value passed to the component\'s from property');
      expect(this.context.component.value?.to).toEqual(toDate, 'the value\'s to property should be set to the value passed to the component\'s to property');
    });

    it('should set allow invalid date via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.ALLOW_INVALID_DATE, '');

      expect(this.context.component.allowInvalidDate).toBeTrue();
    });

    it('should not clear the from input value if allow invalid is set', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const invalidDate = '>01/01/2020';
      const disabledDate = '04/25/2020';
      const outsideMinDate = '03/01/2020';
      const outsideMaxDate = '07/01/2020';
      this.context.component.allowInvalidDate = true;

      getFromElement(this.context.component).value = invalidDate;
      expect(getFromElement(this.context.component).value).toEqual(invalidDate);

      getFromElement(this.context.component).value = disabledDate;
      this.context.component.disabledDates = [new Date(disabledDate)];
      expect(getFromElement(this.context.component).value).toEqual(disabledDate);

      getFromElement(this.context.component).value = outsideMinDate;
      this.context.component.min = new Date('04/01/2020');
      expect(getFromElement(this.context.component).value).toEqual(outsideMinDate);

      getFromElement(this.context.component).value = outsideMaxDate;
      this.context.component.max = new Date('05/31/2020');
      expect(getFromElement(this.context.component).value).toEqual(outsideMaxDate);
    });

    it('should not clear the to input value if allow invalid is set', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const invalidDate = '>01/01/2020';
      const disabledDate = '04/25/2020';
      const outsideMinDate = '03/01/2020';
      const outsideMaxDate = '07/01/2020';
      this.context.component.allowInvalidDate = true;

      getToElement(this.context.component).value = invalidDate;
      expect(getToElement(this.context.component).value).toEqual(invalidDate);

      getToElement(this.context.component).value = disabledDate;
      this.context.component.disabledDates = [new Date(disabledDate)];
      expect(getToElement(this.context.component).value).toEqual(disabledDate);

      getToElement(this.context.component).value = outsideMinDate;
      this.context.component.min = new Date('04/01/2020');
      expect(getToElement(this.context.component).value).toEqual(outsideMinDate);

      getToElement(this.context.component).value = outsideMaxDate;
      this.context.component.max = new Date('05/31/2020');
      expect(getToElement(this.context.component).value).toEqual(outsideMaxDate);
    });

    it('should not show today button by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);

      const todayButton = getTodayButton(this.context.component);

      expect(todayButton).toBeNull();
    });

    it('should not show clear button by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);

      const clearButton = getClearButton(this.context.component);

      expect(clearButton).toBeNull();
    });

    it('should show today button', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.showToday = true;
      openPopup(this.context.component);

      const todayButton = getTodayButton(this.context.component);

      expect(this.context.component.showToday).toBeTrue();
      expect(todayButton).not.toBeNull();
    });

    it('should show today button via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_TODAY, '');
      openPopup(this.context.component);

      const todayButton = getTodayButton(this.context.component);

      expect(this.context.component.showToday).toBeTrue();
      expect(todayButton).not.toBeNull();
    });

    it('should show clear button', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.showClear = true;
      openPopup(this.context.component);

      const clearButton = getClearButton(this.context.component);

      expect(this.context.component.showClear).toBeTrue();
      expect(clearButton).not.toBeNull();
    });

    it('should show clear button via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_CLEAR, '');
      openPopup(this.context.component);

      const clearButton = getClearButton(this.context.component);

      expect(this.context.component.showClear).toBeTrue();
      expect(clearButton).not.toBeNull();
    });

    it('should show both today and clear button', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.showToday = true;
      this.context.component.showClear = true;
      openPopup(this.context.component);

      const todayButton = getTodayButton(this.context.component);
      const clearButton = getClearButton(this.context.component);

      expect(todayButton).not.toBeNull();
      expect(clearButton).not.toBeNull();
    });

    it('should set date to todays date when clicking today button', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.showToday = true;
      const changeSpy = jasmine.createSpy('change spy');
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      openPopup(this.context.component);

      clickTodayButton(this.context.component);
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      await tick();

      const popup = getPopup(this.context.component);

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(this.context.component.open).toBeTrue();
      expect(popup).not.toBeNull('Expected popup to stay open');
      expect(this.context.component.value?.from).not.toBeNull();
      expect(this.context.component.value?.to).toBeNull();
      expect((this.context.component.value?.from as Date).getDate()).toEqual(new Date().getDate());
    });

    it('should remove value when clicking clear button', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.showClear = true;
      this.context.component.value = { from: new Date('01/01/2021'), to: new Date('01/05/2021') };
      const changeSpy = jasmine.createSpy('change spy');
      this.context.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      openPopup(this.context.component);

      clickClearButton(this.context.component);
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      await tick();

      const popup = getPopup(this.context.component);

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(this.context.component.open).toBeFalse();
      expect(popup).toBeNull('Expected popup to be removed');
      expect(this.context.component.value).toEqual({ from: null, to: null });
    });

    it('should coerce no square bracket string correctly into an array of DayOfWeek', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.DISABLED_DAYS_OF_WEEK, '1,2,3,4,5');
      await tick();
      expect(this.context.component.disabledDaysOfWeek).toEqual([1, 2, 3, 4, 5]);
    });

    it('should coerce string correctly into an array of DayOfWeek', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.DISABLED_DAYS_OF_WEEK, '[1,2,3,4,5]');
      await tick();
      expect(this.context.component.disabledDaysOfWeek).toEqual([1, 2, 3, 4, 5]);
    });

    it('should not allow date being set from input if disabled', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = new Date();
      this.context.component.disabledDaysOfWeek = [date.getDay()];
      this.context.component.from = date;

      expect(this.context.component.from).toBeNull();
    });

    it('should remove from value if set and is disabled', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = new Date();
      this.context.component.from = date;
      await tick();
      this.context.component.disabledDaysOfWeek = [date.getDay()];

      expect(this.context.component.from).toBeNull();
    });

    it('should remove to value if set and is disabled', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = new Date();
      this.context.component.to = date;
      await tick();
      this.context.component.disabledDaysOfWeek = [date.getDay()];

      expect(this.context.component.to).toBeNull();
    });

    it('should set disabled days to an open calendar', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const adapterSpy = spyOn(this.context.component['_foundation']['_adapter'], 'setCalendarDisabledDaysOfWeek').and.callThrough();

      openPopup(this.context.component);
      await tick();
      this.context.component.disabledDaysOfWeek = [1];
      expect(adapterSpy).toHaveBeenCalled();
    });

    it('should set sundays disabled in calendar popup already open', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.disabledDaysOfWeek = [0];
      openPopup(this.context.component);
      await tick();

      const allSundays = getAllTdElementsForSundays(this.context.component);
      const thatAllSundaysAreDisabled = allSundays.every(td => td!.getAttribute('aria-disabled') === 'true');
      expect(thatAllSundaysAreDisabled).toBe(true);
    });

    it('should set sundays disabled in calendar popup', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);
      await tick();
      this.context.component.disabledDaysOfWeek = [0];
      await tick();

      const allSundays = getAllTdElementsForSundays(this.context.component);
      const thatAllSundaysAreDisabled = allSundays.every(td => td!.getAttribute('aria-disabled') === 'true');
      expect(thatAllSundaysAreDisabled).toBe(true);
    });

    it('should disable today with the disable day callback', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const today = new Date();
      this.context.component.disableDayCallback = (date: Date) => date.toLocaleDateString() === today.toLocaleDateString();
      openPopup(this.context.component);

      const todayElement = getCalendarShadow(this.context.component).querySelector(CALENDAR_CONSTANTS.selectors.DATE_TODAY);
      expect(todayElement?.hasAttribute('disabled')).toBe(true);
    });

    it('should disable today with the disable day callback when popup is open', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const today = new Date();
      openPopup(this.context.component);
      await tick();
      this.context.component.disableDayCallback = (date: Date) => date.toLocaleDateString() === today.toLocaleDateString();
      
      const todayElement = getCalendarShadow(this.context.component).querySelector(CALENDAR_CONSTANTS.selectors.DATE_TODAY);
      expect(todayElement?.hasAttribute('disabled')).toBe(true);
    });
  });

   function getViewElements(component: IDateRangePickerComponent) {
    const list = Array.from(getCalendarShadow(component).querySelectorAll('forge-view'));

    return {
      month: list[1],
      year: list[2],
      date: list[0]
    }
  }

  function getDateWithDayOffset(dayOffset: number): Date {
    const date = new Date();
    return new Date(date.setDate(date.getDate() + dayOffset));
  }

  function setupTestContext(
    append = false,
    hasFromInput = true,
    hasToInput = true,
    hasToggle = true
  ): ITestDateRangePickerContext {
    const fixture = document.createElement('div');
    fixture.id = 'date-range-picker-test-fixture';
    const component = document.createElement(DATE_RANGE_PICKER_CONSTANTS.elementName) as IDateRangePickerComponent;
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
    fixture.appendChild(component);
    if (append) {
      document.body.appendChild(fixture);
    }
    return {
      component,
      append: () => document.body.appendChild(fixture),
      destroy: () => {
        removeElement(fixture);
        tryCleanupPopups();
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

  function getIdentifier(component: IDateRangePickerComponent): string {
    return 'forge-date-range-picker-' + component['_foundation']['_adapter']['_identifier'];
  }

  function openPopup(component: IDateRangePickerComponent): void {
    getFromElement(component).focus();
    component.open = true;
  }

  function getPopup(component: IDateRangePickerComponent): IPopupComponent {
    return document.querySelector(`${POPUP_CONSTANTS.elementName}[id=${getIdentifier(component)}]`) as IPopupComponent;
  }

  function getCalendar(component: IDateRangePickerComponent): ICalendarComponent {
    const popup = getPopup(component);
    return popup.querySelector('forge-calendar') as ICalendarComponent;
  }

  function clickActiveDay(component: IDateRangePickerComponent): void {
    const calendar = getCalendar(component);
    const calendarShadow = calendar.shadowRoot as ShadowRoot;
    const activeCell = calendarShadow.querySelector('.mdc-ripple-upgraded--background-focused') as HTMLTableCellElement;
    activeCell.click();
  }

  function getAnnouncerElement(component: IDateRangePickerComponent): HTMLElement {
    const popup = getPopup(component);
    return popup.querySelector('[data-forge-live-announcer]') as HTMLElement;
  }

  function getTodayButton(component: IDateRangePickerComponent): HTMLButtonElement {
    const popup = getPopup(component);
    const calendar = popup.querySelector('forge-calendar') as ICalendarComponent;
    return getShadowElement(calendar, '#today-button')?.firstElementChild as HTMLButtonElement ?? null;
  }

  function getClearButton(component: IDateRangePickerComponent): HTMLButtonElement {
    const popup = getPopup(component);
    const calendar = popup.querySelector('forge-calendar') as ICalendarComponent;
    return getShadowElement(calendar, '#clear-button')?.firstElementChild as HTMLButtonElement ?? null;
  }

  function clickTodayButton(component: IDateRangePickerComponent): void {
    const todayButton = getTodayButton(component);
    todayButton.click();
    todayButton.dispatchEvent(new MouseEvent('click'));
  }

  function clickClearButton(component: IDateRangePickerComponent): void {
    const clearButton = getClearButton(component);
    clearButton.click();
    clearButton.dispatchEvent(new MouseEvent('click'));
  }

  async function popupCloseAnimation(): Promise<void> {
    return timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
  }

  function expectPopupOpen(component: IDateRangePickerComponent, isOpen: boolean): void {
    const popup = getPopup(component);
    expect(component.hasAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.OPEN)).toBe(isOpen);
    if (isOpen) {
      expect(popup).not.toBeNull();
      expect(popup.isConnected).toBe(isOpen);
      expect(popup.classList.contains('forge-calendar-dropdown__popup')).toBe(isOpen, 'Expected the date range picker popup class to be applied to the popup element');
      expect(getFromElement(component).getAttribute('aria-expanded')).toBe('true', 'Expected aria-expanded to be set to true');
    } else {
      expect(popup).toBeNull();
      expect(getFromElement(component).getAttribute('aria-expanded')).toBe('false', 'Expected aria-expanded to be set to false');
    }
  }

  function expectDefaultValues(component: IDateRangePickerComponent): void {
    expect(component.isConnected).toBeTrue();
    expect(component.from).toBeNull();
    expect(component.to).toBeNull();
    expect(component.min).toBeNull();
    expect(component.max).toBeNull();
    expect(component.disabledDates).toBeNull();
    expect(component.open).toBeFalse();
    expect(component.parseCallback).toBeUndefined();
    expect(component.formatCallback).toBeUndefined();
    expect(component.popupClasses).toBeUndefined();
    expect(component.disabled).toBeFalse();
    expect(component.masked).toBeTrue();
    expect(component.maskFormat).toBe(DEFAULT_DATE_MASK);
    expect(component.showMaskFormat).toBeFalse();
    expect(component.valueMode).toBe('object');
    expect(component.allowInvalidDate).toBeFalse();
    expect(component.hasAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.OPEN)).toBeFalse();
  }

  function expectDisabled(component: IDateRangePickerComponent, isDisabled: boolean): void {
    expect(component.disabled).toBe(isDisabled);
    expect(getFromElement(component).disabled).toBe(isDisabled);
    expect(getToElement(component).disabled).toBe(isDisabled);
    if (getToggleElement(component)) {
      expect(getToggleElement(component).getAttribute('aria-disabled')).toBe(isDisabled.toString());
    }
  }

  function getAllTdElementsForSundays(component: IDateRangePickerComponent) {
    return Array.from(getCalendarShadow(component).querySelectorAll('tbody tr')).map(tr => tr.querySelector('td')).filter(td => td!.hasAttribute('data-date'));
  }

  function getCalendarShadow(component: IDateRangePickerComponent): ShadowRoot {
    const calendar = getCalendar(component);
    return calendar.shadowRoot as ShadowRoot;
  }
});