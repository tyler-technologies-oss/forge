import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-ai/ai-button';

const component = 'forge-ai-button';
const clickAction = action('click');

const meta = {
  title: 'AI/Button',
  component,
  render: args => html` <forge-ai-button .disabled=${args.disabled} @click=${clickAction}> ${args.content} </forge-ai-button> `,
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    },
    content: {
      control: 'text',
      description: 'The text content of the button'
    }
  },
  args: {
    disabled: false,
    content: 'AI Assistant'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
