import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { ref } from 'lit/directives/ref.js';
import { action } from 'storybook/actions';
import '@tylertech/forge/button';
import type { OverlayPlacement } from '@tylertech/forge-ai/core';

import '@tylertech/forge-ai/core';

const component = 'forge-ai-overlay';

const placements: OverlayPlacement[] = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end'
];

const meta = {
  title: 'AI/Components/Primitives/Overlay',
  component,
  argTypes: {
    placement: {
      control: 'select',
      options: placements,
      description: 'The placement of the overlay relative to the anchor'
    },
    flip: {
      control: 'boolean',
      description: 'Whether the overlay flips to the opposite side when there is not enough space'
    },
    shift: {
      control: 'boolean',
      description: 'Whether the overlay shifts to stay within the viewport'
    },
    dismissMode: {
      control: 'select',
      options: ['auto', 'manual'],
      description: 'How the overlay closes. "auto" closes on an outside click or Escape, "manual" only when `open` is set to false'
    }
  },
  args: {
    placement: 'bottom-start',
    flip: true,
    shift: false,
    dismissMode: 'auto'
  },
  render: args => {
    let trigger: HTMLElement | undefined;
    let overlay: HTMLElementTagNameMap['forge-ai-overlay'] | undefined;
    return html`
      <style>
        .overlay-story__content {
          padding: 16px;
          background: var(--forge-theme-surface-bright);
          border: 1px solid var(--forge-theme-outline);
        }
      </style>
      <forge-button variant="outlined" ${ref(el => (trigger = el as HTMLElement | undefined))} @click=${() => overlay && (overlay.open = true)}>
        Open overlay
      </forge-button>
      <forge-ai-overlay
        ${ref(el => {
          overlay = el as HTMLElementTagNameMap['forge-ai-overlay'] | undefined;
          if (overlay && trigger) {
            overlay.anchor = trigger;
          }
        })}
        placement=${args.placement}
        dismiss-mode=${args.dismissMode}
        ?flip=${args.flip}
        ?shift=${args.shift}
        @forge-ai-overlay-toggle=${(evt: CustomEvent) => action('forge-ai-overlay-toggle')(evt.detail)}>
        <div class="overlay-story__content">Overlay content</div>
      </forge-ai-overlay>
    `;
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
