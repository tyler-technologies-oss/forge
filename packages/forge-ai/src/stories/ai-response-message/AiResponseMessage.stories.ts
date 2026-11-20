import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge-ai/ai-response-message';

const component = 'forge-ai-response-message';

const meta = {
  title: 'Components/Messages/Response Message',
  component,
  render: () => html`
    <forge-ai-response-message>
      I'd be happy to help you understand TypeScript generics! Generics allow you to create reusable components that can work with different types while
      maintaining type safety.
    </forge-ai-response-message>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
