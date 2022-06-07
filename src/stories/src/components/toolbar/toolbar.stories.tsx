import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeToolbar } from '@tylertech/forge-react';
import { IToolbarProps, argTypes } from './toolbar-args';

const MDX = require('./toolbar.mdx').default;

export default {
  title: 'Components/Toolbar',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IToolbarProps> = ({
  inverted = false,
  hasStart = true,
  hasCenter = true,
  hasEnd = true
}) => (
  <ForgeToolbar inverted={inverted}>
    {hasStart && <div slot="start">Start</div>}
    {hasCenter && <div slot="center">Center</div>}
    {hasEnd && <div slot="end">End</div>}
  </ForgeToolbar>
);
Default.args = {
  inverted: false,
  hasStart: true,
  hasCenter: true,
  hasEnd: true,
} as IToolbarProps;
