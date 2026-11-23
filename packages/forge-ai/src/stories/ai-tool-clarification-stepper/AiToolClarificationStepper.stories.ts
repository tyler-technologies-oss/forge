import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { ToolCall } from '@tylertech/forge-ai/types';

import '@tylertech/forge-ai/tools';

const component = 'forge-ai-tool-clarification-stepper';

const questions = [
  {
    id: 'date-field',
    question: 'Which date should the report use?',
    options: [
      { label: 'Report date', value: 'report_date' },
      { label: 'Status date', value: 'status_date', recommended: true }
    ]
  },
  {
    id: 'time-window',
    question: 'What should "last quarter" mean?',
    options: [
      { label: 'Previous calendar quarter', value: 'calendar_quarter', recommended: true },
      { label: 'Trailing three months', value: 'trailing_3_months' }
    ],
    allowCustom: false
  }
];

const answers = [
  { questionId: 'date-field', value: 'status_date', label: 'Status date', custom: false },
  { questionId: 'time-window', value: 'calendar_quarter', label: 'Previous calendar quarter', custom: false }
];

function createToolCall(status: ToolCall['status'], result?: unknown): ToolCall {
  return { id: 'tool-call-1', messageId: 'message-1', name: 'askClarification', args: { questions }, result, status, type: 'client' };
}

const meta = {
  title: 'Components/Tools & Reasoning/Tool Clarification Stepper',
  component,
  render: () => html`<forge-ai-tool-clarification-stepper .toolCall=${createToolCall('executing')}></forge-ai-tool-clarification-stepper>`
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Answered: Story = {
  render: () => html`<forge-ai-tool-clarification-stepper .toolCall=${createToolCall('complete', { answers })}></forge-ai-tool-clarification-stepper>`
};
