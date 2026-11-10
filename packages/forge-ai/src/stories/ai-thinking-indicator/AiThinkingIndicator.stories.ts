import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge-ai/ai-thinking-indicator';

const component = 'forge-ai-thinking-indicator';

const meta = {
  title: 'Components/Messages/Thinking Indicator',
  component,
  argTypes: {
    showText: { control: 'boolean' },
    initialDelay: { control: 'number' },
    cycleInterval: { control: 'number' }
  },
  args: {
    showText: false,
    initialDelay: 0,
    cycleInterval: 5000
  },
  render: (args: any) => html`
    <forge-ai-thinking-indicator ?show-text=${args.showText} initial-delay=${args.initialDelay} cycle-interval=${args.cycleInterval}>
    </forge-ai-thinking-indicator>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
