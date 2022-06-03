import React, { useEffect, useRef, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { ITabBarProps, argTypes } from './tab-bar-args';
import { ITabBarComponent, IconRegistry } from '@tylertech/forge';
import { ForgeIcon, ForgeTab, ForgeTabBar } from '@tylertech/forge-react';
import { tylIconHeart } from '@tylertech/tyler-icons/extended';

const MDX = require('./tab-bar.mdx').default;

export default {
  title: 'Components/Tab Bar',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<ITabBarProps> = ({
  layoutMode = 'fixed',
  layoutAlign = 'start',
  underline = true,
  stacked = false,
  disabled = false
}) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    IconRegistry.define([tylIconHeart]);
  }, []);

  return (
    <ForgeTabBar
      activeTab={activeTab}
      layoutMode={layoutMode}
      layoutAlign={layoutAlign}
      underline={underline}
      stacked={stacked}
      style={{ flex: 1 }}>
      <ForgeTab disabled={disabled}>
        {stacked && <ForgeIcon slot="top" name="heart" />}
        Tab one
      </ForgeTab>
      <ForgeTab disabled={disabled}>
        {stacked && <ForgeIcon slot="top" name="heart" />}
        Tab two
      </ForgeTab>
      <ForgeTab disabled={disabled}>
        {stacked && <ForgeIcon slot="top" name="heart" />}
        Tab three
      </ForgeTab>
    </ForgeTabBar>
  );
};
Default.args = {
  layoutMode: 'fixed',
  layoutAlign: 'start',
  underline: true,
  stacked: false,
  disabled: false,
} as ITabBarProps;
