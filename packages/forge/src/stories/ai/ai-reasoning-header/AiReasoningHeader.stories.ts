import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-ai/ai-reasoning-header';

const component = 'forge-ai-reasoning-header';

const meta = {
  title: 'AI/Reasoning Header',
  component,
  argTypes: {
    expanded: {
      control: 'boolean',
      description: 'Whether the header is expanded'
    },
    reasoning: {
      control: 'boolean',
      description: 'Whether this is a reasoning header'
    },
    titleText: {
      control: 'text',
      description: 'Title text for the header (slotted content)'
    },
    reasoningText: {
      control: 'text',
      description: 'Reasoning text for the header (slotted content when reasoning=true)'
    }
  },
  args: {
    expanded: true,
    reasoning: false,
    titleText: 'Reasoning Process',
    reasoningText: 'AI is analyzing the problem...'
  },
  render: (args: any) => html`
    <forge-ai-reasoning-header .expanded=${args.expanded} .reasoning=${args.reasoning} @toggle=${action('toggle')}>
      <span slot="reasoning-title">${args.reasoningText}</span>
      <span slot="title">${args.titleText}</span>
    </forge-ai-reasoning-header>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
