import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge-ai/ai-user-message';

const component = 'forge-ai-user-message';

const meta = {
  title: 'AI/User Message',
  component,
  render: () => html` <forge-ai-user-message> Hello! Can you help me understand how to use TypeScript generics? </forge-ai-user-message> `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
