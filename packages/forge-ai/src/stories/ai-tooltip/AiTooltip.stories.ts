import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';
import type { TooltipPlacement, TooltipTrigger } from '@tylertech/forge-ai/core';

import '@tylertech/forge-ai/core';
import '@tylertech/forge/button';

const component = 'forge-ai-tooltip';

const placements: TooltipPlacement[] = [
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

const triggers: TooltipTrigger[] = ['hover', 'focus', 'click', 'manual'];

const meta = {
  title: 'Components/Primitives/Tooltip',
  component,
  argTypes: {
    text: {
      control: 'text',
      description: 'The tooltip text. When empty, the default slot is used instead'
    },
    placement: {
      control: 'select',
      options: placements,
      description: 'The placement of the tooltip relative to its anchor'
    },
    trigger: {
      control: 'select',
      options: triggers,
      description: 'What shows the tooltip. "manual" adds no listeners, so control it with `open`, `show()`, `hide()` or `toggle()`'
    },
    delay: {
      control: 'number',
      description: 'Milliseconds to wait before showing the tooltip'
    },
    hideDelay: {
      control: 'number',
      description: 'Milliseconds to wait before hiding the tooltip'
    }
  },
  args: {
    text: 'Save your changes',
    placement: 'top',
    trigger: 'hover',
    delay: 500,
    hideDelay: 0
  },
  render: args => html`
    <forge-button id="tooltip-anchor-${args.trigger}" variant="outlined">Save</forge-button>
    <forge-ai-tooltip
      for="tooltip-anchor-${args.trigger}"
      text=${args.text}
      placement=${args.placement}
      trigger=${args.trigger}
      delay=${args.delay}
      hide-delay=${args.hideDelay}
      @forge-ai-tooltip-toggle=${(evt: CustomEvent) => action('forge-ai-tooltip-toggle')(evt.detail)}></forge-ai-tooltip>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

/** With `click`, the anchor toggles the tooltip instead of hover and focus. */
export const ClickTrigger: Story = {
  args: {
    trigger: 'click',
    delay: 0
  }
};
