import { expect } from '@esm-bundle/chai';
import { fixture } from '@open-wc/testing';
import { removeElement } from '@tylertech/forge-core';
import { task, frame } from '../core/utils/utils';
import { defineCalendarComponent } from './index';
import { CalendarDropdown, ICalendarDropdown } from './calendar-dropdown/index';
import { definePopoverComponent, IPopoverComponent, POPOVER_CONSTANTS } from '../popover';

const DEFAULT_ID = 'calendar-dropdown';
const POPOVER_ANIMATION_DURATION = 200;

interface ICalendarDropdownHarness {
  calendarDropdown: ICalendarDropdown;
  targetElement: HTMLElement;
  destroy(): void;
}

describe('CalendarDropdown', () => {
  before(() => {
    definePopoverComponent();
    defineCalendarComponent();
  });

  afterEach(function () {
    if (this.currentTest?.ctx.harness) {
      this.currentTest.ctx.harness.destroy();
    }
  });

  it('should open popup', async function () {
    this.harness = await createFixture();
    this.harness.calendarDropdown.open({ id: DEFAULT_ID });

    const popup = getPopup(DEFAULT_ID);

    expect(this.harness.calendarDropdown.isOpen).to.be.true;
    expect(popup).to.not.be.null;
  });

  it('should close popup when destroyed', async function () {
    this.harness = await createFixture();
    this.harness.calendarDropdown.open({ id: DEFAULT_ID });
    this.harness.calendarDropdown.destroy();

    await frame();
    await task(POPOVER_ANIMATION_DURATION);
    const popup = getPopup(DEFAULT_ID);

    expect(this.harness.calendarDropdown.isOpen).to.be.false;
    expect(popup).to.be.null;
  });

  function getPopup(id: string): IPopoverComponent {
    return document.querySelector(`${POPOVER_CONSTANTS.elementName}[id="${id}"]`) as IPopoverComponent;
  }

  async function createFixture(): Promise<ICalendarDropdownHarness> {
    const fixtureElement = await fixture<HTMLDivElement>(`
      <div id="calendar-drop-test-fixture">
        <button>Test</button>
      </div>
    `);

    const targetElement = fixtureElement.querySelector('button') as HTMLElement;
    const calendarDropdown = new CalendarDropdown(targetElement, DEFAULT_ID);

    return {
      calendarDropdown,
      targetElement,
      destroy: () => {
        calendarDropdown.destroy();
        removeElement(fixtureElement);
      }
    };
  }
});
