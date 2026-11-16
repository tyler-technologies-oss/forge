import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { ref } from 'lit/directives/ref.js';
import { action } from 'storybook/actions';
import type { PopoverPlacement } from '@tylertech/forge-ai/core';

import '@tylertech/forge-ai/core';
import '@tylertech/forge/button';

const component = 'forge-ai-popover';

const placements: PopoverPlacement[] = [
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
  title: 'Components/Primitives/Popover',
  component,
  argTypes: {
    placement: {
      control: 'select',
      options: placements,
      description: 'The placement of the popover relative to the anchor'
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to show an arrow pointing to the anchor'
    },
    flip: {
      control: 'boolean',
      description: 'Whether the popover flips to the opposite side when there is not enough space'
    },
    shift: {
      control: 'boolean',
      description: 'Whether the popover shifts to stay within the viewport'
    },
    dismissMode: {
      control: 'select',
      options: ['auto', 'manual'],
      description: 'How the popover closes. "auto" closes on an outside click or Escape, "manual" only when `open` is set to false'
    }
  },
  args: {
    placement: 'bottom-start',
    arrow: false,
    flip: false,
    shift: false,
    dismissMode: 'auto'
  },
  render: args => {
    let trigger: HTMLElement | undefined;
    let popover: HTMLElementTagNameMap['forge-ai-popover'] | undefined;
    return html`
      <style>
        .popover-story__content {
          padding: 16px;
        }
      </style>
      <forge-button variant="outlined" ${ref(el => (trigger = el as HTMLElement | undefined))} @click=${() => popover && (popover.open = true)}>
        Open popover
      </forge-button>
      <forge-ai-popover
        ${ref(el => {
          popover = el as HTMLElementTagNameMap['forge-ai-popover'] | undefined;
          if (popover && trigger) {
            popover.anchor = trigger;
          }
        })}
        placement=${args.placement}
        dismiss-mode=${args.dismissMode}
        ?arrow=${args.arrow}
        ?flip=${args.flip}
        ?shift=${args.shift}
        @forge-ai-popover-toggle=${(evt: CustomEvent) => action('forge-ai-popover-toggle')(evt.detail)}>
        <div class="popover-story__content">Popover content</div>
      </forge-ai-popover>
    `;
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

/** An arrow points from the popover to its anchor. */
export const WithArrow: Story = {
  args: {
    arrow: true,
    placement: 'bottom'
  }
};
