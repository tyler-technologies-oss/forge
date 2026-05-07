import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import './tailwind.css';

const meta = {
  title: 'Recipes/Tailwind Layouts/Responsive Breakpoints',
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    layout: 'padded',
    docs: {
      canvas: {
        sourceState: 'shown'
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {
  render: () => html`
    <div class="@container flex gap-medium">
      <div class="striped-box flex-1"></div>
      <div class="striped-box flex-1"></div>
      <div class="striped-box-primary flex-1 hidden @min-[500px]:block"></div>
    </div>
  `
};
