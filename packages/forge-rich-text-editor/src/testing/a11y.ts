import axe, { type AxeResults, type ElementContext, type Result, type RunOptions } from 'axe-core';

/**
 * Runs axe against a context and returns the raw results.
 *
 * Mirrors the shape of forge's own `core/testing/a11y.ts`, which is not reachable from here - forge
 * exports no testing subpath, and that helper is currently unused by any spec.
 */
export async function runAxe(context: ElementContext, options?: RunOptions): Promise<AxeResults> {
  return options ? axe.run(context, options) : axe.run(context);
}

/** Formats a violation so a failure names the rule, its impact and the offending markup. */
function describe(violation: Result): string {
  const nodes = violation.nodes.map(node => `      ${node.html}`).join('\n');
  return `  - ${violation.id} (${violation.impact}): ${violation.help}\n${nodes}`;
}

/**
 * Fails with the full violation list rather than a count, so a regression can be read from the
 * failure message without a rerun.
 */
export async function expectNoA11yViolations(context: ElementContext, options?: RunOptions): Promise<void> {
  const { violations } = await runAxe(context, options);
  if (violations.length) {
    throw new Error(`Accessibility violations found:\n${violations.map(describe).join('\n')}`);
  }
}
