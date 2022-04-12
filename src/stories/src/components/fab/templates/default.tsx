import { Story } from '@storybook/react';
import { ForgeFloatingActionButton, ForgeIcon } from '@tylertech/forge-react';
import { IFloatingActionButtonComponent, IconRegistry } from '@tylertech/forge';
import React, { useEffect } from 'react';
import { IFabProps } from '../fab-args';
import { tylIconAdd } from '@tylertech/tyler-icons/standard';

export const DefaultTemplate: Story<IFabProps> = ({
  extended = false,
  mini = false,
  exited = false,
  theme = 'none',
}) => {
  useEffect(() => {
    IconRegistry.define(tylIconAdd);
  }, []);

  const fabProps: Partial<IFloatingActionButtonComponent> & { theme: string } = {
    extended,
    mini,
    exited,
    theme
  };

  return (
    <ForgeFloatingActionButton {...fabProps}>
      <button type="button" aria-label="Create">
        <ForgeIcon name="add" />
        {extended && <span>Create</span>}
      </button>
    </ForgeFloatingActionButton>
  );
}
