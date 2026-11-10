import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-ai/ai-response-message';

const component = 'forge-ai-response-message';

const meta = {
  title: 'AI/Components/Messages/Response Message',
  component,
  render: () => {
    const onAction = action('forge-ai-response-message-action');
    return html`
      <forge-ai-response-message @forge-ai-response-message-action=${onAction}>
        I'd be happy to help you understand TypeScript generics! Generics allow you to create reusable components that can work with different types while
        maintaining type safety.
      </forge-ai-response-message>
    `;
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
