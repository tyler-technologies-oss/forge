import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-ai/ai-icon-button';

const component = 'forge-ai-icon-button';
const clickAction = action('click');

const meta = {
  title: 'AI/Components/Icon Button',
  component,
  render: args => html` <forge-ai-icon-button .disabled=${args.disabled} @click=${clickAction}></forge-ai-icon-button> `,
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    }
  },
  args: {
    disabled: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
