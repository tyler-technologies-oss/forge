import axe, { type AxeResults, type RunOptions, type ElementContext } from 'axe-core';

export async function runAxe(context: ElementContext, options?: RunOptions): Promise<AxeResults> {
  return options ? axe.run(context, options) : axe.run(context);
}

export async function expectNoA11yViolations(context: ElementContext, options?: RunOptions): Promise<void> {
  const results = await runAxe(context, options);
  if (results.violations.length > 0) {
    const violations = results.violations.map(v => `- ${v.id}: ${v.description} (${v.nodes.length} nodes)`).join('\n');
    throw new Error(`Accessibility violations found:\n${violations}`);
  }
}
