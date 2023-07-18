import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { ITabsProps, argTypes } from './tabs-args';
import { IconRegistry } from '@tylertech/forge';
import { ForgeIcon, ForgeTab, ForgeTabBar } from '@tylertech/forge-react';
import { tylIconHeart } from '@tylertech/tyler-icons/extended';
import { tylIconSettings } from '@tylertech/tyler-icons/standard';

const MDX = require('./tabs.mdx').default;

export default {
  title: 'Components/Tabs',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<ITabsProps> = ({
  disabled = false,
  vertical = false,
  clustered = false,
  clusteredAlignment = 'start',
  stacked = false,
  secondary = false,
  inverted = false,
  autoActivate = false,
  scrollButtons = false,
  showLeading = false,
  showTrailing = false,
  showLabel = true,
}) => {
  const [activeTab, _setActiveTab] = useState(0);

  useEffect(() => {
    IconRegistry.define([
      tylIconHeart,
      tylIconSettings
    ]);
  }, []);

  return (
    <ForgeTabBar
      activeTab={activeTab}
      disabled={disabled}
      vertical={vertical}
      clustered={clustered ? clusteredAlignment : false}
      stacked={stacked}
      secondary={secondary}
      inverted={inverted}
      autoActivate={autoActivate}
      scrollButtons={scrollButtons}>
      <ForgeTab>
        {showLeading && <ForgeIcon slot="leading" name="heart" />}
        {showTrailing && <ForgeIcon slot="trailing" name="settings" />}
        {showLabel && 'Tab one'}
      </ForgeTab>
      <ForgeTab>
        {showLeading && <ForgeIcon slot="leading" name="heart" />}
        {showTrailing && <ForgeIcon slot="trailing" name="settings" />}
        {showLabel && 'Tab two'}
      </ForgeTab>
      <ForgeTab>
        {showLeading && <ForgeIcon slot="leading" name="heart" />}
        {showTrailing && <ForgeIcon slot="trailing" name="settings" />}
        {showLabel && 'Tab three'}
      </ForgeTab>
      <ForgeTab>
        {showLeading && <ForgeIcon slot="leading" name="heart" />}
        {showTrailing && <ForgeIcon slot="trailing" name="settings" />}
        {showLabel && 'Tab four'}
      </ForgeTab>
      <ForgeTab>
        {showLeading && <ForgeIcon slot="leading" name="heart" />}
        {showTrailing && <ForgeIcon slot="trailing" name="settings" />}
        {showLabel && 'Tab five'}
      </ForgeTab>
    </ForgeTabBar>
  );
};
Default.args = {
  disabled: false,
  vertical: false,
  clustered: false,
  clusteredAlignment: 'start',
  stacked: false,
  secondary: false,
  inverted: false,
  autoActivate: false,
  scrollButtons: false,
  showLeading: false,
  showTrailing: false,
  showLabel: true,
} as ITabsProps;
