import { Meta } from '@storybook/react';
const MDX = require('./list.mdx').default;
import { DefaultTemplate } from './templates/default';
import { IListProps, argTypes } from './list-args';
import { DrawerTemplate } from './templates/drawer';
import { ExpandableTemplate } from './templates/expandable';

export default {
  title: 'Components/List',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
    layout: 'fullscreen'
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  staticList: false,
  dense: false,
  indented: false,
  listStyle: 'one-line',
  ripple: true,
  disabled: false,
  wrap: false,
  leadingSlot: 'none',
  trailingSlot: 'none',
} as IListProps;

export const Drawer = DrawerTemplate.bind({});
Drawer.argTypes = {};
Drawer.parameters = {
  controls: {
    disable: true
  }
};

export const Expandable = ExpandableTemplate.bind({});
Expandable.argTypes = {};
Expandable.parameters = {
  controls: {
    disable: true
  }
};
