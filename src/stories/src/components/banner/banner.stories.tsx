import React, { useEffect } from 'react';
import { Meta } from '@storybook/react';
import { Story } from '@storybook/react';
import { ForgeBanner, ForgeButton, ForgeIcon } from '@tylertech/forge-react';
import { IconRegistry } from '@tylertech/forge';
import { tylIconAddAlert } from '@tylertech/tyler-icons/standard';
import { argTypes, IBannerProps } from './banner-args';

const MDX = require('./banner.mdx').default;

export default {
  title: 'Components/Banner',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default: Story<IBannerProps> = ({
  dismissed = false,
  persistent = false,
  theme = 'default',
  hasIcon = false,
  hasButton = false
}) => {
  useEffect(() => {
    IconRegistry.define(tylIconAddAlert);
  }, []);

  return (
    <ForgeBanner dismissed={dismissed} persistent={persistent} theme={theme}>
      {hasIcon && <ForgeIcon slot="icon" name="add_alert" />}
      <div>Minim sunt eu laborum labore minim.</div>
      {hasButton && <ForgeButton variant="outlined" slot="button" style={{ backgroundColor: '#ffffff' }}>Learn more...</ForgeButton>}
    </ForgeBanner>
  );
};
Default.args = {
  dismissed: false,
  persistent: false,
  theme: 'default',
  hasIcon: true,
  hasButton: false,
} as IBannerProps;
