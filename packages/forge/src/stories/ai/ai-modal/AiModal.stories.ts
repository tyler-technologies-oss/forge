import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { AiModalComponent } from '@tylertech/forge-ai/ai-modal';
import { createRef, ref } from 'lit/directives/ref.js';

import '@tylertech/forge-ai/ai-modal';
import '@tylertech/forge/button';

const component = 'forge-ai-modal';

const meta = {
  title: 'AI/Components/Modal',
  render: args => {
    const modalRef = createRef<AiModalComponent>();

    function toggleModal(): void {
      if (modalRef.value?.open) {
        modalRef.value.close();
      } else {
        modalRef.value?.show();
      }
    }

    return html`
      <forge-button variant="raised" @click=${toggleModal}>Show Modal</forge-button>
      <forge-ai-modal ${ref(modalRef)} .open=${args.open} label=${args.label}>
        <div style="padding: 24px;">
          <h3 style="margin: 0 0 16px 0;">Modal Title</h3>
          <p style="margin: 0 0 16px 0;">This is a basic modal dialog with some sample content.</p>
          <forge-button variant="outlined" @click=${() => modalRef.value?.close()}> Close Modal </forge-button>
        </div>
      </forge-ai-modal>
    `;
  },
  component,
  argTypes: {
    open: { control: 'boolean' },
    label: { control: 'text' }
  },
  args: {
    open: false,
    label: 'AI Assistant'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
