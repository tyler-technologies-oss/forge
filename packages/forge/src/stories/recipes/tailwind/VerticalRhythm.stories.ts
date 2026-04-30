import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import './tailwind.css';

const meta = {
  title: 'Recipes/Tailwind Layouts/Vertical Rhythm',
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    layout: 'padded',
    docs: {
      height: '100vh'
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {
  render: () => html`
    <div class="space-y-large">
      <div class="striped-box"></div>
      <div class="striped-box"></div>
      <div class="striped-box"></div>
    </div>
  `
};
