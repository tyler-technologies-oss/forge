import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-ai/ai-response-message-toolbar';

const component = 'forge-ai-response-message-toolbar';

const meta = {
  title: 'AI/Response Message Toolbar',
  component,
  argTypes: {
    enableReactions: {
      control: 'boolean',
      description: 'Whether to show thumbs up/down reaction buttons'
    },
    feedbackType: {
      control: 'select',
      options: [undefined, 'positive', 'negative'],
      description: 'The current feedback state'
    }
  },
  args: {
    enableReactions: false,
    feedbackType: undefined
  },
  render: (args: any) => {
    const onAction = action('forge-ai-response-message-toolbar-action');
    const onFeedback = action('forge-ai-response-message-toolbar-feedback');
    return html`
      <p style="margin: 0 0 16px 0; color: var(--forge-theme-text-primary);">Click any button to see events in the Actions panel below.</p>
      <forge-ai-response-message-toolbar
        ?enable-reactions=${args.enableReactions}
        feedback-type=${args.feedbackType || ''}
        @forge-ai-response-message-toolbar-action=${onAction}
        @forge-ai-response-message-toolbar-feedback=${onFeedback}>
      </forge-ai-response-message-toolbar>
    `;
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const WithReactions: Story = {
  args: {
    enableReactions: true
  }
};

export const InMessageContext: Story = {
  args: {
    enableReactions: true
  },
  render: (args: any) => {
    const onAction = action('forge-ai-response-message-toolbar-action');
    const onFeedback = action('forge-ai-response-message-toolbar-feedback');
    return html`
      <div style="max-width: 600px; background: var(--forge-theme-surface); border-radius: 8px; padding: 16px;">
        <div
          style="margin-bottom: 12px; padding: 12px; background: var(--forge-theme-surface-variant); border-radius: 4px; color: var(--forge-theme-text-primary);">
          This is sample AI response content. The toolbar demonstrates how it would appear below an AI response message.
        </div>
        <forge-ai-response-message-toolbar
          ?enable-reactions=${args.enableReactions}
          @forge-ai-response-message-toolbar-action=${onAction}
          @forge-ai-response-message-toolbar-feedback=${onFeedback}>
        </forge-ai-response-message-toolbar>
      </div>
    `;
  }
};
