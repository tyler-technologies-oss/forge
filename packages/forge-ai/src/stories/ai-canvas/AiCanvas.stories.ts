import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-ai/ai-canvas';

const component = 'forge-ai-canvas';

const meta = {
  title: 'Components/Artifacts/Canvas',
  component,
  argTypes: {
    titleText: {
      control: 'text',
      description: 'Title shown in the header. Also names the panel region for assistive technology'
    },
    headingLevel: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      description: 'Heading level applied to the default title'
    },
    closeLabel: {
      control: 'text',
      description: 'Accessible label and tooltip for the close button'
    }
  },
  args: {
    titleText: 'Quarterly summary',
    headingLevel: 2,
    closeLabel: 'Close canvas'
  },
  render: args => html`
    <style>
      .canvas-story-host {
        block-size: 360px;
        max-inline-size: 480px;
      }
    </style>
    <div class="canvas-story-host">
      <forge-ai-canvas
        title-text=${args.titleText}
        heading-level=${args.headingLevel}
        close-label=${args.closeLabel}
        @forge-ai-canvas-close=${action('forge-ai-canvas-close')}>
        <p>Revenue grew steadily across all regions this quarter, led by renewals.</p>
        <p>Support volume stayed flat while resolution time improved.</p>
      </forge-ai-canvas>
    </div>
  `
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

/** Place action buttons in the `actions` slot. They render before the close button. */
export const WithActions: Story = {
  render: args => html`
    <style>
      .canvas-story-host {
        block-size: 360px;
        max-inline-size: 480px;
      }
    </style>
    <div class="canvas-story-host">
      <forge-ai-canvas
        title-text=${args.titleText}
        heading-level=${args.headingLevel}
        close-label=${args.closeLabel}
        @forge-ai-canvas-close=${action('forge-ai-canvas-close')}>
        <button slot="actions" type="button" @click=${action('download-click')}>Download</button>
        <p>Revenue grew steadily across all regions this quarter, led by renewals.</p>
        <p>Support volume stayed flat while resolution time improved.</p>
      </forge-ai-canvas>
    </div>
  `
};
