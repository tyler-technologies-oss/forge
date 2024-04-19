import { CALENDAR_CONSTANTS, defineCalendarComponent, ICalendarComponent, ICalendarEvent, CALENDAR_MENU_CONSTANTS, CalendarView, ICalendarDateSelectEventData } from '@tylertech/forge/calendar';
import { getShadowElement, removeElement } from '@tylertech/forge-core';
import { timer, tick } from '@tylertech/forge-testing';
import { getDateId } from '@tylertech/forge/calendar/calendar-dom-utils';
import { isSameDate } from '@tylertech/forge';

interface ITestContext {
  context: ITestCalendarContext;
}

interface ITestCalendarContext {
  component: ICalendarComponent;
  destroy(): void;
}

interface ITestPartialCalendarContext {
  component: ICalendarComponent;
  appendToFixture(): void;
  destroy(): void;
}

describe('CalendarComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineCalendarComponent();
  });

  beforeEach(function(this: ITestContext) {
    this.context = setupTestContext();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instatiate component with shadow dom', function(this: ITestContext) {
    expect(this.context.component.shadowRoot).toBeDefined();
  });

  it('should contain the month button', function(this: ITestContext) {
    expect(getMonthButton(this.context.component)).toBeDefined();
  });

  it('should contain the year button', function(this: ITestContext) {
    expect(getYearButton(this.context.component)).toBeDefined();
  });

  it('should contain the previous button', function(this: ITestContext) {
    expect(getPreviousButton(this.context.component)).toBeDefined();
  });

  it('should contain the next button', function(this: ITestContext) {
    expect(getNextButton(this.context.component)).toBeDefined();
  });

  it('should show this year by default', function(this: ITestContext) {
    expect(this.context.component.year).toBe(new Date().getFullYear());
  });

  it('should show this month by default', function(this: ITestContext) {
    expect(this.context.component.month).toBe(new Date().getMonth());
  });

  it('should highlight today by default', function(this: ITestContext) {
    expect(this.context.component.showToday).toBeTrue();
  });

  it('should open in single mode by default', function(this: ITestContext) {
    expect(this.context.component.mode).toBe('single');
  });

  it('should initialize with no dates selected', function(this: ITestContext) {
    expect(this.context.component.value).toBeNull();
  });

  it('should initialize with 42 dates in the date view', function(this: ITestContext) {
    const dates = getDateGrid(this.context.component);
    expect(dates.childElementCount).toBe(6);
    const rows = Array.from(dates.children);
    rows.forEach((row: HTMLElement) => {
      expect(row.childElementCount).toBe(7);
    });
  });

  it('should allow value to be set', function(this: ITestContext) {
    this.context.component.value = [new Date()];
    expect(this.context.component.value).not.toBeNull();
  });

  it('should allow showToday to be set to false', function(this: ITestContext) {
    this.context.component.showToday = false;
    expect(this.context.component.showToday).toBeFalse();
  });

  it('should allow showToday to be set to true', function(this: ITestContext) {
    this.context.component.showToday = false;
    this.context.component.showToday = true;
    expect(this.context.component.showToday).toBeTrue();
  });

  it('should select the correct date when selectDate is called', function(this: ITestContext) {
    const date = new Date();
    this.context.component.selectDate(date);
    expect(this.context.component.value).toEqual(date);
  });

  it('should do nothing if selectDate is called with an already selected date', function(this: ITestContext) {
    const date = new Date();
    this.context.component.selectDate(date);
    this.context.component.selectDate(date);
    expect((this.context.component.value as Date).toDateString()).toBe(date.toDateString());
  });

  it('should remove the correct date when deselectDate is called', function(this: ITestContext) {
    const date = new Date();
    this.context.component.selectDate(date);
    this.context.component.deselectDate(date);
    expect(this.context.component.value).toBeNull();
  });

  it('should select the correct date when toggle date is called with a currently non-selected date', function(this: ITestContext) {
    const date = new Date();
    this.context.component.toggleDate(date);
    expect(this.context.component.value).toEqual(date);
  });

  it('should deselect the correct date when toggle date is called with a currently non-selected date', function(this: ITestContext) {
    const date = new Date();
    this.context.component.selectDate(date);
    this.context.component.toggleDate(date);
    expect(this.context.component.value).toBeNull();
  });

  it('should allow multiple dates to be selected when mode is multiple', function(this: ITestContext) {
    this.context.component.mode = 'multiple';
    const someDates = getTodayAndTomorrow();
    this.context.component.selectDate(someDates[0]);
    this.context.component.selectDate(someDates[1]);

    expect((<Date[]>this.context.component.value).length).toBe(2);
  });

  it('should remove a selected date when mode is multiple is enabled and removeDate is called with a selected date', function(this: ITestContext) {
    this.context.component.mode = 'multiple';
    const someDates = getTodayAndTomorrow();
    this.context.component.selectDate(someDates[0]);
    this.context.component.deselectDate(someDates[0]);

    expect(this.context.component.value).toEqual([]);
  });

  it('should remove a selected date when mode is multiple is enabled and toggleDate is called with a selected date', function(this: ITestContext) {
    this.context.component.mode = 'multiple';
    const someDates = getTodayAndTomorrow();
    this.context.component.selectDate(someDates[0]);
    this.context.component.toggleDate(someDates[0]);

    expect(this.context.component.value).toEqual([]);
  });

  it('should clear selected dates if set to null', function(this: ITestContext) {
    this.context.component.value = new Date();
    this.context.component.value = null;

    expect(this.context.component.value).toBeNull();
  });

  it('should set disabled dates when a single date is provided', function(this: ITestContext) {
    const date = new Date();
    this.context.component.disabledDates = date;

    expect(this.context.component.disabledDates).toBeTruthy();
  });

  it('should set disabled dates when an array of dates is provided', function(this: ITestContext) {
    const dateArray = [new Date('12/31/1999'), new Date('1/1/2000')];
    this.context.component.disabledDates = dateArray;

    expect(this.context.component.disabledDates).toEqual(dateArray);
  });

  it('should clear disabled dates if set to null', function(this: ITestContext) {
    this.context.component.disabledDates = new Date();
    this.context.component.disabledDates = null;

    expect(this.context.component.disabledDates).toBeNull();
  });

  it('should disallow a disabled date to be selected through the ui', function(this: ITestContext) {
    const date = new Date('12/25/2010');
    this.context.component.disabledDates = new Date('12/25/2010');
    getDateElement(this.context.component, date)?.click();

    expect(this.context.component.value).toBeNull();
  });

  it('should set the month to that of the min date if min date is set later than the current month', function(this: ITestContext) {
    this.context.component.month = 1;
    this.context.component.year = 2010;
    this.context.component.min = new Date('3/10/2010');

    expect(this.context.component.month).toBe(2);
  });

  it('should set the year to that of the min date if min date is set later than the current year', function(this: ITestContext) {
    this.context.component.month = 2;
    this.context.component.year = 2009;
    this.context.component.min = new Date('3/10/2010');

    expect(this.context.component.year).toBe(2010);
  });

  it('should set the month to that of the max date if max date is set earlier than the current month', function(this: ITestContext) {
    this.context.component.month = 5;
    this.context.component.year = 2010;
    this.context.component.max = new Date('3/10/2010');

    expect(this.context.component.month).toBe(2);
  });

  it('should set the year to that of the max date if max date is set earlier than the current year', function(this: ITestContext) {
    this.context.component.year = 2009;
    this.context.component.max = new Date('3/10/2008');

    expect(this.context.component.year).toBe(2008);
  });

  it('should show an additional events icon when more than three events are set on a date', function(this: ITestContext) {
    const eventsCallback = (date: Date) => {
      return [
        {date, label: 'Test event', color: 'blue'},
        {date, label: 'Test event', color: 'light-green'},
        {date, label: 'Test event', color: 'cyan'},
        {date, label: 'Test event', color: 'teal'}
      ];
    };
    this.context.component.eventBuilder = eventsCallback;
    expect(getFirstDate(this.context.component).querySelector(`.${CALENDAR_CONSTANTS.classes.EVENT_OVERFLOW}`)).toBeDefined();
  });

  it('should call dateBuilder when it is set', function(this: ITestContext) {
    const spy = jasmine.createSpy('Date builder');
    this.context.component.dateBuilder = (date, element) => {
      spy();
      return element;
    };
    expect(spy).toHaveBeenCalled();
  });

  describe('attributes', function(this: ITestContext) {
    it('should update to show today when the showToday attribute is set', function(this: ITestContext) {
      this.context.component.setAttribute(CALENDAR_CONSTANTS.attributes.SHOW_TODAY, '');
      expect(this.context.component.showToday).toBeTrue();
    });

    it('should update to the specified month when the month attribute is set', function(this: ITestContext) {
      this.context.component.setAttribute(CALENDAR_CONSTANTS.attributes.MONTH, '6');
      expect(this.context.component.month).toBe(6);
    });

    it('should update to the specified year when the year attribute is set', function(this: ITestContext) {
      this.context.component.setAttribute(CALENDAR_CONSTANTS.attributes.YEAR, '1970');
      expect(this.context.component.year).toBe(1970);
    });

    it('should enable multiselect when the mode attribute is set to multiple', function(this: ITestContext) {
      this.context.component.setAttribute(CALENDAR_CONSTANTS.attributes.MODE, 'multiple');
      expect(this.context.component.mode).toBe('multiple');
    });

    it('should leave one month selected if multiple months are selected and multiselect is disabled', function(this: ITestContext) {
      this.context.component.mode = 'multiple';
      const someDates = getTodayAndTomorrow();
      this.context.component.value = someDates;
      this.context.component.mode = 'single';

      expect(this.context.component.value).not.toBeNull();
    });

    it('should disable the date before the minimum date set', function(this: ITestContext) {
      const date = new Date('1/2/2000');
      const previous = new Date(date);
      previous.setDate(previous.getDate() - 1);
      this.context.component.min = date;
      this.context.component.goToDate(date);
      (getDateElement(this.context.component, previous) as any).click();

      expect(this.context.component.value).toBeNull();
    });

    it('should disable the date after the maximum date set', function(this: ITestContext) {
      const date = new Date('1/2/2000');
      const next = new Date(date);
      next.setDate(next.getDate() + 1);
      this.context.component.max = date;
      this.context.component.goToDate(date);
      (getDateElement(this.context.component, next) as any).click();

      expect(this.context.component.value).toBeNull();
    });

    it('should contain the correct disabled days of the week', function(this: ITestContext) {
      const disabledDaysOfWeek = [0, 1];
      this.context.component.disabledDaysOfWeek = disabledDaysOfWeek;
      expect(this.context.component.disabledDaysOfWeek).toEqual(disabledDaysOfWeek);
    });

    it('should disable sundays when disableDayOfWeek is 0', function(this: ITestContext) {
      this.context.component.disabledDaysOfWeek = [0];
      const allSundayDates = Array.from(getRootElement(this.context.component).querySelectorAll('tbody tr')).map(tr => tr.querySelector('td')).filter(td => td!.hasAttribute('data-date'));
      const thatAllSundaysAreDisabled = allSundayDates.every(d => d!.getAttribute('aria-disabled') === 'true');
      expect(thatAllSundaysAreDisabled).toBeTrue();
    });
    
    it('should enable range selection when the mode attribute is set', function(this: ITestContext) {
      this.context.component.setAttribute(CALENDAR_CONSTANTS.attributes.MODE, 'range');
      expect(this.context.component.mode).toBe('range');
    });

    it('should default to show header when the show-header attribute is not set', function(this: ITestContext) {
      expect(this.context.component.showHeader).toBeTrue();
    });

    it('should disable show header when the show-header attribute is set to false', function(this: ITestContext) {
      this.context.component.setAttribute(CALENDAR_CONSTANTS.attributes.SHOW_HEADER, 'false');
      expect(this.context.component.showHeader).toBeFalse();
    });

    it('should enable show header when show-header attribute is set to true', function(this: ITestContext) {
      this.context.component.showHeader = false;
      this.context.component.setAttribute(CALENDAR_CONSTANTS.attributes.SHOW_HEADER, 'true');
      expect(this.context.component.showHeader).toBeTrue();
    });

    it('should default to single mode when the mode attribute is not set', function(this: ITestContext) {
      expect(this.context.component.mode).toBe('single');
    });

    it('should enter multiple mode when the mode attribute is set to multiple', function(this: ITestContext) {
      this.context.component.setAttribute(CALENDAR_CONSTANTS.attributes.MODE, 'multiple');
      expect(this.context.component.mode).toBe('multiple');
    });

    it('should enter range mode when the mode attribute is set to range', function(this: ITestContext) {
      this.context.component.setAttribute(CALENDAR_CONSTANTS.attributes.MODE, 'range');
      expect(this.context.component.mode).toBe('range');
    });

    it('should be readonly when the reaonly attribute is set', function(this: ITestContext) {
      this.context.component.setAttribute(CALENDAR_CONSTANTS.attributes.READONLY, '');
      expect(this.context.component.readonly).toBeTrue();
    });

    it('should contain the events that are set by array', function(this: ITestContext) {
      const events: ICalendarEvent[] = [{date: new Date(), label: 'Test event', color: 'blue'}];
      this.context.component.events = events;
      expect(this.context.component.events).toEqual(events);
    });

    it('should add events to dates when eventsCallback is set and return a single event', function(this: ITestContext) {
      const eventsCallback = (date: Date) => {
        return {date, label: 'Test event', color: 'blue'};
      };
      this.context.component.eventBuilder = eventsCallback;
      expect(getFirstDate(this.context.component).querySelector(`.${CALENDAR_CONSTANTS.classes.EVENT}`)).toBeDefined();
    });

    it('should add events to dates when eventsCallback is set and return an array of events', function(this: ITestContext) {
      const eventsCallback = (date: Date) => {
        return [{date, label: 'Test event', color: 'blue'}];
      };
      this.context.component.eventBuilder = eventsCallback;
      expect(getFirstDate(this.context.component).querySelector(`.${CALENDAR_CONSTANTS.classes.EVENT}`)).toBeDefined();
    });

    it('should add no events when eventsCallback is set and returns no events', function(this: ITestContext) {
      const eventsCallback = (date: Date) => {
        return null;
      };
      this.context.component.eventBuilder = eventsCallback;
      expect(getFirstDate(this.context.component).querySelectorAll(`.${CALENDAR_CONSTANTS.classes.EVENT}`).length).toBe(0);
    });

    it('should set the active date when setActiveDate is called', function(this: ITestContext) {
      const today = new Date();
      this.context.component.setActiveDate(today);
      const todayCell = getDateGrid(this.context.component).querySelector(`.${CALENDAR_CONSTANTS.classes.DATE_TODAY}`);
      expect(todayCell && todayCell.getAttribute('tabindex')).toBe('0');
    });

    it('should return the active date', function(this: ITestContext) {
      const today = new Date();
      this.context.component.setActiveDate(today);
      const activeDate = this.context.component.activeDate;
      expect(isSameDate(today, activeDate)).toBeTrue();
    });
  });

  describe('events', function(this: ITestContext) {
    it('should update selected dates when a date is clicked', function(this: ITestContext) {
      getFirstDate(this.context.component).click();

      // I have to grab this again to see the updated classlist?
      const firstDate = getFirstDate(this.context.component);

      expect(this.context.component.value).not.toBeNull();
      expect(firstDate!.classList.contains(CALENDAR_CONSTANTS.classes.DATE_SELECTED)).toBeTrue();
    });

    it('should add the correct date to selected dates when a date is clicked', function(this: ITestContext) {
      const firstDate = getFirstDate(this.context.component);
      const firstDateValue = firstDate!.innerText;
      firstDate.click();

      expect(this.context.component.value instanceof Date).toBe(true);
      expect((<Date>this.context.component.value).getDate()).toBe(+firstDateValue!);
    });

    it('should remove the correct date from selected dates when a date is clicked', function(this: ITestContext) {
      const firstDate = getFirstDate(this.context.component);
      firstDate.click();
      firstDate.click();

      expect(this.context.component.value).toBeNull();
    });

    it('should remove the correct date from selected dates when a date is clicked and multiselect is enabled', function(this: ITestContext) {
      this.context.component.mode = 'multiple';
      const firstDate = getFirstDate(this.context.component);
      
      firstDate.click();
      firstDate.click();

      expect(this.context.component.value).toEqual([]);
    });

    it('should select the previous month when the left arrow button is clicked', function(this: ITestContext) {
      let startMonth = this.context.component.month;

      getPreviousButton(this.context.component).click();

      expect(this.context.component.month).toBe((startMonth + 12 - 1) % 12);
    });

    it('should select the next month when the right arrow button is clicked', function(this: ITestContext) {
      let startMonth = this.context.component.month;

      getNextButton(this.context.component).click();

      expect(this.context.component.month).toBe((startMonth + 1) % 12);
    });

    it('should select December if the left arrow button is clicked and January is selected', function(this: ITestContext) {
      this.context.component.month = 0;

      getPreviousButton(this.context.component).click();

      expect(this.context.component.month).toBe(11);
    });

    it('should select January if the right arrow button is clicked and December is selected', function(this: ITestContext) {
      this.context.component.month = 11;

      getNextButton(this.context.component).click();

      expect(this.context.component.month).toBe(0);
    });

    it('should show the month picker when the month button is clicked', function(this: ITestContext) {
      getMonthButton(this.context.component).click();

      expect(getMenu(this.context.component).hasAttribute('hidden')).toBeFalse();
    });

    it('should show the year picker when the year button is clicked', function(this: ITestContext) {
      getYearButton(this.context.component).click();

      expect(getMenu(this.context.component).hasAttribute('hidden')).toBeFalse();
    });

    it('should show the date view when the menu is closed', async function(this: ITestContext) {
      const yearButton = getYearButton(this.context.component);
      yearButton.click();
      await tick();
      yearButton.click();
      await timer(300);

      expect(getMenu(this.context.component).hasAttribute('hidden')).toBeTrue();
    });

    it('should call the dateSelectCallback when a date is selected', function(this: ITestContext) {
      const spy = jasmine.createSpy('Date select');
      this.context.component.dateSelectCallback = spy;

      getFirstDate(this.context.component).click();

      expect(spy).toHaveBeenCalled();
    });

    it('should allow date selection if dateSelectCallback is set and returns true', async function(this: ITestContext) {
      this.context.component.dateSelectCallback = () => true;

      getFirstDate(this.context.component).click();
      await timer();

      const firstDate = getFirstDate(this.context.component);
      expect(firstDate.classList.contains(CALENDAR_CONSTANTS.classes.DATE_SELECTED)).toBeTrue();
    });

    it('should cancel date selection if dateSelectCallback is set and returns false', async function(this: ITestContext) {
      this.context.component.dateSelectCallback = () => false;

      getFirstDate(this.context.component).click();
      await timer();

      expect(this.context.component.value).toBeNull();
    });

    it('should emit an event when a date is selected', function(this: ITestContext) {
      const spy = jasmine.createSpy('Date event');
      this.context.component.addEventListener(CALENDAR_CONSTANTS.events.DATE_SELECT, spy);

      getFirstDate(this.context.component).click();

      expect(spy).toHaveBeenCalled();
    });

    it('should allow date select events to be cancelled', function(this: ITestContext) {
      this.context.component.addEventListener(CALENDAR_CONSTANTS.events.DATE_SELECT, e => {
        e.preventDefault();
      });

      getFirstDate(this.context.component).click();

      expect(this.context.component.value).toBeNull();
    });

    it('should prevent focus via attribute', function(this: ITestContext) {
      this.context.component.setAttribute(CALENDAR_CONSTANTS.attributes.PREVENT_FOCUS, '');

      expect(this.context.component.preventFocus).toBe(true);
    });

    it('should prevent focus when clicking on internal elements', async function(this: ITestContext) {
      const mousedownSpy = spyOn(this.context.component['_foundation'], '_preventFocusListener' as any).and.callThrough();
      this.context.component.preventFocus = true;
      await tick();
      getRootElement(this.context.component).dispatchEvent(new Event('mousedown', { bubbles: true }));

      expect(this.context.component.preventFocus).toBe(true);
      expect(mousedownSpy).toHaveBeenCalledTimes(1);
    });

    it('should toggle prevent focus', async function(this: ITestContext) {
      const mousedownSpy = spyOn(this.context.component['_foundation'], '_preventFocusListener' as any).and.callThrough();
      this.context.component.preventFocus = true;
      await tick();

      this.context.component.preventFocus = false;
      await tick();
      getRootElement(this.context.component).dispatchEvent(new Event('mousedown', { bubbles: true }));

      expect(this.context.component.preventFocus).toBe(false);
      expect(mousedownSpy).toHaveBeenCalledTimes(0);
    });

    it('should re-render necessary components when layout is called', function(this: ITestContext) {
      const headerSpy = spyOn(this.context.component['_foundation'], '_applyShowHeader' as any).and.callThrough();
      this.context.component.layout();

      expect(headerSpy).toHaveBeenCalledTimes(1);
    });

    it('should set active day when connecting if prevent focus is used', function(this: ITestContext) {
      const context = setupPartialTestContext();
      context.component.preventFocus = true;
      context.appendToFixture(); // Causes connectedCallback to run
      const activeDay = getActiveDay(context.component);

      expect(activeDay).not.toBeNull();
      context.destroy();
    });

    it('should emit event with type date when a date is selected', function(this: ITestContext) {
      this.context.component.addEventListener(CALENDAR_CONSTANTS.events.DATE_SELECT, (e: CustomEvent<ICalendarDateSelectEventData>) => {
        expect(e.detail.type).toBe('date');
      });
      getFirstDate(this.context.component).click();
    });

    it('should emit event with type month when a month is selected', function(this: ITestContext) {
      this.context.component.addEventListener(CALENDAR_CONSTANTS.events.DATE_SELECT, (e: CustomEvent<ICalendarDateSelectEventData>) => {
        expect(e.detail.type).toBe('month');
      });
      getMonthButton(this.context.component).click();
      const menu = getMenu(this.context.component).shadowRoot as ShadowRoot;
      (menu.querySelector(CALENDAR_MENU_CONSTANTS.selectors.ITEM) as HTMLElement)?.click();
    });

    it('should emit event with type year when a year is selected', function(this: ITestContext) {
      this.context.component.addEventListener(CALENDAR_CONSTANTS.events.DATE_SELECT, (e: CustomEvent<ICalendarDateSelectEventData>) => {
        expect(e.detail.type).toBe('year');
      });
      getYearButton(this.context.component).click();
      const menu = getMenu(this.context.component).shadowRoot as ShadowRoot;
      (menu.querySelector(CALENDAR_MENU_CONSTANTS.selectors.ITEM) as HTMLElement)?.click();
    });

    it('should emit event when active date changes via handling external key events and prevent focus is enabled', function(this: ITestContext) {
      const activeChangeSpy = jasmine.createSpy('change spy');
      this.context.component.addEventListener(CALENDAR_CONSTANTS.events.FOCUS_CHANGE, activeChangeSpy);
      this.context.component.preventFocus = true;
      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

      expect(activeChangeSpy).toHaveBeenCalledTimes(5);
    });

    it('should emit event when active date changes via handling external key events and prevent focus is disabled', function(this: ITestContext) {
      const activeChangeSpy = jasmine.createSpy('change spy');
      this.context.component.addEventListener(CALENDAR_CONSTANTS.events.FOCUS_CHANGE, activeChangeSpy);
      getActiveDay(this.context.component)?.focus();
      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

      expect(activeChangeSpy).toHaveBeenCalledTimes(4);
    });

    it('should set active day to first day of month when pressing home and shift keys', function(this: ITestContext) {
      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'Home', shiftKey: true }));
      const activeDay = getActiveDay(this.context.component);

      expect(activeDay).not.toBeNull();
      expect(activeDay!.textContent).toBe('1');

    });

    it('should set active day to last day of month when pressing end and shift keys', function(this: ITestContext) {
      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'End', shiftKey: true }));
      const activeDay = getActiveDay(this.context.component);
      const lastDayOfMonth = getLastDayOfMonth();

      expect(activeDay).not.toBeNull();
      expect(activeDay!.textContent).toBe(lastDayOfMonth);
    });

    it('should go to previous month via arrow up key', function(this: ITestContext) {
      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'Home', shiftKey: true }));
      const previousMonth = this.context.component.month;

      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

      expect(this.context.component.month).not.toBe(previousMonth);

      if (previousMonth === 0) {
        expect(this.context.component.month).toBeGreaterThan(previousMonth);
      } else {
        expect(this.context.component.month).toBeLessThan(previousMonth);
      }
    });

    it('should go to previous month via arrow left key', function(this: ITestContext) {
      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'Home', shiftKey: true }));
      const previousMonth = this.context.component.month;

      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      expect(this.context.component.month).toBe((previousMonth + 12 - 1) % 12);
    });

    it('should go to next month via arrow down key', function(this: ITestContext) {
      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'End', shiftKey: true }));
      const previousMonth = this.context.component.month;
      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      expect(this.context.component.month).toEqual((previousMonth + 1) % 12);
    });

    it('should go to next month via arrow right key', function(this: ITestContext) {
      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'End', shiftKey: true }));
      const previousMonth = this.context.component.month;

      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      expect(this.context.component.month).toBe((previousMonth + 1) % 12);
    });

    it('should skip over disabled dates to go to next month', async function(this: ITestContext) {
      const date = new Date('01/01/2020');
      this.context.component.value = date;
      this.context.component.goToDate(date);
      this.context.component.disabledDates = [new Date('01/31/2020')];
      
      await tick();
      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'End', shiftKey: true }));
      await tick();
      const previousMonth = this.context.component.month;
      await tick();
      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      await tick();

      expect(this.context.component.month).toBe((previousMonth + 1) % 12);
    });

    it('should disallow navigating to previous month if disabled', function(this: ITestContext) {
      this.context.component.min = new Date();
      const previousMonth = this.context.component.month;

      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

      expect(this.context.component.month).toBe(previousMonth);
    });

    it('should disallow navigating to next month if disabled', function(this: ITestContext) {
      this.context.component.max = new Date();
      const previousMonth = this.context.component.month;

      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      expect(this.context.component.month).toBe(previousMonth);
    });

    it('should select currently active date if enter key is pressed', function(this: ITestContext) {
      expect(this.context.component.value).toBeNull();

      this.context.component.handleKey(new KeyboardEvent('keydown', { key: 'Enter' }));
      const expectedDate = new Date();
      expect((this.context.component.value as Date).toDateString()).toEqual(expectedDate.toDateString());
    });

    it(`should update month button text when a new month is selected`, function(this: ITestContext) {
      getMonthButton(this.context.component).click();
      const menu = getMenu(this.context.component).shadowRoot as ShadowRoot;
      (menu.querySelector(CALENDAR_MENU_CONSTANTS.selectors.ITEM) as HTMLElement)?.click();
      expect(getMonthButton(this.context.component).innerText).toBe('January');
    });
  });

  function setupTestContext(): ITestCalendarContext {
    const fixture = document.createElement('div');
    fixture.id = 'calendar-test-fixture';
    const component = document.createElement(CALENDAR_CONSTANTS.elementName);
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      destroy: () => removeElement(fixture)
    };
  }

  function setupPartialTestContext(): ITestPartialCalendarContext {
    const fixture = document.createElement('div');
    fixture.id = 'calendar-test-fixture';
    const component = document.createElement(CALENDAR_CONSTANTS.elementName);
    document.body.appendChild(fixture);
    return {
      component,
      appendToFixture: () => fixture.appendChild(component),
      destroy: () => removeElement(fixture)
    };
  }

  function getRootElement(component: ICalendarComponent): HTMLElement {
    return getShadowElement(component, CALENDAR_CONSTANTS.selectors.CALENDAR);
  }

  function getMonthButton(component: ICalendarComponent): HTMLButtonElement {
    const rootElement = getRootElement(component);
    return rootElement.querySelector(CALENDAR_CONSTANTS.selectors.MONTH_BUTTON) as HTMLButtonElement;
  }

  function getYearButton(component: ICalendarComponent): HTMLButtonElement {
    const rootElement = getRootElement(component);
    return rootElement.querySelector(CALENDAR_CONSTANTS.selectors.YEAR_BUTTON) as HTMLButtonElement;
  }

  function getPreviousButton(component: ICalendarComponent): HTMLButtonElement {
    const rootElement = getRootElement(component);
    return rootElement.querySelector(CALENDAR_CONSTANTS.selectors.PREVIOUS_BUTTON) as HTMLButtonElement;
  }

  function getNextButton(component: ICalendarComponent): HTMLButtonElement {
    const rootElement = getRootElement(component);
    return rootElement.querySelector(CALENDAR_CONSTANTS.selectors.NEXT_BUTTON) as HTMLButtonElement;
  }

  function getDateGrid(component: ICalendarComponent): HTMLElement {
    const rootElement = getRootElement(component);
    return rootElement.querySelector(CALENDAR_CONSTANTS.selectors.DATE_GRID) as HTMLElement;
  }

  function getDateElement(component: ICalendarComponent, date: Date): HTMLElement | null {
    return getDateGrid(component).querySelector(`#${getDateId(date)}`);
  }

  function getMenu(component: ICalendarComponent): HTMLElement {
    const rootElement = getRootElement(component);
    return rootElement.querySelector(CALENDAR_MENU_CONSTANTS.elementName) as HTMLElement;
  }

  function getFirstDate(component: ICalendarComponent): HTMLElement {
    const dates = getDateGrid(component);
    return dates.firstElementChild!.children[6] as HTMLElement;
  }

  function getTodayAndTomorrow(): Date[] {
    const someDates = [new Date(), new Date()];
    someDates[1].setDate(someDates[0].getDate() + 1);
    return someDates;
  }

  function getActiveDay(component: ICalendarComponent): HTMLElement | null {
    return getDateGrid(component).querySelector('[tabindex="0"]') ?? getDateGrid(component).querySelector('.forge-calendar__date:has(forge-focus-indicator[active])');
  }

  function getLastDayOfMonth(): string {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate().toString();
  }

});
