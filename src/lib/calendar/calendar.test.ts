import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { task, frame } from '../core/utils/utils';
import { isSameDate } from '../core/utils/date-utils';
import { spy } from 'sinon';
import { getDateId } from './calendar-dom-utils';
import { ICalendarComponent } from './calendar';
import { ICalendarCore } from './calendar-core';
import { CALENDAR_CONSTANTS, ICalendarEvent, ICalendarDateSelectEventData } from './calendar-constants';
import { CALENDAR_MENU_CONSTANTS } from './calendar-menu';

import './calendar';

type CalendarComponentCoreInternal = ICalendarCore & {
  _preventFocusListener: (e: MouseEvent) => void;
  _applyShowHeader: () => void;
};

type CalendarComponentInternal = ICalendarComponent & {
  _core: CalendarComponentCoreInternal;
};

class CalendarHarness {
  constructor(public component: CalendarComponentInternal) {}

  public get rootElement(): HTMLElement {
    return getShadowElement(this.component, CALENDAR_CONSTANTS.selectors.CALENDAR);
  }

  public get monthButton(): HTMLButtonElement {
    return this.rootElement.querySelector(CALENDAR_CONSTANTS.selectors.MONTH_BUTTON) as HTMLButtonElement;
  }

  public get yearButton(): HTMLButtonElement {
    return this.rootElement.querySelector(CALENDAR_CONSTANTS.selectors.YEAR_BUTTON) as HTMLButtonElement;
  }

  public get previousButton(): HTMLButtonElement {
    return this.rootElement.querySelector(CALENDAR_CONSTANTS.selectors.PREVIOUS_BUTTON) as HTMLButtonElement;
  }

  public get nextButton(): HTMLButtonElement {
    return this.rootElement.querySelector(CALENDAR_CONSTANTS.selectors.NEXT_BUTTON) as HTMLButtonElement;
  }

  public get dateGrid(): HTMLElement {
    return this.rootElement.querySelector(CALENDAR_CONSTANTS.selectors.DATE_GRID) as HTMLElement;
  }

  public get menu(): HTMLElement {
    return this.rootElement.querySelector(CALENDAR_MENU_CONSTANTS.elementName) as HTMLElement;
  }

  public get firstDate(): HTMLElement {
    const dates = this.dateGrid;
    return dates.firstElementChild!.children[6] as HTMLElement;
  }

  public get activeDay(): HTMLElement | null {
    return this.dateGrid.querySelector('[tabindex="0"]') ?? this.dateGrid.querySelector('.forge-calendar__date:has(forge-focus-indicator[active])');
  }

  public getDateElement(date: Date): HTMLElement | null {
    return this.dateGrid.querySelector(`#${getDateId(date)}`);
  }

  public getTodayAndTomorrow(): Date[] {
    const someDates = [new Date(), new Date()];
    someDates[1].setDate(someDates[0].getDate() + 1);
    return someDates;
  }

  public getLastDayOfMonth(): string {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate().toString();
  }

  public destroy(): void {
    this.component.remove();
  }
}

