import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { getShadowElement, removeElement } from '@tylertech/forge-core';
import { task, frame } from '../core/utils/utils';
import { DEFAULT_DATE_MASK, parseDateString, formatDate } from '../core';
import { CALENDAR_CONSTANTS, DateRange, ICalendarComponent, IDateRange } from '../calendar';
import { POPOVER_CONSTANTS, IPopoverComponent } from '../popover';
import {
  DatePickerRange,
  DATE_RANGE_PICKER_CONSTANTS,
  defineDateRangePickerComponent,
  IDateRangePickerComponent,
  IDateRangePickerCore,
  IDateRangePickerAdapter
} from './';
import { defineTextFieldComponent, TEXT_FIELD_CONSTANTS, ITextFieldComponent } from '../text-field';
import { ICON_BUTTON_CONSTANTS } from '../icon-button';
import { BASE_DATE_PICKER_CONSTANTS } from '../date-picker/base/base-date-picker-constants';
import { IButtonComponent } from '../button';

const POPOVER_ANIMATION_DURATION = 200;

type DateRangePickerAdapterInternal = IDateRangePickerAdapter & { _identifier: string };
type DateRangePickerCoreWithAdapter = IDateRangePickerCore & { _adapter: DateRangePickerAdapterInternal; _isInitialized: boolean };
type DateRangePickerWithCore = IDateRangePickerComponent & { _core: DateRangePickerCoreWithAdapter };

interface IDateRangePickerHarness {
  component: DateRangePickerWithCore;
  append(): void;
  destroy(): void;
}

