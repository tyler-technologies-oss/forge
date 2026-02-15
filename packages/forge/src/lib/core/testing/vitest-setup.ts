import { afterEach, expect } from 'vitest';
import { cleanup } from 'vitest-browser-lit';
import { page, userEvent } from 'vitest/browser';
import axe from 'axe-core';
import { DismissibleStack } from '../utils/dismissible-stack.js';

/**
 * Clean up any leftover elements from tests after each test runs.
 * This ensures that tests do not leak and interfere with each other, and that the DOM is in a clean state for each test.
 */
afterEach(async () => {
  // Immediately remove vitest-browser-lit containers (library only cleans in beforeEach)
  cleanup();

  // Reset viewport to default size
  await page.viewport(800, 600);

  // Clear any pending user events to prevent interference with subsequent tests
  userEvent.cleanup();

  // Remove any common leftover overlay elements that may have been created by tests
  document.body.querySelectorAll('forge-tooltip, forge-popover, forge-dialog, forge-toast, forge-overlay, forge-menu').forEach(el => el.remove());

  // Clear any elements from the DismissibleStack
  DismissibleStack.instance.getAll().forEach(el => {
    DismissibleStack.instance.remove(el);
  });

  // Blur any active element to prevent focus-related test interference
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }

  // Clear the body content to ensure a clean slate for the next test
  document.body.innerHTML = '';
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
