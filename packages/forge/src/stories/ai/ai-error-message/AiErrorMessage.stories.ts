import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge-ai/ai-error-message';

const component = 'forge-ai-error-message';

const meta = {
  title: 'AI/Error Message',
  component,
  argTypes: {
    density: {
      control: 'select',
      options: ['medium', 'small'],
      description: 'The density of the banner. "small" tightens the padding, gap, and icon for compact surfaces'
    }
  },
  args: {
    density: 'medium'
  },
  render: args => html`
    <forge-ai-error-message density=${args.density}>
      <span slot="title">Error</span>
      Failed to connect to the server. Please check your network connection and try again.
    </forge-ai-error-message>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

/** Tightened padding, gap, and icon for use inside lists, panels, and other compact surfaces. */
export const Dense: Story = {
  args: {
    density: 'small'
  }
};
