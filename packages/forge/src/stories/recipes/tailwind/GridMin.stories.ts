import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import './tailwind.css';

const meta = {
  title: 'Recipes/Tailwind Layouts/Grid Min',
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
    <div class="grid grid-min-120 gap-medium">
      <div class="striped-box"></div>
      <div class="striped-box"></div>
      <div class="striped-box"></div>
      <div class="striped-box"></div>
    </div>
  `
};
