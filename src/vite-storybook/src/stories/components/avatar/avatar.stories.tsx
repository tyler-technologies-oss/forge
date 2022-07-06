import { Meta } from '@storybook/react';
import { Story } from '@storybook/react';
import { ForgeAvatar } from '@tylertech/forge-react';
import { argTypes, IAvatarProps } from './avatar-args';

// @ts-ignore-line
import MDX from './avatar.mdx';

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
  autoColor = false,
  imageUrl = '',
  letterCount = 2,
  text = 'First Last',
}) => (
  <ForgeAvatar
    autoColor={autoColor}
    imageUrl={imageUrl}
    letterCount={letterCount}
    text={text} />
);
Default.args = {
  autoColor: false,
  imageUrl: '',
  letterCount: 2,
  text: 'First Last',
} as IAvatarProps;
