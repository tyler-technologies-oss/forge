import { Meta } from '@storybook/react';
import { ISplitViewProps, argTypes } from './split-view-args';
import { DefaultTemplate } from './templates/default';
import { MultipleTemplate } from './templates/multiple';
const MDX = require('./split-view.mdx').default;

export default {
  title: 'Components/Split View',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
    actions: {
      handles: ['forge-split-view-pane-resize', 'forge-split-view-pane-drag-start', 'forge-split-view-pane-drag-end', 'forge-split-view-pane-did-open', 'forge-split-view-pane-did-close']
    }
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  orientation: 'horizontal',
} as ISplitViewProps;
export const Multiple = MultipleTemplate.bind({});
Multiple.args = {
  orientation: 'horizontal',
} as ISplitViewProps;
