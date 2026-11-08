import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge-ai/ai-tool-call-indicator';
import type { ToolCall, ToolDefinition } from '@tylertech/forge-ai/types';

const component = 'forge-ai-tool-call-indicator';

const tools = new Map<string, ToolDefinition>([
  ['getCurrentWeather', { name: 'getCurrentWeather', displayName: 'Get current weather' }],
  ['lookup_case', { name: 'lookup_case', displayName: 'Case lookup' }]
]);

const toolCalls: ToolCall[] = [
  {
    id: 'tool-1',
    messageId: 'message-1',
    name: 'getCurrentWeather',
    args: { location: 'San Francisco' },
    result: { temperature: 68, condition: 'Sunny' },
    status: 'complete',
    type: 'agent',
    startTimestamp: 1000,
    endTimestamp: 1420
  },
  {
    id: 'tool-2',
    messageId: 'message-1',
    name: 'lookup_case',
    args: { caseId: 'CASE-123' },
    result: { message: 'Case not found' },
    status: 'error',
    type: 'agent',
    startTimestamp: 1420,
    endTimestamp: 2210
  }
];

const meta = {
  title: 'AI/Tool Call Indicator',
  component
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {
  render: () => html` <forge-ai-tool-call-indicator .tools=${tools} .toolCalls=${toolCalls}> </forge-ai-tool-call-indicator> `
};

export const DebugMode: Story = {
  render: () => html` <forge-ai-tool-call-indicator debug-mode .tools=${tools} .toolCalls=${toolCalls}> </forge-ai-tool-call-indicator> `
};

/**
 * The indicator only renders whatever `ToolCall.status` it is given, so a failed call is just a
 * `status: 'error'` entry. In debug mode its error result shows under the tool's friendly name.
 */
export const FailedToolCall: Story = {
  render: () => html` <forge-ai-tool-call-indicator debug-mode .tools=${tools} .toolCalls=${[toolCalls[1]]}> </forge-ai-tool-call-indicator> `
};

/**
 * A call shows as running while its `status` is not `complete` or `error` (here `executing`).
 */
export const Running: Story = {
  render: () => html`
    <forge-ai-tool-call-indicator .tools=${tools} .toolCalls=${[{ ...toolCalls[0], status: 'executing', result: undefined, endTimestamp: undefined }]}>
    </forge-ai-tool-call-indicator>
  `
};
