import { expect } from 'vitest';
import axe from 'axe-core';

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
