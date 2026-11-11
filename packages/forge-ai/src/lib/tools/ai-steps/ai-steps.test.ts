import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../../testing/fixture.js';
import type { AiStepsComponent } from '../../ai-steps/ai-steps.js';
import type { ToolCall } from '../../types/index.js';
import type { StepsToolElement } from './ai-steps.js';

import './ai-steps.js';

function createToolCall(overrides: Partial<ToolCall> = {}): ToolCall {
  return {
    id: 'tc-1',
    messageId: 'msg-1',
    name: 'displaySteps',
    args: { steps: [{ label: 'Searched the orders table' }] },
    status: 'complete',
    type: 'client',
    ...overrides
  };
}

async function renderTool(toolCall: ToolCall): Promise<{ el: StepsToolElement; steps: AiStepsComponent }> {
  const el = await renderFixture<StepsToolElement>(html`<forge-ai-tool-steps .toolCall=${toolCall}></forge-ai-tool-steps>`, 'forge-ai-tool-steps');
  const steps = el.shadowRoot!.querySelector<AiStepsComponent>('forge-ai-steps')!;
  await steps.updateComplete;
  return { el, steps };
}

describe('StepsToolElement', () => {
  it('should contain shadow root', async () => {
    const { el } = await renderTool(createToolCall());

    expect(el.shadowRoot).toBeTruthy();
  });

  it('should map the tool call arguments onto the steps primitive', async () => {
    const { steps } = await renderTool(
      createToolCall({
        args: {
          steps: [
            { label: 'Searched the orders table', detail: 'Matched 1,284 orders.' },
            { label: 'Filtered by region', status: 'running' }
          ]
        }
      })
    );

    expect(steps.steps).toHaveLength(2);
    expect(steps.steps[0].label).toBe('Searched the orders table');
    expect(steps.steps[0].detail).toBe('Matched 1,284 orders.');
    expect(steps.steps[1].status).toBe('running');
  });

  it('should pass an agent-provided markdown label through to the steps primitive verbatim', async () => {
    const { steps } = await renderTool(createToolCall({ args: { steps: [{ label: 'Filtered by `crime_category`' }] } }));

    // The renderer forwards the raw string; parsing belongs to the primitive.
    expect(steps.steps[0].label).toBe('Filtered by `crime_category`');
    expect(steps.shadowRoot!.querySelector('.row-name code')?.textContent).toBe('crime_category');
  });

  it('should render an empty timeline when arguments have not streamed in yet', async () => {
    const { steps } = await renderTool(createToolCall({ args: {}, status: 'parsing' }));

    expect(steps.steps).toEqual([]);
  });

  it('should drop partially streamed steps that have no label yet', async () => {
    const { steps } = await renderTool(
      createToolCall({
        status: 'parsing',
        args: { steps: [{ label: 'Searched the orders table' }, { detail: 'still streaming' }] }
      })
    );

    expect(steps.steps).toHaveLength(1);
    expect(steps.steps[0].label).toBe('Searched the orders table');
  });

  it('should ignore a steps argument that is not an array', async () => {
    const { steps } = await renderTool(createToolCall({ args: { steps: 'not an array' } }));

    expect(steps.steps).toEqual([]);
  });

  it('should report running while the tool call has not settled', async () => {
    for (const status of ['pending', 'parsing', 'executing'] as const) {
      const { steps } = await renderTool(createToolCall({ status }));
      expect(steps.running, `status: ${status}`).toBe(true);
    }
  });

  it('should stop reporting running once the tool call settles', async () => {
    for (const status of ['complete', 'error'] as const) {
      const { steps } = await renderTool(createToolCall({ status }));
      expect(steps.running, `status: ${status}`).toBe(false);
    }
  });
});
