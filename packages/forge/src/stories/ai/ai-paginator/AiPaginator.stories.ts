import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '@tylertech/forge-ai/tools';
import type { ForgeAiPaginatorPageChangeEventData } from '@tylertech/forge-ai/tools';

const component = 'forge-ai-paginator';

const meta = {
  title: 'AI/Components/Paginator',
  component,
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 }, description: 'The current page (1-based)' },
    totalPages: { control: { type: 'number', min: 1 }, description: 'The total number of pages' },
    disabled: { control: 'boolean', description: 'Disables both navigation buttons' }
  },
  args: {
    currentPage: 1,
    totalPages: 5,
    disabled: false
  },
  render: args => {
    const handlePageChange = (event: CustomEvent<ForgeAiPaginatorPageChangeEventData>): void => {
      (event.target as HTMLElement & { currentPage: number }).currentPage = event.detail.currentPage;
    };

    return html`
      <forge-ai-paginator
        .currentPage=${args.currentPage}
        .totalPages=${args.totalPages}
        ?disabled=${args.disabled}
        @forge-ai-paginator-page-change=${handlePageChange}></forge-ai-paginator>
    `;
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Disabled: Story = {
  args: { disabled: true }
};
