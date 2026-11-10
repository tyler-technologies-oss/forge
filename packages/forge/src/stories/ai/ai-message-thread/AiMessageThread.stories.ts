import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-ai/ai-message-thread';
import '@tylertech/forge-ai/ai-suggestions';
import { type ClientMessageAction, type MessageItem, type ToolDefinition } from '@tylertech/forge-ai/types';

const component = 'forge-ai-message-thread';

const meta = {
  title: 'AI/Components/Message Thread',
  component,
  argTypes: {
    enableReactions: {
      control: 'boolean',
      description: 'Enable thumbs up/down reaction buttons on assistant messages'
    },
    showThinking: {
      control: 'boolean',
      description: 'Show thinking indicator when AI is processing'
    },
    debugMode: {
      control: 'boolean',
      description: 'Show tool call inputs/outputs in the expanded tool call timeline'
    },
    autoScroll: {
      control: { type: 'select' },
      options: ['off', 'on'],
      description: 'Automatically emit scroll-request when content changes',
      defaultValue: 'on'
    }
  },
  args: {
    enableReactions: false,
    showThinking: false,
    debugMode: false,
    autoScroll: 'on'
  },
  render: args => {
    const sampleMessages: MessageItem[] = [
      {
        type: 'message',
        data: {
          id: 'msg-1',
          role: 'user',
          content: 'Hello! Can you help me understand web components?',
          timestamp: Date.now() - 60000,
          status: 'complete'
        }
      },
      {
        type: 'message',
        data: {
          id: 'msg-2',
          role: 'assistant',
          content:
            'Of course! Web Components are a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.\n\nThe main technologies are:\n- **Custom Elements**: Define new HTML elements\n- **Shadow DOM**: Encapsulated styles and markup\n- **HTML Templates**: Reusable markup patterns',
          timestamp: Date.now() - 55000,
          status: 'complete'
        }
      },
      {
        type: 'message',
        data: {
          id: 'msg-3',
          role: 'user',
          content: 'Can you show me a tool call example?',
          timestamp: Date.now() - 30000,
          status: 'complete'
        }
      },
      {
        type: 'toolCall',
        data: {
          id: 'tool-1',
          messageId: 'msg-4',
          name: 'search_documentation',
          args: { query: 'web components tool call example' },
          status: 'complete',
          type: 'client',
          result: { found: true }
        }
      },
      {
        type: 'message',
        data: {
          id: 'msg-4',
          role: 'assistant',
          content: "I've searched the documentation and found some examples for you!",
          timestamp: Date.now() - 20000,
          status: 'complete'
        }
      },
      {
        type: 'message',
        data: {
          id: 'msg-5',
          role: 'user',
          content: 'Now look up the latest release and summarize it.',
          timestamp: Date.now() - 15000,
          status: 'complete'
        }
      },
      {
        type: 'assistant',
        data: {
          id: 'res-1',
          status: 'complete',
          timestamp: Date.now() - 10000,
          children: [
            { type: 'text', messageId: 'res-1', content: 'Let me gather the details for you.\n\n', status: 'complete' },
            {
              type: 'toolCall',
              data: {
                id: 'tc-1',
                messageId: 'res-1',
                name: 'fetch_release',
                args: { channel: 'stable' },
                status: 'complete',
                type: 'agent',
                result: { version: '2.4.0', date: '2026-06-20' },
                startTimestamp: Date.now() - 10000,
                endTimestamp: Date.now() - 9200
              }
            },
            {
              type: 'toolCall',
              data: {
                id: 'tc-2',
                messageId: 'res-1',
                name: 'search_documentation',
                args: { query: 'release notes 2.4.0' },
                status: 'complete',
                type: 'client',
                result: { found: true, sections: 3 },
                startTimestamp: Date.now() - 9200,
                endTimestamp: Date.now() - 8500
              }
            },
            {
              type: 'text',
              messageId: 'res-1',
              content: 'The latest stable release is **2.4.0** (June 20, 2026), which focuses on tooling improvements.',
              status: 'complete'
            }
          ]
        }
      }
    ];

    const sampleTools: Map<string, ToolDefinition> = new Map([
      [
        'search_documentation',
        {
          name: 'search_documentation',
          displayName: 'Search Documentation',
          description: 'Search through documentation'
        }
      ],
      [
        'fetch_release',
        {
          name: 'fetch_release',
          displayName: 'Fetch Release',
          description: 'Fetch the latest release information'
        }
      ]
    ]);

    const onCopy = action('forge-ai-message-thread-copy');
    const onResend = action('forge-ai-message-thread-resend');
    const onThumbsUp = action('forge-ai-message-thread-thumbs-up');
    const onThumbsDown = action('forge-ai-message-thread-thumbs-down');
    const onScrollRequest = action('forge-ai-message-thread-scroll-request');

    return html`
      <div style="width: 100%; height: 600px; max-width: 800px; margin: 0 auto; border: 1px solid #ccc; overflow: hidden;">
        <forge-ai-message-thread
          .messageItems=${sampleMessages}
          .tools=${sampleTools}
          ?enable-reactions=${args.enableReactions}
          ?show-thinking=${args.showThinking}
          ?debug-mode=${args.debugMode}
          auto-scroll=${args.autoScroll}
          @forge-ai-message-thread-copy=${onCopy}
          @forge-ai-message-thread-resend=${onResend}
          @forge-ai-message-thread-thumbs-up=${onThumbsUp}
          @forge-ai-message-thread-thumbs-down=${onThumbsDown}
          @forge-ai-message-thread-scroll-request=${onScrollRequest}>
        </forge-ai-message-thread>
      </div>
    `;
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const WithToolCalls: Story = {
  render: args => {
    const messageItems: MessageItem[] = [
      {
        type: 'message',
        data: {
          id: 'msg-1',
          role: 'user',
          content: 'How many permits are overdue, and which departments are they stuck in?',
          timestamp: Date.now() - 20000,
          status: 'complete'
        }
      },
      {
        type: 'assistant',
        data: {
          id: 'res-1',
          status: 'complete',
          timestamp: Date.now() - 15000,
          children: [
            {
              type: 'text',
              messageId: 'res-1',
              content: "Let me check the current backlog. First I'll pull every pending permit, then narrow it down to the ones past their SLA.\n\n",
              status: 'complete'
            },
            {
              type: 'toolCall',
              data: {
                id: 'tc-1',
                messageId: 'res-1',
                name: 'permits.query',
                // eslint-disable-next-line camelcase -- sample tool arguments mimic a snake_case backend API
                args: { status: 'pending', sla: 'overdue', window_days: 30 },
                status: 'complete',
                type: 'agent',
                // eslint-disable-next-line camelcase -- sample tool result mimic a snake_case backend API
                result: { overdue_count: 412, total_pending: 1183, oldest_days: 47 },
                startTimestamp: Date.now() - 15000,
                endTimestamp: Date.now() - 14600
              }
            },
            {
              type: 'toolCall',
              data: {
                id: 'tc-2',
                messageId: 'res-1',
                name: 'permits.group_by',
                args: { field: 'reviewing_department', filter: 'overdue' },
                status: 'complete',
                type: 'agent',
                result: {
                  Building: 168,
                  Zoning: 121,
                  Fire: 74,
                  'Public Works': 49
                },
                startTimestamp: Date.now() - 14600,
                endTimestamp: Date.now() - 14100
              }
            },
            {
              type: 'text',
              messageId: 'res-1',
              content:
                "There are **412 overdue permits** out of 1,183 pending, with the oldest sitting **47 days** past its SLA.\n\nBy reviewing department:\n- **Building** — 168\n- **Zoning** — 121\n- **Fire** — 74\n- **Public Works** — 49\n\nBuilding and Zoning together account for roughly 70% of the backlog, so they're the best place to focus.",
              status: 'complete'
            }
          ]
        }
      }
    ];

    const tools: Map<string, ToolDefinition> = new Map([
      [
        'permits.query',
        {
          name: 'permits.query',
          displayName: 'Query Permits',
          description: 'Pull permits matching a status and SLA window'
        }
      ],
      [
        'permits.group_by',
        {
          name: 'permits.group_by',
          displayName: 'Group Permits',
          description: 'Break the backlog down by a field'
        }
      ]
    ]);

    const onCopy = action('forge-ai-message-thread-copy');
    const onResend = action('forge-ai-message-thread-resend');
    const onThumbsUp = action('forge-ai-message-thread-thumbs-up');
    const onThumbsDown = action('forge-ai-message-thread-thumbs-down');
    const onScrollRequest = action('forge-ai-message-thread-scroll-request');

    return html`
      <div style="width: 100%; height: 600px; max-width: 800px; margin: 0 auto; border: 1px solid #ccc; overflow: hidden;">
        <forge-ai-message-thread
          .messageItems=${messageItems}
          .tools=${tools}
          ?enable-reactions=${args.enableReactions}
          ?show-thinking=${args.showThinking}
          ?debug-mode=${args.debugMode}
          auto-scroll=${args.autoScroll}
          @forge-ai-message-thread-copy=${onCopy}
          @forge-ai-message-thread-resend=${onResend}
          @forge-ai-message-thread-thumbs-up=${onThumbsUp}
          @forge-ai-message-thread-thumbs-down=${onThumbsDown}
          @forge-ai-message-thread-scroll-request=${onScrollRequest}>
        </forge-ai-message-thread>
      </div>
    `;
  }
};

export const WithErroredToolCalls: Story = {
  render: args => {
    const messageItems: MessageItem[] = [
      {
        type: 'message',
        data: {
          id: 'msg-1',
          role: 'user',
          content: 'Pull the latest sales figures and email them to the leadership list.',
          timestamp: Date.now() - 20000,
          status: 'complete'
        }
      },
      {
        type: 'assistant',
        data: {
          id: 'res-1',
          status: 'complete',
          timestamp: Date.now() - 15000,
          children: [
            {
              type: 'text',
              messageId: 'res-1',
              content: "I'll grab the numbers first, then send them out.\n\n",
              status: 'complete'
            },
            {
              type: 'toolCall',
              data: {
                id: 'tc-1',
                messageId: 'res-1',
                name: 'sales.fetch_report',
                args: { period: 'Q2-2026', region: 'all' },
                status: 'complete',
                type: 'agent',
                result: { total: 4820000, currency: 'USD', rows: 128 },
                startTimestamp: Date.now() - 15000,
                endTimestamp: Date.now() - 14500
              }
            },
            {
              type: 'toolCall',
              data: {
                id: 'tc-2',
                messageId: 'res-1',
                name: 'email.send',
                args: { list: 'leadership', subject: 'Q2 2026 Sales' },
                status: 'error',
                type: 'agent',
                result: { error: 'SMTP 550: recipient list "leadership" not found', code: 550 },
                startTimestamp: Date.now() - 14500,
                endTimestamp: Date.now() - 13900
              }
            },
            {
              type: 'text',
              messageId: 'res-1',
              content:
                'I pulled the Q2 2026 report (**$4.82M** across 128 rows), but sending the email **failed** — the mailing list `leadership` could not be found. Could you confirm the correct list name or share the recipient addresses?',
              status: 'complete'
            }
          ]
        }
      }
    ];

    const tools: Map<string, ToolDefinition> = new Map([
      [
        'sales.fetch_report',
        {
          name: 'sales.fetch_report',
          displayName: 'Fetch Sales Report',
          description: 'Pull an aggregated sales report for a period'
        }
      ],
      [
        'email.send',
        {
          name: 'email.send',
          displayName: 'Send Email',
          description: 'Send an email to a distribution list'
        }
      ]
    ]);

    const onCopy = action('forge-ai-message-thread-copy');
    const onResend = action('forge-ai-message-thread-resend');
    const onThumbsUp = action('forge-ai-message-thread-thumbs-up');
    const onThumbsDown = action('forge-ai-message-thread-thumbs-down');
    const onScrollRequest = action('forge-ai-message-thread-scroll-request');

    return html`
      <div style="width: 100%; height: 600px; max-width: 800px; margin: 0 auto; border: 1px solid #ccc; overflow: hidden;">
        <forge-ai-message-thread
          .messageItems=${messageItems}
          .tools=${tools}
          ?enable-reactions=${args.enableReactions}
          ?show-thinking=${args.showThinking}
          ?debug-mode=${args.debugMode}
          auto-scroll=${args.autoScroll}
          @forge-ai-message-thread-copy=${onCopy}
          @forge-ai-message-thread-resend=${onResend}
          @forge-ai-message-thread-thumbs-up=${onThumbsUp}
          @forge-ai-message-thread-thumbs-down=${onThumbsDown}
          @forge-ai-message-thread-scroll-request=${onScrollRequest}>
        </forge-ai-message-thread>
      </div>
    `;
  }
};

export const WithClientMessages: Story = {
  render: args => {
    const onCopy = action('forge-ai-message-thread-copy');
    const onResend = action('forge-ai-message-thread-resend');
    const onThumbsUp = action('forge-ai-message-thread-thumbs-up');
    const onThumbsDown = action('forge-ai-message-thread-thumbs-down');
    const onScrollRequest = action('forge-ai-message-thread-scroll-request');
    const onActionClick = action('client-message-action-click');
    const refreshAction: ClientMessageAction[] = [{ id: 'refresh', label: 'Refresh', onClick: () => onActionClick('refresh') }];

    const messageItems: MessageItem[] = [
      {
        type: 'message',
        data: {
          id: 'msg-1',
          role: 'user',
          content: 'Summarize the latest incident report.',
          timestamp: Date.now() - 90000,
          status: 'complete'
        }
      },
      {
        type: 'message',
        data: {
          id: 'switch-1',
          role: 'system',
          content: 'Switched to Incident Response Agent',
          timestamp: Date.now() - 85000,
          status: 'complete',
          clientOnly: true
        }
      },
      {
        type: 'message',
        data: {
          id: 'msg-2',
          role: 'assistant',
          content: 'Here is a summary of the most recent incident report...',
          timestamp: Date.now() - 80000,
          status: 'complete'
        }
      },
      {
        type: 'message',
        data: {
          id: 'indexing-1',
          role: 'system',
          content: 'Indexing 3 uploaded documents...',
          timestamp: Date.now() - 60000,
          status: 'complete',
          clientOnly: true,
          kind: 'info',
          header: 'Indexing'
        }
      },
      {
        type: 'message',
        data: {
          id: 'upload-error-1',
          role: 'system',
          content: 'incident-photos.zip could not be uploaded because it exceeds the 25 MB limit.',
          timestamp: Date.now() - 50000,
          status: 'complete',
          clientOnly: true,
          kind: 'warning',
          header: 'Upload failed'
        }
      },
      {
        type: 'message',
        data: {
          id: 'msg-3',
          role: 'user',
          content: 'Send a message now.',
          timestamp: Date.now() - 30000,
          status: 'complete'
        }
      },
      {
        type: 'message',
        data: {
          id: 'session-expired-1',
          role: 'system',
          content: 'Your session expired. Please refresh the page to re-authenticate.',
          timestamp: Date.now() - 25000,
          status: 'complete',
          clientOnly: true,
          kind: 'error',
          header: 'Session expired',
          actions: refreshAction
        }
      },
      {
        type: 'message',
        data: {
          id: 'upload-success-1',
          role: 'system',
          content: 'incident-photos-resized.zip uploaded successfully.',
          timestamp: Date.now() - 10000,
          status: 'complete',
          clientOnly: true,
          kind: 'success'
        }
      }
    ];

    return html`
      <div style="width: 100%; height: 600px; max-width: 800px; margin: 0 auto; border: 1px solid #ccc; overflow: hidden;">
        <forge-ai-message-thread
          .messageItems=${messageItems}
          ?enable-reactions=${args.enableReactions}
          ?show-thinking=${args.showThinking}
          ?debug-mode=${args.debugMode}
          auto-scroll=${args.autoScroll}
          @forge-ai-message-thread-copy=${onCopy}
          @forge-ai-message-thread-resend=${onResend}
          @forge-ai-message-thread-thumbs-up=${onThumbsUp}
          @forge-ai-message-thread-thumbs-down=${onThumbsDown}
          @forge-ai-message-thread-scroll-request=${onScrollRequest}>
        </forge-ai-message-thread>
      </div>
    `;
  }
};
