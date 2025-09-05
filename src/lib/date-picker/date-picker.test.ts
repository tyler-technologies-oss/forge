import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { removeElement, getShadowElement } from '@tylertech/forge-core';
import { task, frame } from '../core/utils/utils';
import { DEFAULT_DATE_MASK, parseDateString, formatDate, isSameDate } from '../core';
import { defineDatePickerComponent, IDatePickerComponent, DATE_PICKER_CONSTANTS, IDatePickerCore } from './index';
import { defineTextFieldComponent, TEXT_FIELD_CONSTANTS, ITextFieldComponent } from '../text-field';
import { ICalendarComponent, CALENDAR_CONSTANTS, CALENDAR_MENU_CONSTANTS } from '../calendar';
import { ICON_BUTTON_CONSTANTS } from '../icon-button';
import { BASE_DATE_PICKER_CONSTANTS } from './base/base-date-picker-constants';
import type { IButtonComponent } from '../button';
import { FIELD_CONSTANTS, IDialogAdapter, IFieldComponent, IPopoverComponent, POPOVER_CONSTANTS } from '../index';

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

describe('DatePickerComponent', () => {
  before(() => {
    defineDatePickerComponent();
    defineTextFieldComponent();
  });

  afterEach(function () {
    if (this.currentTest?.ctx.harness) {
      this.currentTest.ctx.harness.destroy();
    }
  });

  describe('with imperative creation', () => {
    afterEach(function () {
      if (this.currentTest?.ctx.harness) {
        const popup = getPopup(this.currentTest.ctx.harness.component);
        if (popup) {
          removeElement(popup);
        }
      }
    });

    it('should initialize with default values', function () {
      this.harness = setupTestContext(true);
      expectDefaultValues(this.harness.component);
    });

    it('should wait for input element to initialize', async function () {
      this.harness = setupTestContext(true, false);

      expect(this.harness.component['_core']['_isInitialized']).to.be.false;

      await task(100);
      this.harness.component.appendChild(createInputElement());
      await frame();

      expect(this.harness.component['_core']['_isInitialized']).to.be.true;
    });

    it('should render with initial date', function () {
      this.harness = setupTestContext(false);
      const date = new Date();
      const formattedDate = formatDate(date);
      this.harness.component.value = date;
      this.harness.append();

      expect(this.harness.component.value).to.deep.equal(date);
      expect(getInputElement(this.harness.component).value).to.equal(formattedDate);

      openPopup(this.harness.component);
      const calendar = getCalendar(this.harness.component);

      expect((calendar.value as Date).toDateString()).to.equal(date.toDateString());
    });

    it('should preserve timestamp from date value after initialization', async function () {
      this.harness = setupTestContext(true);
      const dateStr = '2024-01-01T10:17:23.000Z';
      const date = new Date(dateStr);
      this.harness.component.value = date;
      this.harness.append();
      await frame();

      expect(this.harness.component.value.toISOString()).to.equal(dateStr);
    });

    it('should open calendar in month of min date if min is after current month', function () {
      this.harness = setupTestContext(false);
      const date = new Date();
      this.harness.component.min = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      this.harness.append();

      openPopup(this.harness.component);
      const calendar = getCalendar(this.harness.component);

      const expectedMonth = date.getMonth() >= 11 ? 0 : date.getMonth() + 1;
      expect(calendar.month).to.equal(expectedMonth);
    });

    it('should open calendar in month of max date if max is before current month', function () {
      this.harness = setupTestContext(false);
      const date = new Date();
      this.harness.component.max = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      this.harness.append();

      openPopup(this.harness.component);
      const calendar = getCalendar(this.harness.component);
      const expectedMonth = date.getMonth() <= 0 ? 11 : date.getMonth() - 1;

      expect(calendar.month).to.equal(expectedMonth);
    });

    it('should open calendar in month of min date if max is before current month and min is set', function () {
      this.harness = setupTestContext(false);
      const date = new Date();
      const minDate = new Date(date.getFullYear() - 1, date.getMonth() - 1, 1);
      this.harness.component.min = minDate;
      this.harness.component.max = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      this.harness.append();

      openPopup(this.harness.component);
      const calendar = getCalendar(this.harness.component);
      const expectedMonth = minDate.getMonth();

      expect(calendar.month).to.equal(expectedMonth);
    });

    it('should automatically render a toggle button with a Forge text-field component', function () {
      this.harness = setupTestContext(false, true, false);

      const textField = document.createElement(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
      textField.appendChild(createInputElement());
      this.harness.component.appendChild(textField);
      this.harness.append();

      const toggleButton = this.harness.component.querySelector(ICON_BUTTON_CONSTANTS.elementName) as HTMLElement;

      expect(toggleButton).to.not.be.null;
      expect(toggleButton.slot).to.equal('end');
    });

    it('should allow for setting all property values before being placed in DOM', function () {
      this.harness = setupTestContext();

      const value = new Date('01/01/2020');
      const minDate = new Date('01/01/1990');
      const maxDate = new Date('12/31/2030');
      const disabledDates = [new Date('01/05/2020')];
      this.harness.component.value = value;
      this.harness.component.min = minDate;
      this.harness.component.max = maxDate;
      this.harness.component.disabledDates = disabledDates;
      this.harness.component.open = true;
      this.harness.component.popupClasses = 'test-class';
      this.harness.component.disabled = true;
      this.harness.component.masked = true;
      this.harness.component.maskFormat = 'YYYY-MM-DD';
      this.harness.component.showMaskFormat = true;
      this.harness.component.valueMode = 'iso-string';
      this.harness.component.allowInvalidDate = true;

      this.harness.append();

      expect(this.harness.component.value as any).to.equal(value.toISOString());
      expect(this.harness.component.min).to.deep.equal(minDate);
      expect(this.harness.component.max).to.deep.equal(maxDate);
      expect(this.harness.component.disabledDates).to.deep.equal(disabledDates);
      expect(this.harness.component.open).to.be.false;
      expect(this.harness.component.popupClasses).to.equal('test-class');
      expect(this.harness.component.disabled).to.be.true;
      expect(this.harness.component.masked).to.be.true;
      expect(this.harness.component.maskFormat).to.equal('YYYY-MM-DD');
      expect(this.harness.component.showMaskFormat).to.be.true;
      expect(this.harness.component.valueMode).to.equal('iso-string');
      expect(this.harness.component.allowInvalidDate).to.be.true;
    });

    it('should allow for setting of input element value before being placed in DOM', function () {
      this.harness = setupTestContext();

      const date = '05/04/2020';
      const expectedDate = new Date(date);
      getInputElement(this.harness.component).value = date;

      this.harness.append();

      expect(this.harness.component.value).to.deep.equal(expectedDate);
    });

    it('should float text-field label when value is set', async function () {
      this.harness = setupTestContext(false, false);

      const textField = document.createElement(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
      textField.appendChild(createInputElement());

      const labelElement = document.createElement('label');
      labelElement.textContent = 'Label';
      textField.appendChild(labelElement);

      this.harness.component.appendChild(textField);
      this.harness.append();

      await frame();
      this.harness.component.value = '1/1/2021';
      await frame();

      const field = getFieldComponent(textField);

      expect(field.hasAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL)).to.be.true;
    });

    it('should notify date picker of input value changes when text-field is used', async function () {
      this.harness = setupTestContext(false, false);
      const textField = document.createElement(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
      textField.appendChild(createInputElement());
      this.harness.component.appendChild(textField);
      this.harness.append();

      await frame();

      const valueChangeSpy = spy(this.harness.component['_core'], '_onInputValueChanged');
      getInputElement(this.harness.component).value = '1/1/2021';

      expect(valueChangeSpy.called).to.be.true;
    });

    it('should accept custom calendar text', async function () {
      this.harness = setupTestContext(false, true, true);
      this.harness.component.calendarText = {
        previousMonth: '1',
        nextMonth: '2',
        today: '3',
        clear: '4'
      };
      this.harness.append();
      openPopup(this.harness.component);

      const calendar = getCalendar(this.harness.component);
      const previousButtonTextSpan = calendar.querySelector(`span[slot=${CALENDAR_CONSTANTS.slots.PREVIOUS_MONTH_BUTTON_TEXT}]`);
      const nextButtonTextSpan = calendar.querySelector(`span[slot=${CALENDAR_CONSTANTS.slots.NEXT_MONTH_BUTTON_TEXT}]`);
      const todayButtonTextSpan = calendar.querySelector(`span[slot=${CALENDAR_CONSTANTS.slots.TODAY_BUTTON_TEXT}]`);
      const clearButtonTextSpan = calendar.querySelector(`span[slot=${CALENDAR_CONSTANTS.slots.CLEAR_BUTTON_TEXT}]`);

      expect(previousButtonTextSpan?.textContent).to.equal('1');
      expect(nextButtonTextSpan?.textContent).to.equal('2');
      expect(todayButtonTextSpan?.textContent).to.equal('3');
      expect(clearButtonTextSpan?.textContent).to.equal('4');
    });
  });

  describe('with static HTML', () => {
    afterEach(function () {
      if (this.currentTest?.ctx.harness) {
        const popup = getPopup(this.currentTest.ctx.harness.component);
        if (popup) {
          removeElement(popup);
        }
      }
    });

    it('should initialize with default values', function () {
      this.harness = setupTestContext(true);
      expectDefaultValues(this.harness.component);
    });

    it('should initialize ARIA attributes', function () {
      this.harness = setupTestContext(true);
      const inputElement = getInputElement(this.harness.component);
      expect(inputElement.getAttribute('autocomplete')).to.equal('off');
      expect(inputElement.getAttribute('autocorrect')).to.equal('off');
      expect(inputElement.getAttribute('autocapitalize')).to.equal('off');
      expect(inputElement.getAttribute('spellcheck')).to.equal('false');
      expect(inputElement.getAttribute('role')).to.equal('combobox');
      expect(inputElement.getAttribute('aria-live')).to.equal('assertive');
      expect(inputElement.getAttribute('aria-atomic')).to.equal('true');
      expect(inputElement.getAttribute('aria-haspopup')).to.equal('true');
      expect(inputElement.getAttribute('aria-expanded')).to.equal('false');
      expect(inputElement.getAttribute('aria-owns')).to.equal(getIdentifier(this.harness.component['_core']));
      expect(inputElement.getAttribute('aria-disabled')).to.equal('false');
      expect(inputElement.hasAttribute('aria-activedescendant')).to.be.false;
    });

    it('should open popup programmatically', function () {
      this.harness = setupTestContext(true);
      this.harness.component.open = true;
      expectPopupOpen(this.harness.component, true);
    });

    it('should emit open event when popup opened by user pressing arrow down key', function () {
      this.harness = setupTestContext(true);
      const openSpy = spy();
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.OPEN, openSpy);
      getInputElement(this.harness.component).focus();
      getInputElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      expect(openSpy.calledOnce).to.be.true;
    });

    it('should emit open event when popup opened by user clicking toggle button', function () {
      this.harness = setupTestContext(true);
      const openSpy = spy();
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.OPEN, openSpy);
      getToggleElement(this.harness.component).dispatchEvent(new PointerEvent('mousedown'));

      expect(openSpy.calledOnce).to.be.true;
    });

    it('should not emit open event when popup opened programmatically', function () {
      this.harness = setupTestContext(true);
      const openSpy = spy();
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.OPEN, openSpy);
      openPopup(this.harness.component);

      expect(openSpy.called).to.be.false;
    });

    it('should emit close event when popup closed via escape key', function () {
      this.harness = setupTestContext(true);
      const closeSpy = spy();
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.harness.component);
      getInputElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(closeSpy.calledOnce).to.be.true;
    });

    it('should emit close event when popup closed via toggle click', function () {
      this.harness = setupTestContext(true);
      const closeSpy = spy();
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.harness.component);
      getToggleElement(this.harness.component).dispatchEvent(new PointerEvent('mousedown'));

      expect(closeSpy.calledOnce).to.be.true;
    });

    it('should emit close event when selecting date from calendar via enter key', async function () {
      this.harness = setupTestContext(true);
      const closeSpy = spy();
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CLOSE, closeSpy);

      openPopup(this.harness.component);
      await frame();
      getInputElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await frame();

      expect(closeSpy.calledOnce).to.be.true;
    });

    it('should emit close event when selecting date from calendar with mouse', function () {
      this.harness = setupTestContext(true);
      const closeSpy = spy();
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.harness.component);
      clickActiveDay(this.harness.component);

      expect(closeSpy.calledOnce).to.be.true;
    });

    it('should not emit close event when popup closed programmatically', function () {
      this.harness = setupTestContext(true);
      const closeSpy = spy();
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.harness.component);
      this.harness.component.open = false;

      expect(closeSpy.called).to.be.false;
    });

    it('should open when pressing down arrow key', function () {
      this.harness = setupTestContext(true);
      getInputElement(this.harness.component).focus();
      getInputElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      expectPopupOpen(this.harness.component, true);
    });

    it('should open when clicking toggle element', function () {
      this.harness = setupTestContext(true);
      getToggleElement(this.harness.component).dispatchEvent(new PointerEvent('mousedown'));

      expectPopupOpen(this.harness.component, true);
    });

    it('should set focus to input when clicking toggle element', function () {
      this.harness = setupTestContext(true);
      getToggleElement(this.harness.component).dispatchEvent(new PointerEvent('mousedown'));
      expect(document.activeElement).to.equal(getInputElement(this.harness.component));
    });

    it('should close popup when pressing escape key', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);
      expectPopupOpen(this.harness.component, true);
      getInputElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await popupCloseAnimation();
      expectPopupOpen(this.harness.component, false);
    });

    it('should set aria-activedescendant when pressing arrow key', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);

      const inputElement = getInputElement(this.harness.component);
      const originalValue = inputElement.getAttribute('aria-activedescendant');
      expect(inputElement.hasAttribute('aria-activedescendant')).to.be.true;
      expect(originalValue).to.be.ok;

      getInputElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      const newValue = inputElement.getAttribute('aria-activedescendant');
      expect(inputElement.hasAttribute('aria-activedescendant')).to.be.true;
      expect(originalValue).to.not.equal(newValue);
    });

    it('should change aria-activedescendant when pressing multiple arrow keys', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);
      const announcer = getAnnouncerElement(this.harness.component);

      getInputElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      const leftValue = getInputElement(this.harness.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).to.equal(leftValue);

      getInputElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      const upValue = getInputElement(this.harness.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).to.equal(upValue);

      getInputElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      const rightValue = getInputElement(this.harness.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).to.equal(rightValue);

      getInputElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      const downValue = getInputElement(this.harness.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).to.equal(downValue);

      expect(downValue).to.be.ok;
      expect([leftValue, upValue, rightValue].includes(downValue)).to.be.false;
    });

    it('should select today when pressing enter key', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);
      getInputElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      const formattedDate = formatDate(new Date());

      await popupCloseAnimation();
      expectPopupOpen(this.harness.component, false);
      expect(getInputElement(this.harness.component).value).to.equal(formattedDate);
    });

    it('should emit change event when selecting date via enter key', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);
      let theEvent: CustomEvent;
      const changeSpy = spy(evt => (theEvent = evt));
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      getInputElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(changeSpy.calledOnce).to.be.true;
      expect(changeSpy.calledWith(theEvent!)).to.be.true;
      expect(this.harness.component.value).to.deep.equal(theEvent!.detail);
    });

    it('should emit forge-calendar-month-change event when next month button is clicked', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);
      let theEvent: CustomEvent;
      const monthChangeSpy = spy(evt => (theEvent = evt));
      this.harness.component.addEventListener(CALENDAR_CONSTANTS.events.MONTH_CHANGE, monthChangeSpy);

      const calendar = getCalendar(this.harness.component);
      const nextButton = getNextMonthButton(calendar);
      const currentMonth = calendar.month;
      nextButton.click();
      const month = (currentMonth + 1) % 12;
      expect(monthChangeSpy.calledOnce).to.be.true;
      expect(theEvent!.detail.month).to.equal(month);
    });

    it('should emit change event when previous month button is clicked', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);
      let theEvent: CustomEvent;
      const monthChangeSpy = spy(evt => (theEvent = evt));
      this.harness.component.addEventListener(CALENDAR_CONSTANTS.events.MONTH_CHANGE, monthChangeSpy);

      const calendar = getCalendar(this.harness.component);
      const nextButton = getPreviousMonthButton(calendar);
      const currentMonth = calendar.month;
      nextButton.click();
      const month = (currentMonth + 12 - 1) % 12;
      expect(monthChangeSpy.calledOnce).to.be.true;
      expect(theEvent!.detail.month).to.equal(month);
    });

    it('should emit change event when month is selected', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);
      let theEvent: CustomEvent;
      const monthChangeSpy = spy(evt => (theEvent = evt));
      this.harness.component.addEventListener(CALENDAR_CONSTANTS.events.MONTH_CHANGE, monthChangeSpy);

      const calendar = getCalendar(this.harness.component);
      const calendarShadowElement = getCalendarShadowElement(calendar);
      getMonthButton(calendar)?.click();
      const menuShadowRoot = (calendarShadowElement.querySelector(CALENDAR_MENU_CONSTANTS.elementName) as HTMLElement)?.shadowRoot as ShadowRoot;
      (menuShadowRoot.querySelector(CALENDAR_MENU_CONSTANTS.selectors.ITEM) as HTMLElement)?.click();
      expect(monthChangeSpy.calledOnce).to.be.true;
      expect(theEvent!.detail.month).to.equal(0);
    });

    it('should not blur input when clicking element in calendar', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);
      clickActiveDay(this.harness.component);

      await popupCloseAnimation();
      // Note: The popup may still be open, but the important thing is focus remains on input
      expect(document.activeElement).to.equal(getInputElement(this.harness.component));
    });

    it('should emit change event when selecting date via mouse', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);
      let theEvent: CustomEvent;
      const changeSpy = spy(evt => (theEvent = evt));
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      clickActiveDay(this.harness.component);

      await popupCloseAnimation();
      expectPopupOpen(this.harness.component, false);
      expect(changeSpy.calledOnce).to.be.true;
      expect(this.harness.component.value).to.deep.equal(theEvent!.detail);
    });

    it('should not set date if default prevented in change event', function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);
      const changeSpy = spy(evt => evt.preventDefault());
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      clickActiveDay(this.harness.component);

      expect(changeSpy.calledOnce).to.be.true;
      expect(this.harness.component.value).to.be.null;
    });

    it('should emit date as string', function () {
      this.harness = setupTestContext(true);
      const todayDate = new Date();
      const formattedDate = formatDate(todayDate);
      this.harness.component.valueMode = 'string';
      openPopup(this.harness.component);
      let eventDetail = '';
      const changeSpy = spy(evt => (eventDetail = evt.detail));
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      clickActiveDay(this.harness.component);

      expect(typeof eventDetail).to.equal('string');
      expect(eventDetail).to.equal(formattedDate);
      expect(this.harness.component.value).to.equal(eventDetail);
    });

    it('should emit date as ISO string', function () {
      this.harness = setupTestContext(true);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      this.harness.component.valueMode = 'iso-string';
      openPopup(this.harness.component);
      let eventDetail = '';
      const changeSpy = spy(evt => (eventDetail = evt.detail));
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      clickActiveDay(this.harness.component);

      expect(typeof eventDetail).to.equal('string');
      expect(eventDetail).to.equal(todayDate.toISOString());
      expect(this.harness.component.value).to.equal(eventDetail);
    });

    it('should emit change event when setting value mode', function () {
      this.harness = setupTestContext(true);
      const changeSpy = spy();
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      this.harness.component.valueMode = 'string';
      this.harness.component.valueMode = 'iso-string';
      this.harness.component.valueMode = 'object';
      this.harness.component.valueMode = 'asdf' as any;

      expect(changeSpy.callCount).to.equal(3);
    });

    it('should set value', function () {
      this.harness = setupTestContext(true);
      const expectedDate = '05/04/2020';
      const date = new Date(expectedDate);
      this.harness.component.value = date;

      expect(getInputElement(this.harness.component).value).to.equal(expectedDate);
    });

    it('should set value from input element value on blur', function () {
      this.harness = setupTestContext(true);
      const date = '05/04/2020';
      const expectedDate = new Date(date);
      const inputElement = getInputElement(this.harness.component);
      inputElement.value = date;
      inputElement.dispatchEvent(new Event('input'));
      inputElement.dispatchEvent(new Event('blur'));

      expect(this.harness.component.value).to.deep.equal(expectedDate);
    });

    it('should format the date when blurred after the input element value is set', function () {
      this.harness = setupTestContext(true);
      const inputElement = getInputElement(this.harness.component);
      inputElement.value = '01012020';
      inputElement.dispatchEvent(new Event('input'));
      inputElement.dispatchEvent(new Event('blur'));

      expect(getInputElement(this.harness.component).value).to.equal('01/01/2020');
    });

    it('should set value in calendar', function () {
      this.harness = setupTestContext(true);
      const expectedDate = '01/01/2000';
      const date = new Date(expectedDate);
      this.harness.component.value = date;
      openPopup(this.harness.component);
      const calendar = getCalendar(this.harness.component);

      expect(getInputElement(this.harness.component).value).to.equal(expectedDate);
      expect(calendar.value).to.deep.equal(date);
    });

    it('should coerce the value when the input value is invalid', function () {
      this.harness = setupTestContext(true);

      const inputElement = getInputElement(this.harness.component);
      inputElement.value = '>01/01/2020';
      inputElement.blur();
      inputElement.dispatchEvent(new Event('blur'));

      expect(inputElement.value).to.equal('01/01/2020');
    });

    it('should set allow invalid date via attribute', function () {
      this.harness = setupTestContext(true);
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.ALLOW_INVALID_DATE, '');

      expect(this.harness.component.allowInvalidDate).to.be.true;
    });

    it('should not clear the input value if allow invalid is set', function () {
      this.harness = setupTestContext(true);
      const invalidDate = '>01/01/2020';
      const disabledDate = '04/25/2020';
      const outsideMinDate = '03/01/2020';
      const outsideMaxDate = '07/01/2020';
      this.harness.component.allowInvalidDate = true;

      getInputElement(this.harness.component).value = invalidDate;
      expect(getInputElement(this.harness.component).value).to.equal(invalidDate);

      getInputElement(this.harness.component).value = disabledDate;
      this.harness.component.disabledDates = [new Date(disabledDate)];
      expect(getInputElement(this.harness.component).value).to.equal(disabledDate);

      getInputElement(this.harness.component).value = outsideMinDate;
      this.harness.component.min = new Date('04/01/2020');
      expect(getInputElement(this.harness.component).value).to.equal(outsideMinDate);

      getInputElement(this.harness.component).value = outsideMaxDate;
      this.harness.component.max = new Date('05/31/2020');
      expect(getInputElement(this.harness.component).value).to.equal(outsideMaxDate);
    });

    it('should set min date', function () {
      this.harness = setupTestContext(true);
      const minDate = new Date(new Date().setHours(0, 0, 0, 0));
      this.harness.component.min = minDate;
      openPopup(this.harness.component);
      const calendar = getCalendar(this.harness.component);

      expect(calendar.min).to.deep.equal(minDate);
    });

    it('should set max date via attribute', function () {
      this.harness = setupTestContext(true);
      const minDate = '01/01/2020';
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MIN, minDate);

      expect(this.harness.component.min).to.deep.equal(new Date(minDate));
    });

    it('should set max date', function () {
      this.harness = setupTestContext(true);
      const maxDate = new Date(new Date().setHours(0, 0, 0, 0));
      this.harness.component.max = maxDate;
      openPopup(this.harness.component);
      const calendar = getCalendar(this.harness.component);

      expect(calendar.max).to.deep.equal(maxDate);
    });

    it('should set max date via attribute', function () {
      this.harness = setupTestContext(true);
      const maxDate = '01/01/2020';
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MAX, maxDate);

      expect(this.harness.component.max).to.deep.equal(new Date(maxDate));
    });

    it('should reject value if below min date', function () {
      this.harness = setupTestContext(true);
      const minDate = new Date('01/01/2020');
      this.harness.component.min = minDate;
      this.harness.component.value = new Date('06/01/2000');
      expect(this.harness.component.value).to.be.null;
      expect(getInputElement(this.harness.component).value).to.equal('');
    });

    it('should allow value if below min date and allow invalid is set', function () {
      this.harness = setupTestContext(true);
      this.harness.component.allowInvalidDate = true;
      const minDate = new Date('01/01/2020');
      const date = '06/01/2000';
      const expectedDate = new Date(date);
      this.harness.component.min = minDate;
      this.harness.component.value = expectedDate;
      expect(this.harness.component.value).to.deep.equal(expectedDate);
      expect(getInputElement(this.harness.component).value).to.equal(date);
    });

    it('should allow value if matches disabled day of week date if allow invalid is set', function () {
      this.harness = setupTestContext(true);
      this.harness.component.allowInvalidDate = true;
      this.harness.component.disabledDaysOfWeek = [6];

      const disabledDate = '01/01/2000';
      const expectedDate = new Date(disabledDate);
      this.harness.component.value = expectedDate;

      expect(this.harness.component.value).to.deep.equal(expectedDate);
      expect(getInputElement(this.harness.component).value).to.equal(disabledDate);
    });

    it('should clear value when min date is set if current value is not valid', function () {
      this.harness = setupTestContext(true);
      const minDate = new Date('01/01/2020');
      this.harness.component.value = new Date('01/01/2000');

      expect(this.harness.component.value).to.not.be.null;
      this.harness.component.min = minDate;
      expect(this.harness.component.value).to.be.null;
      expect(getInputElement(this.harness.component).value).to.equal('');
    });

    it('should reject value if above max date', function () {
      this.harness = setupTestContext(true);
      const maxDate = new Date('01/01/2020');
      this.harness.component.max = maxDate;
      this.harness.component.value = new Date('06/01/2030');
      expect(this.harness.component.value).to.be.null;
      expect(getInputElement(this.harness.component).value).to.equal('');
    });

    it('should allow value if above max date and allow invalid is set', function () {
      this.harness = setupTestContext(true);
      this.harness.component.allowInvalidDate = true;
      const maxDate = new Date('01/01/2020');
      const date = '06/01/2030';
      const expectedDate = new Date(date);
      this.harness.component.max = maxDate;
      this.harness.component.value = expectedDate;
      expect(this.harness.component.value).to.deep.equal(expectedDate);
      expect(getInputElement(this.harness.component).value).to.equal(date);
    });

    it('should clear value when max date is set if current value is not valid', function () {
      this.harness = setupTestContext(true);
      const maxDate = new Date('01/01/2020');
      this.harness.component.value = new Date('01/01/2030');

      expect(this.harness.component.value).to.not.be.null;
      this.harness.component.max = maxDate;
      expect(this.harness.component.value).to.be.null;
      expect(getInputElement(this.harness.component).value).to.equal('');
    });

    it('should set disabled dates', function () {
      this.harness = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      this.harness.component.disabledDates = disabledDates;
      openPopup(this.harness.component);
      const calendar = getCalendar(this.harness.component);

      expect(calendar.disabledDates).to.deep.equal(disabledDates);
    });

    it('should set disabled dates in calendar if open', function () {
      this.harness = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      openPopup(this.harness.component);
      const calendar = getCalendar(this.harness.component);
      this.harness.component.disabledDates = disabledDates;

      expect(calendar.disabledDates).to.deep.equal(disabledDates);
    });

    it('should restrict date if matching date is disabled', function () {
      this.harness = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      this.harness.component.disabledDates = disabledDates;
      this.harness.component.value = '01/01/2020';

      expect(this.harness.component.value).to.be.null;
      expect(getInputElement(this.harness.component).value).to.equal('');
    });

    it('should clear value when disabled dates is set if current value is disabled', function () {
      this.harness = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      this.harness.component.value = '01/01/2020';

      expect(this.harness.component.value).to.not.be.null;
      this.harness.component.disabledDates = disabledDates;
      expect(this.harness.component.value).to.be.null;
      expect(getInputElement(this.harness.component).value).to.equal('');
    });

    it('should accept valid date if min, max, and disabled dates are set', function () {
      this.harness = setupTestContext(true);
      const date = new Date('04/30/2020');
      this.harness.component.disabledDates = [new Date('04/25/2020')];
      this.harness.component.min = new Date('04/01/2020');
      this.harness.component.max = new Date('05/31/2020');
      this.harness.component.value = date;

      expect(this.harness.component.value).to.deep.equal(date);
    });

    it('should set value in calendar if open', function () {
      this.harness = setupTestContext(true);
      const date = new Date();
      openPopup(this.harness.component);
      const calendar = getCalendar(this.harness.component);

      this.harness.component.value = date;
      expect(this.harness.component.value).to.deep.equal(date);
      expect(calendar.value).to.deep.equal(date);
    });

    it('should set value via attribute', function () {
      this.harness = setupTestContext(true);
      const date = '05/04/2020';
      this.harness.component.setAttribute(DATE_PICKER_CONSTANTS.observedAttributes.VALUE, date);

      expect(this.harness.component.value).to.deep.equal(new Date(date));
    });

    it('should set disabled', function () {
      this.harness = setupTestContext(true);
      this.harness.component.disabled = true;
      expectDisabled(this.harness.component, true);
    });

    it('should set disabled via attribute', function () {
      this.harness = setupTestContext(true);
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.DISABLED, 'true');
      expectDisabled(this.harness.component, true);
    });

    it('should set custom popup class', function () {
      this.harness = setupTestContext(true);
      const className = 'test-class';
      this.harness.component.popupClasses = className;
      openPopup(this.harness.component);
      const popup = getPopup(this.harness.component);

      expect(popup.classList.contains(className)).to.be.true;
    });

    it('should set multiple custom popup classes', function () {
      this.harness = setupTestContext(true);
      const classNames = ['test-class-1', 'test-class-2'];
      this.harness.component.popupClasses = classNames;
      openPopup(this.harness.component);
      const popup = getPopup(this.harness.component);

      expect(classNames.every(cn => popup.classList.contains(cn))).to.be.true;
    });

    it('should set popup class via attribute', function () {
      this.harness = setupTestContext(true);
      const className = 'test-class';
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.POPUP_CLASSES, className);
      openPopup(this.harness.component);
      const popup = getPopup(this.harness.component);

      expect(popup.classList.contains(className)).to.be.true;
    });

    it('should format and set value on input blur', function () {
      this.harness = setupTestContext(true);
      const dateStr = '01012020';
      const formattedDateStr = formatDate(parseDateString(dateStr) as Date);
      getInputElement(this.harness.component).focus();
      getInputElement(this.harness.component).value = '01012020';
      getInputElement(this.harness.component).blur();
      getInputElement(this.harness.component).dispatchEvent(new Event('blur'));

      expect(getInputElement(this.harness.component).value).to.equal(formattedDateStr);
    });

    it('should close popup on blur', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);

      expectPopupOpen(this.harness.component, true);
      getInputElement(this.harness.component).blur();
      getInputElement(this.harness.component).dispatchEvent(new Event('blur'));
      await popupCloseAnimation();

      expectPopupOpen(this.harness.component, false);
    });

    it('should not open via toggle if disabled', function () {
      this.harness = setupTestContext(true);
      this.harness.component.disabled = true;
      getToggleElement(this.harness.component).dispatchEvent(new PointerEvent('mousedown'));

      expectPopupOpen(this.harness.component, false);
    });

    it('should use input mask', function () {
      this.harness = setupTestContext(true);
      this.harness.component.masked = true;

      expect(this.harness.component.masked).to.be.true;

      const inputElement = getInputElement(this.harness.component);
      inputElement.value = '01012020';
      inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(inputElement.value).to.equal('01/01/2020');
    });

    it('should only show mask format on focus', function () {
      this.harness = setupTestContext(true);
      const inputElement = getInputElement(this.harness.component);
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(this.harness.component.showMaskFormat).to.be.true;
      expect(getInputElement(this.harness.component).value).to.equal('');
      inputElement.focus();
      expect(getInputElement(this.harness.component).value).to.equal('__/__/____');
    });

    it('should select mask when shown on focus', function () {
      this.harness = setupTestContext(true);
      const inputElement = getInputElement(this.harness.component);
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(this.harness.component.showMaskFormat).to.be.true;
      inputElement.focus();

      expect(inputElement.selectionStart).to.equal(0);
      expect(inputElement.selectionEnd).to.equal('__/__/____'.length);
    });

    it('should clear mask format on blur', function () {
      this.harness = setupTestContext(true);
      const inputElement = getInputElement(this.harness.component);
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(this.harness.component.showMaskFormat).to.be.true;
      expect(getInputElement(this.harness.component).value).to.equal('');

      inputElement.focus();
      expect(getInputElement(this.harness.component).value).to.equal('__/__/____');

      inputElement.dispatchEvent(new KeyboardEvent('input'));
      inputElement.blur();
      expect(inputElement.value).to.equal('');
    });

    it('should use custom parse callback, format callback, and mask format', function () {
      this.harness = setupTestContext(true);
      this.harness.component.masked = true;
      this.harness.component.showMaskFormat = true;
      this.harness.component.maskFormat = '0000-00-00';
      this.harness.component.parseCallback = str => (str ? new Date(`${str}T00:00:00.000Z`) : null);
      this.harness.component.formatCallback = date => (date ? date.toISOString().split('T')[0] : '');

      const inputEl = getInputElement(this.harness.component);
      inputEl.focus();

      expect(inputEl.value).to.equal('____-__-__');

      inputEl.value = '20200101';
      inputEl.dispatchEvent(new Event('input'));

      expect(getInputElement(this.harness.component).value).to.equal('2020-01-01');
    });

    it('should allow for setting mask format via attribute', function () {
      this.harness = setupTestContext(true);
      const format = '0`0`0`0-`0`0-`0`0';
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASK_FORMAT, format);

      const inputEl = getInputElement(this.harness.component);
      inputEl.focus();

      expect(this.harness.component.maskFormat).to.equal(format);
      expect(getInputElement(this.harness.component).value).to.equal('____-__-__');
    });

    it("should remove characters that aren't valid when formatting value on blur", function () {
      this.harness = setupTestContext(true);

      const inputElement = getInputElement(this.harness.component);
      inputElement.focus();
      inputElement.value = 'abcd';
      inputElement.dispatchEvent(new Event('blur'));

      expect(inputElement.value).to.equal('');
    });

    it('should set value to null and emit change event when setting min date', function () {
      this.harness = setupTestContext(true);
      const date = new Date('01/01/2020');
      this.harness.component.value = date;

      const changeSpy = spy();
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      this.harness.component.min = new Date('01/02/2020');

      expect(this.harness.component.value).to.be.null;
      expect(getInputElement(this.harness.component).value).to.equal('');
      expect(changeSpy.calledOnce).to.be.true;
    });

    it('should set value to null and emit change event when setting max date', function () {
      this.harness = setupTestContext(true);
      const date = new Date('01/02/2020');
      this.harness.component.value = date;

      const changeSpy = spy();
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      this.harness.component.max = new Date('01/01/2020');

      expect(this.harness.component.value).to.be.null;
      expect(getInputElement(this.harness.component).value).to.equal('');
      expect(changeSpy.calledOnce).to.be.true;
    });

    it('should set value to null and emit change event when setting disabled dates', function () {
      this.harness = setupTestContext(true);
      const date = new Date('01/01/2020');
      this.harness.component.value = date;

      const changeSpy = spy();
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      this.harness.component.disabledDates = [new Date('01/01/2020')];

      expect(this.harness.component.value).to.be.null;
      expect(getInputElement(this.harness.component).value).to.equal('');
      expect(changeSpy.calledOnce).to.be.true;
    });

    it('should not propagate keydown event on input when masked and left or right arrow key is pressed when open', function () {
      this.harness = setupTestContext(true);
      this.harness.component.masked = true;
      openPopup(this.harness.component);

      const keydownSpy = spy();
      getInputElement(this.harness.component).addEventListener('keydown', keydownSpy);

      getInputElement(this.harness.component).focus();
      getInputElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      getInputElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      expect(keydownSpy.called).to.be.false;
    });

    it('should select the active date when tab key is pressed when open', function () {
      this.harness = setupTestContext(true);
      this.harness.component.valueMode = 'object';
      openPopup(this.harness.component);

      getInputElement(this.harness.component).focus();
      getInputElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      const value = this.harness.component.value as Date;
      expect(isSameDate(value, new Date())).to.be.true;
    });

    it('should set min date when open', function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);
      const minDate = new Date(new Date().setHours(0, 0, 0, 0));
      this.harness.component.min = minDate;
      const calendar = getCalendar(this.harness.component);
      expect(calendar.min).to.deep.equal(minDate);
    });

    it('should set max date when open', function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);
      const maxDate = new Date(new Date().setHours(0, 0, 0, 0));
      this.harness.component.max = maxDate;
      const calendar = getCalendar(this.harness.component);

      expect(calendar.max).to.deep.equal(maxDate);
    });

    it('should emit input and change events when the date is set', function () {
      this.harness = setupTestContext(true);
      const inputSpy = spy();
      getInputElement(this.harness.component).addEventListener('change', inputSpy);

      const changeSpy = spy();
      getInputElement(this.harness.component).addEventListener('change', changeSpy);

      this.harness.component.value = new Date('06/01/2020');

      expect(inputSpy.calledOnce).to.be.true;
      expect(changeSpy.calledOnce).to.be.true;
    });

    it('should not emit input and change events when the date is set if notify input value changes is false', function () {
      this.harness = setupTestContext(true);
      this.harness.component.notifyInputValueChanges = false;

      const inputSpy = spy();
      getInputElement(this.harness.component).addEventListener('change', inputSpy);

      const changeSpy = spy();
      getInputElement(this.harness.component).addEventListener('change', changeSpy);

      this.harness.component.value = new Date('06/01/2020');

      expect(this.harness.component.notifyInputValueChanges).to.be.false;
      expect(inputSpy.called).to.be.false;
      expect(changeSpy.called).to.be.false;
    });

    it('should not show today button by default', function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);

      const todayButton = getTodayButton(this.harness.component);

      expect(todayButton).to.be.null;
    });

    it('should not show clear button by default', function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);

      const clearButton = getClearButton(this.harness.component);

      expect(clearButton).to.be.null;
    });

    it('should show today button', function () {
      this.harness = setupTestContext(true);
      this.harness.component.showToday = true;
      openPopup(this.harness.component);

      const todayButton = getTodayButton(this.harness.component);

      expect(this.harness.component.showToday).to.be.true;
      expect(todayButton).to.not.be.null;
    });

    it('should show today button via attribute', function () {
      this.harness = setupTestContext(true);
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_TODAY, '');
      openPopup(this.harness.component);

      const todayButton = getTodayButton(this.harness.component);

      expect(this.harness.component.showToday).to.be.true;
      expect(todayButton).to.not.be.null;
    });

    it('should show clear button', function () {
      this.harness = setupTestContext(true);
      this.harness.component.showClear = true;
      openPopup(this.harness.component);

      const clearButton = getClearButton(this.harness.component);

      expect(this.harness.component.showClear).to.be.true;
      expect(clearButton).to.not.be.null;
    });

    it('should show clear button via attribute', function () {
      this.harness = setupTestContext(true);
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_CLEAR, '');
      openPopup(this.harness.component);

      const clearButton = getClearButton(this.harness.component);

      expect(this.harness.component.showClear).to.be.true;
      expect(clearButton).to.not.be.null;
    });

    it('should show both today and clear button', function () {
      this.harness = setupTestContext(true);
      this.harness.component.showToday = true;
      this.harness.component.showClear = true;
      openPopup(this.harness.component);

      const todayButton = getTodayButton(this.harness.component);
      const clearButton = getClearButton(this.harness.component);

      expect(todayButton).to.not.be.null;
      expect(clearButton).to.not.be.null;
    });

    it('should set date to todays date without time when clicking today button', async function () {
      this.harness = setupTestContext(true);
      this.harness.component.showToday = true;
      const changeSpy = spy();
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      openPopup(this.harness.component);

      clickTodayButton(this.harness.component);
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      const popup = getPopup(this.harness.component);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      expect(changeSpy.calledOnce).to.be.true;
      expect(this.harness.component.open).to.be.false;
      expect(popup).to.be.null;
      expect(this.harness.component.value).to.be.instanceOf(Date);
      expect((this.harness.component.value as Date).toISOString()).to.equal(today.toISOString());
    });

    it('should set date to todays date with time when clicking today button if value with time is already set', async function () {
      this.harness = setupTestContext(true);
      this.harness.component.showToday = true;
      const dateWithTime = new Date('01/01/2021 12:00:00');
      this.harness.component.value = dateWithTime;
      openPopup(this.harness.component);

      clickTodayButton(this.harness.component);
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      const todayWithTime = new Date();
      todayWithTime.setHours(dateWithTime.getHours(), dateWithTime.getMinutes(), dateWithTime.getSeconds(), dateWithTime.getMilliseconds());

      expect(this.harness.component.value.toISOString()).to.equal(todayWithTime.toISOString());
    });

    it('should set date to todays date when clicking today button a second time', async function () {
      this.harness = setupTestContext(true);
      this.harness.component.showToday = true;
      const changeSpy = spy();
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      openPopup(this.harness.component);

      clickTodayButton(this.harness.component);
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      const popup = getPopup(this.harness.component);
      const today = new Date();

      expect(changeSpy.calledOnce).to.be.true;
      expect(this.harness.component.open).to.be.false;
      expect(popup).to.be.null;
      expect(this.harness.component.value).to.be.instanceOf(Date);
      expect((this.harness.component.value as Date).toDateString()).to.equal(today.toDateString());

      openPopup(this.harness.component);

      clickTodayButton(this.harness.component);
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      expect(changeSpy.calledTwice).to.be.true;
      expect(this.harness.component.open).to.be.false;
      expect(popup).to.be.null;
      expect(this.harness.component.value).to.be.instanceOf(Date);
      expect((this.harness.component.value as Date).toDateString()).to.equal(today.toDateString());
    });

    it('should remove value when clicking clear button', async function () {
      this.harness = setupTestContext(true);
      this.harness.component.showClear = true;
      this.harness.component.value = new Date('01/01/2021');
      const changeSpy = spy();
      this.harness.component.addEventListener(DATE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      openPopup(this.harness.component);

      clickClearButton(this.harness.component);
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      const popup = getPopup(this.harness.component);

      expect(changeSpy.calledOnce).to.be.true;
      expect(this.harness.component.open).to.be.false;
      expect(popup).to.be.null;
      expect(this.harness.component.value).to.be.null;
    });

    it('should coerce no square bracket string correctly into an array of DayOfWeek', async function () {
      this.harness = setupTestContext(true);
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.DISABLED_DAYS_OF_WEEK, '1,2,3,4,5');
      await frame();
      expect(this.harness.component.disabledDaysOfWeek).to.deep.equal([1, 2, 3, 4, 5]);
    });

    it('should coerce string correctly into an array of DayOfWeek', async function () {
      this.harness = setupTestContext(true);
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.DISABLED_DAYS_OF_WEEK, '[1,2,3,4,5]');
      await frame();
      expect(this.harness.component.disabledDaysOfWeek).to.deep.equal([1, 2, 3, 4, 5]);
    });

    it('should not allow date being set from input if disabled', function () {
      this.harness = setupTestContext(true);
      const date = new Date();
      this.harness.component.disabledDaysOfWeek = [date.getDay()];
      this.harness.component.value = date;

      expect(this.harness.component.value).to.be.null;
    });

    it('should remove value if set and is disabled', async function () {
      this.harness = setupTestContext(true);
      const date = new Date();
      this.harness.component.value = date;
      await frame();
      this.harness.component.disabledDaysOfWeek = [date.getDay()];

      expect(this.harness.component.value).to.be.null;
    });

    it('should set disabled days to an open calendar', async function () {
      this.harness = setupTestContext(true);
      const adapterSpy = spy(this.harness.component['_core']['_adapter'], 'setCalendarDisabledDaysOfWeek');

      openPopup(this.harness.component);
      await frame();
      this.harness.component.disabledDaysOfWeek = [1];
      expect(adapterSpy.called).to.be.true;
    });

    it('should set sundays disabled in calendar popup already open', async function () {
      this.harness = setupTestContext(true);
      this.harness.component.disabledDaysOfWeek = [0];
      openPopup(this.harness.component);
      await frame();

      const allSundays = getAllTdElementsForSundays(this.harness.component);
      const thatAllSundaysAreDisabled = allSundays.every(td => td!.getAttribute('aria-disabled') === 'true');
      expect(thatAllSundaysAreDisabled).to.be.true;
    });

    it('should set sundays disabled in calendar popup', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);
      await frame();
      this.harness.component.disabledDaysOfWeek = [0];
      await frame();

      const allSundays = getAllTdElementsForSundays(this.harness.component);
      const thatAllSundaysAreDisabled = allSundays.every(td => td!.getAttribute('aria-disabled') === 'true');
      expect(thatAllSundaysAreDisabled).to.be.true;
    });

    it('should disable today with the disable day callback', async function () {
      this.harness = setupTestContext(true);
      const today = new Date();
      this.harness.component.disableDayCallback = (date: Date) => date.toLocaleDateString() === today.toLocaleDateString();
      openPopup(this.harness.component);

      const todayElement = getCalendarShadow(this.harness.component).querySelector(CALENDAR_CONSTANTS.selectors.DATE_TODAY);
      expect(todayElement?.hasAttribute('disabled')).to.be.true;
    });

    it('should disable today with the disable day callback when popup is open', async function () {
      this.harness = setupTestContext(true);
      const today = new Date();
      openPopup(this.harness.component);
      await frame();

      this.harness.component.disableDayCallback = (date: Date) => date.toLocaleDateString() === today.toLocaleDateString();

      const todayElement = getCalendarShadow(this.harness.component).querySelector(CALENDAR_CONSTANTS.selectors.DATE_TODAY);
      expect(todayElement?.hasAttribute('disabled')).to.be.true;
    });

    it('should not emit change event when initialized', async function () {
      this.harness = setupTestContext(true);
      const inputSpy = spy();
      getInputElement(this.harness.component).addEventListener('input', inputSpy);

      if (!this.harness.component['_core'].initialize) {
        throw new Error('Expected initialize method to exist');
      }
      this.harness.component['_core'].initialize();

      expect(inputSpy.called).to.be.false;
    });

    it('should update date picker when a new month is selected', async function () {
      this.harness = setupTestContext(true);
      this.harness.component.showClear = true;
      this.harness.component.value = new Date(new Date().getFullYear(), 2);

      const inputElement = getInputElement(this.harness.component);
      inputElement.focus();

      openPopup(this.harness.component);
      await frame();
      await frame();
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { shiftKey: true, key: 'm' }));
      await frame();
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await frame();

      expect((this.harness.component.value as Date).getMonth()).to.equal(0);
    });

    it('should update date picker when a new year is selected', async function () {
      this.harness = setupTestContext(true);
      this.harness.component.showClear = true;
      this.harness.component.value = new Date();

      const inputElement = getInputElement(this.harness.component);
      inputElement.focus();

      openPopup(this.harness.component);
      await frame();
      await frame();
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { shiftKey: true, key: 'y' }));
      await frame();
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await frame();

      expect((this.harness.component.value as Date).getFullYear()).to.equal(new Date().getFullYear() + 1);
    });

    it('should mask leading zero on month in initial entry', function () {
      this.harness = setupTestContext(true);
      this.harness.component.masked = true;

      const inputElement = getInputElement(this.harness.component);
      inputElement.value = '2';
      inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(inputElement.value).to.equal('02/');
    });

    it('should mask leading zero on day in initial entry', function () {
      this.harness = setupTestContext(true);
      this.harness.component.masked = true;

      const inputElement = getInputElement(this.harness.component);
      inputElement.value = '01/';
      inputElement.dispatchEvent(new KeyboardEvent('input'));
      inputElement.value = '01/5';
      inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(inputElement.value).to.equal('01/05/');
    });

    it('should mask two char year to four char year in current century if 10 or less years in future', function () {
      this.harness = setupTestContext(true);
      this.harness.component.masked = true;

      const currentCentury = +String(new Date().getFullYear()).slice(0, 2);
      const year = currentCentury + 5;
      const inputElement = getInputElement(this.harness.component);
      inputElement.value = `01/01/${year}`;
      inputElement.dispatchEvent(new KeyboardEvent('input'));
      inputElement.dispatchEvent(new Event('blur'));

      expect(inputElement.value).to.equal(`01/01/${currentCentury}${year}`);
    });

    it('should mask two char year to four char year in previous century if more than 10 years in future', function () {
      this.harness = setupTestContext(true);
      this.harness.component.masked = true;

      const currentCentury = +String(new Date().getFullYear()).slice(0, 2);
      const year = currentCentury + 20;
      const inputElement = getInputElement(this.harness.component);
      inputElement.value = `01/01/${year}`;
      inputElement.dispatchEvent(new KeyboardEvent('input'));
      inputElement.dispatchEvent(new Event('blur'));

      expect(inputElement.value).to.equal(`01/01/${currentCentury - 1}${year}`);
    });

    it('should clear the value when the input is cleared programmatically', function () {
      this.harness = setupTestContext(true);
      this.harness.component.value = new Date();

      const input = getInputElement(this.harness.component);
      input.value = '';
      input.dispatchEvent(new Event('input'));

      expect(this.harness.component.value).to.be.null;
    });

    it('should update value and mask properly when backspacing after focused', function () {
      this.harness = setupTestContext(true);
      this.harness.component.value = new Date('01/01/2021');
      this.harness.component.masked = true;
      this.harness.component.showMaskFormat = true;

      const inputElement = getInputElement(this.harness.component);
      inputElement.focus();
      inputElement.value = inputElement.value.slice(0, -1);
      inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(inputElement.value).to.equal('01/01/202_');
    });

    it('should update value and mask properly when backspacing then blurred', function () {
      this.harness = setupTestContext(true);
      this.harness.component.value = new Date('01/01/2021');
      this.harness.component.masked = true;
      this.harness.component.showMaskFormat = true;

      const inputElement = getInputElement(this.harness.component);
      inputElement.focus();
      inputElement.value = inputElement.value.slice(0, -1);
      inputElement.dispatchEvent(new KeyboardEvent('input'));
      inputElement.blur();
      inputElement.dispatchEvent(new Event('blur'));

      expect(inputElement.value).to.equal('01/01/202');
    });

    it('should clear mask format if the input is cleared programmatically', function () {
      this.harness = setupTestContext(true);
      this.harness.component.value = new Date();
      this.harness.component.masked = true;
      this.harness.component.showMaskFormat = true;

      const inputEl = getInputElement(this.harness.component);
      inputEl.value = '';
      inputEl.dispatchEvent(new Event('input'));

      expect(this.harness.component.value).to.be.null;
    });

    it('should set year range via attribute', function () {
      this.harness = setupTestContext(true);
      const yearRange = '-5:+5';
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.YEAR_RANGE, yearRange);

      expect(this.harness.component.yearRange).to.equal(yearRange);
    });

    it('should set year range', function () {
      this.harness = setupTestContext(true);
      const yearRange = '-5:+5';
      this.harness.component.yearRange = yearRange;
      openPopup(this.harness.component);
      const calendar = getCalendar(this.harness.component);

      expect(calendar.yearRange).to.equal(yearRange);
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
        removeElement(fixtureElement);
        // Note: tryCleanupPopovers is not available in WTR setup, skip for now
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

  function getTodayButton(component: DatePickerComponentTest): IButtonComponent {
    const popup = getPopup(component);
    const calendar = popup.querySelector('forge-calendar') as ICalendarComponent;
    return (getShadowElement(calendar, '#today-button') as IButtonComponent) ?? null;
  }

  function getClearButton(component: DatePickerComponentTest): IButtonComponent {
    const popup = getPopup(component);
    const calendar = popup.querySelector('forge-calendar') as ICalendarComponent;
    return (getShadowElement(calendar, '#clear-button') as IButtonComponent) ?? null;
  }

  function clickTodayButton(component: DatePickerComponentTest): void {
    const todayButton = getTodayButton(component);
    todayButton.click();
  }

  function clickClearButton(component: DatePickerComponentTest): void {
    const clearButton = getClearButton(component);
    clearButton.click();
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
    expect(component.hasAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.OPEN)).to.equal(isOpen);
    if (isOpen) {
      expect(popup).to.not.be.null;
      expect(popup.isConnected).to.equal(isOpen);
      expect(popup.classList.contains('forge-calendar-dropdown__popup')).to.equal(isOpen);
      expect(getInputElement(component).getAttribute('aria-expanded')).to.equal('true');
    } else {
      expect(popup).to.be.null;
      expect(getInputElement(component).getAttribute('aria-expanded')).to.equal('false');
    }
  }

  function expectDefaultValues(component: IDatePickerComponent): void {
    expect(component.isConnected).to.be.true;
    expect(component.value).to.be.null;
    expect(component.min).to.be.null;
    expect(component.max).to.be.null;
    expect(component.disabledDates).to.be.null;
    expect(component.open).to.be.false;
    expect(component.parseCallback).to.be.undefined;
    expect(component.formatCallback).to.be.undefined;
    expect(component.popupClasses).to.be.undefined;
    expect(component.disabled).to.be.false;
    expect(component.masked).to.be.true;
    expect(component.maskFormat).to.equal(DEFAULT_DATE_MASK);
    expect(component.showMaskFormat).to.be.false;
    expect(component.valueMode).to.equal('object');
    expect(component.hasAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.OPEN)).to.be.false;
    expect(component.calendarText).to.deep.equal({});
  }

  function expectDisabled(component: IDatePickerComponent, isDisabled: boolean): void {
    expect(component.disabled).to.equal(isDisabled);
    expect(getInputElement(component).disabled).to.equal(isDisabled);
    if (getToggleElement(component)) {
      expect(getToggleElement(component).getAttribute('aria-disabled')).to.equal(isDisabled.toString());
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
