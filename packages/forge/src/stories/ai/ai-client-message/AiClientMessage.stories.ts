import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-ai/ai-client-message';
import { type ClientMessageAction, type ClientMessageKind } from '@tylertech/forge-ai/types';

const component = 'forge-ai-client-message';

const storyStyles = html`<style>
  .client-message-story-list {
    display: flex;
    flex-direction: column;
    gap: var(--forge-spacing-medium);
    max-inline-size: 480px;
  }
</style>`;

const meta = {
  title: 'AI/Components/Messages/Client Message',
  component,
  argTypes: {
    kind: {
      control: 'select',
      options: ['text', 'info', 'warning', 'error', 'success'],
      description: 'Visual treatment. "text" matches the plain, italic system-message style.'
    },
    header: {
      control: 'text',
      description: 'Optional bold title, shown above the content (ignored for kind="text")'
    },
    content: {
      control: 'text',
      description: 'Message text'
    }
  },
  args: {
    kind: 'info' as ClientMessageKind,
    header: '',
    content: 'Your document finished indexing and is ready to search.'
  },
  render: args => {
    const onActionClick = action('action-click');
    const actions: ClientMessageAction[] = [
      { id: 'dismiss', label: 'Dismiss', onClick: () => onActionClick('dismiss') },
      { id: 'retry', label: 'Retry', onClick: () => onActionClick('retry') }
    ];

    return html`
      <forge-ai-client-message kind=${args.kind} .header=${args.header || undefined} .content=${args.content} .actions=${actions}> </forge-ai-client-message>
    `;
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const AllKinds: Story = {
  render: () => {
    const onActionClick = action('action-click');
    const kinds: { kind: ClientMessageKind; header?: string; content: string }[] = [
      { kind: 'text', content: 'Switched to Research Assistant' },
      { kind: 'info', header: 'Heads up', content: 'This agent has access to your uploaded documents.' },
      {
        kind: 'warning',
        header: 'Approaching limit',
        content: "You're nearing the monthly usage limit for this agent."
      },
      {
        kind: 'error',
        header: 'Session expired',
        content: 'Your session expired. Please refresh the page to re-authenticate.'
      },
      { kind: 'success', content: 'File uploaded successfully.' }
    ];

    return html`
      ${storyStyles}
      <div class="client-message-story-list">
        ${kinds.map(({ kind, header, content }) => {
          const actions: ClientMessageAction[] = kind === 'error' ? [{ id: 'refresh', label: 'Refresh', onClick: () => onActionClick('refresh') }] : [];
          return html` <forge-ai-client-message kind=${kind} .header=${header} .content=${content} .actions=${actions}></forge-ai-client-message> `;
        })}
      </div>
    `;
  }
};
