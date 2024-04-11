import { removeElement } from '@tylertech/forge-core';
import { tick, timer } from '@tylertech/forge-testing';
import { defineCalendarComponent } from '@tylertech/forge/calendar';
import { CalendarDropdown, ICalendarDropdown } from '@tylertech/forge/calendar';
import { definePopoverComponent, IPopoverComponent, POPOVER_CONSTANTS } from '@tylertech/forge/popover';

const DEFAULT_ID = 'calendar-dropdown';
const POPOVER_ANIMATION_DURATION = 200;

interface ITestContext {
  context: ITestCalendarDropdownContext;
}

interface ITestCalendarDropdownContext {
  calendarDropdown: ICalendarDropdown;
  targetElement: HTMLElement;
  destroy(): void;
}

describe('CalendarDropdown', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    definePopoverComponent();
    defineCalendarComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should open popup', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.calendarDropdown.open({ id: DEFAULT_ID });

    const popup = getPopup(DEFAULT_ID);

    expect(this.context.calendarDropdown.isOpen).toBeTrue();
    expect(popup).not.toBeNull();
  });

  it('should close popup when destroyed', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.calendarDropdown.open({ id: DEFAULT_ID });
    this.context.calendarDropdown.destroy();

    await tick();
    await timer(POPOVER_ANIMATION_DURATION);
    const popup = getPopup(DEFAULT_ID);

    expect(this.context.calendarDropdown.isOpen).toBeFalse();
    expect(popup).toBeNull();
  });

  function getPopup(id: string): IPopoverComponent {
    return document.querySelector(`${POPOVER_CONSTANTS.elementName}[id="${id}"]`) as IPopoverComponent;
  }

  function setupTestContext(): ITestCalendarDropdownContext {
    const fixture = document.createElement('div');
    fixture.id = 'calendar-drop-test-fixture';
    const targetElement = document.createElement('button');
    targetElement.textContent = 'Test';
    fixture.appendChild(targetElement);
    const calendarDropdown = new CalendarDropdown(targetElement, DEFAULT_ID);
    return {
      calendarDropdown,
      targetElement,
      destroy: () => {
        calendarDropdown.destroy();
        removeElement(fixture);
      }
    };
  }
});
