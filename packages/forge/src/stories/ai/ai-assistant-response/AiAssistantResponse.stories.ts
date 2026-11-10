import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';
import { createToolRenderer } from '@tylertech/forge-ai/ai-tool-call';
import type { AssistantResponse, ToolDefinition } from '@tylertech/forge-ai/types';

import '@tylertech/forge-ai/ai-assistant-response';

const component = 'forge-ai-assistant-response';

const tools = new Map<string, ToolDefinition>([
  [
    'getCurrentWeather',
    {
      name: 'getCurrentWeather',
      displayName: 'Get current weather',
      renderer: createToolRenderer({
        render: toolCall => {
          const element = document.createElement('p');
          const { temperature, condition } = (toolCall.result ?? {}) as { temperature?: number; condition?: string };
          element.textContent = `${toolCall.args.location}: ${temperature}°F, ${condition}`;
          return element;
        }
      })
    }
  ]
]);

const textResponse: AssistantResponse = {
  id: 'response-1',
  status: 'complete',
  timestamp: 1700000000000,
  children: [
    {
      type: 'text',
      messageId: 'message-1',
      status: 'complete',
      content:
        'Generics let you write **reusable** code that works with different types while keeping type safety.\n\n- Use `<T>` to declare a type parameter\n- Constrain it with `extends`'
    }
  ]
};

const toolCallResponse: AssistantResponse = {
  id: 'response-2',
  status: 'complete',
  timestamp: 1700000000000,
  children: [
    { type: 'text', messageId: 'message-1', status: 'complete', content: 'Let me check the weather for you.' },
    {
      type: 'toolCall',
      data: {
        id: 'tool-call-1',
        messageId: 'message-1',
        name: 'getCurrentWeather',
        args: { location: 'San Francisco' },
        result: { temperature: 68, condition: 'Sunny' },
        status: 'complete',
        type: 'agent',
        startTimestamp: 1000,
        endTimestamp: 1420
      }
    },
    { type: 'text', messageId: 'message-2', status: 'complete', content: "It's sunny and 68°F in San Francisco." }
  ]
};

const thinkingResponse: AssistantResponse = {
  id: 'response-3',
  status: 'streaming',
  timestamp: 1700000000000,
  isThinking: true,
  children: []
};

const meta = {
  title: 'AI/Components/Messages/Assistant Response',
  component,
  argTypes: {
    enableReactions: {
      control: 'boolean',
      description: 'Whether the toolbar shows thumbs up and thumbs down buttons'
    },
    debugMode: {
      control: 'boolean',
      description: 'Whether the tool call timeline also shows the arguments and result of each tool'
    },
    showThinking: {
      control: 'boolean',
      description: 'Whether to show a thinking indicator while the response is in progress'
    }
  },
  args: {
    enableReactions: true,
    debugMode: false,
    showThinking: false
  },
  render: args => html`
    <forge-ai-assistant-response
      .response=${textResponse}
      .tools=${tools}
      ?enable-reactions=${args.enableReactions}
      ?debug-mode=${args.debugMode}
      ?show-thinking=${args.showThinking}
      @forge-ai-assistant-response-copy=${(evt: CustomEvent) => action('forge-ai-assistant-response-copy')(evt.detail)}
      @forge-ai-assistant-response-resend=${(evt: CustomEvent) => action('forge-ai-assistant-response-resend')(evt.detail)}
      @forge-ai-assistant-response-thumbs-up=${(evt: CustomEvent) => action('forge-ai-assistant-response-thumbs-up')(evt.detail)}
      @forge-ai-assistant-response-thumbs-down=${(evt: CustomEvent) => action('forge-ai-assistant-response-thumbs-down')(evt.detail)}>
    </forge-ai-assistant-response>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

/** Text and tool calls are rendered in order. A tool call with a `renderer` shows its result under the tool call timeline. */
export const WithToolCall: Story = {
  render: args => html`
    <forge-ai-assistant-response
      .response=${toolCallResponse}
      .tools=${tools}
      ?enable-reactions=${args.enableReactions}
      ?debug-mode=${args.debugMode}
      ?show-thinking=${args.showThinking}>
    </forge-ai-assistant-response>
  `
};

/** While a response is in progress with no content yet, `show-thinking` displays a thinking indicator. */
export const Thinking: Story = {
  args: {
    showThinking: true
  },
  render: args => html`
    <forge-ai-assistant-response
      .response=${thinkingResponse}
      .tools=${tools}
      ?enable-reactions=${args.enableReactions}
      ?debug-mode=${args.debugMode}
      ?show-thinking=${args.showThinking}>
    </forge-ai-assistant-response>
  `
};
