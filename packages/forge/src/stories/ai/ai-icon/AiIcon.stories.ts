import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge-ai/ai-icon';

const component = 'forge-ai-icon';

const meta = {
  title: 'AI/Icon',
  component,
  argTypes: {
    outline: {
      control: 'boolean',
      description: 'Whether to display the icon with an outline'
    }
  },
  args: {
    outline: false
  },
  render: (args: any) => html`<forge-ai-icon ?outline=${args.outline}></forge-ai-icon>`
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
