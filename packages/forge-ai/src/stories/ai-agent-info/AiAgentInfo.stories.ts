import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge-ai/ai-agent-info';
import type { AgentInfo } from '@tylertech/forge-ai/ai-agent-info';

const component = 'forge-ai-agent-info';

const storyStyles = html`<style>
  .agent-info-story {
    max-inline-size: 400px;
  }
</style>`;

const meta = {
  title: 'Components/Agents/Agent Info',
  component,
  render: ({ name, identifier, version, threadId }: AgentInfo) => {
    const agentInfo: AgentInfo = { name, identifier, version, threadId };
    return html`${storyStyles}<forge-ai-agent-info class="agent-info-story" .agentInfo=${agentInfo}></forge-ai-agent-info>`;
  },
  argTypes: {
    name: { control: 'text' },
    identifier: { control: 'text' },
    version: { control: 'text' },
    threadId: { control: 'text' }
  },
  args: {
    name: 'Staff Assistant',
    identifier: 'agent-49ff3a19-6986-43e9-a255-7bcdd40cbdc0',
    version: '1.3.5',
    threadId: '7cbc1ec3-6fd1-4c13-a737-fc3d9f9ec2baf'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
