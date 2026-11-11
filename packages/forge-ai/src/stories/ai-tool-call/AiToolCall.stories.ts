import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { createToolRenderer } from '@tylertech/forge-ai/ai-tool-call';
import type { ToolCall, ToolDefinition } from '@tylertech/forge-ai/types';

import '@tylertech/forge-ai/ai-tool-call';

const component = 'forge-ai-tool-call';

const toolDefinition: ToolDefinition<{ location: string }, { temperature: number; condition: string }> = {
  name: 'getCurrentWeather',
  displayName: 'Get current weather',
  renderer: createToolRenderer({
    render: toolCall => {
      const element = document.createElement('p');
      const { temperature, condition } = toolCall.result ?? {};
      element.textContent = toolCall.result ? `${toolCall.args.location}: ${temperature}°F, ${condition}` : `Looking up ${toolCall.args.location}...`;
      return element;
    }
  })
};

function createToolCall(status: ToolCall['status']): ToolCall {
  return {
    id: 'tool-call-1',
    messageId: 'message-1',
    name: 'getCurrentWeather',
    args: { location: 'San Francisco' },
    result: status === 'complete' ? { temperature: 68, condition: 'Sunny' } : undefined,
    status,
    type: 'agent'
  };
}

const meta = {
  title: 'Components/Tools & Reasoning/Tool Call',
  component,
  argTypes: {
    status: {
      control: 'select',
      options: ['pending', 'parsing', 'executing', 'complete', 'error'],
      description: 'The status of the tool call. The renderer shows once the call is `complete`, or earlier if `renderOnStart` is set'
    },
    renderOnStart: {
      control: 'boolean',
      description: 'Whether the renderer shows while the call is still `parsing` or `executing`'
    }
  },
  args: {
    status: 'complete',
    renderOnStart: false
  },
  render: args => html`
    <forge-ai-tool-call
      .toolCall=${createToolCall(args.status)}
      .toolDefinition=${{ ...toolDefinition, renderOnStart: args.renderOnStart }}></forge-ai-tool-call>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

/** With `renderOnStart`, the renderer appears while the call is still executing. */
export const RenderOnStart: Story = {
  args: {
    status: 'executing',
    renderOnStart: true
  }
};

/** Without `renderOnStart`, nothing is rendered until the call completes. */
export const InProgress: Story = {
  args: {
    status: 'executing',
    renderOnStart: false
  }
};
