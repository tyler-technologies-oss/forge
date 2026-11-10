import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';
import type { Thread } from '@tylertech/forge-ai/types';

import '@tylertech/forge-ai/ai-thread-actions-menu';

const component = 'forge-ai-thread-actions-menu';

const thread: Thread = {
  id: 'thread-1',
  title: 'Quarterly planning',
  createdAt: '2025-01-15T10:00:00.000Z'
};

const meta = {
  title: 'AI/Components/Conversations/Thread Actions Menu',
  component,
  argTypes: {
    showRename: {
      control: 'boolean',
      description: 'Whether the menu includes a Rename item'
    },
    showDelete: {
      control: 'boolean',
      description: 'Whether the menu includes a Delete item'
    },
    density: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The density of the trigger button'
    }
  },
  args: {
    showRename: true,
    showDelete: true,
    density: 'small'
  },
  render: args => html`
    <forge-ai-thread-actions-menu
      .thread=${thread}
      ?show-rename=${args.showRename}
      ?show-delete=${args.showDelete}
      density=${args.density}
      @forge-ai-thread-actions-menu-rename=${(evt: CustomEvent) => action('forge-ai-thread-actions-menu-rename')(evt.detail)}
      @forge-ai-thread-actions-menu-delete-click=${(evt: CustomEvent) => action('forge-ai-thread-actions-menu-delete-click')(evt.detail)}
      @forge-ai-thread-actions-menu-open=${(evt: CustomEvent) => action('forge-ai-thread-actions-menu-open')(evt.detail)}
      @forge-ai-thread-actions-menu-close=${action('forge-ai-thread-actions-menu-close')}>
    </forge-ai-thread-actions-menu>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

/** Show only the actions your app supports. Here the menu offers rename and no delete. */
export const RenameOnly: Story = {
  args: {
    showDelete: false
  }
};
