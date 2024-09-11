import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/web-components';
import { generateCustomElementArgTypes } from '../../utils';
import { storyStyles } from 'src/stories/decorators';

import '@tylertech/forge/split-view/split-view-panel';
import '@tylertech/forge/split-view/split-view';

import styles from './SplitView.scss?inline';

const component = 'forge-split-view';

const willResizeAction = action('forge-split-view-panel-will-resize');
const resizeStartAction = action('forge-split-view-panel-resize-start');
const resizeEndAction = action('forge-split-view-panel-resize-end');
const resizeAction = action('forge-split-view-panel-resize');
const willOpenAction = action('forge-split-view-panel-will-open');
const willCloseAction = action('forge-split-view-panel-will-close');
const didOpenAction = action('forge-split-view-panel-did-open');
const didCloseAction = action('forge-split-view-panel-did-close');

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
        @forge-split-view-panel-will-resize=${willResizeAction}
        @forge-split-view-panel-resize-start=${resizeStartAction}
        @forge-split-view-panel-resize-end=${resizeEndAction}
        @forge-split-view-panel-resize=${resizeAction}
        @forge-split-view-panel-will-open=${willOpenAction}
        @forge-split-view-panel-will-close=${willCloseAction}
        @forge-split-view-panel-did-open=${didOpenAction}
        @forge-split-view-panel-did-close=${didCloseAction}>
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
  subcomponents: {
    'Split View Panel': 'forge-split-view-panel'
  },
  decorators: [storyStyles(styles)],
  parameters: {
    actions: { disable: true }
  },
  argTypes: {
    ...generateCustomElementArgTypes({
      tagName: component,
      category: 'Split View',
      controls: {
        orientation: { control: 'select', options: ['horizontal', 'vertical'] }
      }
    }),
    ...generateCustomElementArgTypes({
      tagName: 'forge-split-view-panel',
      category: 'Split View Panel',
      exclude: ['accessibleLabel']
    })
  },
  args: {
    // Both
    autoCloseThreshold: 120,
    disabled: false,
    allowClose: false,
    autoClose: false,

    // <forge-split-view>
    orientation: 'horizontal',

    // <forge-split-view-panel>
    resizable: 'off',
    size: 200,
    min: 0,
    open: true
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};
