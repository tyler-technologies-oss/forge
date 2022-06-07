import React, { useEffect } from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeIcon, ForgeIconButton } from '@tylertech/forge-react';
import { IconRegistry } from '@tylertech/forge';
import { tylIconFavorite, tylIconFavoriteBorder, tylIconPerson } from '@tylertech/tyler-icons/standard';
import { argTypes, IIconButtonProps } from './icon-button-args';

const MDX = require('./icon-button.mdx').default;

export default {
  title: 'Components/Icon Button',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IIconButtonProps> = ({
  toggle = false,
  dense = false,
  densityLevel = 3
}) => {
  useEffect(() => {
    IconRegistry.define([tylIconFavorite, tylIconFavoriteBorder, tylIconPerson]);
  }, []);

  const ToggleIconButton = () => (
    <ForgeIconButton dense={dense} densityLevel={densityLevel} toggle>
      <button type="button" aria-label="Toggle favorite">
        <ForgeIcon name="favorite" forge-icon-button-on />
        <ForgeIcon name="favorite_border" />
      </button>
    </ForgeIconButton>
  );
  const IconButton = () => (
    <ForgeIconButton dense={dense} densityLevel={densityLevel}>
      <button type="button" aria-label="View user profile">
        <ForgeIcon name="person" />
      </button>
    </ForgeIconButton>
  );
  return toggle ? <ToggleIconButton /> : <IconButton />;
};
Default.args = {
  toggle: false,
  dense: false,
  densityLevel: 5
} as IIconButtonProps;
