import { removeElement } from '@tylertech/forge-core';
import { CalendarMenuComponent, CALENDAR_MENU_CONSTANTS, defineCalendarMenuComponent, ICalendarComponent, ICalendarMenuComponent } from '@tylertech/forge';

interface ITestContext {
  context: ITestCalendarMenuContext;
}

interface ITestCalendarMenuContext {
  component: ICalendarMenuComponent;
  destroy(): void;
}

interface ITestPartialCalendarMenuContext {
  component: ICalendarMenuComponent;
  appendToFixture(): void;
  destroy(): void;
}

describe('CalendarMenuComponent', function(this: ITestContext) {
  let componentInstance: CalendarMenuComponent;
  let fixtureContainer: HTMLElement;

  beforeAll(function(this: ITestContext) {
    defineCalendarMenuComponent();
    fixtureContainer = document.createElement('div');
    document.body.appendChild(fixtureContainer);
  });

  beforeEach(function(this: ITestContext) {    
    this.context = setupTestContext();
    const element = document.createElement(CALENDAR_MENU_CONSTANTS.elementName);
    fixtureContainer.appendChild(element);
    componentInstance = document.querySelector(CALENDAR_MENU_CONSTANTS.elementName) as CalendarMenuComponent;
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instatiate component with shadow dom', function(this: ITestContext) {
    expect(this.context.component.shadowRoot).toBeDefined();
  });

  function setupTestContext(): ITestCalendarMenuContext {
    const fixture = document.createElement('div');
    fixture.id = 'calendar-menu0test-fixture';
    const component = document.createElement(CALENDAR_MENU_CONSTANTS.elementName);
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      destroy: () => removeElement(fixture)
    };
  }

  function setupPartialTestContext(): ITestPartialCalendarMenuContext {
    const fixture = document.createElement('div');
    fixture.id = 'calendar-test-fixture';
    const component = document.createElement(CALENDAR_MENU_CONSTANTS.elementName);
    document.body.appendChild(fixture);
    return {
      component,
      appendToFixture: () => fixture.appendChild(component),
      destroy: () => removeElement(fixture)
    };
  }
});
