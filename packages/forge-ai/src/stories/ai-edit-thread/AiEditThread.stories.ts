import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';
import type { Thread } from '@tylertech/forge-ai/types';

import '@tylertech/forge-ai/ai-edit-thread';

const component = 'forge-ai-edit-thread';

const thread: Thread = {
  id: 'thread-1',
  title: 'Quarterly planning',
  createdAt: '2025-01-15T10:00:00.000Z'
};

const meta = {
  title: 'Components/Conversations/Edit Thread',
  component,
  argTypes: {
    value: {
      control: 'text',
      description: 'The initial text of the input'
    },
    density: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'The density of the cancel and save buttons'
    }
  },
  args: {
    value: thread.title,
    density: 'small'
  },
  render: args => html`
    <forge-ai-edit-thread
      .thread=${thread}
      value=${args.value}
      density=${args.density}
      @forge-ai-edit-thread-save=${(evt: CustomEvent) => action('forge-ai-edit-thread-save')(evt.detail)}
      @forge-ai-edit-thread-cancel=${action('forge-ai-edit-thread-cancel')}>
    </forge-ai-edit-thread>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

/** The medium density uses larger cancel and save buttons. */
export const Medium: Story = {
  args: {
    density: 'medium'
  }
};
