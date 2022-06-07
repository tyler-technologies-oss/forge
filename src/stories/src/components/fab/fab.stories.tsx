import React, { useEffect } from 'react';
import { Meta, Story } from '@storybook/react';
import { argTypes, IFabProps } from './fab-args';
import { ForgeFloatingActionButton, ForgeIcon } from '@tylertech/forge-react';
import { IFloatingActionButtonComponent, IconRegistry } from '@tylertech/forge';
import { tylIconAdd } from '@tylertech/tyler-icons/standard';

const MDX = require('./fab.mdx').default;

export default {
  title: 'Components/Floating Action Button',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IFabProps> = ({
  extended = false,
  mini = false,
  exited = false,
  theme = 'none'
}) => {
  useEffect(() => {
    IconRegistry.define(tylIconAdd);
  }, []);

  return (
    <ForgeFloatingActionButton extended={extended} mini={mini} exited={exited} theme={theme}>
      <button type="button" aria-label="Create">
        <ForgeIcon name="add" />
        {extended && <span>Create</span>}
      </button>
    </ForgeFloatingActionButton>
  );
};
Default.args = {
  extended: false,
  mini: false,
  exited: false,
  theme: 'none'
} as IFabProps;
