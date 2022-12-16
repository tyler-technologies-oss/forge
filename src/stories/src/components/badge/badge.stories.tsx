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
  open = true,
  strong = false,
  dot = false,
  positioned = false,
  theme = 'default',
  hasLeadingIcon = false,
  hasTrailingIcon = false
}) => {
  useEffect(() => {
    IconRegistry.define([tylIconFace, tylIconStar]);
  }, []);

  return (
    <ForgeBadge dot={dot} open={open} positioned={positioned} strong={strong} theme={theme}>
      {hasLeadingIcon && <ForgeIcon slot="leading" name="face" />}
      <span>{text}</span>
      {hasTrailingIcon && <ForgeIcon slot="trailing" name="star" />}
    </ForgeBadge>
  )
};
Default.args = {
  dot: false,
  open: true,
  theme: 'default',
  positioned: false,
  strong: false,
  text: 'Default',
  hasLeadingIcon: false,
  hasTrailingIcon: false
} as IBadgeProps;

export const WithIconButton: Story<IBadgeProps> = ({
  text = '',
  open = true,
  strong = false,
  dot = false,
  positioned = false,
  theme = 'default',
  hasLeadingIcon = false,
  hasTrailingIcon = false
}) => {
  useEffect(() => {
    IconRegistry.define([tylIconFace, tylIconNotifications, tylIconStar]);
  }, []);

  const demoIconButtonStyles = {
    color: 'var(--mdc-theme-on-surface, #000000)',
  };

  return (
    <ForgeIconButton style={demoIconButtonStyles} className="forge-icon-button--with-badge">
      <button type="button">
        <ForgeIcon name="notifications" />
      </button>
      <ForgeBadge  dot={dot} open={open} positioned={positioned} strong={strong} theme={theme}>
        {hasLeadingIcon && <ForgeIcon slot="leading" name="face" />}
        <span>{text}</span>
        {hasTrailingIcon && <ForgeIcon slot="trailing" name="star" />}
      </ForgeBadge>
    </ForgeIconButton>
  )
};
WithIconButton.args = {
  dot: false,
  open: true,
  theme: 'default',
  positioned: true,
  strong: false,
  text: '3',
  hasLeadingIcon: false,
  hasTrailingIcon: false
} as IBadgeProps;
