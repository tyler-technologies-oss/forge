import {
  defineDatePickerComponent,
  IDatePickerComponent,
  DATE_PICKER_CONSTANTS,
  IDatePickerFoundation
} from '@tylertech/forge/date-picker';
import { DEFAULT_DATE_MASK, parseDateString, formatDate, isSameDate } from '@tylertech/forge/core';
import { defineTextFieldComponent, TEXT_FIELD_CONSTANTS, ITextFieldComponent } from '@tylertech/forge/text-field';
import { IPopupComponent, POPUP_CONSTANTS } from '@tylertech/forge/popup';
import { ICalendarComponent, CALENDAR_CONSTANTS } from '@tylertech/forge/calendar';
import { ICON_BUTTON_CONSTANTS } from '@tylertech/forge/icon-button';
import { getShadowElement, removeElement } from '@tylertech/forge-core';
import { timer, tick, dispatchNativeEvent } from '@tylertech/forge-testing';
import { tryCleanupPopups } from '../../utils';
import { FIELD_CONSTANTS } from '@tylertech/forge/field/field-constants';
import { BASE_DATE_PICKER_CONSTANTS } from '@tylertech/forge/date-picker/base/base-date-picker-constants';


interface ITestContext {
  context: ITestDatePickerContext;
}

interface ITestDatePickerContext {
  component: IDatePickerComponent;
  append(): void;
  destroy(): void;
}

