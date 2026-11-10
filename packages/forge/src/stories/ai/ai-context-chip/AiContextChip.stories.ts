import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-ai/ai-context-chip';

const component = 'forge-ai-context-chip';

const meta = {
  title: 'AI/Components/Input & Context/Context Chip',
  component,
  argTypes: {
    id: {
      control: 'text',
      description: 'Identifier for the chip, included in the remove event'
    },
    label: {
      control: 'text',
      description: 'The text shown in the chip'
    },
    sublabel: {
      control: 'text',
      description: 'Secondary text shown after the label. Hidden while `loading` is set'
    },
    type: {
      control: 'select',
      options: [undefined, 'context', 'file'],
      description: 'Selects the icon. `file` shows a document icon; anything else shows a context icon'
    },
    removable: {
      control: 'boolean',
      description: 'Whether the remove button is shown'
    },
    loading: {
      control: 'boolean',
      description: 'Replaces the sublabel with a spinner'
    }
  },
  args: {
    id: 'context-1',
    label: 'Selected case',
    sublabel: '',
    type: undefined,
    removable: true,
    loading: false
  },
  render: args => html`
    <forge-ai-context-chip
      .id=${args.id}
      .label=${args.label}
      .sublabel=${args.sublabel || undefined}
      .type=${args.type}
      .removable=${args.removable}
      .loading=${args.loading}
      @forge-ai-context-chip-remove=${action('forge-ai-context-chip-remove')}>
    </forge-ai-context-chip>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

/** A file chip with a sublabel, such as a file size. */
export const File: Story = {
  args: {
    id: 'file-1',
    label: 'quarterly-report.pdf',
    sublabel: '2.4 MB',
    type: 'file'
  }
};

/** Shows a spinner while the context is being prepared. */
export const Loading: Story = {
  args: {
    id: 'file-2',
    label: 'permits.csv',
    type: 'file',
    loading: true
  }
};
