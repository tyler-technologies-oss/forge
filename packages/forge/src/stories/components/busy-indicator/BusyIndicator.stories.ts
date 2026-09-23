import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { action } from 'storybook/actions';
import { BusyIndicatorComponent } from '@tylertech/forge/busy-indicator';
import { storyStyles } from '../../decorators.js';
import { standaloneStoryParams } from '../../utils.js';

import '@tylertech/forge/busy-indicator';

const component = 'forge-busy-indicator';
const cancelAction = action('forge-busy-indicator-cancel');

const meta = {
  title: 'Components/Busy Indicator',
  component,
  render: args => {
    const busyIndicatorRef = createRef<BusyIndicatorComponent>();

    function handleClick(): void {
      const busyIndicator = busyIndicatorRef.value as BusyIndicatorComponent;
      busyIndicator.open = true;
      setTimeout(() => (busyIndicator.open = false), 3000);
    }

    return html`
      <forge-button variant="raised" @click=${handleClick}>Show Busy Indicator</forge-button>
      <forge-busy-indicator
        ${ref(busyIndicatorRef)}
        @forge-busy-indicator-cancel=${cancelAction}
        .mode=${args.mode}
        .titleText="${args.titleText}"
        .message=${args.message}
        .cancelable=${args.cancelable}
        .variant=${args.variant}
        .determinate=${args.determinate}
        .progress=${args.progress}
        .buffer=${args.buffer}
        .transparent=${args.transparent}></forge-busy-indicator>
    `;
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['modal', 'inline']
    },
    variant: {
      control: 'select',
      options: ['spinner', 'progress', 'message-only']
    }
  },
  args: {
    mode: 'modal',
    titleText: '',
    message: 'Please wait while we load your data...',
    cancelable: false,
    variant: 'spinner',
    progress: 0.5,
    buffer: 1,
    determinate: false,
    transparent: false
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const Inline: Story = {
  ...standaloneStoryParams,
  decorators: [
    storyStyles(`
    .parent {
      position: relative;
      height: 300px;
      border: 1px solid var(--forge-theme-outline);
      border-radius: var(--forge-shape-large);
    }
  `)
  ],
  render: () => html`
    <div class="parent">
      <forge-busy-indicator open mode="inline" title-text="Loading" message="Please wait while we load your data..."></forge-busy-indicator>
    </div>
  `
};
