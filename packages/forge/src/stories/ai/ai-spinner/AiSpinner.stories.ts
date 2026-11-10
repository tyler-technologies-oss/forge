import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge-ai/ai-spinner';

const component = 'forge-ai-spinner';

const meta = {
  title: 'AI/Components/Primitives/Spinner',
  component,
  argTypes: {
    size: {
      control: 'select',
      options: ['extra-small', 'small', 'medium', 'large'],
      description: 'The size of the spinner'
    }
  },
  args: {
    size: 'medium'
  },
  render: args => html`<forge-ai-spinner size=${args.size}></forge-ai-spinner>`
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

/** The smallest size, sized to sit inline next to text. */
export const ExtraSmall: Story = {
  args: {
    size: 'extra-small'
  }
};

/** The largest size, for loading a whole panel or view. */
export const Large: Story = {
  args: {
    size: 'large'
  }
};
