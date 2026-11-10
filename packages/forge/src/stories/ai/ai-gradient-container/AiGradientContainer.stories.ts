import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge-ai/ai-gradient-container';
import { AiGradientContainerVariant } from '@tylertech/forge-ai/ai-gradient-container';

const component = 'forge-ai-gradient-container';

const storyStyles = html`<style>
  .gradient-story-content {
    inline-size: 150px;
    block-size: 150px;
    padding: var(--forge-spacing-medium);
  }
</style>`;

const meta = {
  title: 'AI/Components/Containers/Gradient Container',
  component,
  argTypes: {
    variant: {
      control: 'select',
      options: ['low', 'medium', 'high', 'disabled'] as AiGradientContainerVariant[],
      description: 'Gradient intensity variant'
    }
  },
  args: {
    variant: 'medium'
  },
  render: (args: any) =>
    html`${storyStyles}<forge-ai-gradient-container variant=${args.variant}>
        <div class="gradient-story-content">This is inside the gradient container</div>
      </forge-ai-gradient-container>`
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
