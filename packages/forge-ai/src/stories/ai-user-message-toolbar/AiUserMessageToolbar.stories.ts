import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-ai/ai-user-message-toolbar';

const component = 'forge-ai-user-message-toolbar';

const storyStyles = html`<style>
  .user-toolbar-story-hint {
    margin: 0 0 var(--forge-spacing-medium) 0;
    color: var(--forge-theme-text-primary);
  }
  .user-toolbar-story-context {
    max-inline-size: 600px;
  }
  .user-toolbar-story-message {
    margin-inline-start: auto;
    inline-size: fit-content;
    margin-block-end: var(--forge-spacing-small);
    padding: var(--forge-spacing-small);
    background: var(--forge-theme-surface-container-minimum);
    border-radius: 8px;
    border-start-end-radius: 0;
    color: var(--forge-theme-text-primary);
  }
  .user-toolbar-story-toolbar {
    display: flex;
    justify-content: flex-end;
  }
</style>`;

const meta = {
  title: 'Components/Messages/User Message Toolbar',
  component,
  argTypes: {
    timestamp: {
      control: 'number',
      description: 'Timestamp to display (Unix timestamp in milliseconds)'
    },
    streaming: {
      control: 'boolean',
      description: 'Whether the AI is currently streaming a response (disables resend/edit buttons)'
    }
  },
  args: {
    timestamp: Date.now(),
    streaming: false
  },
  render: (args: any) => {
    const onCopy = action('forge-ai-user-message-toolbar-copy');
    const onResend = action('forge-ai-user-message-toolbar-resend');
    const onEdit = action('forge-ai-user-message-toolbar-edit');
    return html`
      ${storyStyles}
      <p class="user-toolbar-story-hint">Click any button to see events in the Actions panel below.</p>
      <forge-ai-user-message-toolbar
        .timestamp=${args.timestamp}
        ?streaming=${args.streaming}
        @forge-ai-user-message-toolbar-copy=${onCopy}
        @forge-ai-user-message-toolbar-resend=${onResend}
        @forge-ai-user-message-toolbar-edit=${onEdit}>
      </forge-ai-user-message-toolbar>
    `;
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Streaming: Story = {
  args: {
    streaming: true
  }
};

export const InMessageContext: Story = {
  render: (args: any) => {
    const onCopy = action('forge-ai-user-message-toolbar-copy');
    const onResend = action('forge-ai-user-message-toolbar-resend');
    const onEdit = action('forge-ai-user-message-toolbar-edit');
    return html`
      ${storyStyles}
      <div class="user-toolbar-story-context">
        <div class="user-toolbar-story-message">
          This is a sample user message. The toolbar demonstrates how it would appear below a user's message in the chat.
        </div>
        <div class="user-toolbar-story-toolbar">
          <forge-ai-user-message-toolbar
            .timestamp=${Date.now()}
            @forge-ai-user-message-toolbar-copy=${onCopy}
            @forge-ai-user-message-toolbar-resend=${onResend}
            @forge-ai-user-message-toolbar-edit=${onEdit}>
          </forge-ai-user-message-toolbar>
        </div>
      </div>
    `;
  }
};
