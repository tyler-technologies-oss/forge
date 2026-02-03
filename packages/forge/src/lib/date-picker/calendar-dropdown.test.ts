import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { task } from '../core/utils/utils';
import { CalendarDropdown } from '../calendar/calendar-dropdown/calendar-dropdown';
import { IPopoverComponent, POPOVER_CONSTANTS } from '../popover';

import '../calendar';
import '../popover';

const DEFAULT_ID = 'calendar-dropdown';
const POPOVER_ANIMATION_DURATION = 200;

describe('CalendarDropdown', () => {
  afterEach(async () => {
    const popovers = Array.from(document.querySelectorAll(POPOVER_CONSTANTS.elementName));
    popovers.forEach(p => p.remove());
  });

  it('should open popup', async () => {
    const container = await fixture<HTMLElement>(html`
      <div>
        <button id="test-target">Test</button>
      </div>
    `);
    const targetElement = container.querySelector('#test-target') as HTMLElement;
    const calendarDropdown = new CalendarDropdown(targetElement, DEFAULT_ID);

    calendarDropdown.open({ id: DEFAULT_ID });

    const popup = document.querySelector(`${POPOVER_CONSTANTS.elementName}[id="${DEFAULT_ID}"]`) as IPopoverComponent;

    expect(calendarDropdown.isOpen).to.be.true;
    expect(popup).to.not.be.null;

    calendarDropdown.destroy();
  });

  it('should close popup when destroyed', async () => {
    const container = await fixture<HTMLElement>(html`
      <div>
        <button id="test-target">Test</button>
      </div>
    `);
    const targetElement = container.querySelector('#test-target') as HTMLElement;
    const calendarDropdown = new CalendarDropdown(targetElement, DEFAULT_ID);

    calendarDropdown.open({ id: DEFAULT_ID });
    calendarDropdown.destroy();

    await task(POPOVER_ANIMATION_DURATION);
    const popup = document.querySelector(`${POPOVER_CONSTANTS.elementName}[id="${DEFAULT_ID}"]`) as IPopoverComponent;

    expect(calendarDropdown.isOpen).to.be.false;
    expect(popup).to.be.null;
  });
});
