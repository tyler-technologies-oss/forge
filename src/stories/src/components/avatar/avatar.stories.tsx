import { Meta } from '@storybook/react';
import { Story } from '@storybook/react';
import { ForgeAvatar, ForgeIcon } from '@tylertech/forge-react';
import { IconRegistry } from '@tylertech/forge';
import React, { useEffect } from 'react';
import { tylIconPerson } from '@tylertech/tyler-icons/standard';
import { argTypes, IAvatarProps } from './avatar-args';

const MDX = require('./avatar.mdx').default;

export default {
  title: 'Components/Avatar',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default: Story<IAvatarProps> = ({
  imageUrl = '',
  useIcon = false,
  letterCount = 2,
  text = 'First Last',
}) => {
  useEffect(() => {
    IconRegistry.define(tylIconPerson);
  }, []);

  return (
    <ForgeAvatar
      imageUrl={imageUrl}
      letterCount={letterCount}
      text={text}>
      {useIcon ? <ForgeIcon name="person" /> : null}
    </ForgeAvatar>
  );
};
Default.args = {
  imageUrl: '',
  useIcon: false,
  letterCount: 2,
  text: 'First Last',
} as IAvatarProps;
