import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { ToolCall } from '@tylertech/forge-ai/types';

import '@tylertech/forge-ai/tools';

const component = 'forge-ai-tool-data-table';

const headers = ['Department', 'Open permits', 'Overdue', 'Avg. days open'];
const departments = ['Building', 'Zoning', 'Fire', 'Public Works', 'Planning', 'Health', 'Parks', 'Transit'];
const rows = Array.from({ length: 24 }, (_, index) => [
  `${departments[index % departments.length]} ${Math.floor(index / departments.length) + 1}`,
  100 + index * 7,
  10 + index * 3,
  12 + (index % 9)
]);

function createToolCall(args: { title?: string; headers: string[]; rows: (string | number)[][]; maxNumberOfRows?: number }): ToolCall {
  return {
    id: 'tool-call-1',
    messageId: 'message-1',
    name: 'displayDataTable',
    args,
    status: 'complete',
    type: 'agent'
  };
}

const meta = {
  title: 'AI/Data Table',
  component,
  render: () => html` <forge-ai-tool-data-table .toolCall=${createToolCall({ title: 'Permits by department', headers, rows })}></forge-ai-tool-data-table> `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const SmallTable: Story = {
  render: () => html`
    <forge-ai-tool-data-table .toolCall=${createToolCall({ title: 'Top departments', headers, rows: rows.slice(0, 3) })}></forge-ai-tool-data-table>
  `
};

export const CustomPageSize: Story = {
  render: () => html`
    <forge-ai-tool-data-table .toolCall=${createToolCall({ title: 'Permits by department', headers, rows, maxNumberOfRows: 5 })}></forge-ai-tool-data-table>
  `
};
