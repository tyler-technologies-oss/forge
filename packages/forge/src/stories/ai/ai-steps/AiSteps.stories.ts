import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { ref } from 'lit/directives/ref.js';

import '@tylertech/forge-ai/ai-steps';
import type { AiStep, AiStepsComponent } from '@tylertech/forge-ai/ai-steps';

const component = 'forge-ai-steps';

const meta = {
  title: 'AI/Components/Tools & Reasoning/Steps',
  component,
  argTypes: {
    running: {
      control: 'boolean',
      description: 'Whether the run producing these steps is still in progress'
    }
  },
  args: {
    running: false
  }
} satisfies Meta;

const steps: AiStep[] = [
  {
    label: 'Searched the orders table',
    detail: 'Matched 1,284 orders placed in the last 90 days.',
    status: 'complete'
  },
  {
    label: 'Filtered by region',
    detail: 'Narrowed to the West region, leaving 412 orders.',
    status: 'complete'
  },
  {
    label: 'Loaded the product catalog',
    detail: 'Could not reach the catalog service — falling back to cached product names.',
    status: 'complete'
  }
];

/**
 * Steps with no `detail` skip the detail card entirely and render as just a marker and label.
 */
const noDetailSteps: AiStep[] = [
  { label: 'Refreshed the cache', status: 'complete' },
  { label: 'Loaded customer records', status: 'complete' }
];

/**
 * One step per formatting style, so each renders in isolation: bold for a figure worth pulling out,
 * italics plus strikethrough for a caveat, and backticks for an identifier.
 */
const markdownSteps: AiStep[] = [
  {
    label: 'Matched **8,412** incidents',
    detail: 'Read every 2024–2025 filing before narrowing.',
    status: 'complete'
  },
  {
    label: '*Approximated* the ~~cached~~ district totals',
    detail: 'The catalog service was unreachable, so these are recomputed rather than cached.',
    status: 'complete'
  },
  {
    label: 'Filtered `incidents` by `crime_category`',
    detail: "Kept rows where `crime_category = 'Burglary'`, leaving **412**.",
    status: 'complete'
  }
];

const runningSteps: AiStep[] = [
  { label: 'Searched the orders table', detail: 'Matched 1,284 orders.', status: 'complete' },
  { label: 'Filtered by region', status: 'running' },
  { label: 'Summarizing results', status: 'pending' }
];

/**
 * Steps the streaming story works through. Each one is announced with only its `label` while it runs;
 * its `detail` is what arrives when the step completes.
 */
const streamedSteps: AiStep[] = [
  {
    label: 'Searched `case_filings`',
    detail: 'Queried 2024–2025 filings for "zoning variance", returning **63** matches.'
  },
  {
    label: 'Filtered by `jurisdiction`',
    detail: 'Kept the **18** filings within Travis County.'
  },
  {
    label: 'Grouped by `outcome`',
    detail: '**11** approved, 5 denied, 2 withdrawn.'
  }
];

/** How long each step sits at `status: 'running'` before it completes. */
const STEP_RUNNING_DELAY = 1000;

/**
 * The snapshot of `streamedSteps` at the point where `index` is the step currently in flight:
 * everything before it has completed and carries its `detail`, and `index` itself is `running` with no
 * detail yet. Passing `streamedSteps.length` yields the fully finished list.
 */
function stepsInFlight(index: number): AiStep[] {
  const finished = streamedSteps.slice(0, index).map(step => ({ ...step, status: 'complete' as const }));
  const current = streamedSteps[index];

  return current ? [...finished, { label: current.label, status: 'running' as const }] : finished;
}

export default meta;

type Story = StoryObj;

/**
 * Every label and detail is supplied by the agent through the `displaySteps` tool call — the
 * component derives nothing on its own.
 */
export const Demo: Story = {
  render: ({ running }) => html`<forge-ai-steps .steps=${steps} ?running=${running}></forge-ai-steps>`
};

export const NoDetail: Story = {
  render: () => html`<forge-ai-steps .steps=${noDetailSteps}></forge-ai-steps>`
};

/**
 * `label` and `detail` are rendered as sanitized inline markdown, so the agent chooses what to
 * emphasize instead of the component prescribing it. Emphasis works at any position and any number of
 * times per label, and it carries into the collapsed summary. Unsafe markup is stripped, and links
 * are forced to `target="_blank"` with a safe `rel`.
 */
export const WithMarkdownLabels: Story = {
  render: ({ running }) => html`<forge-ai-steps .steps=${markdownSteps} ?running=${running}></forge-ai-steps>`
};

/**
 * While `running` is `true` the timeline is held open and the summary row is hidden, so the user can
 * watch the agent work.
 */
export const Running: Story = {
  render: () => html`<forge-ai-steps .steps=${runningSteps} running></forge-ai-steps>`
};

/**
 * A finished run. An element that mounts with `running` already `false` renders expanded and can be
 * collapsed with the summary row; one that *transitions* from running to finished auto-collapses.
 */
export const Complete: Story = {
  render: () => html`<forge-ai-steps .steps=${steps}></forge-ai-steps>`
};

/**
 * Works through the steps one at a time. Each step is announced as `running` with just its label,
 * then flips to `complete` and gains its `detail`, so the detail card is the part that streams in.
 * Re-assigning the whole `steps` array each tick mirrors how an agent's partial JSON accumulates.
 * The timeline stays expanded while `running` and auto-collapses once it finishes.
 */
export const Streaming: Story = {
  render: () => {
    let timer: number | undefined;

    const start = (element: AiStepsComponent | undefined): void => {
      window.clearInterval(timer);
      if (!element) {
        return;
      }
      element.running = true;
      element.steps = stepsInFlight(0);
      let index = 0;
      timer = window.setInterval(() => {
        index++;
        element.steps = stepsInFlight(index);
        if (index >= streamedSteps.length) {
          element.running = false;
          window.clearInterval(timer);
        }
      }, STEP_RUNNING_DELAY);
    };

    return html`<forge-ai-steps ${ref(start)}></forge-ai-steps>`;
  }
};
