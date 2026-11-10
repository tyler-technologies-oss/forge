import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { ToolCall } from '@tylertech/forge-ai/types';

import '@tylertech/forge-ai/tools';

const component = 'forge-ai-tool-steps';

const steps = [
  { label: 'Searched `case_filings`', detail: 'Queried 2024–2025 filings, returning **63** matches.', status: 'complete' },
  { label: 'Filtered by `jurisdiction`', detail: 'Kept the **18** filings within Travis County.', status: 'complete' },
  { label: 'Grouped by `outcome`', detail: '**11** approved, 5 denied, 2 withdrawn.', status: 'complete' }
];

function createToolCall(status: ToolCall['status']): ToolCall {
  return { id: 'tool-call-1', messageId: 'message-1', name: 'displaySteps', args: { steps }, status, type: 'agent' };
}

const meta = {
  title: 'AI/Components/Tool Steps',
  component,
  render: () => html`<forge-ai-tool-steps .toolCall=${createToolCall('complete')}></forge-ai-tool-steps>`
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Running: Story = {
  render: () => html`<forge-ai-tool-steps .toolCall=${createToolCall('executing')}></forge-ai-tool-steps>`
};
