import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-ai/ai-user-message-toolbar';

const component = 'forge-ai-user-message-toolbar';

const meta = {
  title: 'AI/Components/User Message Toolbar',
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
      <p style="margin: 0 0 16px 0; color: var(--forge-theme-text-primary);">Click any button to see events in the Actions panel below.</p>
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
      <div style="max-width: 600px;">
        <div
          style="margin-left: auto; width: fit-content; margin-bottom: 12px; padding: 12px; background: var(--forge-theme-surface-container-minimum); border-radius: 8px; border-top-right-radius: 0; color: var(--forge-theme-text-primary);">
          This is a sample user message. The toolbar demonstrates how it would appear below a user's message in the chat.
        </div>
        <div style="display: flex; justify-content: flex-end;">
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
