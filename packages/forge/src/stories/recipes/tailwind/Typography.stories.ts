import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import './tailwind.css';

const meta = {
  title: 'Recipes/Tailwind Layouts/Typography',
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
    <div class="space-y-medium">
      <p class="text-display1">Display 1</p>
      <p class="text-heading1">Heading 1</p>
      <p class="text-heading2">Heading 2</p>
      <p class="text-heading3">Heading 3</p>
      <p class="text-subheading1">Subheading 1</p>
      <p class="text-subheading2">Subheading 2</p>
      <p class="text-body1">Body 1</p>
      <p class="text-body2">Body 2</p>
      <p class="text-label1">Label 1</p>
      <p class="text-label2">Label 2</p>
    </div>
  `
};
