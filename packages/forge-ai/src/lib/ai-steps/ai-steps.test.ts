import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { AiStepsComponent, type AiStep } from './ai-steps.js';

import './ai-steps.js';

function createStep(overrides: Partial<AiStep> = {}): AiStep {
  return {
    label: 'Searched the orders table',
    ...overrides
  };
}

function textOf(element: Element | null): string {
  return element?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}

describe('AiStepsComponent', () => {
  it('should contain shadow root', async () => {
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps></forge-ai-steps>`);

    expect(el.shadowRoot).to.be.ok;
  });

  it('should render a singular steps-count label for a single step', async () => {
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[createStep()]}></forge-ai-steps>`);

    expect(textOf(el.shadowRoot!.querySelector('.steps-count'))).to.equal('1 step');
  });

  it('should render a plural steps-count label for multiple steps', async () => {
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[createStep(), createStep({ label: 'Filtered by region' })]}></forge-ai-steps>`);

    expect(textOf(el.shadowRoot!.querySelector('.steps-count'))).to.equal('2 steps');
  });

  it('should uppercase the steps count with CSS so its accessible text is not spelled out', async () => {
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[createStep(), createStep({ label: 'Filtered by region' })]}></forge-ai-steps>`);

    const count = el.shadowRoot!.querySelector('.steps-count')!;
    expect(getComputedStyle(count).textTransform).to.equal('uppercase');
  });

  it('should render nothing when there are no steps', async () => {
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps></forge-ai-steps>`);

    expect(el.shadowRoot!.querySelector('.steps-count')).to.not.exist;
    expect(el.shadowRoot!.querySelector('.summary')).to.not.exist;
    expect(el.shadowRoot!.querySelector('.timeline')).to.not.exist;
  });

  it('should begin rendering once the first step arrives', async () => {
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps></forge-ai-steps>`);
    expect(el.shadowRoot!.querySelector('.steps-count')).to.not.exist;

    el.steps = [createStep()];
    await elementUpdated(el);

    expect(textOf(el.shadowRoot!.querySelector('.steps-count'))).to.equal('1 step');
  });

  it('should render the agent-provided label as a detail card when the step has detail', async () => {
    const step = createStep({ label: 'Filtered by crime category', detail: 'Narrowed to 412 records.' });
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    expect(textOf(el.shadowRoot!.querySelector('.step-card-title'))).to.equal('Filtered by crime category');
    expect(textOf(el.shadowRoot!.querySelector('.step-card-result'))).to.equal('Narrowed to 412 records.');
  });

  it('should render a plain labeled row when the step has no detail', async () => {
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[createStep({ label: 'Refreshed the cache' })]}></forge-ai-steps>`);

    expect(el.shadowRoot!.querySelector('.step-card-title')).to.not.exist;
    expect(textOf(el.shadowRoot!.querySelector('.row-name'))).to.equal('Refreshed the cache');
  });

  it('should render inline markdown in a label on a detail card', async () => {
    const step = createStep({ label: 'Filtered by `crime_category`', detail: 'Narrowed to 412 records.' });
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    const title = el.shadowRoot!.querySelector('.step-card-title')!;
    expect(textOf(title.querySelector('code'))).to.equal('crime_category');
    expect(textOf(title)).to.equal('Filtered by crime_category');
  });

  it('should render inline markdown in a label on a row with no detail', async () => {
    const step = createStep({ label: 'Kept **412** rows, ~~ignoring~~ the cache' });
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    const rowName = el.shadowRoot!.querySelector('.row-name')!;
    expect(textOf(rowName.querySelector('strong'))).to.equal('412');
    expect(textOf(rowName.querySelector('del'))).to.equal('ignoring');
  });

  it('should render emphasis anywhere in a label, not only at the end', async () => {
    const step = createStep({ label: 'Filtered `incidents` by *category*' });
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    const rowName = el.shadowRoot!.querySelector('.row-name')!;
    expect(textOf(rowName.querySelector('code'))).to.equal('incidents');
    expect(textOf(rowName.querySelector('em'))).to.equal('category');
  });

  it('should render inline markdown in a detail', async () => {
    const step = createStep({ detail: 'Matched **1,284** orders in `orders`.' });
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    const result = el.shadowRoot!.querySelector('.step-card-result')!;
    expect(textOf(result.querySelector('strong'))).to.equal('1,284');
    expect(textOf(result.querySelector('code'))).to.equal('orders');
  });

  it('should leave a label with no markdown syntax untouched', async () => {
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[createStep()]}></forge-ai-steps>`);

    const rowName = el.shadowRoot!.querySelector('.row-name')!;
    expect(rowName.querySelector('code')).to.not.exist;
    expect(textOf(rowName)).to.equal('Searched the orders table');
  });

  it('should render inline markdown in the collapsed summary', async () => {
    const step = createStep({ label: 'Filtered by `crime_category`' });
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    expect(textOf(el.shadowRoot!.querySelector('.status-text code'))).to.equal('crime_category');
  });

  it('should not wrap an inline-rendered label in a block-level paragraph', async () => {
    const step = createStep({ label: 'Searched `orders`' });
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    expect(el.shadowRoot!.querySelector('.row-name p')).to.not.exist;
  });

  it('should strip unsafe markup from an agent-supplied label', async () => {
    const step = createStep({
      label: 'Searched <span onclick="window.__xss = true">orders</span><script>window.__xss = true</script>'
    });
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    const rowName = el.shadowRoot!.querySelector('.row-name')!;
    expect(rowName.querySelector('script')).to.not.exist;
    expect(rowName.querySelector('span')?.hasAttribute('onclick') ?? false).to.be.false;
    expect(textOf(rowName)).to.contain('orders');
  });

  it('should strip an unsafe protocol from an agent-supplied link', async () => {
    const step = createStep({ label: 'Opened [the record](javascript:window.__xss = true)' });
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    const anchor = el.shadowRoot!.querySelector('.row-name a');
    expect(anchor?.getAttribute('href') ?? '').to.not.contain('javascript:');
  });

  it('should force agent-supplied links to open safely in a new tab', async () => {
    const step = createStep({ label: 'Opened [parcel 4471](https://example.com/parcel/4471)' });
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    const anchor = el.shadowRoot!.querySelector('.row-name a')!;
    expect(anchor.getAttribute('target')).to.equal('_blank');
    expect(anchor.getAttribute('rel')).to.equal('noreferrer noopener');
  });

  it('should leave unclosed markdown syntax as literal text', async () => {
    const step = createStep({ label: 'Filtered by **crime_' });
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[step]}></forge-ai-steps>`);

    const rowName = el.shadowRoot!.querySelector('.row-name')!;
    expect(rowName.querySelector('strong')).to.not.exist;
    expect(textOf(rowName)).to.contain('**');
  });

  it('should truncate a detail longer than the maximum length', async () => {
    const longDetail = 'x'.repeat(3000);
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[createStep({ detail: longDetail })]}></forge-ai-steps>`);

    const rendered = textOf(el.shadowRoot!.querySelector('.step-card-result'));
    expect(rendered).to.contain('(truncated)');
    expect(rendered.length).to.be.lessThan(longDetail.length);
  });

  it('should default a step without a status to complete', async () => {
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[createStep()]}></forge-ai-steps>`);

    expect(el.shadowRoot!.querySelector('.timeline-row')?.getAttribute('data-status')).to.equal('complete');
  });

  it('should expose the step status on the row for styling hooks', async () => {
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[createStep({ status: 'running', detail: 'Still working.' })]}></forge-ai-steps>`);

    expect(el.shadowRoot!.querySelector('.timeline-row')?.getAttribute('data-status')).to.equal('running');
    expect(el.shadowRoot!.querySelector('.step-card-title')).to.exist;
  });

  it('should summarize more than two steps with a "+N more" suffix', async () => {
    const steps = [
      createStep({ label: 'Searched the orders table' }),
      createStep({ label: 'Filtered by region' }),
      createStep({ label: 'Joined customers' }),
      createStep({ label: 'Sorted rows' })
    ];
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${steps}></forge-ai-steps>`);

    expect(textOf(el.shadowRoot!.querySelector('.status-text'))).to.equal('Searched the orders table, Filtered by region +2 more');
  });

  it('should list every step label in the summary when there are two or fewer', async () => {
    const steps = [createStep({ label: 'Searched the orders table' }), createStep({ label: 'Filtered by region' })];
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${steps}></forge-ai-steps>`);

    expect(textOf(el.shadowRoot!.querySelector('.status-text'))).to.equal('Searched the orders table, Filtered by region');
  });

  it('should reflect the running property to an attribute', async () => {
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[createStep()]}></forge-ai-steps>`);
    expect(el.hasAttribute('running')).to.be.false;

    el.running = true;
    await elementUpdated(el);

    expect(el.hasAttribute('running')).to.be.true;
  });

  it('should keep the timeline expanded and hide the summary button while running', async () => {
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[createStep({ status: 'running' })]} running></forge-ai-steps>`);

    expect(el.shadowRoot!.querySelector('.summary')).to.not.exist;
    const timeline = el.shadowRoot!.querySelector('.timeline')!;
    expect(timeline.classList.contains('expanded')).to.be.true;
    expect(timeline.getAttribute('aria-hidden')).to.equal('false');
  });

  it('should default to expanded with a visible summary button when it mounts already finished', async () => {
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[createStep()]}></forge-ai-steps>`);

    const summary = el.shadowRoot!.querySelector('.summary');
    expect(summary).to.exist;
    expect(summary!.getAttribute('aria-expanded')).to.equal('true');
    expect(el.shadowRoot!.querySelector('.timeline')!.classList.contains('expanded')).to.be.true;
  });

  it('should auto-collapse once the run finishes, and remain toggleable via the summary row', async () => {
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[createStep()]} running></forge-ai-steps>`);

    el.running = false;
    await elementUpdated(el);

    const summary = el.shadowRoot!.querySelector('.summary') as HTMLButtonElement;
    expect(summary).to.exist;
    expect(summary.getAttribute('aria-expanded')).to.equal('false');
    expect(summary.getAttribute('aria-controls')).to.equal('timeline-content');

    let timeline = el.shadowRoot!.querySelector('.timeline')!;
    expect(timeline.classList.contains('expanded')).to.be.false;
    expect(timeline.getAttribute('aria-hidden')).to.equal('true');

    summary.click();
    await elementUpdated(el);

    expect(summary.getAttribute('aria-expanded')).to.equal('true');
    timeline = el.shadowRoot!.querySelector('.timeline')!;
    expect(timeline.classList.contains('expanded')).to.be.true;
    expect(timeline.getAttribute('aria-hidden')).to.equal('false');
  });

  it('should reveal the Forge focus indicator when the summary button takes focus', async () => {
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[createStep()]}></forge-ai-steps>`);

    const summary = el.shadowRoot!.querySelector('.summary') as HTMLButtonElement;
    const indicator = el.shadowRoot!.querySelector('.focus-indicator')!;
    expect(getComputedStyle(indicator).display, 'hidden while unfocused').to.equal('none');

    summary.focus();
    await elementUpdated(el);

    expect(getComputedStyle(indicator).display, 'shown while focused').to.equal('block');
  });

  it('should auto-collapse again when the same element is reused for a second run', async () => {
    const el = await fixture<AiStepsComponent>(html`<forge-ai-steps .steps=${[createStep()]} running></forge-ai-steps>`);

    el.running = false;
    await elementUpdated(el);
    expect(el.shadowRoot!.querySelector('.timeline')!.classList.contains('expanded'), 'run 1 collapsed').to.be.false;

    // Element reused for a second run (e.g. keyed list re-render)
    el.running = true;
    await elementUpdated(el);
    expect(el.shadowRoot!.querySelector('.timeline')!.classList.contains('expanded'), 'run 2 expanded').to.be.true;

    el.running = false;
    await elementUpdated(el);
    expect(el.shadowRoot!.querySelector('.timeline')!.classList.contains('expanded'), 'run 2 collapsed').to.be.false;
  });
});
