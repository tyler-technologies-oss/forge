import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge-ai/ai-copy-button';

const component = 'forge-ai-copy-button';

const meta = {
  title: 'Components/Primitives/Copy Button',
  component,
  argTypes: {
    value: {
      control: 'text',
      description: 'Text copied to the clipboard when the button is clicked'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button'
    }
  },
  args: {
    value: 'npm install @tylertech/forge-ai',
    disabled: false
  },
  render: args => html`<forge-ai-copy-button value=${args.value} ?disabled=${args.disabled}></forge-ai-copy-button>`
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

/** A disabled button does not copy. */
export const Disabled: Story = {
  args: {
    disabled: true
  }
};
