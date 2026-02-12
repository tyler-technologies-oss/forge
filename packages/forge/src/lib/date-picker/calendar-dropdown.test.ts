import { describe, it, expect, afterEach } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { task } from '../core/utils/utils.js';
import { CalendarDropdown } from '../calendar/calendar-dropdown/calendar-dropdown.js';
import { IPopoverComponent, POPOVER_CONSTANTS } from '../popover/index.js';

import '../calendar/index.js';
import '../popover/index.js';

const DEFAULT_ID = 'calendar-dropdown';
const POPOVER_ANIMATION_DURATION = 200;

describe('CalendarDropdown', () => {
  afterEach(async () => {
    const popovers = Array.from(document.querySelectorAll(POPOVER_CONSTANTS.elementName));
    popovers.forEach(p => p.remove());
  });

  it('should open popup', async () => {
    const screen = render(html`
      <div>
        <button id="test-target">Test</button>
      </div>
    `);
    const targetElement = screen.container.querySelector('#test-target') as HTMLElement;
    const calendarDropdown = new CalendarDropdown(targetElement, DEFAULT_ID);

    calendarDropdown.open({ id: DEFAULT_ID });

    const popup = document.querySelector(`${POPOVER_CONSTANTS.elementName}[id="${DEFAULT_ID}"]`) as IPopoverComponent;

    expect(calendarDropdown.isOpen).toBe(true);
    expect(popup).not.toBeNull();

    calendarDropdown.destroy();
  });

  it('should close popup when destroyed', async () => {
    const screen = render(html`
      <div>
        <button id="test-target">Test</button>
      </div>
    `);
    const targetElement = screen.container.querySelector('#test-target') as HTMLElement;
    const calendarDropdown = new CalendarDropdown(targetElement, DEFAULT_ID);

    calendarDropdown.open({ id: DEFAULT_ID });
    calendarDropdown.destroy();

    await task(POPOVER_ANIMATION_DURATION);
    const popup = document.querySelector(`${POPOVER_CONSTANTS.elementName}[id="${DEFAULT_ID}"]`) as IPopoverComponent;

    expect(calendarDropdown.isOpen).toBe(false);
    expect(popup).toBeNull();
  });
});
