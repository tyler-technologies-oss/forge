import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import type { TemplateResult } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { AiStepsComponent, AiStep } from './ai-steps.js';

import './ai-steps.js';

function createStep(overrides: Partial<AiStep> = {}): AiStep {
  return {
    label: 'Searched the orders table',
    ...overrides
  };
}

function createSteps(template: TemplateResult): Promise<AiStepsComponent> {
  return renderFixture<AiStepsComponent>(template, 'forge-ai-steps');
}

function textOf(element: Element | null): string {
  return element?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}

describe('AiStepsComponent', () => {
  it('should contain shadow root', async () => {
    const el = await createSteps(html`<forge-ai-steps></forge-ai-steps>`);

    expect(el.shadowRoot).toBeTruthy();
  });

  it('should render a singular steps-count label for a single step', async () => {
    const el = await createSteps(html`<forge-ai-steps .steps=${[createStep()]}></forge-ai-steps>`);

    expect(textOf(el.shadowRoot!.querySelector('.steps-count'))).toBe('1 step');
  });

  it('should render a plural steps-count label for multiple steps', async () => {
    const el = await createSteps(html`<forge-ai-steps .steps=${[createStep(), createStep({ label: 'Filtered by region' })]}></forge-ai-steps>`);

    expect(textOf(el.shadowRoot!.querySelector('.steps-count'))).toBe('2 steps');
  });

  it('should uppercase the steps count with CSS so its accessible text is not spelled out', async () => {
    const el = await createSteps(html`<forge-ai-steps .steps=${[createStep(), createStep({ label: 'Filtered by region' })]}></forge-ai-steps>`);

    const count = el.shadowRoot!.querySelector('.steps-count')!;
    expect(getComputedStyle(count).textTransform).toBe('uppercase');
  });

  it('should render nothing when there are no steps', async () => {
    const el = await createSteps(html`<forge-ai-steps></forge-ai-steps>`);

    expect(el.shadowRoot!.querySelector('.steps-count')).toBeNull();
    expect(el.shadowRoot!.querySelector('.summary')).toBeNull();
    expect(el.shadowRoot!.querySelector('.timeline')).toBeNull();
  });

  it('should begin rendering once the first step arrives', async () => {
    const el = await createSteps(html`<forge-ai-steps></forge-ai-steps>`);
    expect(el.shadowRoot!.querySelector('.steps-count')).toBeNull();

    el.steps = [createStep()];
    await el.updateComplete;

    expect(textOf(el.shadowRoot!.querySelector('.steps-count'))).toBe('1 step');
  });

  it('should render the agent-provided label as a detail card when the step has detail', async () => {
    const step = createStep({ label: 'Filtered by crime category', detail: 'Narrowed to 412 records.' });
    const el = await createSteps(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    expect(textOf(el.shadowRoot!.querySelector('.step-card-title'))).toBe('Filtered by crime category');
    expect(textOf(el.shadowRoot!.querySelector('.step-card-result'))).toBe('Narrowed to 412 records.');
  });

  it('should render a plain labeled row when the step has no detail', async () => {
    const el = await createSteps(html`<forge-ai-steps .steps=${[createStep({ label: 'Refreshed the cache' })]}></forge-ai-steps>`);

    expect(el.shadowRoot!.querySelector('.step-card-title')).toBeNull();
    expect(textOf(el.shadowRoot!.querySelector('.row-name'))).toBe('Refreshed the cache');
  });

  it('should render inline markdown in a label on a detail card', async () => {
    const step = createStep({ label: 'Filtered by `crime_category`', detail: 'Narrowed to 412 records.' });
    const el = await createSteps(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    const title = el.shadowRoot!.querySelector('.step-card-title')!;
    expect(textOf(title.querySelector('code'))).toBe('crime_category');
    expect(textOf(title)).toBe('Filtered by crime_category');
  });

  it('should render inline markdown in a label on a row with no detail', async () => {
    const step = createStep({ label: 'Kept **412** rows, ~~ignoring~~ the cache' });
    const el = await createSteps(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    const rowName = el.shadowRoot!.querySelector('.row-name')!;
    expect(textOf(rowName.querySelector('strong'))).toBe('412');
    expect(textOf(rowName.querySelector('del'))).toBe('ignoring');
  });

  it('should render emphasis anywhere in a label, not only at the end', async () => {
    const step = createStep({ label: 'Filtered `incidents` by *category*' });
    const el = await createSteps(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    const rowName = el.shadowRoot!.querySelector('.row-name')!;
    expect(textOf(rowName.querySelector('code'))).toBe('incidents');
    expect(textOf(rowName.querySelector('em'))).toBe('category');
  });

  it('should render inline markdown in a detail', async () => {
    const step = createStep({ detail: 'Matched **1,284** orders in `orders`.' });
    const el = await createSteps(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    const result = el.shadowRoot!.querySelector('.step-card-result')!;
    expect(textOf(result.querySelector('strong'))).toBe('1,284');
    expect(textOf(result.querySelector('code'))).toBe('orders');
  });

  it('should leave a label with no markdown syntax untouched', async () => {
    const el = await createSteps(html`<forge-ai-steps .steps=${[createStep()]}></forge-ai-steps>`);

    const rowName = el.shadowRoot!.querySelector('.row-name')!;
    expect(rowName.querySelector('code')).toBeNull();
    expect(textOf(rowName)).toBe('Searched the orders table');
  });

  it('should render inline markdown in the collapsed summary', async () => {
    const step = createStep({ label: 'Filtered by `crime_category`' });
    const el = await createSteps(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    expect(textOf(el.shadowRoot!.querySelector('.status-text code'))).toBe('crime_category');
  });

  it('should not wrap an inline-rendered label in a block-level paragraph', async () => {
    const step = createStep({ label: 'Searched `orders`' });
    const el = await createSteps(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    expect(el.shadowRoot!.querySelector('.row-name p')).toBeNull();
  });

  it('should strip unsafe markup from an agent-supplied label', async () => {
    const step = createStep({
      label: 'Searched <span onclick="window.__xss = true">orders</span><script>window.__xss = true</script>'
    });
    const el = await createSteps(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    const rowName = el.shadowRoot!.querySelector('.row-name')!;
    expect(rowName.querySelector('script')).toBeNull();
    expect(rowName.querySelector('span')?.hasAttribute('onclick') ?? false).toBe(false);
    expect(textOf(rowName)).toContain('orders');
  });

  it('should strip an unsafe protocol from an agent-supplied link', async () => {
    const step = createStep({ label: 'Opened [the record](javascript:window.__xss = true)' });
    const el = await createSteps(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    const anchor = el.shadowRoot!.querySelector('.row-name a');
    expect(anchor?.getAttribute('href') ?? '').not.toContain('javascript:');
  });

  it('should force agent-supplied links to open safely in a new tab', async () => {
    const step = createStep({ label: 'Opened [parcel 4471](https://example.com/parcel/4471)' });
    const el = await createSteps(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    const anchor = el.shadowRoot!.querySelector('.row-name a')!;
    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(anchor.getAttribute('rel')).toBe('noreferrer noopener');
  });

  it('should leave unclosed markdown syntax as literal text', async () => {
    const step = createStep({ label: 'Filtered by **crime_' });
    const el = await createSteps(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    const rowName = el.shadowRoot!.querySelector('.row-name')!;
    expect(rowName.querySelector('strong')).toBeNull();
    expect(textOf(rowName)).toContain('**');
  });

  it('should truncate a detail longer than the maximum length', async () => {
    const longDetail = 'x'.repeat(3000);
    const el = await createSteps(html`<forge-ai-steps .steps=${[createStep({ detail: longDetail })]}></forge-ai-steps>`);

    const rendered = textOf(el.shadowRoot!.querySelector('.step-card-result'));
    expect(rendered).toContain('(truncated)');
    expect(rendered.length).toBeLessThan(longDetail.length);
  });

  it('should default a step without a status to complete', async () => {
    const el = await createSteps(html`<forge-ai-steps .steps=${[createStep()]}></forge-ai-steps>`);

    expect(el.shadowRoot!.querySelector('.timeline-row')?.getAttribute('data-status')).toBe('complete');
  });

  it('should expose the step status on the row for styling hooks', async () => {
    const el = await createSteps(html`<forge-ai-steps .steps=${[createStep({ status: 'running', detail: 'Still working.' })]}></forge-ai-steps>`);

    expect(el.shadowRoot!.querySelector('.timeline-row')?.getAttribute('data-status')).toBe('running');
    expect(el.shadowRoot!.querySelector('.step-card-title')).toBeTruthy();
  });

  it('should summarize more than two steps with a "+N more" suffix', async () => {
    const steps = [
      createStep({ label: 'Searched the orders table' }),
      createStep({ label: 'Filtered by region' }),
      createStep({ label: 'Joined customers' }),
      createStep({ label: 'Sorted rows' })
    ];
    const el = await createSteps(html`<forge-ai-steps .steps=${steps}></forge-ai-steps>`);

    expect(textOf(el.shadowRoot!.querySelector('.status-text'))).toBe('Searched the orders table, Filtered by region +2 more');
  });

  it('should render links in the summary button as text', async () => {
    const step = createStep({
      label: 'Opened [parcel 4471](https://example.com/parcel/4471) ![map](https://external.invalid/m.png)'
    });
    const el = await createSteps(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    const summary = el.shadowRoot!.querySelector('.status-text')!;
    expect(summary.querySelector('a, img')).toBeNull();
    expect(textOf(summary)).toBe('Opened parcel 4471 map (external.invalid)');
    expect(el.shadowRoot!.querySelector('.row-name a')).not.toBeNull();
  });

  it('should list every step label in the summary when there are two or fewer', async () => {
    const steps = [createStep({ label: 'Searched the orders table' }), createStep({ label: 'Filtered by region' })];
    const el = await createSteps(html`<forge-ai-steps .steps=${steps}></forge-ai-steps>`);

    expect(textOf(el.shadowRoot!.querySelector('.status-text'))).toBe('Searched the orders table, Filtered by region');
  });

  it('should reflect the running property to an attribute', async () => {
    const el = await createSteps(html`<forge-ai-steps .steps=${[createStep()]}></forge-ai-steps>`);
    expect(el.hasAttribute('running')).toBe(false);

    el.running = true;
    await el.updateComplete;

    expect(el.hasAttribute('running')).toBe(true);
  });

  it('should keep the timeline expanded and hide the summary button while running', async () => {
    const el = await createSteps(html`<forge-ai-steps .steps=${[createStep({ status: 'running' })]} running></forge-ai-steps>`);

    expect(el.shadowRoot!.querySelector('.summary')).toBeNull();
    const timeline = el.shadowRoot!.querySelector('.timeline')!;
    expect(timeline.classList.contains('expanded')).toBe(true);
    expect(timeline.getAttribute('aria-hidden')).toBe('false');
  });

  it('should default to expanded with a visible summary button when it mounts already finished', async () => {
    const el = await createSteps(html`<forge-ai-steps .steps=${[createStep()]}></forge-ai-steps>`);

    const summary = el.shadowRoot!.querySelector('.summary');
    expect(summary).toBeTruthy();
    expect(summary!.getAttribute('aria-expanded')).toBe('true');
    expect(el.shadowRoot!.querySelector('.timeline')!.classList.contains('expanded')).toBe(true);
  });

  it('should auto-collapse once the run finishes, and remain toggleable via the summary row', async () => {
    const el = await createSteps(html`<forge-ai-steps .steps=${[createStep()]} running></forge-ai-steps>`);

    el.running = false;
    await el.updateComplete;

    const summary = el.shadowRoot!.querySelector('.summary') as HTMLButtonElement;
    expect(summary).toBeTruthy();
    expect(summary.getAttribute('aria-expanded')).toBe('false');
    expect(summary.getAttribute('aria-controls')).toBe('timeline-content');

    let timeline = el.shadowRoot!.querySelector('.timeline')!;
    expect(timeline.classList.contains('expanded')).toBe(false);
    expect(timeline.getAttribute('aria-hidden')).toBe('true');

    summary.click();
    await el.updateComplete;

    expect(summary.getAttribute('aria-expanded')).toBe('true');
    timeline = el.shadowRoot!.querySelector('.timeline')!;
    expect(timeline.classList.contains('expanded')).toBe(true);
    expect(timeline.getAttribute('aria-hidden')).toBe('false');
  });

  it('should reveal the Forge focus indicator when the summary button takes focus', async () => {
    const el = await createSteps(html`<forge-ai-steps .steps=${[createStep()]}></forge-ai-steps>`);

    const summary = el.shadowRoot!.querySelector('.summary') as HTMLButtonElement;
    const indicator = el.shadowRoot!.querySelector('.focus-indicator')!;
    expect(getComputedStyle(indicator).display, 'hidden while unfocused').toBe('none');

    summary.focus();
    await el.updateComplete;

    expect(getComputedStyle(indicator).display, 'shown while focused').toBe('block');
  });

  it('should auto-collapse again when the same element is reused for a second run', async () => {
    const el = await createSteps(html`<forge-ai-steps .steps=${[createStep()]} running></forge-ai-steps>`);

    el.running = false;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.timeline')!.classList.contains('expanded'), 'run 1 collapsed').toBe(false);

    // Element reused for a second run (e.g. keyed list re-render)
    el.running = true;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.timeline')!.classList.contains('expanded'), 'run 2 expanded').toBe(true);

    el.running = false;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.timeline')!.classList.contains('expanded'), 'run 2 collapsed').toBe(false);
  });
});
