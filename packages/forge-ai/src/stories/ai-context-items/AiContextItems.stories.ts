import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';
import type { ContextItem } from '@tylertech/forge-ai/types';

import '@tylertech/forge-ai/ai-context-items';

const component = 'forge-ai-context-items';

const items: ContextItem[] = [
  { id: 'case-1', label: 'Case CASE-123', type: 'context' },
  { id: 'file-1', label: 'quarterly-report.pdf', sublabel: '2.4 MB', type: 'file' },
  { id: 'file-2', label: 'permits.csv', type: 'file', loading: true }
];

const meta = {
  title: 'Components/Input & Context/Context Items',
  component,
  argTypes: {
    items: {
      control: 'object',
      description: 'The context items to display. Each item supports `id`, `label`, `sublabel`, `type`, `removable`, and `loading`'
    }
  },
  args: {
    items
  },
  render: args => html`
    <forge-ai-context-items .items=${args.items} @forge-ai-context-items-remove=${action('forge-ai-context-items-remove')}></forge-ai-context-items>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

/** Items with `removable: false` do not show a remove button. */
export const NotRemovable: Story = {
  args: {
    items: [
      { id: 'case-1', label: 'Case CASE-123', removable: false },
      { id: 'case-2', label: 'Case CASE-456', removable: false }
    ]
  }
};
