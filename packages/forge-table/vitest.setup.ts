import { afterEach, expect } from 'vitest';
import { cleanup } from 'vitest-browser-lit';
import { page, userEvent } from 'vitest/browser';
import axe from 'axe-core';
import { DismissibleStack } from '@tylertech/forge';

afterEach(async () => {
  cleanup();
  await page.viewport(800, 600);
  userEvent.cleanup();

  document.body.querySelectorAll('forge-tooltip, forge-popover, forge-dialog, forge-toast, forge-overlay, forge-menu').forEach(el => el.remove());

  DismissibleStack.instance.getAll().forEach(el => {
    DismissibleStack.instance.remove(el);
  });

  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }

  document.body.innerHTML = '';

  // Move the pointer somewhere neutral so a leftover hover position from this test doesn't land on top of a
  // newly rendered element in the next test and fire spurious mouse events.
  await userEvent.hover(document.body);
});

expect.extend({
  async toBeAccessible(received: Element, options?: axe.RunOptions) {
    const results = await axe.run(received, options ?? {});
    const pass = results.violations.length === 0;
    return {
      pass,
      message: () =>
        pass
          ? `Expected element to have accessibility violations`
          : `Found ${results.violations.length} violations:\n${results.violations.map(v => `- ${v.id}: ${v.description}`).join('\n')}`
    };
  }
});