describe('Calendar', () => {
  it('should have shadow root', async () => {
    const harness = await createFixture();

    expect(harness.component.shadowRoot).to.not.be.null;
  });

  it('should contain the month button', async () => {
    const harness = await createFixture();

    expect(harness.monthButton).to.not.be.null;
  });

  it('should contain the year button', async () => {
    const harness = await createFixture();

    expect(harness.yearButton).to.not.be.null;
  });

  it('should contain the previous button', async () => {
    const harness = await createFixture();

    expect(harness.previousButton).to.not.be.null;
  });

  it('should contain the next button', async () => {
    const harness = await createFixture();

    expect(harness.nextButton).to.not.be.null;
  });

  it('should show this year by default', async () => {
    const harness = await createFixture();

    expect(harness.component.year).to.equal(new Date().getFullYear());
  });

  it('should show this month by default', async () => {
    const harness = await createFixture();

    expect(harness.component.month).to.equal(new Date().getMonth());
  });

  it('should highlight today by default', async () => {
    const harness = await createFixture();

    expect(harness.component.showToday).to.be.true;
  });

  it('should open in single mode by default', async () => {
    const harness = await createFixture();

    expect(harness.component.mode).to.equal('single');
  });

  it('should initialize with no dates selected', async () => {
    const harness = await createFixture();

    expect(harness.component.value).to.be.null;
  });

  it('should initialize with 42 dates in the date view', async () => {
    const harness = await createFixture();
    const dates = harness.dateGrid;

    expect(dates.childElementCount).to.equal(6);
    const rows = Array.from(dates.children);
    rows.forEach((row: Element) => {
      expect(row.childElementCount).to.equal(7);
    });
  });

  it('should allow value to be set', async () => {
    const harness = await createFixture();

    harness.component.value = [new Date()];

    expect(harness.component.value).to.not.be.null;
  });

  it('should allow showToday to be set to false', async () => {
    const harness = await createFixture();

    harness.component.showToday = false;

    expect(harness.component.showToday).to.be.false;
  });

  it('should allow showToday to be set to true', async () => {
    const harness = await createFixture();

    harness.component.showToday = false;
    harness.component.showToday = true;

    expect(harness.component.showToday).to.be.true;
  });

  it('should select the correct date when selectDate is called', async () => {
    const harness = await createFixture();
    const date = new Date();

    harness.component.selectDate(date);

    expect(harness.component.value).to.deep.equal(date);
  });

  it('should do nothing if selectDate is called with an already selected date', async () => {
    const harness = await createFixture();
    const date = new Date();

    harness.component.selectDate(date);
    harness.component.selectDate(date);

    expect((harness.component.value as Date).toDateString()).to.equal(date.toDateString());
  });

  it('should remove the correct date when deselectDate is called', async () => {
    const harness = await createFixture();
    const date = new Date();

    harness.component.selectDate(date);
    harness.component.deselectDate(date);

    expect(harness.component.value).to.be.null;
  });

  it('should select the correct date when toggle date is called with a currently non-selected date', async () => {
    const harness = await createFixture();
    const date = new Date();

    harness.component.toggleDate(date);

    expect(harness.component.value).to.deep.equal(date);
  });

  it('should deselect the correct date when toggle date is called with a currently selected date', async () => {
    const harness = await createFixture();
    const date = new Date();

    harness.component.selectDate(date);
    harness.component.toggleDate(date);

    expect(harness.component.value).to.be.null;
  });

  it('should allow multiple dates to be selected when mode is multiple', async () => {
    const harness = await createFixture();

    harness.component.mode = 'multiple';
    const someDates = harness.getTodayAndTomorrow();
    harness.component.selectDate(someDates[0]);
    harness.component.selectDate(someDates[1]);

    expect((harness.component.value as Date[]).length).to.equal(2);
  });

  it('should remove a selected date when mode is multiple is enabled and removeDate is called with a selected date', async () => {
    const harness = await createFixture();

    harness.component.mode = 'multiple';
    const someDates = harness.getTodayAndTomorrow();
    harness.component.selectDate(someDates[0]);
    harness.component.deselectDate(someDates[0]);

    expect(harness.component.value).to.deep.equal([]);
  });

  it('should remove a selected date when mode is multiple is enabled and toggleDate is called with a selected date', async () => {
    const harness = await createFixture();

    harness.component.mode = 'multiple';
    const someDates = harness.getTodayAndTomorrow();
    harness.component.selectDate(someDates[0]);
    harness.component.toggleDate(someDates[0]);

    expect(harness.component.value).to.deep.equal([]);
  });

  it('should clear selected dates if set to null', async () => {
    const harness = await createFixture();

    harness.component.value = new Date();
    harness.component.value = null;

    expect(harness.component.value).to.be.null;
  });

  it('should set disabled dates when a single date is provided', async () => {
    const harness = await createFixture();
    const date = new Date();

    harness.component.disabledDates = date;

    expect(harness.component.disabledDates).to.be.ok;
  });

  it('should set disabled dates when an array of dates is provided', async () => {
    const harness = await createFixture();
    const dateArray = [new Date('12/31/1999'), new Date('1/1/2000')];

    harness.component.disabledDates = dateArray;

    expect(harness.component.disabledDates).to.deep.equal(dateArray);
  });

  it('should clear disabled dates if set to null', async () => {
    const harness = await createFixture();

    harness.component.disabledDates = new Date();
    harness.component.disabledDates = null;

    expect(harness.component.disabledDates).to.be.null;
  });

  it('should disallow a disabled date to be selected through the ui', async () => {
    const harness = await createFixture();
    const date = new Date('12/25/2010');

    harness.component.disabledDates = new Date('12/25/2010');
    harness.getDateElement(date)?.click();

    expect(harness.component.value).to.be.null;
  });

  it('should set the month to that of the min date if min date is set later than the current month', async () => {
    const harness = await createFixture();

    harness.component.month = 1;
    harness.component.year = 2010;
    harness.component.min = new Date('3/10/2010');

    expect(harness.component.month).to.equal(2);
  });

  it('should set the year to that of the min date if min date is set later than the current year', async () => {
    const harness = await createFixture();

    harness.component.month = 2;
    harness.component.year = 2009;
    harness.component.min = new Date('3/10/2010');

    expect(harness.component.year).to.equal(2010);
  });

  it('should set the month to that of the max date if max date is set earlier than the current month', async () => {
    const harness = await createFixture();

    harness.component.month = 5;
    harness.component.year = 2010;
    harness.component.max = new Date('3/10/2010');

    expect(harness.component.month).to.equal(2);
  });

  it('should set the year to that of the max date if max date is set earlier than the current year', async () => {
    const harness = await createFixture();

    harness.component.year = 2009;
    harness.component.max = new Date('3/10/2008');

    expect(harness.component.year).to.equal(2008);
  });

  it('should show an additional events icon when more than three events are set on a date', async () => {
    const harness = await createFixture();
    const eventsCallback = (date: Date): ICalendarEvent[] => [
      { date, label: 'Test event', color: 'blue' },
      { date, label: 'Test event', color: 'light-green' },
      { date, label: 'Test event', color: 'cyan' },
      { date, label: 'Test event', color: 'teal' }
    ];

    harness.component.eventBuilder = eventsCallback;

    expect(harness.firstDate.querySelector(`.${CALENDAR_CONSTANTS.classes.EVENT_OVERFLOW}`)).to.not.be.null;
  });

  it('should call dateBuilder when it is set', async () => {
    const harness = await createFixture();
    const dateBuilderSpy = spy();

    harness.component.dateBuilder = (date, element) => {
      dateBuilderSpy();
      return element;
    };

    expect(dateBuilderSpy).to.have.been.called;
  });

  describe('attributes', () => {
    it('should update to show today when the showToday attribute is set', async () => {
      const harness = await createFixture();

      harness.component.setAttribute(CALENDAR_CONSTANTS.attributes.SHOW_TODAY, '');

      expect(harness.component.showToday).to.be.true;
    });

    it('should update to the specified month when the month attribute is set', async () => {
      const harness = await createFixture();

      harness.component.setAttribute(CALENDAR_CONSTANTS.attributes.MONTH, '6');

      expect(harness.component.month).to.equal(6);
    });

    it('should update to the specified year when the year attribute is set', async () => {
      const harness = await createFixture();

      harness.component.setAttribute(CALENDAR_CONSTANTS.attributes.YEAR, '1970');

      expect(harness.component.year).to.equal(1970);
    });

    it('should enable multiselect when the mode attribute is set to multiple', async () => {
      const harness = await createFixture();

      harness.component.setAttribute(CALENDAR_CONSTANTS.attributes.MODE, 'multiple');

      expect(harness.component.mode).to.equal('multiple');
    });

    it('should leave one month selected if multiple months are selected and multiselect is disabled', async () => {
      const harness = await createFixture();

      harness.component.mode = 'multiple';
      const someDates = harness.getTodayAndTomorrow();
      harness.component.value = someDates;
      harness.component.mode = 'single';

      expect(harness.component.value).to.not.be.null;
    });

    it('should disable the date before the minimum date set', async () => {
      const harness = await createFixture();
      const date = new Date('1/2/2000');
      const previous = new Date(date);
      previous.setDate(previous.getDate() - 1);

      harness.component.min = date;
      harness.component.goToDate(date);
      (harness.getDateElement(previous) as any)?.click();

      expect(harness.component.value).to.be.null;
    });

    it('should disable the date after the maximum date set', async () => {
      const harness = await createFixture();
      const date = new Date('1/2/2000');
      const next = new Date(date);
      next.setDate(next.getDate() + 1);

      harness.component.max = date;
      harness.component.goToDate(date);
      (harness.getDateElement(next) as any)?.click();

      expect(harness.component.value).to.be.null;
    });

    it('should contain the correct disabled days of the week', async () => {
      const harness = await createFixture();
      const disabledDaysOfWeek = [0, 1];

      harness.component.disabledDaysOfWeek = disabledDaysOfWeek;

      expect(harness.component.disabledDaysOfWeek).to.deep.equal(disabledDaysOfWeek);
    });

    it('should disable sundays when disableDayOfWeek is 0', async () => {
      const harness = await createFixture();

      harness.component.disabledDaysOfWeek = [0];
      const allSundayDates = Array.from(harness.rootElement.querySelectorAll('tbody tr'))
        .map(tr => tr.querySelector('td'))
        .filter(td => td!.hasAttribute('data-date'));
      const thatAllSundaysAreDisabled = allSundayDates.every(d => d!.getAttribute('aria-disabled') === 'true');

      expect(thatAllSundaysAreDisabled).to.be.true;
    });

    it('should enable range selection when the mode attribute is set', async () => {
      const harness = await createFixture();

      harness.component.setAttribute(CALENDAR_CONSTANTS.attributes.MODE, 'range');

      expect(harness.component.mode).to.equal('range');
    });

    it('should default to show header when the show-header attribute is not set', async () => {
      const harness = await createFixture();

      expect(harness.component.showHeader).to.be.true;
    });

    it('should disable show header when the show-header attribute is set to false', async () => {
      const harness = await createFixture();

      harness.component.setAttribute(CALENDAR_CONSTANTS.attributes.SHOW_HEADER, 'false');

      expect(harness.component.showHeader).to.be.false;
    });

    it('should enable show header when show-header attribute is set to true', async () => {
      const harness = await createFixture();

      harness.component.showHeader = false;
      harness.component.setAttribute(CALENDAR_CONSTANTS.attributes.SHOW_HEADER, 'true');

      expect(harness.component.showHeader).to.be.true;
    });

    it('should default to single mode when the mode attribute is not set', async () => {
      const harness = await createFixture();

      expect(harness.component.mode).to.equal('single');
    });

    it('should enter multiple mode when the mode attribute is set to multiple', async () => {
      const harness = await createFixture();

      harness.component.setAttribute(CALENDAR_CONSTANTS.attributes.MODE, 'multiple');

      expect(harness.component.mode).to.equal('multiple');
    });

    it('should enter range mode when the mode attribute is set to range', async () => {
      const harness = await createFixture();

      harness.component.setAttribute(CALENDAR_CONSTANTS.attributes.MODE, 'range');

      expect(harness.component.mode).to.equal('range');
    });

    it('should be readonly when the readonly attribute is set', async () => {
      const harness = await createFixture();

      harness.component.setAttribute(CALENDAR_CONSTANTS.attributes.READONLY, '');

      expect(harness.component.readonly).to.be.true;
    });

    it('should contain the events that are set by array', async () => {
      const harness = await createFixture();
      const events: ICalendarEvent[] = [{ date: new Date(), label: 'Test event', color: 'blue' }];

      harness.component.events = events;

      expect(harness.component.events).to.deep.equal(events);
    });

    it('should add events to dates when eventsCallback is set and return a single event', async () => {
      const harness = await createFixture();
      const eventsCallback = (date: Date): ICalendarEvent => ({ date, label: 'Test event', color: 'blue' });

      harness.component.eventBuilder = eventsCallback;

      expect(harness.firstDate.querySelector(`.${CALENDAR_CONSTANTS.classes.EVENT}`)).to.not.be.null;
    });

    it('should add events to dates when eventsCallback is set and return an array of events', async () => {
      const harness = await createFixture();
      const eventsCallback = (date: Date): ICalendarEvent[] => [{ date, label: 'Test event', color: 'blue' }];

      harness.component.eventBuilder = eventsCallback;

      expect(harness.firstDate.querySelector(`.${CALENDAR_CONSTANTS.classes.EVENT}`)).to.not.be.null;
    });

    it('should add no events when eventsCallback is set and returns no events', async () => {
      const harness = await createFixture();
      const eventsCallback = (date: Date): null => null;

      harness.component.eventBuilder = eventsCallback;

      expect(harness.firstDate.querySelectorAll(`.${CALENDAR_CONSTANTS.classes.EVENT}`).length).to.equal(0);
    });

    it('should set the active date when setActiveDate is called', async () => {
      const harness = await createFixture();
      const today = new Date();

      harness.component.setActiveDate(today);
      const todayCell = harness.dateGrid.querySelector(`.${CALENDAR_CONSTANTS.classes.DATE_TODAY}`);

      expect(todayCell && todayCell.getAttribute('tabindex')).to.equal('0');
    });

    it('should return the active date', async () => {
      const harness = await createFixture();
      const today = new Date();

      harness.component.setActiveDate(today);
      const activeDate = harness.component.activeDate;

      expect(isSameDate(today, activeDate)).to.be.true;
    });
  });

  describe('events', () => {
    it('should update selected dates when a date is clicked', async () => {
      const harness = await createFixture();

      harness.firstDate.click();

      // I have to grab this again to see the updated classlist?
      const firstDate = harness.firstDate;

      expect(harness.component.value).to.not.be.null;
      expect(firstDate.classList.contains(CALENDAR_CONSTANTS.classes.DATE_SELECTED)).to.be.true;
    });

    it('should add the correct date to selected dates when a date is clicked', async () => {
      const harness = await createFixture();
      const firstDate = harness.firstDate;
      const firstDateValue = firstDate.innerText;

      firstDate.click();

      expect(harness.component.value instanceof Date).to.be.true;
      expect((harness.component.value as Date).getDate()).to.equal(+firstDateValue);
    });

    it('should remove the correct date from selected dates when a date is clicked', async () => {
      const harness = await createFixture();
      const firstDate = harness.firstDate;

      firstDate.click();
      firstDate.click();

      expect(harness.component.value).to.be.null;
    });

    it('should remove the correct date from selected dates when a date is clicked and multiselect is enabled', async () => {
      const harness = await createFixture();

      harness.component.mode = 'multiple';
      const firstDate = harness.firstDate;

      firstDate.click();
      firstDate.click();

      expect(harness.component.value).to.deep.equal([]);
    });

    it('should select the previous month when the left arrow button is clicked', async () => {
      const harness = await createFixture();
      const startMonth = harness.component.month;

      harness.previousButton.click();

      expect(harness.component.month).to.equal((startMonth + 12 - 1) % 12);
    });

    it('should select the next month when the right arrow button is clicked', async () => {
      const harness = await createFixture();
      const startMonth = harness.component.month;

      harness.nextButton.click();

      expect(harness.component.month).to.equal((startMonth + 1) % 12);
    });

    it('should select December if the left arrow button is clicked and January is selected', async () => {
      const harness = await createFixture();

      harness.component.month = 0;
      harness.previousButton.click();

      expect(harness.component.month).to.equal(11);
    });

    it('should select January if the right arrow button is clicked and December is selected', async () => {
      const harness = await createFixture();

      harness.component.month = 11;
      harness.nextButton.click();

      expect(harness.component.month).to.equal(0);
    });

    it('should show the month picker when the month button is clicked', async () => {
      const harness = await createFixture();

      harness.monthButton.click();

      expect(harness.menu.hasAttribute('hidden')).to.be.false;
    });

    it('should show the year picker when the year button is clicked', async () => {
      const harness = await createFixture();

      harness.yearButton.click();

      expect(harness.menu.hasAttribute('hidden')).to.be.false;
    });

    it('should show the date view when the menu is closed', async () => {
      const harness = await createFixture();
      const yearButton = harness.yearButton;

      yearButton.click();
      await frame();
      yearButton.click();
      await task(300);

      expect(harness.menu.hasAttribute('hidden')).to.be.true;
    });

    it('should call the dateSelectCallback when a date is selected', async () => {
      const harness = await createFixture();
      const dateSelectSpy = spy();

      harness.component.dateSelectCallback = dateSelectSpy;
      harness.firstDate.click();

      expect(dateSelectSpy).to.have.been.called;
    });

    it('should allow date selection if dateSelectCallback is set and returns true', async () => {
      const harness = await createFixture();

      harness.component.dateSelectCallback = () => true;
      harness.firstDate.click();
      await task();

      const firstDate = harness.firstDate;
      expect(firstDate.classList.contains(CALENDAR_CONSTANTS.classes.DATE_SELECTED)).to.be.true;
    });

    it('should cancel date selection if dateSelectCallback is set and returns false', async () => {
      const harness = await createFixture();

      harness.component.dateSelectCallback = () => false;
      harness.firstDate.click();
      await task();

      expect(harness.component.value).to.be.null;
    });

    it('should emit an event when a date is selected', async () => {
      const harness = await createFixture();
      const eventSpy = spy();

      harness.component.addEventListener(CALENDAR_CONSTANTS.events.DATE_SELECT, eventSpy);
      harness.firstDate.click();

      expect(eventSpy).to.have.been.called;
    });

    it('should allow date select events to be cancelled', async () => {
      const harness = await createFixture();

      harness.component.addEventListener(CALENDAR_CONSTANTS.events.DATE_SELECT, e => {
        e.preventDefault();
      });
      harness.firstDate.click();

      expect(harness.component.value).to.be.null;
    });

    it('should prevent focus via attribute', async () => {
      const harness = await createFixture();

      harness.component.setAttribute(CALENDAR_CONSTANTS.attributes.PREVENT_FOCUS, '');

      expect(harness.component.preventFocus).to.be.true;
    });

    it('should prevent focus when clicking on internal elements', async () => {
      const harness = await createFixture();
      const mousedownSpy = spy(harness.component['_core'], '_preventFocusListener' as any);

      harness.component.preventFocus = true;
      await frame();
      harness.rootElement.dispatchEvent(new Event('mousedown', { bubbles: true }));

      expect(harness.component.preventFocus).to.be.true;
      expect(mousedownSpy).to.have.been.calledOnce;
    });

    it('should toggle prevent focus', async () => {
      const harness = await createFixture();
      const mousedownSpy = spy(harness.component['_core'], '_preventFocusListener' as any);

      harness.component.preventFocus = true;
      await frame();

      harness.component.preventFocus = false;
      await frame();
      harness.rootElement.dispatchEvent(new Event('mousedown', { bubbles: true }));

      expect(harness.component.preventFocus).to.be.false;
      expect(mousedownSpy).to.not.have.been.called;
    });

    it('should re-render necessary components when layout is called', async () => {
      const harness = await createFixture();
      const headerSpy = spy(harness.component['_core'], '_applyShowHeader' as any);

      harness.component.layout();

      expect(headerSpy).to.have.been.calledOnce;
    });

    it('should set active day when connecting if prevent focus is used', async () => {
      const harness = await createPartialFixture();

      harness.component.preventFocus = true;
      harness.appendToFixture(); // Causes connectedCallback to run
      const activeDay = harness.activeDay;

      expect(activeDay).to.not.be.null;
    });

    it('should emit event with type date when a date is selected', async () => {
      const harness = await createFixture();

      harness.component.addEventListener(CALENDAR_CONSTANTS.events.DATE_SELECT, (e: CustomEvent<ICalendarDateSelectEventData>) => {
        expect(e.detail.type).to.equal('date');
      });
      harness.firstDate.click();
    });

    it('should emit event with type month when a month is selected', async () => {
      const harness = await createFixture();

      harness.component.addEventListener(CALENDAR_CONSTANTS.events.DATE_SELECT, (e: CustomEvent<ICalendarDateSelectEventData>) => {
        expect(e.detail.type).to.equal('month');
      });
      harness.monthButton.click();
      const menu = harness.menu.shadowRoot as ShadowRoot;
      (menu.querySelector(CALENDAR_MENU_CONSTANTS.selectors.ITEM) as HTMLElement)?.click();
    });

    it('should emit event with type year when a year is selected', async () => {
      const harness = await createFixture();

      harness.component.addEventListener(CALENDAR_CONSTANTS.events.DATE_SELECT, (e: CustomEvent<ICalendarDateSelectEventData>) => {
        expect(e.detail.type).to.equal('year');
      });
      harness.yearButton.click();
      const menu = harness.menu.shadowRoot as ShadowRoot;
      (menu.querySelector(CALENDAR_MENU_CONSTANTS.selectors.ITEM) as HTMLElement)?.click();
    });

    it('should emit event when active date changes via handling external key events and prevent focus is enabled', async () => {
      const harness = await createFixture();
      const activeChangeSpy = spy();

      harness.component.addEventListener(CALENDAR_CONSTANTS.events.FOCUS_CHANGE, activeChangeSpy);
      harness.component.preventFocus = true;
      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

      expect(activeChangeSpy).to.have.callCount(5);
    });

    it('should emit event when active date changes via handling external key events and prevent focus is disabled', async () => {
      const harness = await createFixture();
      const activeChangeSpy = spy();

      harness.component.addEventListener(CALENDAR_CONSTANTS.events.FOCUS_CHANGE, activeChangeSpy);
      harness.activeDay?.focus();
      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

      expect(activeChangeSpy).to.have.callCount(4);
    });

    it('should set active day to first day of month when pressing home and shift keys', async () => {
      const harness = await createFixture();

      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'Home', shiftKey: true }));
      const activeDay = harness.activeDay;

      expect(activeDay).to.not.be.null;
      expect(activeDay!.textContent).to.equal('1');
    });

    it('should set active day to last day of month when pressing end and shift keys', async () => {
      const harness = await createFixture();

      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'End', shiftKey: true }));
      const activeDay = harness.activeDay;
      const lastDayOfMonth = harness.getLastDayOfMonth();

      expect(activeDay).to.not.be.null;
      expect(activeDay!.textContent).to.equal(lastDayOfMonth);
    });

    it('should go to previous month via arrow up key', async () => {
      const harness = await createFixture();

      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'Home', shiftKey: true }));
      const previousMonth = harness.component.month;

      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

      expect(harness.component.month).to.not.equal(previousMonth);

      if (previousMonth === 0) {
        expect(harness.component.month).to.be.greaterThan(previousMonth);
      } else {
        expect(harness.component.month).to.be.lessThan(previousMonth);
      }
    });

    it('should go to previous month via arrow left key', async () => {
      const harness = await createFixture();

      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'Home', shiftKey: true }));
      const previousMonth = harness.component.month;

      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

      expect(harness.component.month).to.equal((previousMonth + 12 - 1) % 12);
    });

    it('should go to next month via arrow down key', async () => {
      const harness = await createFixture();

      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'End', shiftKey: true }));
      const previousMonth = harness.component.month;
      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      expect(harness.component.month).to.equal((previousMonth + 1) % 12);
    });

    it('should go to next month via arrow right key', async () => {
      const harness = await createFixture();

      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'End', shiftKey: true }));
      const previousMonth = harness.component.month;

      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      expect(harness.component.month).to.equal((previousMonth + 1) % 12);
    });

    it('should skip over disabled dates to go to next month', async () => {
      const harness = await createFixture();
      const date = new Date('01/01/2020');

      harness.component.value = date;
      harness.component.goToDate(date);
      harness.component.disabledDates = [new Date('01/31/2020')];

      await frame();
      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'End', shiftKey: true }));
      await frame();
      const previousMonth = harness.component.month;
      await frame();
      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      await frame();

      expect(harness.component.month).to.equal((previousMonth + 1) % 12);
    });

    it('should disallow navigating to previous month if disabled', async () => {
      const harness = await createFixture();

      harness.component.min = new Date();
      const previousMonth = harness.component.month;

      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

      expect(harness.component.month).to.equal(previousMonth);
    });

    it('should disallow navigating to next month if disabled', async () => {
      const harness = await createFixture();

      harness.component.max = new Date();
      const previousMonth = harness.component.month;

      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      expect(harness.component.month).to.equal(previousMonth);
    });

    it('should select currently active date if enter key is pressed', async () => {
      const harness = await createFixture();

      expect(harness.component.value).to.be.null;

      harness.component.handleKey(new KeyboardEvent('keydown', { key: 'Enter' }));
      const expectedDate = new Date();
      expect((harness.component.value as Date).toDateString()).to.equal(expectedDate.toDateString());
    });

    it('should update month button text when a new month is selected', async () => {
      const harness = await createFixture();

      harness.monthButton.click();
      const menu = harness.menu.shadowRoot as ShadowRoot;
      (menu.querySelector(CALENDAR_MENU_CONSTANTS.selectors.ITEM) as HTMLElement)?.click();

      expect(harness.monthButton.innerText).to.equal('January');
    });
  });
});

async function createFixture(): Promise<CalendarHarness> {
  const el = await fixture<CalendarComponentInternal>(html`<forge-calendar></forge-calendar>`);
  return new CalendarHarness(el);
}

async function createPartialFixture(): Promise<CalendarHarness & { appendToFixture: () => void }> {
  // Create element without appending to fixture (for connectedCallback tests)
  const component = document.createElement(CALENDAR_CONSTANTS.elementName) as CalendarComponentInternal;
  const harness = new CalendarHarness(component);

  return Object.assign(harness, {
    appendToFixture: () => {
      document.body.appendChild(component);
    }
  });
}