describe('DateRangePickerComponent', () => {
  before(() => {
    defineDateRangePickerComponent();
    defineTextFieldComponent();
  });

  afterEach(function () {
    if (this.currentTest?.ctx?.harness) {
      this.currentTest.ctx.harness.destroy();
    }
  });

  describe('with imperative creation', () => {
    afterEach(function () {
      if (this.currentTest?.ctx?.harness) {
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
      this.harness = setupTestContext(true, false, false);

      await frame();

      expect(this.harness.component['_core']['_isInitialized']).to.be.false;

      await task(100);
      this.harness.component.appendChild(createFromElement());
      this.harness.component.appendChild(createToElement());
      await frame();

      expect(this.harness.component['_core']['_isInitialized']).to.be.true;
    });

    it('should render with initial date', function () {
      this.harness = setupTestContext();
      const date = new Date();
      const formattedDate = formatDate(date);
      this.harness.component.from = date;
      this.harness.append();

      expect(this.harness.component.from).to.deep.equal(date);
      expect(getFromElement(this.harness.component).value).to.equal(formattedDate);

      openPopup(this.harness.component);
      const calendar = getCalendar(this.harness.component);

      expect((calendar.value as IDateRange).from).to.deep.equal(date);
    });

    it('should preserve timestamp from date value after initialization', async function () {
      this.harness = setupTestContext();
      const fromStr = '2024-01-01T10:17:23.000Z';
      const from = new Date(fromStr);
      const toStr = '2024-01-05T07:15:43.000Z';
      const to = new Date(toStr);
      this.harness.component.value = { from, to };
      this.harness.append();
      await frame();

      expect((this.harness.component.value.from as Date).toISOString()).to.equal(fromStr);
      expect((this.harness.component.value.to as Date).toISOString()).to.equal(toStr);
    });

    it('should automatically render a toggle button with a Forge text-field component', function () {
      this.harness = setupTestContext(false, false, false, false);

      const textField = document.createElement(TEXT_FIELD_CONSTANTS.elementName) as ITextFieldComponent;
      textField.appendChild(createFromElement());
      textField.appendChild(createToElement());
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
      this.harness.component.from = value;
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

      this.harness.append();

      expect(this.harness.component.from as any).to.equal(value.toISOString());
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
    });

    it('should allow for setting of input element value before being placed in DOM', function () {
      this.harness = setupTestContext();

      const date = '05/04/2020';
      const expectedDate = new Date(date);
      getFromElement(this.harness.component).value = date;

      this.harness.append();

      expect(this.harness.component.from).to.deep.equal(expectedDate);
    });
  });

  describe('with static HTML', () => {
    afterEach(function () {
      if (this.currentTest?.ctx?.harness) {
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
      const fromElement = getFromElement(this.harness.component);
      expect(fromElement.getAttribute('autocomplete')).to.equal('off');
      expect(fromElement.getAttribute('autocorrect')).to.equal('off');
      expect(fromElement.getAttribute('autocapitalize')).to.equal('off');
      expect(fromElement.getAttribute('spellcheck')).to.equal('false');
      expect(fromElement.getAttribute('role')).to.equal('combobox');
      expect(fromElement.getAttribute('aria-live')).to.equal('assertive');
      expect(fromElement.getAttribute('aria-atomic')).to.equal('true');
      expect(fromElement.getAttribute('aria-haspopup')).to.equal('true');
      expect(fromElement.getAttribute('aria-expanded')).to.equal('false');
      expect(fromElement.getAttribute('aria-owns')).to.equal(getIdentifier(this.harness.component));
      expect(fromElement.getAttribute('aria-disabled')).to.equal('false');
      expect(fromElement.hasAttribute('aria-ariactivedescendant')).to.be.false;

      const toElement = getToElement(this.harness.component);
      expect(toElement.getAttribute('autocomplete')).to.equal('off');
      expect(toElement.getAttribute('autocorrect')).to.equal('off');
      expect(toElement.getAttribute('autocapitalize')).to.equal('off');
      expect(toElement.getAttribute('spellcheck')).to.equal('false');
      expect(toElement.getAttribute('role')).to.equal('combobox');
      expect(toElement.getAttribute('aria-live')).to.equal('assertive');
      expect(toElement.getAttribute('aria-atomic')).to.equal('true');
      expect(toElement.getAttribute('aria-haspopup')).to.equal('true');
      expect(toElement.getAttribute('aria-expanded')).to.equal('false');
      expect(toElement.getAttribute('aria-owns')).to.equal(getIdentifier(this.harness.component));
      expect(toElement.getAttribute('aria-disabled')).to.equal('false');
      expect(toElement.hasAttribute('aria-ariactivedescendant')).to.be.false;
    });

    it('should provide an aria-label on the To input if none is provided', function () {
      this.harness = setupTestContext(true);
      this.harness.component.open = true;
      expect(getToElement(this.harness.component).hasAttribute('aria-label')).to.be.true;
    });

    it('should open popup programmatically', function () {
      this.harness = setupTestContext(true);
      this.harness.component.open = true;
      expectPopupOpen(this.harness.component, true);
    });

    it('should emit open event when popup opened by user pressing arrow down key on from input', async function () {
      this.harness = setupTestContext(true);
      await frame();
      const openSpy = spy();
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.OPEN, openSpy);
      getFromElement(this.harness.component).focus();
      getFromElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await frame();
      expect(openSpy.calledOnce).to.be.true;
    });

    it('should emit open event when popup opened by user pressing arrow down key on to input', async function () {
      this.harness = setupTestContext(true);
      await frame();
      const openSpy = spy();
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.OPEN, openSpy);
      getToElement(this.harness.component).focus();
      getToElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await frame();
      expect(openSpy.calledOnce).to.be.true;
    });

    it('should emit open event when popup opened by user clicking toggle button', async function () {
      this.harness = setupTestContext(true);
      const openSpy = spy();
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.OPEN, openSpy);
      getToggleElement(this.harness.component).dispatchEvent(new PointerEvent('mousedown'));
      await frame();
      expect(openSpy.calledOnce).to.be.true;
    });

    it('should not emit open event when popup opened programmatically', function () {
      this.harness = setupTestContext(true);
      const openSpy = spy();
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.OPEN, openSpy);
      openPopup(this.harness.component);

      expect(openSpy.called).to.be.false;
    });

    it('should emit close event when popup closed via escape key from input', function () {
      this.harness = setupTestContext(true);
      const closeSpy = spy();
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.harness.component);
      getFromElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(closeSpy.calledOnce).to.be.true;
    });

    it('should emit close event when popup closed via escape key to input', function () {
      this.harness = setupTestContext(true);
      const closeSpy = spy();
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.harness.component);
      getToElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(closeSpy.calledOnce).to.be.true;
    });

    it('should emit close event when popup closed via toggle click', function () {
      this.harness = setupTestContext(true);
      const closeSpy = spy();
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.harness.component);
      getToggleElement(this.harness.component).dispatchEvent(new PointerEvent('mousedown'));

      expect(closeSpy.calledOnce).to.be.true;
    });

    it('should emit close event when selecting date from calendar via enter key', async function () {
      this.harness = setupTestContext(true);
      const closeSpy = spy();
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.harness.component);
      const fromElement = getFromElement(this.harness.component);
      fromElement.focus();
      await frame();
      fromElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fromElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      fromElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await frame();

      expect(closeSpy.calledOnce).to.be.true;
    });

    it('should emit close event when selecting date from calendar with mouse', async function () {
      this.harness = setupTestContext(true);
      const closeSpy = spy();
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.harness.component);
      const fromElement = getFromElement(this.harness.component);
      fromElement.focus();
      await frame();

      clickActiveDay(this.harness.component);
      fromElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      fromElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await frame();

      expect(closeSpy.calledOnce).to.be.true;
    });

    it('should not emit close event when popup closed programmatically', function () {
      this.harness = setupTestContext(true);
      const closeSpy = spy();
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CLOSE, closeSpy);
      openPopup(this.harness.component);
      this.harness.component.open = false;

      expect(closeSpy.called).to.be.false;
    });

    it('should open when pressing down arrow key', async function () {
      this.harness = setupTestContext(true);
      const fromElement = getFromElement(this.harness.component);
      fromElement.focus();
      fromElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await frame();
      expectPopupOpen(this.harness.component, true);
    });

    it('should open when clicking toggle element', async function () {
      this.harness = setupTestContext(true);
      getToggleElement(this.harness.component).dispatchEvent(new PointerEvent('mousedown'));
      await frame();
      expectPopupOpen(this.harness.component, true);
    });

    it('should set focus to input when clicking toggle element', function () {
      this.harness = setupTestContext(true);
      getToggleElement(this.harness.component).dispatchEvent(new PointerEvent('mousedown'));
      expect(document.activeElement).to.equal(getFromElement(this.harness.component));
    });

    it('should close popup when pressing escape key', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);
      expectPopupOpen(this.harness.component, true);
      getFromElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await popupCloseAnimation();
      await frame();
      expectPopupOpen(this.harness.component, false);
    });

    it('should set aria-activedescendant when pressing arrow key', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);

      const inputElement = getFromElement(this.harness.component);
      const originalValue = inputElement.getAttribute('aria-activedescendant');
      expect(inputElement.hasAttribute('aria-activedescendant')).to.be.true;
      expect(originalValue).to.be.ok;

      inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      const newValue = inputElement.getAttribute('aria-activedescendant');
      expect(inputElement.hasAttribute('aria-activedescendant')).to.be.true;
      expect(originalValue).to.not.equal(newValue);
    });

    it('should change aria-activedescendant when pressing multiple arrow keys', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);
      const announcer = getAnnouncerElement(this.harness.component);

      getFromElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      const leftValue = getFromElement(this.harness.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).to.equal(leftValue);

      getFromElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      const upValue = getFromElement(this.harness.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).to.equal(upValue);

      getFromElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      const rightValue = getFromElement(this.harness.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).to.equal(rightValue);

      getFromElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      const downValue = getFromElement(this.harness.component).getAttribute('aria-activedescendant') as string;
      expect(announcer.id).to.equal(downValue);

      expect(downValue).to.be.ok;
      expect([leftValue, upValue, rightValue].includes(downValue)).to.be.false;
    });

    it('should emit change event when selecting date via enter key', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);
      let theEvent: CustomEvent;
      const changeSpy = spy(evt => (theEvent = evt));
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      getFromElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(changeSpy.calledOnce).to.be.true;
      expect(this.harness.component.from).to.deep.equal(theEvent!.detail.from);
    });

    it('should emit change event when selecting date via mouse', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);
      let theEvent: CustomEvent;
      const changeSpy = spy(evt => (theEvent = evt));
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      await frame();
      clickActiveDay(this.harness.component);
      clickActiveDay(this.harness.component);

      await popupCloseAnimation();
      await frame();
      expectPopupOpen(this.harness.component, false);
      expect(changeSpy.calledTwice).to.be.true;
      expect(this.harness.component.from).to.deep.equal(theEvent!.detail.from);
    });

    it('should not set date if default prevented in change event', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);
      const changeSpy = spy(evt => evt.preventDefault());
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      await frame();
      clickActiveDay(this.harness.component);

      expect(changeSpy.calledOnce).to.be.true;
      expect(this.harness.component.from).to.be.null;
    });

    it('should emit date as string', async function () {
      this.harness = setupTestContext(true);
      const todayDate = new Date();
      const formattedDate = formatDate(todayDate);
      this.harness.component.valueMode = 'string';
      openPopup(this.harness.component);
      let eventDetail: DatePickerRange = new DatePickerRange();

      const changeSpy = spy(evt => (eventDetail = new DatePickerRange(evt.detail)));
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      await frame();
      clickActiveDay(this.harness.component);

      expect(typeof eventDetail.from).to.equal('string');
      expect(eventDetail.from).to.equal(formattedDate);
      expect(this.harness.component.from).to.equal(eventDetail.from as string);
    });

    it('should emit date as ISO string', async function () {
      this.harness = setupTestContext(true);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      this.harness.component.valueMode = 'iso-string';
      openPopup(this.harness.component);
      let eventDetail: DatePickerRange | undefined;
      const changeSpy = spy(evt => (eventDetail = evt.detail));
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      await frame();
      clickActiveDay(this.harness.component);

      expect(typeof eventDetail).to.equal('object');
      expect(eventDetail instanceof DatePickerRange).to.be.true;
      expect(eventDetail!.from).to.equal(todayDate.toISOString());
      expect(this.harness.component.from).to.equal(eventDetail!.from as string);
    });

    it('should emit change event when setting value mode', function () {
      this.harness = setupTestContext(true);
      const changeSpy = spy();
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      this.harness.component.valueMode = 'string';
      this.harness.component.valueMode = 'iso-string';
      this.harness.component.valueMode = 'object';
      this.harness.component.valueMode = 'asdf' as any;

      expect(changeSpy.callCount).to.equal(3);
    });

    it('should set value on from input', function () {
      this.harness = setupTestContext(true);
      const expectedDate = '05/04/2020';
      const date = new Date(expectedDate);
      this.harness.component.from = date;

      expect(getFromElement(this.harness.component).value).to.equal(expectedDate);
    });

    it('should set value from input element value on "from" input', function () {
      this.harness = setupTestContext(true);
      const date = '05/04/2020';
      const expectedDate = new Date(date);

      const inputElement = getFromElement(this.harness.component);
      inputElement.value = date;
      inputElement.dispatchEvent(new Event('input'));

      expect(this.harness.component.from).to.deep.equal(expectedDate);
    });

    it('should set value on "to" input', function () {
      this.harness = setupTestContext(true);
      const expectedDate = '05/04/2020';
      const date = new Date(expectedDate);
      this.harness.component.to = date;

      expect(getToElement(this.harness.component).value).to.equal(expectedDate);
    });

    it('should set input element value on "to" input', function () {
      this.harness = setupTestContext(true);
      const date = '05/04/2020';
      const expectedDate = new Date(date);
      const inputElement = getToElement(this.harness.component);
      inputElement.value = date;
      inputElement.dispatchEvent(new Event('input'));
      inputElement.dispatchEvent(new Event('blur'));

      expect(this.harness.component.to).to.deep.equal(expectedDate);
    });

    it('should format the date then the input element value is set on from input', function () {
      this.harness = setupTestContext(true);
      const inputElement = getFromElement(this.harness.component);
      inputElement.value = '01012020';
      inputElement.dispatchEvent(new Event('blur'));

      expect(getFromElement(this.harness.component).value).to.equal('01/01/2020');
    });

    it('should format the date then the input element value is set on to input', function () {
      this.harness = setupTestContext(true);
      const inputElement = getToElement(this.harness.component);
      inputElement.value = '01012020';
      inputElement.dispatchEvent(new Event('blur'));

      expect(getToElement(this.harness.component).value).to.equal('01/01/2020');
    });

    it('should set value in calendar', function () {
      this.harness = setupTestContext(true);
      const expectedDate = '01/01/2000';
      const date = new Date(expectedDate);
      this.harness.component.from = date;
      openPopup(this.harness.component);
      const calendar = getCalendar(this.harness.component);
      const calendarValue = calendar.value as DateRange;

      expect(getFromElement(this.harness.component).value).to.equal(expectedDate);
      expect(calendarValue.from).to.deep.equal(date);
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

    it('should reject value if below min date on from input', function () {
      this.harness = setupTestContext(true);
      const minDate = new Date('01/01/2020');
      this.harness.component.min = minDate;
      this.harness.component.from = new Date('06/01/2000');
      expect(this.harness.component.from).to.be.null;
      expect(getFromElement(this.harness.component).value).to.equal('');
    });

    it('should reject value if below min date on to input', function () {
      this.harness = setupTestContext(true);
      const minDate = new Date('01/01/2020');
      this.harness.component.min = minDate;
      this.harness.component.to = new Date('06/01/2000');
      expect(this.harness.component.to).to.be.null;
      expect(getToElement(this.harness.component).value).to.equal('');
    });

    it('should clear value when set to null', function () {
      this.harness = setupTestContext(true);
      this.harness.component.valueMode = 'string';

      const from = '01/01/2000';
      const to = '01/10/2000';
      this.harness.component.value = { from: new Date(from), to: new Date(to) };

      expect(this.harness.component.from).to.equal(from);
      expect(this.harness.component.to).to.equal(to);

      this.harness.component.value = null;

      expect(this.harness.component.value).to.deep.equal({ from: null, to: null } as any);
    });

    it('should clear value when min date is set if current value is not valid on from input', function () {
      this.harness = setupTestContext(true);
      const minDate = new Date('01/01/2020');
      this.harness.component.from = new Date('01/01/2000');

      expect(this.harness.component.from).to.not.be.null;
      this.harness.component.min = minDate;
      expect(this.harness.component.from).to.be.null;
      expect(getFromElement(this.harness.component).value).to.equal('');
    });

    it('should clear value when min date is set if current value is not valid on to input', function () {
      this.harness = setupTestContext(true);
      const minDate = new Date('01/01/2020');
      this.harness.component.to = new Date('01/01/2000');

      expect(this.harness.component.to).to.not.be.null;
      this.harness.component.min = minDate;
      expect(this.harness.component.to).to.be.null;
      expect(getToElement(this.harness.component).value).to.equal('');
    });

    it('should reject value if above max date from input', function () {
      this.harness = setupTestContext(true);
      const maxDate = new Date('01/01/2020');
      this.harness.component.max = maxDate;
      this.harness.component.from = new Date('06/01/2030');
      expect(this.harness.component.from).to.be.null;
      expect(getFromElement(this.harness.component).value).to.equal('');
    });

    it('should reject value if above max date to input', function () {
      this.harness = setupTestContext(true);
      const maxDate = new Date('01/01/2020');
      this.harness.component.max = maxDate;
      this.harness.component.to = new Date('06/01/2030');
      expect(this.harness.component.to).to.be.null;
      expect(getToElement(this.harness.component).value).to.equal('');
    });

    it('should clear value when max date is set if current value is not valid on from input', function () {
      this.harness = setupTestContext(true);
      const maxDate = new Date('01/01/2020');
      this.harness.component.from = new Date('01/01/2030');

      expect(this.harness.component.from).to.not.be.null;
      this.harness.component.max = maxDate;
      expect(this.harness.component.from).to.be.null;
      expect(getFromElement(this.harness.component).value).to.equal('');
    });

    it('should clear value when max date is set if current value is not valid on to input', function () {
      this.harness = setupTestContext(true);
      const maxDate = new Date('01/01/2020');
      this.harness.component.to = new Date('01/01/2030');

      expect(this.harness.component.to).to.not.be.null;
      this.harness.component.max = maxDate;
      expect(this.harness.component.to).to.be.null;
      expect(getToElement(this.harness.component).value).to.equal('');
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

    it('should restrict date if matching date is disabled in from input', function () {
      this.harness = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      this.harness.component.disabledDates = disabledDates;
      this.harness.component.from = '01/01/2020';

      expect(this.harness.component.from).to.be.null;
      expect(getFromElement(this.harness.component).value).to.equal('');
    });

    it('should restrict date if matching date is disabled in to input', function () {
      this.harness = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      this.harness.component.disabledDates = disabledDates;
      this.harness.component.to = '01/01/2020';

      expect(this.harness.component.to).to.be.null;
      expect(getToElement(this.harness.component).value).to.equal('');
    });

    it('should clear value when disabled dates is set if current value is disabled in from input', function () {
      this.harness = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      this.harness.component.from = '01/01/2020';

      expect(this.harness.component.from).to.not.be.null;
      this.harness.component.disabledDates = disabledDates;
      expect(this.harness.component.from).to.be.null;
      expect(getFromElement(this.harness.component).value).to.equal('');
    });

    it('should clear value when disabled dates is set if current value is disabled in to input', function () {
      this.harness = setupTestContext(true);
      const disabledDates = [new Date('01/01/2020')];
      this.harness.component.to = '01/01/2020';

      expect(this.harness.component.to).to.not.be.null;
      this.harness.component.disabledDates = disabledDates;
      expect(this.harness.component.to).to.be.null;
      expect(getToElement(this.harness.component).value).to.equal('');
    });

    it('should accept valid date if min, max, and disabled dates are set in from input', function () {
      this.harness = setupTestContext(true);
      const date = new Date('04/30/2020');
      this.harness.component.disabledDates = [new Date('04/25/2020')];
      this.harness.component.min = new Date('04/01/2020');
      this.harness.component.max = new Date('05/31/2020');
      this.harness.component.from = date;

      expect(this.harness.component.from).to.deep.equal(date);
    });

    it('should accept valid date if min, max, and disabled dates are set in to input', function () {
      this.harness = setupTestContext(true);
      const date = new Date('04/30/2020');
      this.harness.component.disabledDates = [new Date('04/25/2020')];
      this.harness.component.min = new Date('04/01/2020');
      this.harness.component.max = new Date('05/31/2020');
      this.harness.component.to = date;

      expect(this.harness.component.to).to.deep.equal(date);
    });

    it('should set value in calendar if open in from input', function () {
      this.harness = setupTestContext(true);
      const date = new Date();
      openPopup(this.harness.component);
      const calendar = getCalendar(this.harness.component);
      this.harness.component.from = date;
      const calendarValue = calendar.value as DateRange;
      expect(this.harness.component.from).to.deep.equal(date);
      expect(calendarValue.from).to.deep.equal(date);
    });

    it('should set value in calendar if open in to input', function () {
      this.harness = setupTestContext(true);
      const date = new Date();
      openPopup(this.harness.component);
      const calendar = getCalendar(this.harness.component);
      this.harness.component.to = date;

      const calendarValue = calendar.value as DateRange;
      expect(this.harness.component.to).to.deep.equal(date);
      expect(calendarValue.to).to.deep.equal(date);
    });

    it('should set from date via attribute', function () {
      this.harness = setupTestContext(true);
      const date = '05/04/2020';
      this.harness.component.setAttribute(DATE_RANGE_PICKER_CONSTANTS.observedAttributes.FROM, date);

      expect(this.harness.component.from).to.deep.equal(new Date(date));
    });

    it('should set to date via attribute', function () {
      this.harness = setupTestContext(true);
      const date = '05/04/2020';
      this.harness.component.setAttribute(DATE_RANGE_PICKER_CONSTANTS.observedAttributes.TO, date);

      expect(this.harness.component.to).to.deep.equal(new Date(date));
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

    it('should format and set value on from input blur', function () {
      this.harness = setupTestContext(true);
      const dateStr = '01012020';
      const formattedDateStr = formatDate(parseDateString(dateStr) as Date);
      getFromElement(this.harness.component).focus();
      getFromElement(this.harness.component).value = '01012020';
      getFromElement(this.harness.component).blur();
      getFromElement(this.harness.component).dispatchEvent(new Event('blur'));

      expect(getFromElement(this.harness.component).value).to.equal(formattedDateStr);
    });

    it('should format and set value on to input blur', function () {
      this.harness = setupTestContext(true);
      const dateStr = '01012020';
      const formattedDateStr = formatDate(parseDateString(dateStr) as Date);
      getToElement(this.harness.component).focus();
      getToElement(this.harness.component).value = '01012020';
      getToElement(this.harness.component).blur();
      getToElement(this.harness.component).dispatchEvent(new Event('blur'));

      expect(getToElement(this.harness.component).value).to.equal(formattedDateStr);
    });

    it('should close popup on blur', async function () {
      this.harness = setupTestContext(true);
      openPopup(this.harness.component);

      await frame();
      expectPopupOpen(this.harness.component, true);
      getFromElement(this.harness.component).blur();
      getFromElement(this.harness.component).dispatchEvent(new Event('blur'));
      await popupCloseAnimation();
      await frame();

      expectPopupOpen(this.harness.component, false);
    });

    it('should not open via toggle if disabled', function () {
      this.harness = setupTestContext(true);
      this.harness.component.disabled = true;
      getToggleElement(this.harness.component).dispatchEvent(new PointerEvent('mousedown'));

      expectPopupOpen(this.harness.component, false);
    });

    it('should use "from" input mask', function () {
      this.harness = setupTestContext(true);
      this.harness.component.masked = true;

      expect(this.harness.component.masked).to.be.true;

      const inputElement = getFromElement(this.harness.component);
      inputElement.value = '01012020';
      inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(inputElement.value).to.equal('01/01/2020');
    });

    it('should use "to" input mask', function () {
      this.harness = setupTestContext(true);
      this.harness.component.masked = true;

      expect(this.harness.component.masked).to.be.true;

      const inputElement = getToElement(this.harness.component);
      inputElement.value = '01012020';
      inputElement.dispatchEvent(new KeyboardEvent('input'));

      expect(inputElement.value).to.equal('01/01/2020');
    });

    it('should select mask in "from" input when shown on focus', function () {
      this.harness = setupTestContext(true);
      const fromElement = getFromElement(this.harness.component);
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(this.harness.component.showMaskFormat).to.be.true;
      fromElement.focus();
      fromElement.dispatchEvent(new FocusEvent('focus'));

      expect(fromElement.selectionStart).to.equal(0);
      expect(fromElement.selectionEnd).to.equal('__/__/____'.length);
    });

    it('should select mask in "to" input when shown on focus', function () {
      this.harness = setupTestContext(true);
      const toElement = getToElement(this.harness.component);
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(this.harness.component.showMaskFormat).to.be.true;
      toElement.focus();
      toElement.dispatchEvent(new FocusEvent('focus'));

      expect(toElement.selectionStart).to.equal(0);
      expect(toElement.selectionEnd).to.equal('__/__/____'.length);
    });

    it('should only show mask format in "from" input on focus', function () {
      this.harness = setupTestContext(true);
      const fromElement = getFromElement(this.harness.component);
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(this.harness.component.showMaskFormat).to.be.true;
      fromElement.focus();
      fromElement.dispatchEvent(new FocusEvent('focus'));

      expect(fromElement.value).to.equal('__/__/____');
    });

    it('should only show mask format in "to" input on focus', function () {
      this.harness = setupTestContext(true);
      const toElement = getToElement(this.harness.component);
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(this.harness.component.showMaskFormat).to.be.true;
      toElement.focus();
      toElement.dispatchEvent(new FocusEvent('focus'));

      expect(toElement.value).to.equal('__/__/____');
    });

    it('should clear mask format in "from" input on blur', function () {
      this.harness = setupTestContext(true);
      const fromElement = getFromElement(this.harness.component);
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(this.harness.component.showMaskFormat).to.be.true;
      fromElement.focus();
      fromElement.dispatchEvent(new FocusEvent('focus'));

      expect(fromElement.value).to.equal('__/__/____');

      fromElement.dispatchEvent(new KeyboardEvent('input'));
      fromElement.blur();
      fromElement.dispatchEvent(new FocusEvent('blur'));
      expect(fromElement.value).to.be.empty;
    });

    it('should clear mask format in "to" input on blur', function () {
      this.harness = setupTestContext(true);
      const toElement = getToElement(this.harness.component);
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');

      expect(this.harness.component.showMaskFormat).to.be.true;

      toElement.focus();
      toElement.dispatchEvent(new FocusEvent('focus'));
      expect(toElement.value).to.equal('__/__/____');

      toElement.dispatchEvent(new KeyboardEvent('input'));
      toElement.blur();
      toElement.dispatchEvent(new FocusEvent('blur'));

      expect(toElement.value).to.be.empty;
    });

    it('should use custom parse callback, format callback, and mask format on from input', function () {
      this.harness = setupTestContext(true);
      this.harness.component.masked = true;
      this.harness.component.showMaskFormat = true;
      this.harness.component.maskFormat = 'YYYY-MM-DD';
      this.harness.component.parseCallback = (str: any) => (str ? new Date(`${str}T00:00:00.000Z`) : null);
      this.harness.component.formatCallback = (date: any) => (date ? date.toISOString().split('T')[0] : '');

      const fromInput = getFromElement(this.harness.component);
      fromInput.focus();
      fromInput.dispatchEvent(new FocusEvent('focus'));
      expect(fromInput.value).to.equal('____-__-__');

      fromInput.value = '20200101';
      fromInput.dispatchEvent(new Event('input'));

      expect(fromInput.value).to.equal('2020-01-01');
    });

    it('should allow for setting mask format via attribute in from input', function () {
      this.harness = setupTestContext(true);
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASK_FORMAT, 'YYYY-MM-DD');

      const inputEl = getFromElement(this.harness.component);
      inputEl.focus();
      inputEl.dispatchEvent(new FocusEvent('focus'));

      expect(this.harness.component.maskFormat).to.equal('YYYY-MM-DD');
      expect(getFromElement(this.harness.component).value).to.equal('____-__-__');
    });

    it('should allow for setting mask format via attribute in to input', function () {
      this.harness = setupTestContext(true);
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASKED, '');
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.SHOW_MASK_FORMAT, '');
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.MASK_FORMAT, 'YYYY-MM-DD');

      const inputEl = getFromElement(this.harness.component);
      inputEl.focus();
      inputEl.dispatchEvent(new FocusEvent('focus'));

      expect(this.harness.component.maskFormat).to.equal('YYYY-MM-DD');
      expect(getToElement(this.harness.component).value).to.equal('____-__-__');
    });

    it("should remove characters that aren't valid when formatting in from input", function () {
      this.harness = setupTestContext(true);
      getFromElement(this.harness.component).focus();
      getFromElement(this.harness.component).value = 'abcd';
      this.harness.component.open = true;

      expect(getFromElement(this.harness.component).value).to.equal('');
    });

    it("should remove characters that aren't valid when formatting in to input", async function () {
      this.harness = setupTestContext(true);
      getToElement(this.harness.component).focus();
      getToElement(this.harness.component).value = 'abcd';
      this.harness.component.open = true;
      expect(getToElement(this.harness.component).value).to.equal('');
    });

    it('should set value to null and emit change event when setting min date', function () {
      this.harness = setupTestContext(true);
      const date = new Date('01/01/2020');
      this.harness.component.from = date;

      const changeSpy = spy();
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      this.harness.component.min = new Date('01/02/2020');

      expect(this.harness.component.from).to.be.null;
      expect(getFromElement(this.harness.component).value).to.equal('');
      expect(changeSpy.calledOnce).to.be.true;
    });

    it('should set value to null and emit change event when setting max date on from input', function () {
      this.harness = setupTestContext(true);
      const date = new Date('01/02/2020');
      this.harness.component.from = date;

      const changeSpy = spy();
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      this.harness.component.max = new Date('01/01/2020');

      expect(this.harness.component.from).to.be.null;
      expect(getFromElement(this.harness.component).value).to.equal('');
      expect(changeSpy.calledOnce).to.be.true;
    });

    it('should set value to null and emit change event when setting max date on to input', function () {
      this.harness = setupTestContext(true);
      const date = new Date('01/02/2020');
      this.harness.component.to = date;

      const changeSpy = spy();
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      this.harness.component.max = new Date('01/01/2020');

      expect(this.harness.component.to).to.be.null;
      expect(getToElement(this.harness.component).value).to.equal('');
      expect(changeSpy.calledOnce).to.be.true;
    });

    it('should set value to null and emit change event when setting disabled dates on from input', function () {
      this.harness = setupTestContext(true);
      const date = new Date('01/01/2020');
      this.harness.component.from = date;

      const changeSpy = spy();
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      this.harness.component.disabledDates = [new Date('01/01/2020')];

      expect(this.harness.component.from).to.be.null;
      expect(getFromElement(this.harness.component).value).to.equal('');
      expect(changeSpy.calledOnce).to.be.true;
    });

    it('should set value to null and emit change event when setting disabled dates on to input', function () {
      this.harness = setupTestContext(true);
      const date = new Date('01/01/2020');
      this.harness.component.to = date;

      const changeSpy = spy();
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);

      this.harness.component.disabledDates = [new Date('01/01/2020')];

      expect(this.harness.component.to).to.be.null;
      expect(getToElement(this.harness.component).value).to.equal('');
      expect(changeSpy.calledOnce).to.be.true;
    });

    it('should not propagate keydown event on input when masked and left or right arrow key is pressed when open in from input', function () {
      this.harness = setupTestContext(true);
      this.harness.component.masked = true;
      openPopup(this.harness.component);

      const keydownSpy = spy();
      getFromElement(this.harness.component).addEventListener('keydown', keydownSpy);

      getFromElement(this.harness.component).focus();
      getFromElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      getFromElement(this.harness.component).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      expect(keydownSpy.called).to.be.false;
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

    it('should emit input and change events when the date is set to from input', function () {
      this.harness = setupTestContext(true);
      const inputSpy = spy();
      getFromElement(this.harness.component).addEventListener('change', inputSpy);

      const changeSpy = spy();
      getFromElement(this.harness.component).addEventListener('change', changeSpy);

      this.harness.component.from = new Date('06/01/2020');

      expect(inputSpy.calledOnce).to.be.true;
      expect(changeSpy.calledOnce).to.be.true;
    });

    it('should emit input and change events when the date is set to to input', function () {
      this.harness = setupTestContext(true);
      const inputSpy = spy();
      getToElement(this.harness.component).addEventListener('change', inputSpy);

      const changeSpy = spy();
      getToElement(this.harness.component).addEventListener('change', changeSpy);

      this.harness.component.to = new Date('06/01/2020');

      expect(inputSpy.calledOnce).to.be.true;
      expect(changeSpy.calledOnce).to.be.true;
    });

    it('should not emit input and change events when the date is set if notify input value changes is false in from input', function () {
      this.harness = setupTestContext(true);
      this.harness.component.notifyInputValueChanges = false;

      const inputSpy = spy();
      getFromElement(this.harness.component).addEventListener('change', inputSpy);

      const changeSpy = spy();
      getFromElement(this.harness.component).addEventListener('change', changeSpy);

      this.harness.component.from = new Date('06/01/2020');

      expect(this.harness.component.notifyInputValueChanges).to.be.false;
      expect(inputSpy.called).to.be.false;
      expect(changeSpy.called).to.be.false;
    });

    it('should not emit input and change events when the date is set if notify input value changes is false in to input', function () {
      this.harness = setupTestContext(true);
      this.harness.component.notifyInputValueChanges = false;

      const inputSpy = spy();
      getToElement(this.harness.component).addEventListener('change', inputSpy);

      const changeSpy = spy();
      getToElement(this.harness.component).addEventListener('change', changeSpy);

      this.harness.component.to = new Date('06/01/2020');

      expect(inputSpy.called).to.be.false;
      expect(changeSpy.called).to.be.false;
    });

    it('should set the to and from properties when the value property is set', function () {
      this.harness = setupTestContext(true);
      const fromDate = getDateWithDayOffset(-5);
      const toDate = getDateWithDayOffset(5);

      this.harness.component.value = {
        from: fromDate,
        to: toDate
      };

      expect(this.harness.component.from).to.deep.equal(fromDate);
      expect(this.harness.component.to).to.deep.equal(toDate);
    });

    it('should set value property when the to and from properties are set', function () {
      this.harness = setupTestContext(true);
      const fromDate = getDateWithDayOffset(-5);
      const toDate = getDateWithDayOffset(5);

      this.harness.component.from = fromDate;
      this.harness.component.to = toDate;

      expect(this.harness.component.value?.from).to.deep.equal(fromDate);
      expect(this.harness.component.value?.to).to.deep.equal(toDate);
    });

    it('should set allow invalid date via attribute', function () {
      this.harness = setupTestContext(true);
      this.harness.component.setAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.ALLOW_INVALID_DATE, '');

      expect(this.harness.component.allowInvalidDate).to.be.true;
    });

    it('should not clear the from input value if allow invalid is set', function () {
      this.harness = setupTestContext(true);
      const invalidDate = '>01/01/2020';
      const disabledDate = '04/25/2020';
      const outsideMinDate = '03/01/2020';
      const outsideMaxDate = '07/01/2020';
      this.harness.component.allowInvalidDate = true;

      getFromElement(this.harness.component).value = invalidDate;
      expect(getFromElement(this.harness.component).value).to.equal(invalidDate);

      getFromElement(this.harness.component).value = disabledDate;
      this.harness.component.disabledDates = [new Date(disabledDate)];
      expect(getFromElement(this.harness.component).value).to.equal(disabledDate);

      getFromElement(this.harness.component).value = outsideMinDate;
      this.harness.component.min = new Date('04/01/2020');
      expect(getFromElement(this.harness.component).value).to.equal(outsideMinDate);

      getFromElement(this.harness.component).value = outsideMaxDate;
      this.harness.component.max = new Date('05/31/2020');
      expect(getFromElement(this.harness.component).value).to.equal(outsideMaxDate);
    });

    it('should not clear the to input value if allow invalid is set', function () {
      this.harness = setupTestContext(true);
      const invalidDate = '>01/01/2020';
      const disabledDate = '04/25/2020';
      const outsideMinDate = '03/01/2020';
      const outsideMaxDate = '07/01/2020';
      this.harness.component.allowInvalidDate = true;

      getToElement(this.harness.component).value = invalidDate;
      expect(getToElement(this.harness.component).value).to.equal(invalidDate);

      getToElement(this.harness.component).value = disabledDate;
      this.harness.component.disabledDates = [new Date(disabledDate)];
      expect(getToElement(this.harness.component).value).to.equal(disabledDate);

      getToElement(this.harness.component).value = outsideMinDate;
      this.harness.component.min = new Date('04/01/2020');
      expect(getToElement(this.harness.component).value).to.equal(outsideMinDate);

      getToElement(this.harness.component).value = outsideMaxDate;
      this.harness.component.max = new Date('05/31/2020');
      expect(getToElement(this.harness.component).value).to.equal(outsideMaxDate);
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

    it('should set date to todays date when clicking today button', async function () {
      this.harness = setupTestContext(true);
      this.harness.component.showToday = true;
      const changeSpy = spy();
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      openPopup(this.harness.component);

      clickTodayButton(this.harness.component);
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      const popup = getPopup(this.harness.component);

      expect(changeSpy.calledOnce).to.be.true;
      expect(this.harness.component.open).to.be.true;
      expect(popup).to.not.be.null;
      expect(this.harness.component.value?.from).to.not.be.null;
      expect(this.harness.component.value?.to).to.be.null;
      expect((this.harness.component.value?.from as Date).getDate()).to.equal(new Date().getDate());
    });

    it('should remove value when clicking clear button', async function () {
      this.harness = setupTestContext(true);
      this.harness.component.showClear = true;
      this.harness.component.value = { from: new Date('01/01/2021'), to: new Date('01/05/2021') };
      const changeSpy = spy();
      this.harness.component.addEventListener(DATE_RANGE_PICKER_CONSTANTS.events.CHANGE, changeSpy);
      openPopup(this.harness.component);

      clickClearButton(this.harness.component);
      await task(POPOVER_ANIMATION_DURATION);
      await frame();

      const popup = getPopup(this.harness.component);

      expect(changeSpy.calledOnce).to.be.true;
      expect(this.harness.component.open).to.be.false;
      expect(popup).to.be.null;
      expect(this.harness.component.value).to.deep.equal({ from: null, to: null });
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
      this.harness.component.from = date;

      expect(this.harness.component.from).to.be.null;
    });

    it('should remove from value if set and is disabled', async function () {
      this.harness = setupTestContext(true);
      const date = new Date();
      this.harness.component.from = date;
      await frame();
      this.harness.component.disabledDaysOfWeek = [date.getDay()];

      expect(this.harness.component.from).to.be.null;
    });

    it('should remove to value if set and is disabled', async function () {
      this.harness = setupTestContext(true);
      const date = new Date();
      this.harness.component.to = date;
      await frame();
      this.harness.component.disabledDaysOfWeek = [date.getDay()];

      expect(this.harness.component.to).to.be.null;
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
        removeElement(fixtureElement);
        // Note: tryCleanupPopovers is not available in WTR setup, skip for now
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

  function getTodayButton(component: DateRangePickerWithCore): IButtonComponent {
    const popup = getPopup(component);
    const calendar = popup.querySelector('forge-calendar') as ICalendarComponent;
    return (getShadowElement(calendar, '#today-button') as IButtonComponent) ?? null;
  }

  function getClearButton(component: DateRangePickerWithCore): IButtonComponent {
    const popup = getPopup(component);
    const calendar = popup.querySelector('forge-calendar') as ICalendarComponent;
    return (getShadowElement(calendar, '#clear-button') as IButtonComponent) ?? null;
  }

  function clickTodayButton(component: DateRangePickerWithCore): void {
    const todayButton = getTodayButton(component);
    todayButton.click();
  }

  function clickClearButton(component: DateRangePickerWithCore): void {
    const clearButton = getClearButton(component);
    clearButton.click();
  }

  async function popupCloseAnimation(): Promise<void> {
    return task(POPOVER_ANIMATION_DURATION);
  }

  function expectPopupOpen(component: DateRangePickerWithCore, isOpen: boolean): void {
    const popup = getPopup(component);
    expect(component.hasAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.OPEN)).to.equal(isOpen);
    if (isOpen) {
      expect(popup).to.not.be.null;
      expect(popup.isConnected).to.equal(isOpen);
      expect(popup.classList.contains('forge-calendar-dropdown__popup')).to.equal(isOpen);
      expect(getFromElement(component).getAttribute('aria-expanded')).to.equal('true');
    } else {
      expect(popup).to.be.null;
      expect(getFromElement(component).getAttribute('aria-expanded')).to.equal('false');
    }
  }

  function expectDefaultValues(component: IDateRangePickerComponent): void {
    expect(component.isConnected).to.be.true;
    expect(component.from).to.be.null;
    expect(component.to).to.be.null;
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
    expect(component.allowInvalidDate).to.be.false;
    expect(component.hasAttribute(BASE_DATE_PICKER_CONSTANTS.observedAttributes.OPEN)).to.be.false;
  }

  function expectDisabled(component: IDateRangePickerComponent, isDisabled: boolean): void {
    expect(component.disabled).to.equal(isDisabled);
    expect(getFromElement(component).disabled).to.equal(isDisabled);
    expect(getToElement(component).disabled).to.equal(isDisabled);
    if (getToggleElement(component)) {
      expect(getToggleElement(component).getAttribute('aria-disabled')).to.equal(isDisabled.toString());
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
