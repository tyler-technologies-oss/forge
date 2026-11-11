import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-ai/ai-response-message-toolbar';

const component = 'forge-ai-response-message-toolbar';

const storyStyles = html`<style>
  .response-toolbar-story-hint {
    margin: 0 0 var(--forge-spacing-medium) 0;
    color: var(--forge-theme-text-primary);
  }
  .response-toolbar-story-context {
    max-inline-size: 600px;
    background: var(--forge-theme-surface);
    border-radius: 8px;
    padding: var(--forge-spacing-medium);
  }
  .response-toolbar-story-message {
    margin-block-end: var(--forge-spacing-small);
    padding: var(--forge-spacing-small);
    background: var(--forge-theme-surface-variant);
    border-radius: 4px;
    color: var(--forge-theme-text-primary);
  }
</style>`;

const meta = {
  title: 'Components/Messages/Response Message Toolbar',
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
      ${storyStyles}
      <p class="response-toolbar-story-hint">Click any button to see events in the Actions panel below.</p>
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
      ${storyStyles}
      <div class="response-toolbar-story-context">
        <div class="response-toolbar-story-message">
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
