// tslint:disable variable-name
import React, { useEffect } from 'react';
import { Meta } from '@storybook/react';
import { argTypes, IBadgeProps } from './badge-arg-types';
import { Story } from '@storybook/react';
import { ForgeBadge, ForgeIcon, ForgeIconButton } from '@tylertech/forge-react';
import { IconRegistry } from '@tylertech/forge';
import { tylIconFace, tylIconNotifications, tylIconStar } from '@tylertech/tyler-icons/standard';

const MDX = require('./badge.mdx').default;

export default {
  title: 'Components/Badge',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default: Story<IBadgeProps> = ({
  text = '',
  hide = false,
  strong = false,
  dot = false,
  theme = 'default',
  hasStartIcon = false,
  hasEndIcon = false
}) => {
  useEffect(() => {
    IconRegistry.define([tylIconFace, tylIconStar]);
  }, []);

  return (
    <ForgeBadge dot={dot} hide={hide} strong={strong} theme={theme}>
      {hasStartIcon && <ForgeIcon slot="leading" name="face" />}
      <span>{text}</span>
      {hasEndIcon && <ForgeIcon slot="trailing" name="star" />}
    </ForgeBadge>
  )
};
Default.args = {
  dot: false,
  hide: false,
  theme: 'default',
  strong: false,
  text: 'Status',
  hasStartIcon: false,
  hasEndIcon: false
} as IBadgeProps;

export const WithIconButton: Story<IBadgeProps> = ({
  text = '',
  hide = false,
  strong = false,
  dot = false,
  theme = 'default',
  hasStartIcon = false,
  hasEndIcon = false
}) => {
  useEffect(() => {
    IconRegistry.define([tylIconFace, tylIconNotifications, tylIconStar]);
  }, []);

  return (
    <ForgeIconButton>
      <button type="button">
        <ForgeIcon name="notifications" />
      </button>
      <ForgeBadge  dot={dot} hide={hide} strong={strong} theme={theme}>
        {hasStartIcon && <ForgeIcon slot="start" name="face" />}
        <span>{text}</span>
        {hasEndIcon && <ForgeIcon slot="end" name="star" />}
      </ForgeBadge>
    </ForgeIconButton>
  )
};
WithIconButton.args = {
  dot: false,
  hide: false,
  theme: 'default',
  strong: false,
  text: '3',
  hasStartIcon: false,
  hasEndIcon: false
} as IBadgeProps;
