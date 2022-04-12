import { Story } from '@storybook/react';
import { ForgeAvatar } from '@tylertech/forge-react';
import React from 'react';
import { IAvatarProps } from '../avatar-args';

export const DefaultTemplate: Story<IAvatarProps> = ({
  autoColor = false,
  imageUrl = '',
  letterCount = 2,
  text = 'First Last',
}) => {
  const avatarProps = {
    autoColor,
    imageUrl,
    letterCount,
    text
  };
  return (<ForgeAvatar {...avatarProps}></ForgeAvatar>)
};
