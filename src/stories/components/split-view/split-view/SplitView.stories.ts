import { html } from 'lit';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { customElementStoryRenderer, generateCustomElementArgTypes } from '../../../utils';

import '@tylertech/forge/split-view/split-view-panel';
import '@tylertech/forge/split-view/split-view';

import style from './SplitView.scss';
import { storyStyles } from 'src/stories/decorators';

const component = 'forge-split-view';

const meta = {
  title: 'Components/Split View',
  render: args => {
    return html`
    <forge-split-view
      .orientation=${args.orientation}
      .disabled=${args.disabled}
      .allowClose=${args.allowClose}
      .autoClose=${args.autoClose}
      .autoCloseThreshold=${args.autoCloseThreshold}
      >
      <forge-split-view-panel>
        <div>Panel 1</div>
      </forge-split-view-panel>
      <forge-split-view-panel size="200">
        <div>Panel 2</div>
      </forge-split-view-panel>
    </forge-split-view>
    `;
  },
  component,
  decorators: [storyStyles(style)],
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      controls: {
        orientation: {
          control: 'select',
          options: ['horizontal', 'vertical'],
        }
      }
    }),
  },
  args: {
    autoCloseThreshold: 120,
    orientation: 'horizontal',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
