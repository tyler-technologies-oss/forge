import React, { useEffect } from 'react';
import { Story } from '@storybook/react';
import { ForgeIcon, ForgeIconButton } from '@tylertech/forge-react';
import { IconRegistry } from '@tylertech/forge';
import { tylIconFavorite, tylIconFavoriteBorder, tylIconPerson } from '@tylertech/tyler-icons/standard';
import { IIconButtonProps } from '../icon-button-args';

export const DefaultTemplate: Story<IIconButtonProps> = ({
  toggle = false,
  dense = false,
  densityLevel = 3
}) => {
  const iconButtonProps = {
    dense,
    densityLevel
  };

  useEffect(() => {
    IconRegistry.define([tylIconFavorite, tylIconFavoriteBorder, tylIconPerson]);
  }, []);

  const ToggleIconButton = () => (
    <ForgeIconButton {...iconButtonProps} toggle>
      <button type="button" aria-label="Toggle favorite">
        <ForgeIcon name="favorite" forge-icon-button-on />
        <ForgeIcon name="favorite_border" />
      </button>
    </ForgeIconButton>
  );
  const IconButton = () => (
    <ForgeIconButton {...iconButtonProps}>
      <button type="button" aria-label="View user profile">
        <ForgeIcon name="person" />
      </button>
    </ForgeIconButton>
  );
  return toggle ? <ToggleIconButton /> : <IconButton />;
};