describe('DatePickerComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineDatePickerComponent();
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
      this.context = setupTestContext(true, false);

      expect(this.context.component['_foundation']['_isInitialized']).toBe(false);

      await timer(100);
      this.context.component.appendChild(createInputElement());
      await tick();

      expect(this.context.component['_foundation']['_isInitialized']).toBe(true);
    });

    it('should render with initial date', function(this: ITestContext) {
      this.context = setupTestContext(false);
      const date = new Date();
      const formattedDate = formatDate(date);
      this.context.component.value = date;
      this.context.append();

      expect(this.context.component.value).toEqual(date);
      expect(getInputElement(this.context.component).value).toBe(formattedDate);

      openPopup(this.context.component);
      const calendar = getCalendar(this.context.component);

      expect((<Date>calendar.value).toDateString()).toEqual(date.toDateString());
    });

    it('should automatically render a toggle button with a Forge text-field component', function(this: ITestContext) {
      this.context = setupTestContext(false, true, false);

      const textField = document.createElement(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
      textField.appendChild(createInputElement());
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
      this.context.component.value = value;
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
      this.context.component.allowInvalidDate = true;

      this.context.append();

      expect(this.context.component.value as any).toBe(value.toISOString());
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
      expect(this.context.component.allowInvalidDate).toBe(true);
    });

    it('should allow for setting of input element value before being placed in DOM', function(this: ITestContext) {
      this.context = setupTestContext();

      const date = '05/04/2020';
      const expectedDate = new Date(date);
      getInputElement(this.context.component).value = date;

      this.context.append();

      expect(this.context.component.value).toEqual(expectedDate);
    });

    it('should float text-field label when value is set', async function(this: ITestContext) {
      this.context = setupTestContext(false, false);

      const textField = document.createElement(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
      textField.appendChild(createInputElement());

      const labelElement = document.createElement('label');
      labelElement.textContent = 'Label';
      textField.appendChild(labelElement);

      this.context.component.appendChild(textField);
      this.context.append();

      await tick();
      this.context.component.value = '1/1/2021';
      await tick();

      expect(textField.hasAttribute(FIELD_CONSTANTS.attributes.HOST_LABEL_FLOATING)).toBeTrue();
    });

    it('should notify date picker of input value changes when text-field is used', async function(this: ITestContext) {
      this.context = setupTestContext(false, false);
      const textField = document.createElement(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
      textField.appendChild(createInputElement());
      this.context.component.appendChild(textField);
      this.context.append();

      await tick();

      const valueChangeSpy = spyOn(this.context.component['_foundation'], '_onInputValueChanged').and.callThrough();
      getInputElement(this.context.component).value = '1/1/2021';

      expect(valueChangeSpy).toHaveBeenCalled();
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
      const inputElement = getInputElement(this.context.component);
      expect(inputElement.getAttribute('autocomplete')).toBe('off');
      expect(inputElement.getAttribute('autocorrect')).toBe('off');
      expect(inputElement.getAttribute('autocapitalize')).toBe('off');
      expect(inputElement.getAttribute('spellcheck')).toBe('false');
      expect(inputElement.getAttribute('role')).toBe('combobox');
      expect(inputElement.getAttribute('aria-live')).toBe('assertive');
      expect(inputElement.getAttribute('aria-atomic')).toBe('true');
      expect(inputElement.getAttribute('aria-haspopup')).toBe('true');
      expect(inputElement.getAttribute('aria-expanded')).toBe('false');
      expect(inputElement.getAttribute('aria-owns')).toBe(getIdentifier(this.context.component['_foundation']));
      expect(inputElement.getAttribute('aria-disabled')).toBe('false');
      expect(inputElement.hasAttribute('aria-activedescendant')).toBe(false);
    });

    it('should open popup programmatically', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.open = true;
      expectPopupOpen(this.context.component, true);
    });

    it('should emit open event when popup opened by user pressing arrow down key', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const openSpy = jasmine.createSpy('open spy');
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.OPEN, openSpy);
      getInputElement(this.context.component).focus();
      getInputElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      expect(openSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit open event when popup opened by user clicking toggle button', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const openSpy = jasmine.createSpy('open spy');
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.OPEN, openSpy);
      dispatchNativeEvent(getToggleElement(this.context.component), 'mousedown');

      expect(openSpy).toHaveBeenCalledTimes(1);
    });

    it('should not emit open event when popup opened programmatically', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const openSpy = jasmine.createSpy('open spy');
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.OPEN, openSpy);
      openPopup(this.context.component);

      expect(openSpy).not.toHaveBeenCalled();
    });

    it('should emit close event when popup closed via escape key', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const closeSpy = jasmine.createSpy('close spy');
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.context.component);
      getInputElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit close event when popup closed via toggle click', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const closeSpy = jasmine.createSpy('close spy');
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.context.component);
      dispatchNativeEvent(getToggleElement(this.context.component), 'mousedown');

      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit close event when selecting date from calendar via enter key', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const closeSpy = jasmine.createSpy('close spy');
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.CLOSE, closeSpy);

      openPopup(this.context.component);
      await tick();
      getInputElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await tick();

      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit close event when selecting date from calendar with mouse', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const closeSpy = jasmine.createSpy('close spy');
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.context.component);
      clickActiveDay(this.context.component);

      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should not emit close event when popup closed programmatically', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const closeSpy = jasmine.createSpy('close spy');
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.context.component);
      this.context.component.open = false;

      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should open when pressing down arrow key', function(this: ITestContext) {
      this.context = setupTestContext(true);
      getInputElement(this.context.component).focus();
      getInputElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      expectPopupOpen(this.context.component, true);
    });

    it('should open when clicking toggle element', function(this: ITestContext) {
      this.context = setupTestContext(true);
      dispatchNativeEvent(getToggleElement(this.context.component), 'mousedown');
      expectPopupOpen(this.context.component, true);
    });

    it('should set focus to input when clicking toggle element', function(this: ITestContext) {
      this.context = setupTestContext(true);
      dispatchNativeEvent(getToggleElement(this.context.component), 'mousedown');
      expect(document.activeElement).toBe(getInputElement(this.context.component));
    });

    it('should close popup when pressing escape key', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);
      expectPopupOpen(this.context.component, true);
      getInputElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await popupCloseAnimation();
      expectPopupOpen(this.context.component, false);
    });

    it('should set aria-activedescendant when pressing arrow key', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);

      const inputElement = getInputElement(this.context.component)
      const originalValue = inputElement.getAttribute('aria-activedescendant');
      expect(inputElement.hasAttribute('aria-activedescendant')).toBeTrue();
      expect(originalValue).toBeTruthy();
      
      getInputElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      const newValue = inputElement.getAttribute('aria-activedescendant');
      expect(inputElement.hasAttribute('aria-activedescendant')).toBeTrue();
      expect(originalValue).not.toBe(newValue);
    });

    it('should change aria-activedescendant when pressing multiple arrow keys', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);
      const announcer = getAnnouncerElement(this.context.component);

      getInputElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      const leftValue = getInputElement(this.context.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).toBe(leftValue);

      getInputElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      const upValue = getInputElement(this.context.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).toBe(upValue);

      getInputElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      const rightValue = getInputElement(this.context.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).toBe(rightValue);

      getInputElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      const downValue = getInputElement(this.context.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).toBe(downValue);

      expect(downValue).toBeTruthy();
      expect([leftValue, upValue, rightValue].includes(downValue)).toBe(false);
    });

    it('should select today when pressing enter key', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);
      getInputElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      const formattedDate = formatDate(new Date());

      await popupCloseAnimation();
      expectPopupOpen(this.context.component, false);
      expect(getInputElement(this.context.component).value).toBe(formattedDate);
    });

    it('should emit change event when selecting date via enter key', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);
      let theEvent: CustomEvent;
      const changeSpy = jasmine.createSpy('change spy', evt => theEvent = evt).and.callThrough();
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      getInputElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.any(CustomEvent));
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: theEvent!.detail }));
      expect(this.context.component.value).toEqual(theEvent!.detail);
    });

    it('should not blur input when clicking element in calendar', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);
      clickActiveDay(this.context.component);

      await popupCloseAnimation();
      expectPopupOpen(this.context.component, false);
      expect(document.activeElement).toBe(getInputElement(this.context.component));
    });

    it('should emit change event when selecting date via mouse', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);
      let theEvent: CustomEvent;
      const changeSpy = jasmine.createSpy('change spy', evt => theEvent = evt).and.callThrough();
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      clickActiveDay(this.context.component);

      await popupCloseAnimation();
      expectPopupOpen(this.context.component, false);
      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.any(CustomEvent));
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: theEvent!.detail }));
      expect(this.context.component.value).toEqual(theEvent!.detail);
    });

    it('should not set date if default prevented in change event', function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);
      const changeSpy = jasmine.createSpy('change spy', evt => evt.preventDefault()).and.callThrough();
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      clickActiveDay(this.context.component);

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(this.context.component.value).toBeNull();
    });

    it('should emit date as string', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const todayDate = new Date();
      const formattedDate = formatDate(todayDate);
      this.context.component.valueMode = 'string';
      openPopup(this.context.component);
      let eventDetail: string = '';
      const changeSpy = jasmine.createSpy('change spy', evt => eventDetail = evt.detail).and.callThrough();
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      clickActiveDay(this.context.component);

      expect(typeof eventDetail).toBe('string');
      expect(eventDetail).toBe(formattedDate);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: eventDetail }));
      expect(this.context.component.value).toBe(eventDetail);
    });

    it('should emit date as ISO string', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      this.context.component.valueMode = 'iso-string';
      openPopup(this.context.component);
      let eventDetail: string = '';
      const changeSpy = jasmine.createSpy('change spy', evt => eventDetail = evt.detail).and.callThrough();
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      clickActiveDay(this.context.component);

      expect(typeof eventDetail).toBe('string');
      expect(eventDetail).toBe(todayDate.toISOString());
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: eventDetail }));
      expect(this.context.component.value).toBe(eventDetail);
    });

    it('should emit change event when setting value mode', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const changeSpy = jasmine.createSpy('change spy');
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      this.context.component.valueMode = 'string';
      this.context.component.valueMode = 'iso-string';
      this.context.component.valueMode = 'object';
      this.context.component.valueMode = 'asdf' as any; // This should emit the value because it is an invalid type

      expect(changeSpy).toHaveBeenCalledTimes(3);
    });

    it('should set value', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const expectedDate = '05/04/2020';
      const date = new Date(expectedDate);
      this.context.component.value = date;

      expect(getInputElement(this.context.component).value).toBe(expectedDate);
    });

    it('should set value from input element value on blur', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = '05/04/2020';
      const expectedDate = new Date(date);
      const inputElement = getInputElement(this.context.component);
      inputElement.value = date;
      inputElement.dispatchEvent(new Event('blur'));

      expect(this.context.component.value).toEqual(expectedDate);
    });

    it('should format the date when blurred after the input element value is set', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const inputElement = getInputElement(this.context.component);
      inputElement.value = '01012020';
      inputElement.dispatchEvent(new Event('blur'));

      expect(getInputElement(this.context.component).value).toBe('01/01/2020');
    });

    it('should set value in calendar', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const expectedDate = '01/01/2000';
      const date = new Date(expectedDate);
      this.context.component.value = date;
      openPopup(this.context.component);
      const calendar = getCalendar(this.context.component);

      expect(getInputElement(this.context.component).value).toBe(expectedDate);
      expect(calendar.value).toEqual(date);
    });

    it('should coerce the value when the input value is invalid', function(this: ITestContext) {
      this.context = setupTestContext(true);

      const inputElement = getInputElement(this.context.component);
      inputElement.value = '>01/01/2020';
      inputElement.blur();
      inputElement.dispatchEvent(new Event('blur'));

      expect(inputElement.value).toBe('01/01/2020');
    });

    it('should set allow invalid date via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.ALLOW_INVALID_DATE, '');

      expect(this.context.component.allowInvalidDate).toBeTrue();
    });

    it('should not clear the input value if allow invalid is set', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const invalidDate = '>01/01/2020';
      const disabledDate = '04/25/2020';
      const outsideMinDate = '03/01/2020';
      const outsideMaxDate = '07/01/2020';
      this.context.component.allowInvalidDate = true;

      getInputElement(this.context.component).value = invalidDate;
      expect(getInputElement(this.context.component).value).toEqual(invalidDate);

      getInputElement(this.context.component).value = disabledDate;
      this.context.component.disabledDates = [new Date(disabledDate)];
      expect(getInputElement(this.context.component).value).toEqual(disabledDate);

      getInputElement(this.context.component).value = outsideMinDate;
      this.context.component.min = new Date('04/01/2020');
      expect(getInputElement(this.context.component).value).toEqual(outsideMinDate);

      getInputElement(this.context.component).value = outsideMaxDate;
      this.context.component.max = new Date('05/31/2020');
      expect(getInputElement(this.context.component).value).toEqual(outsideMaxDate);
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

    it('should reject value if below min date', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const minDate = new Date('01/01/2020');
      this.context.component.min = minDate;
      this.context.component.value = new Date('06/01/2000');
      expect(this.context.component.value).toBeNull();
      expect(getInputElement(this.context.component).value).toBe('');
    });

    it('should allow value if below min date and allow invalid is set', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.allowInvalidDate = true;
      const minDate = new Date('01/01/2020');
      const date = '06/01/2000';
      const expectedDate = new Date(date);
      this.context.component.min = minDate;
      this.context.component.value = expectedDate;
      expect(this.context.component.value).toEqual(expectedDate);
      expect(getInputElement(this.context.component).value).toBe(date);
    });

    it('should clear value when min date is set if current value is not valid', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const minDate = new Date('01/01/2020');
      this.context.component.value = new Date('01/01/2000');

      expect(this.context.component.value).not.toBeNull();
      this.context.component.min = minDate;
      expect(this.context.component.value).toBeNull();
      expect(getInputElement(this.context.component).value).toBe('');
    });

    it('should reject value if above max date', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const maxDate = new Date('01/01/2020');
      this.context.component.max = maxDate;
      this.context.component.value = new Date('06/01/2030');
      expect(this.context.component.value).toBeNull();
      expect(getInputElement(this.context.component).value).toBe('');
    });

    it('should allow value if above max date and allow invalid is set', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.allowInvalidDate = true;
      const maxDate = new Date('01/01/2020');
      const date = '06/01/2030';
      const expectedDate = new Date(date);
      this.context.component.max = maxDate;
      this.context.component.value = expectedDate;
      expect(this.context.component.value).toEqual(expectedDate);
      expect(getInputElement(this.context.component).value).toBe(date);
    });

    it('should clear value when max date is set if current value is not valid', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const maxDate = new Date('01/01/2020');
      this.context.component.value = new Date('01/01/2030');

      expect(this.context.component.value).not.toBeNull();
      this.context.component.max = maxDate;
      expect(this.context.component.value).toBeNull();
      expect(getInputElement(this.context.component).value).toBe('');
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

    it('should restrict date if matching date is disabled', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      this.context.component.disabledDates = disabledDates;
      this.context.component.value = '01/01/2020';

      expect(this.context.component.value).toBeNull();
      expect(getInputElement(this.context.component).value).toBe('');
    });

    it('should clear value when disabled dates is set if current value is disabled', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      this.context.component.value = '01/01/2020';

      expect(this.context.component.value).not.toBeNull();
      this.context.component.disabledDates = disabledDates;
      expect(this.context.component.value).toBeNull();
      expect(getInputElement(this.context.component).value).toBe('');
    });

    it('should accept valid date if min, max, and disabled dates are set', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = new Date('04/30/2020');
      this.context.component.disabledDates = [new Date('04/25/2020')];
      this.context.component.min = new Date('04/01/2020');
      this.context.component.max = new Date('05/31/2020');
      this.context.component.value = date;

      expect(this.context.component.value).toEqual(date);
    });

    it('should set value in calendar if open', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = new Date();
      openPopup(this.context.component);
      const calendar = getCalendar(this.context.component);

      this.context.component.value = date;
      expect(this.context.component.value).toEqual(date);
      expect(calendar.value).toEqual(date);
    });

    it('should set value via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = '05/04/2020';
      this.context.component.setAttribute(DATE_PICKER_CONSTANTS.observedAttributes.VALUE, date);

      expect(this.context.component.value).toEqual(new Date(date));
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

    it('should format and set value on input blur', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const dateStr = '01012020';
      const formattedDateStr = formatDate(parseDateString(dateStr) as Date);
      getInputElement(this.context.component).focus();
      getInputElement(this.context.component).value = '01012020';
      getInputElement(this.context.component).blur();
      getInputElement(this.context.component).dispatchEvent(new Event('blur'));

      expect(getInputElement(this.context.component).value).toBe(formattedDateStr);
    });

    it('should close popup on blur', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      openPopup(this.context.component);

      expectPopupOpen(this.context.component, true);
      getInputElement(this.context.component).blur();
      getInputElement(this.context.component).dispatchEvent(new Event('blur'));
      await popupCloseAnimation();

      expectPopupOpen(this.context.component, false);
    });

    it('should not open via toggle if disabled', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.disabled = true;
      dispatchNativeEvent(getToggleElement(this.context.component), 'mousedown');

      expectPopupOpen(this.context.component, false);
    });

    it('should use input mask', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.masked = true;

      expect(this.context.component.masked).toBe(true);

      const inputElement = getInputElement(this.context.component);
      inputElement.value = '01012020';
      inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(inputElement.value).toBe('01/01/2020');
    });

    it('should show mask format on focus only', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const inputElement = getInputElement(this.context.component);
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(this.context.component.showMaskFormat).toBe(true);
      expect(getInputElement(this.context.component).value).toBe('');
      inputElement.focus();
      expect(getInputElement(this.context.component).value).toBe('__/__/____');
    });

    it('should use custom parse callback, format callback, and mask format', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.masked = true;
      this.context.component.showMaskFormat = true;
      this.context.component.maskFormat = '0000-00-00';
      this.context.component.parseCallback = str => str ? new Date(`${str}T00:00:00.000Z`) : null;
      this.context.component.formatCallback = date => date ? date.toISOString().split('T')[0] : '';

      expect(getInputElement(this.context.component).value).toBe('____-__-__');

      getInputElement(this.context.component).value = '20200101';
      // note: the setting of the input element value does emit the input event, but in this case parseCallback gets called with 20200101 which results in a date of new Date(`20200101T00:00:00.000Z`), which isn't valid so it gets nulled and the input event never gets fired (because the input value and the component value are the same value of null). it's almost like the mask needs to occur before that call and then re-emitting another input wouldn't be necessary
      dispatchNativeEvent(getInputElement(this.context.component), 'input');

      expect(getInputElement(this.context.component).value).toBe('2020-01-01');
    });

    it('should allow for setting mask format via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const format = '0`0`0`0-`0`0-`0`0';
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASK_FORMAT, format);

      expect(this.context.component.maskFormat).toBe(format);
      expect(getInputElement(this.context.component).value).toBe('____-__-__');
    });

    it('should remove characters that aren\'t valid when formatting value on blur', function(this: ITestContext) {
      this.context = setupTestContext(true);

      const inputElement = getInputElement(this.context.component);
      inputElement.focus();
      inputElement.value = 'abcd';
      inputElement.dispatchEvent(new Event('blur'));

      expect(inputElement.value).toBe('');
    });

    it('should set value to null and emit change event when setting min date', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = new Date('01/01/2020');
      this.context.component.value = date;

      const changeSpy = jasmine.createSpy('change spy');
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      this.context.component.min = new Date('01/02/2020');

      expect(this.context.component.value).toBeNull();
      expect(getInputElement(this.context.component).value).toBe('');
      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: null }));
    });

    it('should set value to null and emit change event when setting max date', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = new Date('01/02/2020');
      this.context.component.value = date;

      const changeSpy = jasmine.createSpy('change spy');
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      this.context.component.max = new Date('01/01/2020');

      expect(this.context.component.value).toBeNull();
      expect(getInputElement(this.context.component).value).toBe('');
      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: null }));
    });

    it('should set value to null and emit change event when setting disabled dates', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = new Date('01/01/2020');
      this.context.component.value = date;

      const changeSpy = jasmine.createSpy('change spy');
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      this.context.component.disabledDates = [new Date('01/01/2020')];

      expect(this.context.component.value).toBeNull();
      expect(getInputElement(this.context.component).value).toBe('');
      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: null }));
    });

    it('should not propagate keydown event on input when masked and left or right arrow key is pressed when open', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.masked = true;
      openPopup(this.context.component);

      const keydownSpy = jasmine.createSpy('keydown spy');
      getInputElement(this.context.component).addEventListener('keydown', keydownSpy);

      getInputElement(this.context.component).focus();
      getInputElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      getInputElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      expect(keydownSpy).not.toHaveBeenCalled();
    });

    it ('should select the active date when tab key is pressed when open', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.valueMode = 'object';
      openPopup(this.context.component);

      getInputElement(this.context.component).focus();
      getInputElement(this.context.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      const value = this.context.component.value as Date;
      expect(isSameDate(value, new Date())).toBeTrue();
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

    it('should emit input and change events when the date is set', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const inputSpy = jasmine.createSpy('input spy');
      getInputElement(this.context.component).addEventListener('change', inputSpy);

      const changeSpy = jasmine.createSpy('change spy');
      getInputElement(this.context.component).addEventListener('change', changeSpy);

      this.context.component.value = new Date('06/01/2020');

      expect(inputSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledTimes(1);
    });

    it('should not emit input and change events when the date is set if notify input value changes is false', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.notifyInputValueChanges = false;

      const inputSpy = jasmine.createSpy('input spy');
      getInputElement(this.context.component).addEventListener('change', inputSpy);

      const changeSpy = jasmine.createSpy('change spy');
      getInputElement(this.context.component).addEventListener('change', changeSpy);

      this.context.component.value = new Date('06/01/2020');

      expect(this.context.component.notifyInputValueChanges).toBeFalse();
      expect(inputSpy).not.toHaveBeenCalled();
      expect(changeSpy).not.toHaveBeenCalled();
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
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      openPopup(this.context.component);

      clickTodayButton(this.context.component);
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      await tick();

      const popup = getPopup(this.context.component);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(this.context.component.open).toBeFalse();
      expect(popup).toBeNull('Expected popup to be removed');
      expect(this.context.component.value).toBeInstanceOf(Date);
      expect((this.context.component.value as Date)).toEqual(today);
    });

    it('should set date to todays date when clicking today button a second time', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.showToday = true;
      const changeSpy = jasmine.createSpy('change spy');
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      openPopup(this.context.component);

      clickTodayButton(this.context.component);
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      await tick();

      const popup = getPopup(this.context.component);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(this.context.component.open).toBeFalse();
      expect(popup).toBeNull('Expected popup to be removed');
      expect(this.context.component.value).toBeInstanceOf(Date);
      expect((this.context.component.value as Date)).toEqual(today);
      
      openPopup(this.context.component);
      
      clickTodayButton(this.context.component);
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      await tick();
      
      expect(changeSpy).toHaveBeenCalledTimes(2);
      expect(this.context.component.open).toBeFalse();
      expect(popup).toBeNull('Expected popup to be removed');
      expect(this.context.component.value).toBeInstanceOf(Date);
      expect((this.context.component.value as Date)).toEqual(today);
    });

    it('should remove value when clicking clear button', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.showClear = true;
      this.context.component.value = new Date('01/01/2021');
      const changeSpy = jasmine.createSpy('change spy');
      this.context.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      openPopup(this.context.component);

      clickClearButton(this.context.component);
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      await tick();

      const popup = getPopup(this.context.component);

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(this.context.component.open).toBeFalse();
      expect(popup).toBeNull('Expected popup to be removed');
      expect(this.context.component.value).toBeNull();
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
      this.context.component.value = date;

      expect(this.context.component.value).toBeNull();
    });

    it('should remove value if set and is disabled', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const date = new Date();
      this.context.component.value = date;
      await tick();
      this.context.component.disabledDaysOfWeek = [date.getDay()];

      expect(this.context.component.value).toBeNull();
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

    it('should not emit change event when initialized', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      const inputSpy = jasmine.createSpy('input');
      getInputElement(this.context.component).addEventListener('input', inputSpy);

      if (!this.context.component['_foundation'].initialize) {
        fail(this.context.component['_foundation'].initialize);
        return;
      }
      this.context.component['_foundation'].initialize();

      expect(inputSpy).not.toHaveBeenCalled();
    });
    
    it('should update date picker when a new month is selected', async function (this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.showClear = true;
      this.context.component.value = new Date(new Date().getFullYear(), 2);
      
      const inputElement = getInputElement(this.context.component);
      inputElement.focus();

      openPopup(this.context.component);
      await tick();
      await tick();
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { shiftKey: true, key: 'm' }));
      await tick();
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await tick();

      expect((this.context.component.value as Date).getMonth()).toBe(0);
    });

    it('should update date picker when a new year is selected', async function (this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.showClear = true;
      this.context.component.value = new Date();

      const inputElement = getInputElement(this.context.component);
      inputElement.focus();

      openPopup(this.context.component);
      await tick();
      await tick();
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { shiftKey: true, key: 'y' }));
      await tick();
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await tick();

      expect((this.context.component.value as Date).getFullYear()).toBe(new Date().getFullYear() + 1);
    });

    it('should mask leading zero on month in initial entry', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.masked = true;

      const inputElement = getInputElement(this.context.component);
      inputElement.value = '2';
      inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(inputElement.value).toBe('02/');
    });

    it('should mask leading zero on day in initial entry', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.masked = true;

      const inputElement = getInputElement(this.context.component);
      inputElement.value = '01/';
      inputElement.dispatchEvent(new KeyboardEvent('input'));
      inputElement.value = '01/5';
      inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(inputElement.value).toBe('01/05/');
    });

    it('should mask two char year to four char year in current century if 10 or less years in future', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.masked = true;

      const currentCentury = +String(new Date().getFullYear()).slice(0, 2);
      const year = currentCentury + 5;
      const inputElement = getInputElement(this.context.component);
      inputElement.value = `01/01/${year}`;
      inputElement.dispatchEvent(new KeyboardEvent('input'));
      inputElement.dispatchEvent(new Event('blur'));

      expect(inputElement.value).toBe(`01/01/${currentCentury}${year}`);
    });

    it('should mask two char year to four char year in previous century if more than 10 years in future', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.masked = true;

      const currentCentury = +String(new Date().getFullYear()).slice(0, 2);
      const year = currentCentury + 20;
      const inputElement = getInputElement(this.context.component);
      inputElement.value = `01/01/${year}`;
      inputElement.dispatchEvent(new KeyboardEvent('input'));
      inputElement.dispatchEvent(new Event('blur'));

      expect(inputElement.value).toBe(`01/01/${currentCentury - 1}${year}`);
    });

    it('should clear the value when the input is cleared programmatically', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.value = new Date();

      getInputElement(this.context.component).value = '';

      expect(this.context.component.value).toBeNull();
    });

    it('should update value and mask properly when backspacing after focused', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.value = new Date('01/01/2021');
      this.context.component.masked = true;
      this.context.component.showMaskFormat = true;

      const inputElement = getInputElement(this.context.component);
      inputElement.focus();
      inputElement.value = inputElement.value.slice(0, -1);
      inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(inputElement.value).toEqual('01/01/202_');
    });

    it('should update value and mask properly when backspacing after blur', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.value = new Date('01/01/2021');
      this.context.component.masked = true;
      this.context.component.showMaskFormat = true;

      const inputElement = getInputElement(this.context.component);
      inputElement.focus();
      inputElement.value = inputElement.value.slice(0, -1);
      inputElement.dispatchEvent(new KeyboardEvent('input'));
      inputElement.blur();

      expect(inputElement.value).toEqual('01/01/0202');
    });

    it('should clear mask format if the input is cleared programmatically', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.value = new Date();
      this.context.component.masked = true;
      this.context.component.showMaskFormat = true;

      getInputElement(this.context.component).value = '';

      expect(this.context.component.value).toBeNull();
    });

    it('should set year range via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const yearRange = '-5:+5';
      this.context.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.YEAR_RANGE, yearRange);

      expect(this.context.component.yearRange).toEqual(yearRange);
    });

    it('should set year range', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const yearRange = '-5:+5';
      this.context.component.yearRange = yearRange;
      openPopup(this.context.component);
      const calendar = getCalendar(this.context.component);

      expect(calendar.yearRange).toEqual(yearRange);
    });
  });

  function setupTestContext(append = false, hasInput = true, hasToggle = true): ITestDatePickerContext {
    const fixture = document.createElement('div');
    fixture.id = 'date-picker-test-fixture';
    const component = document.createElement('forge-date-picker');
    if (hasInput) {
      component.appendChild(createInputElement());
    }
    if (hasToggle) {
      component.appendChild(createToggleElement());
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

  function getIdentifier(foundation: IDatePickerFoundation): string {
    return 'forge-date-picker-' + foundation['_adapter']['_identifier'];
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

  function getPopup(component: IDatePickerComponent): IPopupComponent {
    return document.querySelector(`${POPUP_CONSTANTS.elementName}[id=${getIdentifier(component['_foundation'])}]`) as IPopupComponent;
  }

  function getCalendar(component: IDatePickerComponent): ICalendarComponent {
    const popup = getPopup(component);
    return popup.querySelector('forge-calendar') as ICalendarComponent;
  }

  function getCalendarShadow(component: IDatePickerComponent): ShadowRoot {
    const calendar = getCalendar(component);
    return calendar.shadowRoot as ShadowRoot;
  }

  function clickActiveDay(component: IDatePickerComponent): void {
    const calendarShadow = getCalendarShadow(component);
    const activeCell = calendarShadow.querySelector('.mdc-ripple-upgraded--background-focused') as HTMLTableCellElement;
    activeCell.click();
  }

  function getTodayButton(component: IDatePickerComponent): HTMLButtonElement {
    const popup = getPopup(component);
    const calendar = popup.querySelector('forge-calendar') as ICalendarComponent;
    return getShadowElement(calendar, '#today-button')?.firstElementChild as HTMLButtonElement ?? null;
  }

  function getClearButton(component: IDatePickerComponent): HTMLButtonElement {
    const popup = getPopup(component);
    const calendar = popup.querySelector('forge-calendar') as ICalendarComponent;
    return getShadowElement(calendar, '#clear-button')?.firstElementChild as HTMLButtonElement ?? null;
  }

  function clickTodayButton(component: IDatePickerComponent): void {
    const todayButton = getTodayButton(component);
    todayButton.click();
    todayButton.dispatchEvent(new MouseEvent('click'));
  }

  function clickClearButton(component: IDatePickerComponent): void {
    const clearButton = getClearButton(component);
    clearButton.click();
    clearButton.dispatchEvent(new MouseEvent('click'));
  }

  function getAnnouncerElement(component: IDatePickerComponent): HTMLElement {
    const popup = getPopup(component);
    return popup.querySelector('[data-forge-live-announcer]') as HTMLElement;
  }

  async function popupCloseAnimation(): Promise<void> {
    return timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
  }

  function expectPopupOpen(component: IDatePickerComponent, isOpen: boolean): void {
    const popup = getPopup(component);
    expect(component.hasAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.OPEN)).toBe(isOpen);
    if (isOpen) {
      expect(popup).not.toBeNull();
      expect(popup.isConnected).toBe(isOpen);
      expect(popup.classList.contains('forge-calendar-dropdown__popup')).toBe(isOpen, 'Expected the date picker popup class to be applied to the popup element');
      expect(getInputElement(component).getAttribute('aria-expanded')).toBe('true', 'Expected aria-expanded to be set to true');
    } else {
      expect(popup).toBeNull();
      expect(getInputElement(component).getAttribute('aria-expanded')).toBe('false', 'Expected aria-expanded to be set to false');
    }
  }

  function expectDefaultValues(component: IDatePickerComponent): void {
    expect(component.isConnected).withContext('Expected isConnected to be true').toBe(true);
    expect(component.value).toBeNull();
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
    expect(component.hasAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.OPEN)).toBeFalse();
  }

  function expectDisabled(component: IDatePickerComponent, isDisabled: boolean): void {
    expect(component.disabled).toBe(isDisabled);
    expect(getInputElement(component).disabled).toBe(isDisabled);
    if (getToggleElement(component)) {
      expect(getToggleElement(component).getAttribute('aria-disabled')).toBe(isDisabled.toString());
    }
  }

  function getAllTdElementsForSundays(component: IDatePickerComponent) {
    return Array.from(getCalendarShadow(component).querySelectorAll('tbody tr')).map(tr => tr.querySelector('td')).filter(td => td!.hasAttribute('data-date'));
  }
});
