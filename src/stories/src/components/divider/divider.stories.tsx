import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeDivider } from '@tylertech/forge-react';
import { IDividerProps, argTypes } from './divider-args';

const MDX = require('./divider.mdx').default;

export default {
  title: 'Components/Divider',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IDividerProps> = ({ vertical = false }) => {
  const styles = {
    width: !vertical ? '200px' : null,
    height: vertical ? '200px' : null
  };
  return (
    <ForgeDivider style={styles} vertical={vertical} />
  );
};
Default.args = {
  vertical: false
} as IDividerProps;
