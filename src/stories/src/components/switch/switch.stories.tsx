import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeSwitch } from '@tylertech/forge-react';
import { ISwitchProps, argTypes } from './switch-args';

const MDX = require('./switch.mdx').default;

export default {
  title: 'Components/Switch',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<ISwitchProps> = ({
  dense = false,
  hasLabel = true
}) => (
  <ForgeSwitch dense={dense} {...{'button-aria-label': !hasLabel ? 'Toggle on or off' : undefined}}>
    {hasLabel && <span>off/on</span>}
  </ForgeSwitch>
);
Default.args = {
  dense: false,
  hasLabel: true
} as ISwitchProps;
